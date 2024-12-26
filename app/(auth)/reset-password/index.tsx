// import libs
import React, { useContext, useState } from "react";
import { View, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// import components
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// import utils
import { Input } from "@/components/Input";
import { AuthContext } from "@/providers";
import { IUser } from "@/types/interfaces";

export default function ResetPasswordPage() {
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
      setErrors((prev) => ({ ...prev, password: "Mật khẩu phải có ít nhất 6 ký tự." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Mật khẩu không khớp." }));
    } else if (text === "") {
      setErrors((prev) => ({ ...prev, confirmPassword: "Hãy điền đầy đủ thông tin" }));
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
      newErrors.password = "Hãy điền đầy đủ thông tin.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      valid = false;
    }

    // Kiểm tra Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Hãy điền đầy đủ thông tin.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
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
    <Card className="h-full w-full bg-white dark:bg-gray-800 p-4 mx-auto rounded-none">
      <Text className="text-2xl font-c-bold text-gray-700 dark:text-white text-center">
        ĐẶT LẠI MẬT KHẨU
      </Text>

      <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Nhập mật khẩu mới để hoàn tất đặt lại mật khẩu!
      </Text>

      <View className="mx-auto w-[180px] h-[180px]">
        <Image
          source={require("@/assets/images/noti/cat-4.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

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
