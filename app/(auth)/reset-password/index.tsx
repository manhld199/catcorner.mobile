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

function ResetPasswordContent() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { reset_token } = params;
  const { resetPassword } = useContext(AuthContext) || {
    resetPassword: async (user: IUser) => {},
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Password does not match." }));
    } else if (text === "") {
      setErrors((prev) => ({ ...prev, confirmPassword: "Confirm password is required" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    // Kiểm tra Password
    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    // Kiểm tra Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password does not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm())
      await resetPassword({ reset_token: reset_token as string, new_password: password });
  };

  return (
    <Card className="h-full w-full max-w-md bg-white dark:bg-gray-800 p-4 mx-auto my-8">
      <Text className="text-2xl font-c-bold text-gray-700 dark:text-white text-center">
        ĐẶT LẠI MẬT KHẨU
      </Text>

      <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Nhập mật khẩu mới để hoàn tất đặt lại mật khẩu!
      </Text>

      <View className="w-full flex-col gap-2">
        {/* Password */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Mật khẩu:
          </Text>

          <Input
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            placeholder="Nhập mật khẩu..."
            className={`placeholder:text-sm ${
              errors.password ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.password ? (
            <Text className="text-right text-red-500">{errors.password}</Text>
          ) : null}
        </View>

        {/* Confirm Password */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Mật khẩu xác nhận:
          </Text>

          <Input
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            secureTextEntry
            placeholder="Nhập lại mật khẩu..."
            className={`placeholder:text-sm ${
              errors.confirmPassword ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.confirmPassword ? (
            <Text className="text-right text-red-500">{errors.confirmPassword}</Text>
          ) : null}
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

export default function ResetPasswordPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ResetPasswordContent />
    </View>
  );
}
