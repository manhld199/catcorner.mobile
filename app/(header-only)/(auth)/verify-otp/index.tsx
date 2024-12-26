// import libs
import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { OtpInput } from "react-native-otp-entry";

// import components
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// import types
import { IUser } from "@/types/interfaces";
import { useColorScheme } from "nativewind";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { type, email, token } = params;
  const { colorScheme } = useColorScheme();

  const { verifyOtp, verifyEmail, forgotPassword } = useContext(AuthContext) || {
    verifyOtp: async (user: IUser) => {},
    verifyEmail: async (user: IUser) => {},
    forgotPassword: async (user: IUser) => {},
  };

  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Dùng để lưu trữ interval

  useEffect(() => {
    const handleOtp = async () => {
      const otpRes = await verifyOtp({ otp, email: email as string });

      if (!otpRes.data) {
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: "Mã OTP không hợp lệ!",
        });

        return;
      }

      // console.log("tpyeeeee", type);9
      if (type == "register") {
        // console.log("email verifyin");
        await verifyEmail({ email: email as string, token: token as string });
        // console.log("email verified");
        return;
      } else if (type == "forgot") {
        router.push({
          pathname: "/reset-password",
          params: {
            reset_token: otpRes.data.data.resetToken,
          },
        });

        return;
      }
    };

    if (otp.length == 6) handleOtp();
  }, [otp]);

  const handleResendOtp = async () => {
    if (isResendDisabled) return;

    try {
      // Khởi động bộ đếm ngay lập tức
      setIsResendDisabled(true);
      setTimer(30);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          // console.log("Timer:", prev);
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            // console.log("Kết thúc đếm ngược, bật lại nút resend");
            setIsResendDisabled(false);
            return 30; // Reset lại
          }
          return prev - 1;
        });
      }, 1000);

      // Thực hiện gửi OTP
      await forgotPassword({ email: email as string }, true);
    } catch (error) {
      // Nếu xảy ra lỗi, dừng bộ đếm và hiển thị thông báo
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsResendDisabled(false);
      setTimer(30);

      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể gửi lại mã OTP. Vui lòng thử lại.",
      });
    }
  };

  return (
    <Card className="h-full w-full bg-white dark:bg-gray-800 p-4 mx-auto rounded-none">
      <View className="w-full items-center">
        <Text className="text-2xl font-c-bold text-gray-700 dark:text-white text-center">
          NHẬP MÃ OTP
        </Text>
      </View>

      <View className="w-full mt-4">
        <Text className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Chúng tôi đã gửi một email xác nhận tới:
        </Text>
        <Text className="text-green-500 dark:text-green-400 font-semibold text-center mb-4">
          {email}
        </Text>

        <View className="mx-auto w-[180px] h-[180px]">
          <Image
            source={require("@/assets/images/noti/cat-3.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          theme={{
            pinCodeContainerStyle: {
              borderWidth: 0,
              borderBottomWidth: 2,
              borderRadius: 0,
            },
            pinCodeTextStyle: {
              color: colorScheme == "light" ? "black" : "white",
            },
          }}
        />

        <Text className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Nhấn "Gửi lại email" nếu bạn không nhận được bất kỳ email nào trong vòng 10 phút.
        </Text>
      </View>

      <View className="mt-4 flex flex-col gap-2">
        <TouchableOpacity
          className={`py-3 rounded-lg text-center flex flex-row justify-center items-center ${
            isResendDisabled
              ? "bg-zinc-400 text-zinc-800"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onPress={handleResendOtp}
          disabled={isResendDisabled}
        >
          <Text className="text-white !font-c-semibold !text-xl">
            {isResendDisabled ? `Gửi lại sau ${timer}s` : "Gửi Lại Email"}
          </Text>
        </TouchableOpacity>

        <Button
          className="border bg-white dark:bg-zinc-600 border-gray-300 dark:border-gray-700 py-3 rounded-lg text-center"
          onPress={() => router.back()}
        >
          <Text className="text-gray-700 dark:text-white text-lg">Quay lại</Text>
        </Button>
      </View>
    </Card>
  );
}
