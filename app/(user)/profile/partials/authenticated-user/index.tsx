import React, { useContext, useState } from "react";
import { View, Image, FlatList, TouchableOpacity, Modal } from "react-native";
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false); // Đóng popup
    logout?.(); // Chỉ gọi logout nếu nó được định nghĩa
  };

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
            // Mở Modal xác nhận khi nhấn nút Đăng xuất
            <TouchableOpacity
              onPress={() => setShowLogoutModal(true)}
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

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50">
          <View className="bg-white dark:bg-gray-800 w-3/4 rounded-lg p-6">
            <Text className="font-c-bold text-lg mb-4 text-gray-800 dark:text-white">
              Xác nhận đăng xuất
            </Text>
            <Text className="text-gray-500 mb-6">
              Bạn có chắc chắn muốn đăng xuất không?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                className="bg-gray-300 dark:bg-gray-600 py-3 w-32 rounded-lg"
              >
                <Text className="text-gray-800 dark:text-white text-center text-sm">
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                className="bg-red-500 py-3 w-32 rounded-lg text-center"
              >
                <Text className="text-white text-center text-sm">
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
