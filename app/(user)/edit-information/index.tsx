import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
} from "react-native";
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
    "https://haycafe.vn/wp-content/uploads/2022/03/Anh-chan-dung-nam.jpg"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const saveChanges = () => {
    alert("Thông tin đã được lưu!");
    router.push("/information");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-teal-500">Hủy</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg">Chỉnh sửa</Text>
        <TouchableOpacity onPress={saveChanges}>
          <Text className="text-teal-500">Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View className="items-center mt-6 mb-6">
        <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: avatar }}
            className="w-24 h-24 rounded-full border-2 border-teal-600"
          />
          <View className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full">
            <Ionicons name="camera-outline" size={16} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-gray-500 mt-2 text-sm">
          Nhấn vào ảnh để thay đổi
        </Text>
      </View>

      {/* Form */}
      <View className="px-6">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">EMAIL CỦA BẠN</Text>
          <TextInput
            value={email}
            editable={false}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2"
          />
        </View>

        {/* Số điện thoại */}
        <View className="mb-4 relative">
          <Text className="text-gray-400 text-xs mb-1">SỐ ĐIỆN THOẠI</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="border-b border-gray-300 text-gray-800 text-sm pb-2 pr-10"
          />
          <Ionicons
            name="pencil-outline"
            size={16}
            color="gray"
            className="absolute right-0 bottom-2"
          />
        </View>

        {/* Giới tính */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">GIỚI TÍNH</Text>
          <TouchableOpacity
            onPress={() => setShowGenderModal(true)}
            className="border-b border-gray-300 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 text-sm">{gender}</Text>
            <Ionicons name="chevron-down-outline" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Ngày sinh */}
        <View className="mb-4">
          <Text className="text-gray-400 text-xs mb-1">NGÀY SINH</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border-b border-gray-300 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 text-sm">
              {dob.toLocaleDateString("vi-VN")}
            </Text>
            <Ionicons name="calendar-outline" size={16} color="gray" />
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
          <View className="bg-white w-3/4 rounded-lg p-6">
            <Text className="font-bold text-lg mb-4">Chọn Giới Tính</Text>
            {["Nam", "Nữ", "Khác"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setGender(option);
                  setShowGenderModal(false);
                }}
                className="py-3 border-b border-gray-200"
              >
                <Text
                  className={`text-center text-sm ${
                    gender === option ? "text-teal-500" : "text-gray-800"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowGenderModal(false)}
              className="mt-4 bg-teal-500 py-2 rounded-lg"
            >
              <Text className="text-white text-center">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
