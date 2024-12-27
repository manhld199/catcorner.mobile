import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  useColorScheme,
  Alert,
} from "react-native";
import { Text } from "@/components/Text";
import { ArrowBack, LoadingDefault } from "@/components";
import { useRouter } from "expo-router"; // Import useRouter để điều hướng
import { getData } from "@/utils/functions/handle";
import { getAccessToken } from "@/lib/authStorage";
import { ALL_ORDERS_URL } from "@/utils/constants/urls";
import { IOrder } from "@/types/interfaces";

const statusMapping = {
  unpaid: "Chờ xác nhận",
  delivering: "Đang giao hàng",
  done: "Đã giao",
  cancel: "Đã hủy",
} as const;

type OrderStatus = keyof typeof statusMapping;

export default function PurchaseHistoryPage() {
  const router = useRouter(); // Sử dụng useRouter để điều hướng
  const [selectedTab, setSelectedTab] = useState<string>("Tất cả");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  const tabs = ["Tất cả", "Chờ xác nhận", "Đang giao hàng", "Đã giao", "Đã hủy"];

  const getStatusLabel = (status: OrderStatus): string => statusMapping[status];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getAccessToken();

        if (!token) {
          Alert.alert("Lỗi", "Bạn cần đăng nhập để xem lịch sử đặt hàng.");
          setLoading(false);
          return;
        }

        const response = await getData(ALL_ORDERS_URL, token);

        if (response && response.data.data) {
          setOrders(response.data.data.orders || []);
        } else {
          Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status: OrderStatus): string => {
    switch (getStatusLabel(status)) {
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
        return colorScheme === "dark" ? "bg-red-700 text-red-200" : "bg-red-200/50 text-red-700";
      default:
        return colorScheme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700";
    }
  };

  const renderActions = (status: OrderStatus) => {
    switch (status) {
      case "unpaid":
        return (
          <View className="flex-row gap-3 mt-2 justify-end">
            <TouchableOpacity className="border border-red-500 w-36 py-3 rounded-lg">
              <Text className="text-red-500 text-center text-base">Hủy đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-teal-500 w-36 py-3 rounded-lg">
              <Text className="text-white text-center text-base">Thanh toán</Text>
            </TouchableOpacity>
          </View>
        );
      case "delivering":
        return (
          <View className="mt-2 flex-row justify-end">
            <TouchableOpacity className="border border-teal-500 w-52 py-3 rounded-lg">
              <Text className="text-teal-600 text-center text-base">Đã nhận được hàng</Text>
            </TouchableOpacity>
          </View>
        );
      case "done":
        return (
          <View className="mt-2 flex-row justify-end">
            <TouchableOpacity className="bg-teal-500 w-36 py-3 rounded-lg">
              <Text className="text-white text-center text-base">Đánh giá</Text>
            </TouchableOpacity>
          </View>
        );
      case "cancel":
        return (
          <View className="mt-2 flex-row justify-end">
            <TouchableOpacity className="bg-teal-500 w-36 py-3 rounded-lg">
              <Text className="text-white text-center text-base">Mua lại</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const filteredOrders =
    selectedTab === "Tất cả"
      ? orders
      : orders.filter((order) => getStatusLabel(order.order_status) === selectedTab);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-800">
        <LoadingDefault />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <ArrowBack />
        <Text className="text-lg font-c-bold text-black dark:text-white ml-4">
          Lịch sử đặt hàng
        </Text>
      </View>

      {/* Tabs */}
      <View
        className={`border-b ${colorScheme === "dark" ? "border-gray-700" : "border-gray-200"}`}
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
            <Text className={`${colorScheme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Không có đơn hàng nào!
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/purchase-detail/${encodeURIComponent(item._id)}`)}
              >
                <View
                  className={`p-4 border-b ${
                    colorScheme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  {/* Header */}
                  <View className="flex-row justify-between items-center mb-2">
                    <Text
                      className={`${
                        colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
                      } font-bold`}
                    >
                      #{item.order_id.split(".")[0]}
                    </Text>

                    <Text
                      className={`text-sm px-3 py-1 rounded-full ${getStatusStyle(
                        item.order_status
                      )}`}
                    >
                      {getStatusLabel(item.order_status)}
                    </Text>
                  </View>

                  {/* Product Info */}
                  {item.order_products.slice(0, 1).map((product) => (
                    <View key={product.product_id} className="flex-row items-center mb-2">
                      <Image
                        source={{ uri: product.product_img }}
                        className="w-20 h-20 rounded-md"
                      />
                      <View className="ml-4 flex-1">
                        <Text
                          className={`${
                            colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
                          } font-c-medium mb-1 line-clamp-1`}
                          numberOfLines={2}
                        >
                          {product.product_name}
                        </Text>
                        <Text
                          className={`${
                            colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Phân loại: {product.variant_name}
                        </Text>
                        <Text
                          className={`${
                            colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          x{product.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}

                  {/* Pricing */}
                  <View className="mb-2">
                    <Text
                      className={`${
                        colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
                      } mt-1`}
                    >
                      Tổng số tiền:{" "}
                      <Text className="font-c-bold text-red-500">
                        {item.final_cost.toLocaleString()}đ
                      </Text>
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  {renderActions(item.order_status)}
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
