// import libs
import React, { useContext, useState } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";

// import components
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// import providers
import { AuthContext } from "@/providers";

// import utils
import { Input } from "@/components/Input";

// import types
import { IUser } from "@/types/interfaces";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useContext(AuthContext) || {
    forgotPassword: async (user: IUser) => {},
  };

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (text: string) => {
    setEmail(text);
    if (!text.match(emailRegex)) {
      setErrors((prev) => ({ ...prev, email: "Hãy điền một Email hợp lệ." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
    };

    // Kiểm tra Email
    if (!email) {
      newErrors.email = "Hãy điền đầy đủ thông tin.";
      valid = false;
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Hãy điền một Email hợp lệ.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) await forgotPassword({ email: email }, false);
  };

  return (
    <Card className="h-full w-full bg-white dark:bg-gray-800 p-4 mx-auto rounded-none">
      <Text className="text-2xl font-c-bold text-gray-700 dark:text-white text-center">
        QUÊN MẬT KHẨU
      </Text>

      <View className="w-full mt-4">
        <Text className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Nhập Email đã đăng ký để nhận mã OTP!
        </Text>
        <View className="mx-auto w-[200px] h-[168px]">
          <Image
            source={require("@/assets/images/noti/cat-1.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-col gap-2">
          <Text
            className={`text-gray-600 dark:text-gray-400 ${errors.email ? "text-red-500" : ""}`}
          >
            Email:
          </Text>

          <Input
            value={email}
            onChangeText={validateEmail}
            inputMode="email"
            keyboardType="email-address"
            placeholder="Nhập địa chỉ Email..."
            className={`placeholder:text-sm ${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.email ? <Text className="text-right text-red-500">{errors.email}</Text> : null}
        </View>
      </View>

      <View className="mt-4 flex flex-col gap-2">
        <Button
          className="bg-green-500 text-white py-3 rounded-lg text-center"
          onPress={handleSubmit}
        >
          <Text className="text-white !font-c-semibold !text-xl">Xác nhận</Text>
        </Button>

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
