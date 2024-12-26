import React, { useContext, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Text } from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Input1 } from "@/components/TextInput";
import { CHANGE_PASSWORD_URL } from "@/utils/constants/urls";
import { putData } from "@/utils/functions/handle";
import { getAccessToken } from "@/lib/authStorage";
import Toast from "react-native-toast-message";
import { AuthContext } from "@/providers";
import { ArrowBack } from "@/components";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { userInfo } = useContext(AuthContext) || {};

  // State cho các trường nhập
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const saveChanges = async () => {
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
      });
      return;
    }

    // Kiểm tra độ dài mật khẩu mới
    if (newPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu mới phải có ít nhất 6 ký tự.",
      });
      return;
    }

    try {
      // Lấy token từ hàm getAccessToken
      const token = await getAccessToken();
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không tìm thấy token. Vui lòng đăng nhập lại.",
        });
        return;
      }

      // Tạo payload cho API
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
      };

      console.log("Payload gửi đi:", payload);

      // Gọi API đổi mật khẩu
      const { data, message } = await putData(
        CHANGE_PASSWORD_URL,
        payload,
        token
      );

      console.log("API Response:", { data, message });

      if (data) {
        Toast.show({
          type: "success",
          text1: "Success!!",
          text2: "Mật khẩu đã được thay đổi thành công.",
        });
        router.push("/profile"); // Điều hướng về trang profile
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: message || "Không thể thay đổi mật khẩu.",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi trong quá trình đổi mật khẩu.",
      });
    }
  };

  if (!userInfo)
    return (
      <View className="flex flex-row p-2 items-center">
        <ArrowBack></ArrowBack>
        <Text className="text-center w-full">No Data</Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-teal-500 dark:text-teal-400">Hủy</Text>
        </TouchableOpacity>
        <Text className="font-c-bold text-lg text-gray-800 dark:text-white">
          Đổi mật khẩu
        </Text>
        <TouchableOpacity onPress={saveChanges}>
          <Text className="text-teal-500 dark:text-teal-400">Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="px-6 mt-6">
        {/* Mật khẩu hiện tại */}
        <View className="mb-4 relative">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            MẬT KHẨU HIỆN TẠI
          </Text>
          <Input1
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            placeholder="Nhập mật khẩu hiện tại"
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2 pr-10"
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-0 bottom-2"
          >
            <Ionicons
              name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Mật khẩu mới */}
        <View className="mb-4 relative">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            MẬT KHẨU MỚI
          </Text>
          <Input1
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            placeholder="Nhập mật khẩu mới"
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2 pr-10"
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-0 bottom-2"
          >
            <Ionicons
              name={showNewPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Xác nhận mật khẩu mới */}
        <View className="mb-4 relative">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            XÁC NHẬN MẬT KHẨU
          </Text>
          <Input1
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="Nhập lại mật khẩu mới"
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2 pr-10"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 bottom-2"
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <View className="mt-2 items-center">
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text className="text-teal-500 font-c-semibold text-base">
              Bạn quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
