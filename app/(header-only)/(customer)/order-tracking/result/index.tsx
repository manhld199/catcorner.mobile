import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text } from "@/components/Text";
import { ArrowBack, ArrowBackFix, LoadingDefault } from "@/components";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";
import { TRACK_ORDER_URL } from "@/utils/constants/urls";
import { getData } from "@/utils/functions/handle";
import * as FileSystem from "expo-file-system";
import { convertDateTimeToDate } from "@/utils/functions/convert";

export default function OrderTrackingResultPage() {
  const colorScheme = useColorScheme();
  const { orderId, phoneNumber } = useLocalSearchParams(); // Nhận orderId và phoneNumber
  const [order, setOrder] = useState<any>(null); // Trạng thái để lưu thông tin đơn hàng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu

  // Gọi API để lấy dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId || !phoneNumber) {
          Alert.alert("Lỗi", "Mã đơn hàng và số điện thoại không hợp lệ.");
          setLoading(false);
          return;
        }

        const query = `?order_id=${orderId}&phone_number=${phoneNumber}`;
        const { data } = await getData(`${TRACK_ORDER_URL}${query}`);
        // console.log("data", data);

        if (!data || !data.data.order) {
          Alert.alert("Không tìm thấy đơn hàng", "Vui lòng thử lại sau.");
          setOrder(null);
        } else {
          setOrder(data.data.order); // Gán dữ liệu từ API
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, phoneNumber]);

  const generatePDF = async () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}_${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}_${currentDate.getDate().toString().padStart(2, "0")}`;
    const fileName = `Order_${orderId}_${formattedDate}.pdf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 0;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            color: teal;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 20px;
            color: #555;
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
            border-bottom: 2px solid teal;
            padding-bottom: 5px;
          }
          .text {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 8px;
            color: #444;
          }
          .product-list {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          .product-list th, .product-list td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            font-size: 18px;
          }
          .product-list th {
            background-color: teal;
            color: white;
          }
          .product-list td img {
            width: 80px;
            height: 80px;
            border-radius: 8px;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
            color: teal;
            text-align: right;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Chi tiết đơn hàng</h1>
          <p class="subtitle">Cảm ơn bạn đã đặt hàng tại CatCorner!</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Thông tin đơn hàng</h2>
          <p class="text">Mã đơn hàng: <strong>#${orderId}</strong></p>
          <p class="text">Ngày đặt hàng: <strong>${new Date(
            order.createdAt
          ).toLocaleDateString()}</strong></p>
          <p class="text">Tổng tiền: <strong>${order.final_cost?.toLocaleString()}đ</strong></p>
          <p class="text">Người nhận hàng: <strong>${
            order.order_buyer?.name
          }</strong></p>
          <p class="text">Số điện thoại người nhận: <strong>${
            order.order_buyer?.phone_number
          }</strong></p>
          <p class="text">
            Địa chỉ giao hàng: <strong>
            ${order.order_buyer?.address?.street || " "}, 
            ${order.order_buyer?.address?.ward || " "}, 
            ${order.order_buyer?.address?.district || " "}, 
            ${order.order_buyer?.address?.province || " "}
            </strong>
          </p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Danh sách sản phẩm</h2>
          <table class="product-list">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Phân loại</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              ${order.order_products
                .map(
                  (product: any) => `
                <tr>
                  <td>
                    <img src="${
                      product.product_img || ""
                    }" alt="Product Image" />
                  </td>
                  <td>${product.product_name || "Không xác định"}</td>
                  <td>${product.variant_name || "Không có"}</td>
                  <td>x${product.quantity || 1}</td>
                  <td>${product.unit_price?.toLocaleString() || "0"}đ</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2 class="section-title">Tổng tiền</h2>
          <p class="text">Tổng tiền hàng: <strong>${order.total_products_cost?.toLocaleString()}đ</strong></p>
          <p class="text">Phí vận chuyển: <strong>${order.shipping_cost?.toLocaleString()}đ</strong></p>
          <p class="text">Ưu đãi: <strong>${
            order.applied_coupons?.length > 0 ? "-15.000đ" : "Không có"
          }</strong></p>
          <p class="total">Tổng cộng: <strong>${order.final_cost?.toLocaleString()}đ</strong></p>
        </div>
      </body>
    </html>
    `;

    try {
      // Tạo file PDF tạm thời
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Đổi tên file và lưu vào đường dẫn
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Chia sẻ file PDF
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/pdf",
        dialogTitle: "Lưu file PDF",
        UTI: "com.adobe.pdf", // Đảm bảo lưu file đúng loại PDF
      });

      Alert.alert("Thành công", `File PDF "${fileName}" đã được tạo!`);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo file PDF. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-bg-1 dark:bg-gray-800">
        <LoadingDefault />
      </View>
    );
  }

  if (!order || !order.order_products || order.order_products.length === 0) {
    return (
      <>
        <ArrowBackFix />
        <View className="flex-1 justify-center items-center bg-bg-1 dark:bg-gray-800">
          <Text className="text-gray-500 dark:text-gray-300">
            Không tìm thấy thông tin đơn hàng.
          </Text>
        </View>
      </>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bg-1 dark:bg-gray-800 px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <ArrowBack />
        <Text className="text-lg font-c-bold text-black dark:text-white ml-4">
          Đơn hàng #{orderId}
        </Text>
      </View>

      {/* Order Details */}
      <View className="shadow rounded-lg p-4 mb-6 bg-white dark:bg-pri-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-2">
          Thông tin đơn hàng
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Mã đơn hàng: {orderId}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Ngày đặt hàng: {convertDateTimeToDate(order.createdAt)}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Người nhận hàng: {order.order_buyer?.name || " "}
        </Text>
        <Text className="text-gray-500 dark:text-gray-300 mb-3">
          Số điện thoại: {order.order_buyer?.phone_number || " "}
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
            <Image
              source={{ uri: product.product_img || "" }}
              className="w-20 h-20 rounded-md"
            />
            <View className="ml-4 flex-1">
              <Text
                className={`${
                  colorScheme === "dark"
                    ? "text-gray-300"
                    : "text-gray-800 dark:text-pri-2"
                } font-c-semibold mb-1`}
              >
                {product.product_name || "Sản phẩm không xác định"}
              </Text>
              <Text
                className={`${
                  colorScheme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Phân loại: {product.variant_name || "Không có"}
              </Text>
              <View className="flex flex-row w-full justify-between">
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-rose-300" : "text-rose-500"
                  } font-c-semibold`}
                >
                  {product.unit_price?.toLocaleString() || "0"}đ
                </Text>
                <Text
                  className={`${
                    colorScheme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500 dark:text-gray-300"
                  }`}
                >
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
          <Text className="text-gray-500 dark:text-gray-300">
            Tổng tiền hàng
          </Text>
          <Text className="text-gray-800 dark:text-pri-2">
            {order.total_products_cost?.toLocaleString()}đ
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 dark:text-gray-300">
            Phí vận chuyển
          </Text>
          <Text className="text-gray-800 dark:text-pri-2">
            {order.shipping_cost?.toLocaleString()}đ
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 dark:text-gray-300">Ưu đãi</Text>
          <Text className="text-teal-500">
            {order.applied_coupons?.length > 0 ? "-15.000đ" : "Không có"}
          </Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-gray-800 dark:text-pri-2 font-c-bold !text-xl">
            Tổng cộng
          </Text>
          <Text className="text-teal-500 font-c-bold !text-xl">
            {order.final_cost?.toLocaleString()}đ
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
                ? "bg-teal-500"
                : "bg-gray-300"
            }`}
          />
          <Text
            className={`${
              order.order_status === "unpaid"
                ? "text-teal-500"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Chờ xác nhận
          </Text>
        </View>

        {/* Đang giao hàng */}
        <View className="flex-row items-center mb-2">
          <View
            className={`w-4 h-4 rounded-full mr-4 ${
              order.order_status === "delivering" ||
              order.order_status === "done"
                ? "bg-teal-500"
                : "bg-gray-300"
            }`}
          />
          <Text
            className={`${
              order.order_status === "delivering"
                ? "text-teal-500"
                : "text-gray-500 dark:text-gray-300"
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
                ? "text-teal-500"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Đã giao
          </Text>
        </View>
      </View>

      {/* Payment Info */}
      <View className="bg-white dark:bg-pri-6 shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 dark:text-pri-2 font-c-bold text-lg mb-2">
          Thông tin thanh toán
        </Text>
        {order.order_status === "unpaid" ? (
          <Text className="text-gray-500 dark:text-gray-300">
            Chưa có thông tin thanh toán.
          </Text>
        ) : (
          <>
            <View className="flex-row flex-wrap mb-2">
              <Text className="text-gray-500 dark:text-gray-300">
                Phương thức thanh toán:{" "}
              </Text>
              <Text className="text-teal-500 font-c-medium">Smart Banking</Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 dark:text-gray-300">
                Ngày thanh toán:{" "}
              </Text>
              <Text className="text-teal-500 font-c-medium">
                {convertDateTimeToDate(order.updatedAt)}
              </Text>
            </View>
            <View className="flex-row mb-2">
              <Text className="text-gray-500 dark:text-gray-300">
                Số tiền thanh toán:{" "}
              </Text>
              <Text className="text-teal-500 font-c-medium">
                {order.final_cost?.toLocaleString()}đ
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Print Button */}
      <TouchableOpacity
        className="bg-teal-500 rounded-lg py-4 px-8 mb-12"
        onPress={generatePDF}
      >
        <Text className="text-white font-c-bold text-center">
          In thông tin đơn hàng
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
