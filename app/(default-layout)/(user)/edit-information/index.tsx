import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  TextInput,
} from "react-native";

import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditUserInformationPage() {
  const router = useRouter();
  const [email, setEmail] = useState("pnhaiyen@gmail.com");
  const [phone, setPhone] = useState("0795 849 949");
  const [gender, setGender] = useState("Nữ");
  const [dob, setDob] = useState(new Date(2003, 11, 23));
  const [avatar, setAvatar] = useState(
    "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const saveChanges = () => {
    alert("Thông tin đã được lưu!");
    router.push("/information");
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Bạn cần cấp quyền để chọn ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-teal-500 dark:text-teal-400">Hủy</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg text-gray-800 dark:text-white">Chỉnh sửa</Text>
        <TouchableOpacity onPress={saveChanges}>
          <Text className="text-teal-500 dark:text-teal-400">Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View className="items-center mt-6 mb-6">
        <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: avatar }}
            className="w-24 h-24 rounded-full border-2 border-teal-600 dark:border-teal-400"
          />
          <View className="absolute bottom-0 right-0 bg-teal-600 dark:bg-teal-400 p-2 rounded-full">
            <Ionicons name="camera-outline" size={16} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Nhấn vào ảnh để thay đổi
        </Text>
      </View>

      {/* Form */}
      <View className="px-6">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">EMAIL CỦA BẠN</Text>
          <TextInput
            value={email}
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2"
          />
        </View>

        {/* Số điện thoại */}
        <View className="mb-4 relative">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">SỐ ĐIỆN THOẠI</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2 pr-10"
          />
          {/* <Ionicons
            name="pencil-outline"
            size={16}
            color="gray"
            style={{ position: "absolute", right: 0, bottom: 2 }}
          /> */}
        </View>

        {/* Giới tính */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">GIỚI TÍNH</Text>
          <TouchableOpacity
            onPress={() => setShowGenderModal(true)}
            className="border-b border-gray-300 dark:border-gray-700 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 dark:text-white text-sm">{gender}</Text>
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="gray"
              className="dark:text-gray-500"
            />
          </TouchableOpacity>
        </View>

        {/* Ngày sinh */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">NGÀY SINH</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border-b border-gray-300 dark:border-gray-700 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 dark:text-white text-sm">
              {dob.toLocaleDateString("vi-VN")}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="gray"
              className="dark:text-gray-500"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>

      {/* Gender Modal */}
      <Modal visible={showGenderModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white dark:bg-gray-800 w-3/4 rounded-lg p-6">
            <Text className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
              Chọn Giới Tính
            </Text>
            {["Nam", "Nữ", "Khác"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setGender(option);
                  setShowGenderModal(false);
                }}
                className="py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <Text
                  className={`text-center text-sm ${
                    gender === option
                      ? "text-teal-500 dark:text-teal-400"
                      : "text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowGenderModal(false)}
              className="mt-4 bg-teal-500 dark:bg-teal-400 py-2 rounded-lg"
            >
              <Text className="text-white text-center">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
