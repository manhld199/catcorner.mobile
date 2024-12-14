// import libs
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import OTPTextView from "react-native-otp-textinput";
import { Mail } from "lucide-react-native";

// import components
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// import types
import { IUser } from "@/types/interfaces";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { type, email, token } = params;

  const { verifyOtp, verifyEmail } = useContext(AuthContext) || {
    verifyOtp: async (user: IUser) => {},
    verifyEmail: async (user: IUser) => {},
  };

  const [otp, setOtp] = useState<string>("");

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

      console.log("tpyeeeee", type);
      if (type == "register") {
        console.log("email verifyin");
        await verifyEmail({ email: email as string, token: token as string });
        console.log("email verified");
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

    console.log("otp: ", otp, otp.length);
    if (otp.length == 6) handleOtp();
  }, [otp]);

  return (
    <View className="flex-1 justify-center items-center">
      <Card className="h-full w-full max-w-md bg-white dark:bg-gray-800 p-4 mx-auto my-8">
        <View className="w-full items-center">
          <View className="w-24 h-24 bg-green-100 dark:bg-green-500 rounded-full justify-center items-center mb-4">
            <Mail className="text-black dark:text-white" size={48} />
          </View>

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

          <OTPTextView
            handleTextChange={setOtp}
            inputCount={6}
            keyboardType="numeric"
            containerStyle={{ width: "100%" }}
            inputCellLength={40}
          />

          <Text className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            Nhấn "Gửi lại email" nếu bạn không nhận được bất kỳ email nào trong vòng 10 phút.
          </Text>
        </View>

        <View className="mt-4 flex flex-col gap-2">
          <Button
            className="bg-green-500 text-white py-3 rounded-lg text-center"
            onPress={() => {
              // Xử lý gửi lại email
            }}
          >
            <Text className="text-white text-lg">Gửi Lại Email</Text>
          </Button>

          <Button
            className="border bg-white dark:bg-zinc-600 border-gray-300 dark:border-gray-700 py-3 rounded-lg text-center"
            onPress={() => router.back()}
          >
            <Text className="text-gray-700 dark:text-white text-lg">Quay lại</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
}
