import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function UserInformationPage() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-gradient-to-r from-pink-500 to-purple-500 h-64 items-center justify-center">
        <Image
          source={{
            uri: "https://haycafe.vn/wp-content/uploads/2022/03/Anh-chan-dung-nam.jpg",
          }}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <Text className="font-bold text-lg mt-4 dark:text-white">
          Phan Nguyễn Hải Yến
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          pnhaiyen@gmail.com
        </Text>
        <Link
          href="/edit-information"
          className="bg-pri-1 dark:bg-teal-600 px-6 py-3 rounded-full mt-2"
        >
          <Text className="text-white font-bold">Chỉnh sửa</Text>
        </Link>
      </View>

      {/* Thông tin người dùng */}
      <View className="px-6">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">EMAIL CỦA BẠN</Text>
          <TextInput
            value="pnhaiyen@gmail.com"
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>

        {/* Mật khẩu */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">MẬT KHẨU CỦA BẠN</Text>
          <TextInput
            value="••••••••••"
            secureTextEntry={true}
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>

        {/* Số điện thoại */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">
            SỐ ĐIỆN THOẠI CỦA BẠN
          </Text>
          <TextInput
            value="0795 849 949"
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>

        {/* Giới tính */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">GIỚI TÍNH</Text>
          <TextInput
            value="Nữ"
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>

        {/* Ngày sinh */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">NGÀY SINH</Text>
          <TextInput
            value="23/12/2003"
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
