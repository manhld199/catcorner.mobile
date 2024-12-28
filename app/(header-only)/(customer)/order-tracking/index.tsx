import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { CustomerAppbar, CustomerHeader } from "@/partials";
import { useRouter } from "expo-router";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleTrackOrder = () => {
    if (!orderId || !phoneNumber) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã đơn hàng và số điện thoại.");
      return;
    }

    // Chuyển sang trang kết quả và truyền tham số qua router
    router.push({
      pathname: "/order-tracking/result",
      params: { orderId, phoneNumber },
    });
  };

  return (
    <>
      <ScrollView className="flex-1 bg-bg-1 dark:bg-gray-800 px-6 py-8">
        <Text className="text-2xl font-c-bold text-gray-800 dark:text-pri-2 text-center">
          Tra cứu đơn hàng
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Kiểm tra thông tin đơn hàng và tình trạng vận chuyển đơn hàng của bạn!
        </Text>

        <View className="mt-8">
          <Text className="text-gray-700 dark:text-teal-300 font-medium mb-2">Mã đơn hàng:</Text>
          <Input
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 dark:text-pri-2"
            placeholder="Nhập mã đơn hàng"
            value={orderId}
            onChangeText={setOrderId}
          />
          <Text className="text-gray-700 dark:text-teal-300 font-medium mt-4 mb-2">
            Số điện thoại nhận hàng:
          </Text>
          <Input
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 dark:text-pri-2"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            className="bg-teal-700 rounded-full py-4 mt-6"
            onPress={handleTrackOrder}
          >
            <Text className="text-white font-c-bold text-center text-lg">Tra cứu</Text>
          </TouchableOpacity>
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="px-4 text-gray-500 dark:text-gray-400">Hoặc</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>
          <TouchableOpacity className="border-2 border-teal-700 dark:border-teal-400 rounded-full py-4">
            <Text className="text-teal-700 dark:text-teal-400 font-c-bold text-center">
              Xem đơn hàng trong CatCorner
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomerAppbar />
    </>
  );
}
