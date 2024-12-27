import React from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Text } from "@/components/Text";
import { IOption } from "@/types/interfaces";

interface UnauthenticatedUserProps {
  pre_options: IOption[];
}
export default function AuthenticatedUser({ pre_options }: UnauthenticatedUserProps) {
  return (
    <>
      <View className="items-center mt-4 mb-6">
        <View className="rounded-full overflow-hidden">
          <Image
            source={{
              uri: "https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg",
            }}
            className="w-24 h-24"
          />
        </View>
        <Text className="font-c-bold text-lg mt-4 dark:text-white">Bạn chưa đăng nhập</Text>
        <Text className="text-gray-500 dark:text-gray-400">
          Tạo tài khoản để khám phá cùng CatCorner!!!
        </Text>
      </View>
      {/* Options */}
      <FlatList
        data={pre_options}
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
                    className={`font-medium ${isLogout ? "text-red-500" : "dark:text-gray-300"}`}
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
    </>
  );
}
