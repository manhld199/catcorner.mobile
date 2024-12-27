import React, { useContext } from "react";
import { View, Image, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "@/components/Text";
import { Input1 } from "@/components/TextInput";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ArrowBack, ArrowBackFix } from "@/components";
import { AuthContext } from "@/providers";
import { Input } from "@/components/Input";

export default function UserInformationPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { userInfo } = useContext(AuthContext) || {};

  if (!userInfo) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-gray-500 dark:text-gray-400">No data</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="relative bg-gradient-to-r from-pink-500 to-purple-500 h-64 items-center justify-center dark:from-gray-800 dark:to-gray-900">
        {/* Nút Back */}
        <TouchableOpacity onPress={() => router.push("/profile")} className="absolute top-8 left-4">
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              userInfo.user_avt ||
              "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp", // Hiển thị avatar
          }}
          className="w-24 h-24 rounded-full border-2 border-teal-600 dark:border-teal-400"
        />
        <Text className="font-c-bold text-lg mt-4 dark:text-white">
          {userInfo.user_name || "Tên chưa cập nhật"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          {userInfo.email || "Email chưa cập nhật"}
        </Text>
        <Link
          href="/edit-information"
          className="bg-pri-1 dark:bg-teal-600 px-6 py-3 rounded-full mt-2"
        >
          <Text className="text-white font-c-bold text-sm">Chỉnh sửa</Text>
        </Link>
      </View>

      {/* Thông tin người dùng */}
      <View className="px-6 my-4">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1 dark:text-gray-500">EMAIL CỦA BẠN</Text>
          <Input1
            value={userInfo.email || "Chưa cập nhật"}
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2"
          />
        </View>

        {/* Số điện thoại */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1 dark:text-gray-500">
            SỐ ĐIỆN THOẠI CỦA BẠN
          </Text>
          <Input1
            value={userInfo.user_phone_number || "Chưa cập nhật"}
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2"
          />
        </View>

        {/* Giới tính */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1 dark:text-gray-500">GIỚI TÍNH</Text>
          <Input1
            value={userInfo.user_gender || "Chưa cập nhật"}
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white pb-2"
          />
        </View>

        {/* Ngày sinh */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1 dark:text-gray-500">NGÀY SINH</Text>
          <Input1
            value={
              userInfo.user_birth_day
                ? new Date(userInfo.user_birth_day).toLocaleDateString("vi-VN")
                : "Chưa cập nhật"
            }
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white pb-2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
