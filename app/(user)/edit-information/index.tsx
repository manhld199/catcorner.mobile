import React, { useState, useContext, useEffect } from "react";
import { getAccessToken } from "@/lib/authStorage";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Text } from "@/components/Text";
import { Input1 } from "@/components/TextInput";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "@/providers";
import { CHANGE_PROFILE_URL } from "@/utils/constants/urls";
import { putData } from "@/utils/functions/handle";
import { IUser } from "@/types/interfaces";

export default function EditUserInformationPage() {
  const router = useRouter();
  const { userInfo, updateUserInfo } = useContext(AuthContext) || {
    login: async (user: IUser) => {},
    updateUserInfo: async (user: IUser) => {},
  };

  // Khởi tạo state với dữ liệu từ userInfo hoặc placeholder
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.user_phone_number || "");
  const [gender, setGender] = useState(userInfo?.user_gender || "");
  const [dob, setDob] = useState(
    userInfo?.user_birth_day ? new Date(userInfo.user_birth_day) : null
  );
  const [avatar, setAvatar] = useState(
    userInfo?.user_avt ||
      "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp"
  );
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const saveChanges = async () => {
    setLoading(true);

    const payload = {
      email,
      user_phone_number: phone,
      user_gender: gender,
      user_birth_day: dob ? dob.toISOString().split("T")[0] : null,
      user_avt: avatar,
    };

    try {
      const token = await getAccessToken();
      if (!token) {
        Alert.alert("Lỗi", "Không tìm thấy token. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      const { data, message } = await putData(
        CHANGE_PROFILE_URL,
        payload,
        token
      );

      if (data) {
        const updatedUser = data.data.user || payload;

        await updateUserInfo(updatedUser);

        router.push("/information");
      } else {
        Alert.alert("Lỗi", message || "Không thể cập nhật thông tin.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm chọn ảnh
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Quyền truy cập", "Bạn cần cấp quyền để chọn ảnh.");
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
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-teal-500 dark:text-teal-400">Hủy</Text>
        </TouchableOpacity>
        <Text className="font-c-bold text-lg text-gray-800 dark:text-white">
          Chỉnh sửa
        </Text>
        <TouchableOpacity onPress={saveChanges}>
          <Text className="text-teal-500 dark:text-teal-400">Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{ marginTop: 20 }}
        />
      )}

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
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            EMAIL
          </Text>
          <Input1
            value={email}
            placeholder="Nhập email"
            editable={false}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-400 dark:text-white text-sm pb-2"
          />
        </View>

        {/* Số điện thoại */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            SỐ ĐIỆN THOẠI
          </Text>
          <Input1
            value={phone}
            placeholder="Nhập số điện thoại"
            onChangeText={setPhone}
            keyboardType="numeric"
            className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white text-sm pb-2"
          />
        </View>

        {/* Giới tính */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            GIỚI TÍNH
          </Text>
          <TouchableOpacity
            onPress={() => setShowGenderModal(true)}
            className="border-b border-gray-300 dark:border-gray-700 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 dark:text-white text-base">
              {gender || "Chọn"}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="gray"
              className="dark:text-gray-500"
            />
          </TouchableOpacity>
          {/* Modal chọn giới tính */}
          <Modal
            visible={showGenderModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowGenderModal(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white dark:bg-gray-800 w-3/4 rounded-lg p-6">
                <Text className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
                  Chọn giới tính
                </Text>
                {["Nam", "Nữ", "Khác"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setGender(option);
                      setShowGenderModal(false);
                    }}
                    className={`py-3 border-b ${
                      option === gender
                        ? "bg-teal-100 dark:bg-teal-700"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Text
                      className={`text-center text-sm ${
                        option === gender
                          ? "text-teal-600 dark:text-teal-300"
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
        </View>

        {/* Ngày sinh */}
        <View className="mb-4">
          <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">
            NGÀY SINH
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border-b border-gray-300 dark:border-gray-700 pb-2 flex-row items-center justify-between"
          >
            <Text className="text-gray-800 dark:text-white text-base">
              {dob ? dob.toLocaleDateString("vi-VN") : "Chọn"}
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
              value={dob || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
