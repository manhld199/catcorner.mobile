import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { ArrowBack, InputQuantityMini } from "@/components";
import { postData } from "@/utils/functions/handle";
import { CART_URL } from "@/utils/constants/urls";
import { CART_PRODUCTS } from "@/utils/constants/variables";
import { ICartProduct } from "@/types/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm chuyển đổi chuỗi thành không dấu
const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export default function CartPage() {
  const router = useRouter();

  const [cartProducts, setCartProducts] = useState<any[]>([]); // Dữ liệu giỏ hàng
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Sản phẩm đã chọn
  const [isPriceAscending, setIsPriceAscending] = useState(true); // Trạng thái sắp xếp giá

  // Gọi API khi component được render
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const currentStorage = await AsyncStorage.getItem(CART_PRODUCTS);

        const cartData: ICartProduct[] =
          JSON.parse(currentStorage || "{}")?.products || [];

        // console.log("aaaaaaaaaaaaaaaaa", cartData);
        const { data, message } = await postData(CART_URL, cartData);
        // console.log("bbbbbbbbbbbbbbbbbbbb", data.data);
        if (data.data.products) {
          setCartProducts(data.data.products);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu giỏ hàng:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu giỏ hàng.");
      }
    };

    fetchCartItems();
  }, []);

  // Chọn/bỏ chọn sản phẩm
  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Chọn tất cả hoặc bỏ chọn tất cả
  const toggleSelectAll = () => {
    if (selectedItems.length === cartProducts.length) {
      setSelectedItems([]); // Bỏ chọn tất cả
    } else {
      setSelectedItems(
        cartProducts.map((item) => item.product_id + item.variant_id)
      ); // Chọn tất cả
    }
  };

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      if (selectedItems.includes(item.product_id + item.variant_id)) {
        const variant = item.product_variants.find(
          (v: any) => v._id === item.variant_id
        );
        return total + item.quantity * (variant?.variant_price || 0);
      }
      return total;
    }, 0);
  };

  // Lọc sản phẩm theo tìm kiếm
  const filteredCartItems = Array.isArray(cartProducts)
    ? cartProducts
        .filter((item) =>
          removeVietnameseTones(item.product_name || "")
            .toLowerCase()
            .includes(removeVietnameseTones(searchQuery).toLowerCase())
        )
        .sort((a, b) => {
          const priceA = a.product_variants.find(
            (v: any) => v._id === a.variant_id
          )?.variant_price;
          const priceB = b.product_variants.find(
            (v: any) => v._id === b.variant_id
          )?.variant_price;

          return isPriceAscending ? priceA - priceB : priceB - priceA;
        })
    : [];

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <ArrowBack />
          <Text className="text-lg font-c-bold ml-4">Giỏ hàng của tôi</Text>
        </View>

        {/* Search Bar */}
        <View className="mb-4 flex-row items-center p-2">
          <Ionicons name="search-outline" size={20} color="gray" />
          <Input
            className="ml-2 mr-4 flex-1 text-base placeholder:!text-base"
            containerClassName="w-full"
            placeholder="Tìm sản phẩm trong giỏ hàng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Chọn tất cả và Lọc theo giá */}
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={toggleSelectAll}
            className="flex-row items-center"
          >
            <Ionicons
              name={
                selectedItems.length === cartProducts.length
                  ? "checkbox"
                  : "square-outline"
              }
              size={20}
              color="#0F766E"
            />
            <Text className="ml-2 text-base font-c-medium">
              {selectedItems.length === cartProducts.length
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsPriceAscending((prev) => !prev)}
            className="flex-row items-center"
          >
            <Ionicons
              name={
                isPriceAscending ? "caret-up-outline" : "caret-down-outline"
              }
              size={20}
              color="#0F766E"
            />
            <Text className="ml-2 text-base font-c-medium">
              {isPriceAscending ? "Giá: Thấp đến Cao" : "Giá: Cao đến Thấp"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View className="bg-white rounded-lg shadow-sm">
          {filteredCartItems.length > 0 ? (
            filteredCartItems.map((item) => {
              const variant = item.product_variants.find(
                (v: any) => v._id === item.variant_id
              ); // Tìm variant tương ứng với variant_id

              return (
                <View
                  key={item.product_id + item.variant_id}
                  className="flex-row items-center px-4 py-4 border-b border-gray-200"
                >
                  {/* Checkbox chọn sản phẩm */}
                  <TouchableOpacity
                    onPress={() =>
                      toggleSelectItem(item.product_id + item.variant_id)
                    }
                  >
                    <Ionicons
                      name={
                        selectedItems.includes(
                          item.product_id + item.variant_id
                        )
                          ? "checkbox"
                          : "square-outline"
                      }
                      size={20}
                      color="#0F766E"
                    />
                  </TouchableOpacity>

                  {/* Hình ảnh sản phẩm */}
                  <Image
                    source={{
                      uri: variant?.variant_img || "",
                    }}
                    className="w-20 h-20 rounded-md ml-4"
                  />

                  {/* Thông tin sản phẩm */}
                  <View className="ml-4 flex-1">
                    <Text className="font-c-medium line-clamp-1">
                      {item.product_name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      Variant: {variant?.variant_name || "N/A"}
                    </Text>
                    <Text className="text-teal-500 font-c-bold">
                      {(
                        item.quantity * (variant?.variant_price || 0)
                      ).toLocaleString()}
                      đ
                    </Text>
                    <InputQuantityMini
                      min={1}
                      max={variant?.variant_stock_quantity || 100}
                      value={item.quantity}
                      onChange={(quantity) =>
                        setCartProducts((prev) =>
                          prev.map((prod) =>
                            prod.product_id === item.product_id &&
                            prod.variant_id === item.variant_id
                              ? { ...prod, quantity }
                              : prod
                          )
                        )
                      }
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <Text className="text-center py-4">Không có sản phẩm nào.</Text>
          )}
        </View>

        {/* Footer */}
        <View className="py-4 bg-white shadow-md rounded-lg mt-4 mb-8">
          <View className="flex-row items-center justify-between px-4 py-2">
            <Text className="font-c-bold text-xl">Tổng cộng</Text>
            <Text className="text-teal-500 font-c-bold text-xl">
              {calculateTotal().toLocaleString()}đ
            </Text>
          </View>
        </View>
        {/* Footer */}
        <View className="py-4 bg-white shadow-md rounded-lg mt-4 mb-8">
          <TouchableOpacity
            className="mt-4 bg-teal-500 p-3 rounded-lg"
            onPress={async () => {
              const selectedProducts = cartProducts
                .filter((item) =>
                  selectedItems.includes(item.product_id + item.variant_id)
                )
                .map((item) => ({
                  product_hashed_id: item.product_hashed_id,
                  variant_id: item.variant_id,
                  quantity: item.quantity,
                }));

              if (selectedProducts.length === 0) {
                Alert.alert(
                  "Lỗi",
                  "Vui lòng chọn ít nhất một sản phẩm để đặt hàng."
                );
                return;
              }

              try {
                await AsyncStorage.setItem(
                  "PURCHASE_PRODUCTS",
                  JSON.stringify({
                    updatedAt: Date.now(),
                    products: selectedProducts,
                  })
                );
                router.push("/purchase");
              } catch (error) {
                console.error("Lỗi khi lưu sản phẩm vào AsyncStorage:", error);
                Alert.alert("Lỗi", "Không thể tiến hành đặt hàng.");
              }
            }}
          >
            <Text className="text-white font-c-semibold text-center">
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
