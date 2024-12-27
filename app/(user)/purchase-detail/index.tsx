// import React from "react";
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   useColorScheme,
// } from "react-native";
// import { Text } from "@/components/Text";
// import { Ionicons } from "@expo/vector-icons";
// import { ArrowBack } from "@/components";

// export default function PurchaseDetailPage() {
//   const colorScheme = useColorScheme();
//   return (
//     <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
//       {/* Header */}
//       <View className="flex-row items-center mb-6">
//         <ArrowBack />
//         <Text className="text-lg font-c-bold text-black dark:text-white ml-4">
//           Chi tiết đơn hàng
//         </Text>
//       </View>

//       {/* Greeting Section */}
//       <Text className="text-xl font-c-bold mb-2 text-teal-600">
//         Xin chào, Yen Phan!
//       </Text>
//       <Text className="text-gray-500 mb-6">
//         Cảm ơn bạn đã đặt hàng! Hãy theo dõi CatCorner để cập nhật trạng thái
//         đơn hàng của bạn nhé!
//       </Text>

//       {/* Order Details Section */}
//       <View className="bg-white shadow rounded-lg p-4 mb-6">
//         <Text className="text-gray-800 font-c-bold text-lg mb-2">
//           Chi tiết đơn hàng
//         </Text>
//         <Text className="text-gray-500 mb-3">Mã đơn hàng: #ĐH00001</Text>
//         <Text className="text-gray-500 mb-3">Ngày đặt hàng: 25/12/2024</Text>
//         <Text className="text-gray-500 mb-3">Tổng tiền: 123.545đ</Text>
//         <Text className="text-gray-500 mb-3">Địa chỉ: KTX khu B</Text>
//       </View>

//       {/* Product List Section */}
//       <View className="bg-white shadow rounded-lg p-4 mb-6">
//         <Text className="text-gray-800 font-c-bold text-lg mb-4">
//           Đơn hàng #ĐH000000001
//         </Text>

//         {/* Product */}
//         <View className="flex-row items-center mb-2">
//           <Image
//             source={{
//               uri: "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
//             }}
//             className="w-20 h-20 rounded-md"
//           />
//           <View className="ml-4 flex-1">
//             <Text
//               className={`${
//                 colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
//               } font-c-semibold mb-1`}
//               numberOfLines={2}
//             >
//               Pate cho mèo Royal Canin
//             </Text>
//             <Text
//               className={`${
//                 colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               Phân loại: Phân loại 1
//             </Text>
//             <View className="flex flex-row w-full justify-between">
//               <View className="flex-row justify-between items-center gap-2">
//                 <Text
//                   className={`${
//                     colorScheme === "dark" ? "text-gray-500" : "text-gray-400"
//                   } line-through`}
//                 >
//                   1.100.000đ
//                 </Text>
//                 <Text
//                   className={`${
//                     colorScheme === "dark" ? "text-red-300" : "text-rose-500"
//                   } font-c-semibold`}
//                 >
//                   90.000đ
//                 </Text>
//               </View>
//               <Text
//                 className={`${
//                   colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 x1
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Total Section */}
//         <View className="bg-white shadow rounded-lg p-4 mb-6">
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-500">Tổng tiền hàng</Text>
//             <Text className="text-gray-800">1.178.000đ</Text>
//           </View>
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-500">Phí vận chuyển</Text>
//             <Text className="text-gray-800">30.000đ</Text>
//           </View>
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-500">Ưu đãi phí vận chuyển</Text>
//             <Text className="text-teal-500">-15.0000đ</Text>
//           </View>

//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-500">Phiếu giảm giá</Text>
//             <Text className="text-teal-500">-145.0000đ</Text>
//           </View>
//           <View className="flex-row justify-between mt-4">
//             <Text className="text-gray-800 font-c-bold !text-xl">
//               Tổng cộng
//             </Text>
//             <Text className="text-teal-500 font-c-bold !text-xl">
//               1.390.998đ
//             </Text>
//           </View>
//         </View>

//         {/* Order Tracking Section */}
//         <View className="bg-white shadow rounded-lg p-4 mb-6">
//           <Text className="text-gray-800 font-c-bold text-lg mb-4">
//             Trạng thái đơn hàng
//           </Text>
//           <View className="flex-row items-center mb-2">
//             <View className="w-4 h-4 bg-teal-500 rounded-full mr-4" />
//             <Text className="text-gray-800">Chờ xác nhận</Text>
//           </View>
//           <View className="flex-row items-center mb-2">
//             <View className="w-4 h-4 bg-teal-500 rounded-full mr-4" />
//             <Text className="text-teal-500">Đang giao hàng</Text>
//           </View>
//           <View className="flex-row items-center">
//             <View className="w-4 h-4 bg-gray-300 rounded-full mr-4" />
//             <Text className="text-gray-500">Đã giao</Text>
//           </View>
//           {/* <TouchableOpacity className="bg-teal-500 rounded-lg mt-4 p-4">
//             <Text className="text-white text-center font-bold">
//               Track your Order
//             </Text>
//           </TouchableOpacity> */}
//         </View>

//         <View className="bg-white shadow rounded-lg p-4 mb-6">
//           <Text className="text-gray-800 font-c-bold text-lg mb-2">
//             Thông tin thanh toán
//           </Text>
//           <View className="flex-row flex-wrap mb-2">
//             <Text className="text-gray-500">Phương thức thanh toán: </Text>
//             <Text className="text-teal-500 font-c-medium">Smart Banking</Text>
//           </View>
//           <View className="flex-row mb-2">
//             <Text className="text-gray-500">Ngày thanh toán: </Text>
//             <Text className="text-teal-500 font-c-medium">24/12/2024</Text>
//           </View>
//           <View className="flex-row mb-2">
//             <Text className="text-gray-500">Số tiền thanh toán: </Text>
//             <Text className="text-teal-500 font-c-medium">145.0000đ</Text>
//           </View>
//         </View>
//         {/* Payment Details Section */}
//         <View className="bg-white shadow rounded-lg p-4 mb-6">
//           <Text className="text-gray-800 font-c-bold text-lg mb-4">
//             Các thao tác khác
//           </Text>
//           {["In thông tin đơn hàng", "Chat với người bán", "Hỗ trợ"].map(
//             (item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 className="flex-row justify-between items-center py-2 border-b border-gray-200"
//               >
//                 <Text className="text-teal-500">{item}</Text>
//                 <Ionicons
//                   name="chevron-forward-outline"
//                   size={16}
//                   color="gray"
//                 />
//               </TouchableOpacity>
//             )
//           )}
//         </View>

//         {/* Footer */}
//         <View className="items-center">
//           <Text className="text-lg font-c-bold text-gray-800 mb-2">
//             CarCorner - Everything for your cats!
//           </Text>
//           <Text className="text-gray-500 mb-4">CatCorner 2024</Text>
//           <TouchableOpacity className="bg-teal-500 rounded-lg py-4 px-8">
//             <Text className="text-white font-bold">Tiếp tục mua sắm</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
} from "react-native";
import { Text } from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import { ArrowBack } from "@/components";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function PurchaseDetailPage() {
  const colorScheme = useColorScheme();

  const generatePDF = async () => {
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
        <p class="text">Mã đơn hàng: <strong>#ĐH00001</strong></p>
        <p class="text">Ngày đặt hàng: <strong>25/12/2024</strong></p>
        <p class="text">Tổng tiền: <strong>123.545đ</strong></p>
        <p class="text">Địa chỉ giao hàng: <strong>KTX khu B</strong></p>
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
            <tr>
              <td><img src="https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg" alt="Product Image"></td>
              <td>Pate cho mèo Royal Canin</td>
              <td>Phân loại 1</td>
              <td>x1</td>
              <td>90.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <h2 class="section-title">Tổng tiền</h2>
        <p class="text">Tổng tiền hàng: <strong>1.178.000đ</strong></p>
        <p class="text">Phí vận chuyển: <strong>30.000đ</strong></p>
        <p class="text">Ưu đãi phí vận chuyển: <strong>-15.000đ</strong></p>
        <p class="text">Phiếu giảm giá: <strong>-145.000đ</strong></p>
        <p class="total">Tổng cộng: <strong>1.390.998đ</strong></p>
      </div>
    </body>
  </html>
`;

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      if (uri) {
        await Sharing.shareAsync(uri);
        Alert.alert(
          "Thành công",
          "File PDF đã được tạo và sẵn sàng để chia sẻ!"
        );
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo file PDF. Vui lòng thử lại.");
      console.error(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <ArrowBack />
        <Text className="text-lg font-c-bold text-black dark:text-white ml-4">
          Chi tiết đơn hàng
        </Text>
      </View>

      {/* Greeting Section */}
      <Text className="text-xl font-c-bold mb-2 text-teal-600">
        Xin chào, Yen Phan!
      </Text>
      <Text className="text-gray-500 mb-6">
        Cảm ơn bạn đã đặt hàng! Hãy theo dõi CatCorner để cập nhật trạng thái
        đơn hàng của bạn nhé!
      </Text>

      {/* Order Details Section */}
      <View className="bg-white shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 font-c-bold text-lg mb-2">
          Thông tin đơn hàng
        </Text>
        <Text className="text-gray-500 mb-3">Mã đơn hàng: #ĐH00001</Text>
        <Text className="text-gray-500 mb-3">Ngày đặt hàng: 25/12/2024</Text>
        <Text className="text-gray-500 mb-3">Tổng tiền: 123.545đ</Text>
        <Text className="text-gray-500 mb-3">Địa chỉ: KTX khu B</Text>
      </View>
      {/* Product List Section */}
      <View className="bg-white shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 font-c-bold text-lg mb-4">
          Đơn hàng #ĐH000000001
        </Text>

        {/* Product */}
        <View className="flex-row items-center mb-2">
          <Image
            source={{
              uri: "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
            }}
            className="w-20 h-20 rounded-md"
          />
          <View className="ml-4 flex-1">
            <Text
              className={`${
                colorScheme === "dark" ? "text-gray-300" : "text-gray-800"
              } font-c-semibold mb-1`}
              numberOfLines={2}
            >
              Pate cho mèo Royal Canin
            </Text>
            <Text
              className={`${
                colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Phân loại: Phân loại 1
            </Text>
            <View className="flex flex-row w-full justify-between">
              <View className="flex-row justify-between items-center gap-2">
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-gray-500" : "text-gray-400"
                  } line-through`}
                >
                  1.100.000đ
                </Text>
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-red-300" : "text-rose-500"
                  } font-c-semibold`}
                >
                  90.000đ
                </Text>
              </View>
              <Text
                className={`${
                  colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                x1
              </Text>
            </View>
          </View>
        </View>

        {/* Total Section */}
        <View className="bg-white rounded-lg p-4 mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Tổng tiền hàng</Text>
            <Text className="text-gray-800">1.178.000đ</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Phí vận chuyển</Text>
            <Text className="text-gray-800">30.000đ</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Ưu đãi phí vận chuyển</Text>
            <Text className="text-teal-500">-15.0000đ</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Phiếu giảm giá</Text>
            <Text className="text-teal-500">-145.0000đ</Text>
          </View>
          <View className="flex-row justify-between mt-4">
            <Text className="text-gray-800 font-c-bold !text-xl">
              Tổng cộng
            </Text>
            <Text className="text-teal-500 font-c-bold !text-xl">
              1.390.998đ
            </Text>
          </View>
        </View>
      </View>
      {/* Order Tracking Section */}
      <View className="bg-white shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 font-c-bold text-lg mb-4">
          Trạng thái đơn hàng
        </Text>
        <View className="flex-row items-center mb-2">
          <View className="w-4 h-4 bg-teal-500 rounded-full mr-4" />
          <Text className="text-gray-800">Chờ xác nhận</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <View className="w-4 h-4 bg-teal-500 rounded-full mr-4" />
          <Text className="text-teal-500">Đang giao hàng</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-gray-300 rounded-full mr-4" />
          <Text className="text-gray-500">Đã giao</Text>
        </View>
      </View>

      {/* Payment Info */}
      <View className="bg-white shadow rounded-lg p-4 mb-6">
        <Text className="text-gray-800 font-c-bold text-lg mb-2">
          Thông tin thanh toán
        </Text>
        <View className="flex-row flex-wrap mb-2">
          <Text className="text-gray-500">Phương thức thanh toán: </Text>
          <Text className="text-teal-500 font-c-medium">Smart Banking</Text>
        </View>
        <View className="flex-row mb-2">
          <Text className="text-gray-500">Ngày thanh toán: </Text>
          <Text className="text-teal-500 font-c-medium">24/12/2024</Text>
        </View>
        <View className="flex-row mb-2">
          <Text className="text-gray-500">Số tiền thanh toán: </Text>
          <Text className="text-teal-500 font-c-medium">145.0000đ</Text>
        </View>
      </View>

      {/* Print Button */}
      <TouchableOpacity
        className="bg-teal-500 rounded-lg py-4 px-8 mb-12"
        onPress={generatePDF}
      >
        <Text className="text-white font-bold text-center">
          In thông tin đơn hàng
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
