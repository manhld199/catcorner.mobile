// import libs
import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Image, useColorScheme, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// import components
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers/AuthProvider";

// import utils
import { getData } from "@/utils/functions/handle";
import { ORDER_URL } from "@/utils/constants/urls";
import { convertDateTimeToDate, convertNumberToVND } from "@/utils/functions/convert";
import { LoadingDefault } from "@/components";

export default function OrderSuccessPage() {
  const { userInfo } = useContext(AuthContext) || {};
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null); // Trạng thái lưu thông tin đơn hàng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu

  // Gọi API để lấy dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        Alert.alert("Lỗi", "Mã đơn hàng không hợp lệ.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Đảm bảo trạng thái loading được bật trước khi gọi API
        const apiUrl = `${ORDER_URL}/getOrder/${orderId}`; // URL API

        const { data } = await getData(apiUrl); // Gọi API qua getData
        console.log("Response data:", data);

        if (!data || !data.data?.order) {
          Alert.alert("Không tìm thấy đơn hàng", "Vui lòng thử lại sau.");
          setOrder(null);
        } else {
          setOrder(data.data.order); // Gán dữ liệu từ API vào state
        }
      } catch (error) {
        console.error("Error fetching order:", error);

        // Kiểm tra chi tiết lỗi và hiển thị thông báo cụ thể
        if (error) {
          Alert.alert("Không tìm thấy đơn hàng lỗi 404", "Vui lòng kiểm tra mã đơn hàng.");
        } else {
          Alert.alert("Lỗi", "Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-800">
        <LoadingDefault />
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-800">
        <Text className="text-gray-500">Không tìm thấy thông tin đơn hàng.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4 py-6 bg-bg-1 dark:bg-gray-800">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-c-bold text-black dark:text-white ml-4 text-center">
          Thanh toán thành công
        </Text>
      </View>

      <View className="mx-auto w-[200px] h-[168px]">
        <Image
          source={require("@/assets/images/noti/cat-1.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Lời cảm ơn */}
      <View className="bg-white dark:bg-pri-6 shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-2">
          Cảm ơn bạn đã đặt hàng!
        </Text>
        <Text className="text-gray-500 dark:text-gray-300">
          Đơn hàng của bạn đã được ghi nhận và sẽ được xử lý sớm nhất. Hãy kiểm tra email hoặc thông
          tin liên hệ để biết thêm chi tiết.
        </Text>
      </View>

      {/* Order Details */}
      <View className="bg-white dark:bg-pri-6 shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-2">
          Thông tin đơn hàng
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Mã đơn hàng: {order.order_id.split(".")[0]}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Ngày đặt hàng: {convertDateTimeToDate(order.createdAt)}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Người nhận: {order.order_buyer?.name}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Số điện thoại: {order.order_buyer?.phone_number}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Địa chỉ:{" "}
          {`${order.order_buyer?.address?.street || " "}, ${
            order.order_buyer?.address?.ward || " "
          }, ${order.order_buyer?.address?.district || " "}, ${
            order.order_buyer?.address?.province || " "
          }`}
        </Text>
      </View>

      {/* Product List */}
      <View className="bg-white dark:bg-pri-6 shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-4">
          Danh sách sản phẩm
        </Text>
        {order.order_products.map((product: any, index: number) => (
          <View key={index} className="flex-row items-center mb-4">
            <Image source={{ uri: product.product_img || "" }} className="w-20 h-20 rounded-md" />
            <View className="ml-4 flex-1">
              <Text
                className={`${
                  colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
                } font-c-semibold mb-1`}
              >
                {product.product_name || "Sản phẩm không xác định"}
              </Text>
              <Text className={`${colorScheme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Phân loại: {product.variant_name || "Không có"}
              </Text>
              <View className="flex flex-row w-full justify-between">
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-rose-400" : "text-rose-500"
                  } font-c-semibold`}
                >
                  {product.unit_price?.toLocaleString() || "0"}đ
                </Text>
                <Text className={`${colorScheme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  x{product.quantity || "1"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Total Section */}
      <View className="bg-white dark:bg-pri-6 rounded-lg p-4 mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 dark:text-gray-300">Tổng tiền hàng</Text>
          <Text className="text-gray-800 dark:text-pri-2">
            {convertNumberToVND(order.final_cost)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 dark:text-gray-300">Phí vận chuyển</Text>
          <Text className="text-gray-800 dark:text-pri-2">
            {convertNumberToVND(order.shipping_cost)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 dark:text-gray-300">Ưu đãi</Text>
          <Text className="text-teal-500 dark:text-pri-3">
            {order.applied_coupons?.length > 0 ? "-15.000đ" : "Không có"}
          </Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-gray-800 dark:text-pri-2 font-c-bold !text-xl">Tổng cộng</Text>
          <Text className="text-teal-500 dark:text-pri-3 font-c-bold !text-xl">
            {convertNumberToVND(order.final_cost)}
          </Text>
        </View>
      </View>

      {/* Order Tracking Section */}
      <View className="bg-white dark:bg-pri-6 shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-4">
          Trạng thái đơn hàng
        </Text>

        {/* Chờ xác nhận */}
        <View className="flex-row items-center mb-2">
          <View
            className={`w-4 h-4 rounded-full mr-4 ${
              order.order_status === "unpaid" ||
              order.order_status === "delivering" ||
              order.order_status === "done"
                ? "bg-teal-500 dark:bg-teal-600"
                : "bg-gray-300"
            }`}
          />
          <Text
            className={`${
              order.order_status === "unpaid"
                ? "text-teal-500 dark:text-pri-3"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Chờ xác nhận
          </Text>
        </View>

        {/* Đang giao hàng */}
        <View className="flex-row items-center mb-2">
          <View
            className={`w-4 h-4 rounded-full mr-4 ${
              order.order_status === "delivering" || order.order_status === "done"
                ? "bg-teal-500"
                : "bg-gray-300"
            }`}
          />
          <Text
            className={`${
              order.order_status === "delivering"
                ? "text-teal-500 dark:text-pri-3"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Đang giao hàng
          </Text>
        </View>

        {/* Đã giao */}
        <View className="flex-row items-center">
          <View
            className={`w-4 h-4 rounded-full mr-4 ${
              order.order_status === "done" ? "bg-teal-500" : "bg-gray-300"
            }`}
          />
          <Text
            className={`${
              order.order_status === "done"
                ? "text-teal-500 dark:text-pri-3"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Đã giao
          </Text>
        </View>
      </View>
      {/* Action Buttons */}
      <View className="mt-6 mb-16">
        {/* Tiếp tục mua sắm */}
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-teal-500 p-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-c-bold">Tiếp tục mua sắm</Text>
        </TouchableOpacity>

        {/* Xem đơn hàng của tôi (Chỉ hiển thị khi có userInfo) */}
        {userInfo && (
          <TouchableOpacity
            onPress={() => router.push("/purchase-history")}
            className="border border-teal-500 bg-white dark:bg-pri-6 p-4 rounded-lg"
          >
            <Text className="text-teal-500 dark:text-pri-3 text-center font-c-bold">
              Xem đơn hàng của tôi
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
