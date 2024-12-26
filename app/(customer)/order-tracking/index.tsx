import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { CustomerAppbar } from "@/partials";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTrackOrder = () => {
    // Xử lý tra cứu đơn hàng
    alert(`Tra cứu đơn hàng: ${orderId} - ${phoneNumber}`);
  };

  const handleViewOrdersInCatCorner = () => {
    // Xử lý xem đơn hàng trong CatCorner
    alert("Xem đơn hàng trong CatCorner");
  };

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50 px-6 py-8">
        {/* Header */}
        <Text className="text-2xl font-c-bold text-gray-800 text-center">
          Tra cứu đơn hàng
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          Kiểm tra thông tin đơn hàng và tình trạng vận chuyển đơn hàng của bạn!
        </Text>

        {/* Form */}
        <View className="mt-8">
          <Text className="text-gray-700 font-medium mb-2">Mã đơn hàng:</Text>
          <Input
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800"
            placeholder="Nhập mã đơn hàng"
            value={orderId}
            onChangeText={setOrderId}
          />

          <Text className="text-gray-700 font-medium mt-4 mb-2">
            Số điện thoại nhận hàng:
          </Text>
          <Input
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          {/* Button */}
          <TouchableOpacity
            className="bg-teal-700 rounded-full py-4 mt-6"
            onPress={handleTrackOrder}
          >
            <Text className="text-white font-c-bold text-center text-lg">
              Tra cứu
            </Text>
          </TouchableOpacity>

          {/* Separator */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="px-4 text-gray-500">Hoặc</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* View Orders Button */}
          <TouchableOpacity
            className="border-2 border-teal-700 rounded-full py-4"
            onPress={handleViewOrdersInCatCorner}
          >
            <Text className="text-teal-700 font-c-bold text-center">
              Xem đơn hàng trong CatCorner
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomerAppbar />
    </>
  );
}
