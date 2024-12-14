// import libs
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import OTPTextView from "react-native-otp-textinput";
import Toast from "react-native-toast-message";

// import components
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// import utils
import { getData, postData } from "@/utils/functions/handle";
import { AUTH_VERIFY_EMAIL_URL, AUTH_VERIFY_OTP_URL } from "@/utils/constants/urls";
import { Input } from "@/components/Input";
import { AuthContext } from "@/providers";
import { IUser } from "@/types/interfaces";

function ForgotPasswordContent() {
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
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
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
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) await forgotPassword({ email: email });
  };

  return (
    <Card className="h-full w-full max-w-md bg-white dark:bg-gray-800 p-4 mx-auto my-8">
      <Text className="text-2xl font-c-bold text-gray-700 dark:text-white text-center">
        QUÊN MẬT KHẨU
      </Text>

      <View className="w-full mt-4">
        <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Nhập Email đã đăng ký để nhận mã OTP!
        </Text>

        <View className="flex flex-col gap-2">
          <Text className={`text-gray-600 ${errors.email ? "text-red-500" : ""}`}>Email:</Text>

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
          <Text className="text-white text-lg">Xác nhận</Text>
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

export default function ForgotPasswordPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ForgotPasswordContent />
    </View>
  );
}
