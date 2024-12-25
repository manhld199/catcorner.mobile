import React, { useContext } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { IOption, IUser } from "@/types/interfaces";
import { AuthContext } from "@/providers";

import { Text } from "@/components/Text";

interface AuthenticatedUserProps {
  userInfo: IUser;
  options: IOption[];
}

export default function AuthenticatedUser({
  userInfo,
  options,
}: AuthenticatedUserProps) {
  const { logout } = useContext(AuthContext) || {};

  return (
    <>
      {/* Profile Info */}
      <View className="items-center mt-4 mb-6">
        <View className="rounded-full overflow-hidden border-2 border-teal-600">
          <Image
            source={{
              uri:
                userInfo?.user_avt ||
                "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp",
            }}
            className="w-24 h-24"
          />
        </View>
        <Text className="font-c-bold text-lg mt-4 dark:text-white">
          {userInfo?.user_name}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          {userInfo?.email}
        </Text>
        <Link
          href="/edit-information"
          className="bg-pri-1 dark:bg-teal-600 px-6 py-3 rounded-full mt-2"
        >
          <Text className="text-white font-c-bold text-sm">Chỉnh sửa</Text>
        </Link>
      </View>

      {/* Options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isLogout = item.title === "Đăng xuất"; // Kiểm tra nếu là nút Đăng xuất
          return isLogout ? (
            // Gắn sự kiện `logout` vào nút Đăng xuất
            <TouchableOpacity
              onPress={logout}
              className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800"
            >
              <View className="flex-row items-center">
                <View
                  className={`w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4`}
                >
                  <Ionicons name={item.icon as any} size={20} color="red" />
                </View>
                <Text className="text-base font-medium text-red-500">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Link href={item.link as any} asChild>
              <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                <View className="flex-row items-center">
                  <View
                    className={`w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color="#6b7280"
                    />
                  </View>
                  <Text className="text-base font-medium dark:text-gray-300">
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#6b7280"
                  className="dark:text-gray-300"
                />
              </TouchableOpacity>
            </Link>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );
}
