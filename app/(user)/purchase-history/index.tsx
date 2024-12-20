import { ArrowBack } from "@/components";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Text";

export default function PurchaseHistoryPage() {
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const colorScheme = useColorScheme(); // Lấy chế độ sáng/tối của hệ thống

  const tabs = [
    "Tất cả",
    "Chờ xác nhận",
    "Đang giao hàng",
    "Đã giao",
    "Đã hủy",
  ];

  const orders = [
    {
      id: 1,
      order_id: "#ĐH000000001",
      status: "Chờ xác nhận",
      product: {
        image:
          "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
        name: "Pate cho mèo Royal Canin",
        sku: "CB02",
        quantity: 1,
        originalPrice: 300000,
        discountedPrice: 204000,
      },
      total: 196000,
    },
    {
      id: 2,
      order_id: "#ĐH000000002",
      status: "Đang giao hàng",
      product: {
        image:
          "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
        name: "Pate cho mèo Royal Canin",
        sku: "CB02",
        quantity: 1,
        originalPrice: 300000,
        discountedPrice: 204000,
      },
      total: 196000,
    },
  ];

  const getStatusStyle = (status: any) => {
    switch (status) {
      case "Chờ xác nhận":
        return colorScheme === "dark"
          ? "bg-yellow-700 text-yellow-200"
          : "bg-yellow-200/50 text-yellow-700";
      case "Đang giao hàng":
        return colorScheme === "dark"
          ? "bg-blue-700 text-blue-200"
          : "bg-blue-200/50 text-blue-700";
      case "Đã giao":
        return colorScheme === "dark"
          ? "bg-green-700 text-green-200"
          : "bg-green-200/50 text-green-700";
      case "Đã hủy":
        return colorScheme === "dark"
          ? "bg-red-700 text-red-200"
          : "bg-red-200/50 text-red-700";
      default:
        return colorScheme === "dark"
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-200 text-gray-700";
    }
  };

  const filteredOrders =
    selectedTab === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === selectedTab);

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      <View className="flex-row items-center mb-6">
        <ArrowBack />
        <Text className="text-lg font-bold text-black dark:text-white ml-4">
          Lịch sử đặt hàng
        </Text>
      </View>
      <View
        className={`flex-1 ${
          colorScheme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Tabs */}
        <View
          className={`border-b ${
            colorScheme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <FlatList
            horizontal
            data={tabs}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              alignItems: "center",
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedTab(item)}
                className={`px-4 py-4 ${
                  selectedTab === item
                    ? "border-b-2 border-orange-600"
                    : "border-b-2 border-transparent"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedTab === item
                      ? "text-orange-600 font-bold"
                      : colorScheme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Orders */}
        <View className="flex-1">
          {filteredOrders.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text
                className={`${
                  colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Không có đơn hàng nào!
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredOrders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  className={`p-4 border-b ${
                    colorScheme === "dark"
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text
                      className={`${
                        colorScheme === "dark"
                          ? "text-gray-300"
                          : "text-gray-800"
                      } font-bold`}
                    >
                      {item.order_id}
                    </Text>
                    <Text
                      className={`text-sm px-3 py-1 rounded-full ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </Text>
                  </View>

                  {/* Product Info */}
                  <View className="flex-row items-center mb-2">
                    <Image
                      source={{ uri: item.product.image }}
                      className="w-16 h-16 rounded-md"
                    />
                    <View className="ml-4 flex-1">
                      <Text
                        className={`${
                          colorScheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-800"
                        } font-medium mb-1`}
                        numberOfLines={2}
                      >
                        {item.product.name}
                      </Text>
                      <Text
                        className={`${
                          colorScheme === "dark"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {item.product.sku}
                      </Text>
                      <Text
                        className={`${
                          colorScheme === "dark"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        x{item.product.quantity}
                      </Text>
                    </View>
                  </View>

                  {/* Pricing */}
                  <View className="mb-2">
                    <View className="flex-row justify-between items-center">
                      <Text
                        className={`${
                          colorScheme === "dark"
                            ? "text-gray-500"
                            : "text-gray-400"
                        } line-through`}
                      >
                        {item.product.originalPrice.toLocaleString()}đ
                      </Text>
                      <Text
                        className={`${
                          colorScheme === "dark"
                            ? "text-red-300"
                            : "text-red-500"
                        } font-bold`}
                      >
                        {item.product.discountedPrice.toLocaleString()}đ
                      </Text>
                    </View>
                    <Text
                      className={`${
                        colorScheme === "dark"
                          ? "text-gray-300"
                          : "text-gray-800"
                      } mt-1`}
                    >
                      Tổng số tiền ({item.product.quantity} sản phẩm):{" "}
                      <Text className="font-bold text-red-500">
                        {item.total.toLocaleString()}đ
                      </Text>
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}
