import React from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

// Import components
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

const options = [
  {
    id: 1,
    title: "Thông tin tài khoản",
    icon: "person-outline",
    link: "/information",
  },
  {
    id: 2,
    title: "Lịch sử mua hàng",
    icon: "cart-outline",
    link: "/purchase-history",
  },
  {
    id: 3,
    title: "Cài đặt",
    icon: "settings-outline",
    link: "/settings",
  },
  {
    id: 4,
    title: "Đăng xuất",
    icon: "log-out-outline",
    link: "/#",
  },
];

export default function ProfilePage() {
  const { userInfo } = useContext(AuthContext) || { userInfo: {} };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 py-6">
      {/* Profile Info */}
      <View className="items-center mb-6">
        <View className="rounded-full overflow-hidden border-2 border-teal-600">
          <Image
            source={{
              uri: "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp",
            }}
            className="w-24 h-24"
          />
        </View>
        <Text className="font-bold text-lg mt-4 dark:text-white">Phan Nguyễn Hải Yến</Text>
        <Text className="text-gray-500 dark:text-gray-400">pnhaiyen@gmail.com</Text>
        <Link
          href="/edit-information"
          className="bg-pri-1 dark:bg-teal-600 px-6 py-3 rounded-full mt-2"
        >
          <Text className="text-white font-bold">Chỉnh sửa</Text>
        </Link>
      </View>

      {/* Options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isLogout = item.title === "Đăng xuất";
          return (
            <Link href={item.link as any} asChild>
              <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                <View className="flex-row items-center">
                  <View
                    className={`w-10 h-10 ${
                      isLogout ? "bg-red-100" : "bg-gray-100 dark:bg-gray-800"
                    } rounded-full flex items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={isLogout ? "red" : "#6b7280"}
                      className={isLogout ? "dark:text-red-500" : "dark:text-gray-300"}
                    />
                  </View>
                  <Text
                    className={`text-base font-medium ${
                      isLogout ? "text-red-500" : "dark:text-gray-300"
                    }`}
                  >
                    {item.title}
                  </Text>
                </View>
                {!isLogout && (
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#6b7280"
                    className="dark:text-gray-300"
                  />
                )}
              </TouchableOpacity>
            </Link>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
