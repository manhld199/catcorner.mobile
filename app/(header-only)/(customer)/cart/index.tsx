import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, ScrollView, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { ArrowBack, InputQuantityMini } from "@/components";
import { ICartProduct } from "@/types/interfaces";
import { postData } from "@/utils/functions/handle";
import { CART_URL } from "@/utils/constants/urls";

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

  const [cartItems, setCartItems] = useState<ICartProduct[]>([]); // Trạng thái lưu giỏ hàng
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Sản phẩm đã chọn
  const [isAscending, setIsAscending] = useState(true); // Sắp xếp tăng/giảm dần
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Hiển thị modal xóa
  const [itemToDelete, setItemToDelete] = useState<string | null>(null); // Sản phẩm cần xóa
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [defaultCartProducts, setDefaultCartProducts] = useState<ICartProduct[]>([]);

  const cartData: ICartProduct[] = [
    {
      // 660d58878be4c0f5e0b5c36e
      product_id:
        "7Quavw55Cs9o5aZ1209vHubPK78pKBSTqqTKQO3REPoIKbeSymM7A5b3prN9BNYIHRfSyQ367lCfOlgnDQ4qXA==",
      variant_id: "6762d7ad27f4c8a669dfbea0",
      quantity: 100,
    },
    // {
    //   product_id: "660d58878be4c0f5e0b5c3ec",
    //   variant_id: "67069a7d2d723e958da395a1",
    //   quantity: 192,
    // },
    // {
    //   product_id: "6617f0ede1d3208ee924ec1a",
    //   variant_id: "67069a7d2d723e958da395d4",
    //   quantity: 28,
    // },
    // {
    //   product_id: "660d58878be4c0f5e0b5c37e",
    //   variant_id: "67069a7d2d723e958da39592",
    //   quantity: 18,
    // },
    // {
    //   product_id: "6617f0ede1d3208ee924ec72",
    //   variant_id: "67069a7d2d723e958da395e4",
    //   quantity: 57,
    // },
  ];

  // Gọi API khi component được render
  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, message } = await postData(CART_URL, cartData);

      // console.log("aaaaaaaaaaaaaaaaaaaaa", data.data.products);
      setCartProducts(data.data.products as any);
      setDefaultCartProducts(data as any);
    };

    fetchCartItems();
  }, []);

  // console.log("cccccccarrrrrrrrrrrrrrr", cartProducts);

  // Xác nhận xóa sản phẩm
  const confirmDelete = (itemId: string) => {
    setShowDeleteModal(true);
    setItemToDelete(itemId);
  };

  // Xóa sản phẩm
  const deleteCartItem = () => {
    if (itemToDelete) {
      setCartItems(cartItems.filter((item) => item.product_id !== itemToDelete));
      setItemToDelete(null);
      setShowDeleteModal(false);
    }
  };

  // Chọn/bỏ chọn sản phẩm
  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Chọn/bỏ chọn tất cả sản phẩm
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.product_id));
    }
  };

  // Sắp xếp sản phẩm theo giá
  // const sortItemsByPrice = () => {
  //   const sortedItems = [...cartItems].sort((a, b) =>
  //     isAscending
  //       ? a.product_variants[0]?.variant_price -
  //         b.product_variants[0]?.variant_price
  //       : b.product_variants[0]?.variant_price -
  //         a.product_variants[0]?.variant_price
  //   );
  //   setCartItems(sortedItems);
  //   setIsAscending(!isAscending);
  // };

  // Cập nhật số lượng sản phẩm
  const setQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
  };

  // Tính tổng tiền giỏ hàng
  // const calculateTotal = () => {
  //   return cartItems.reduce((total, item) => {
  //     if (selectedItems.includes(item.product_id)) {
  //       return total + item.product_variants[0]?.variant_price * item.quantity;
  //     }
  //     return total;
  //   }, 0);
  // };

  // Lọc sản phẩm theo tìm kiếm
  const filteredCartItems = cartItems.filter((item) =>
    removeVietnameseTones(item.product_name || "")
      .toLowerCase()
      .includes(removeVietnameseTones(searchQuery).toLowerCase())
  );

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

        {/* Actions */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity className="flex-row items-center" onPress={toggleSelectAll}>
            <Ionicons
              name={selectedItems.length === cartItems.length ? "checkbox" : "square-outline"}
              size={18}
              color="#0F766E"
            />
            <Text className="ml-2 text-gray-800">Chọn tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center px-4 py-2 rounded-md"
            // onPress={sortItemsByPrice}
          >
            <Ionicons
              name={isAscending ? "caret-down-outline" : "caret-up-outline"}
              size={14}
              color="#0F766E"
            />
            <Text className="ml-2 text-sm text-teal-600">
              Sắp xếp theo giá {isAscending ? "giảm dần" : "tăng dần"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View className="bg-white rounded-lg shadow-sm">
          {filteredCartItems.map((item) => (
            <View
              key={item.product_id}
              className="flex-row items-center px-4 py-4 border-b border-gray-200"
            >
              <TouchableOpacity onPress={() => toggleSelectItem(item.product_id)}>
                <Ionicons
                  name={selectedItems.includes(item.product_id) ? "checkbox" : "square-outline"}
                  size={20}
                  color="#0F766E"
                />
              </TouchableOpacity>
              {/* <Image
                source={{ uri: item.product_variants[0]?.variant_img || "" }}
                className="w-20 h-20 rounded-md ml-4"
              /> */}
              <View className="ml-4 flex-1">
                <Text className="font-c-medium line-clamp-1">{item.product_name}</Text>
                <Text className="text-gray-500 text-sm">
                  {/* Variant: {item.product_variants[0]?.variant_name} */}
                </Text>
                <Text className="text-teal-500 font-c-bold">
                  {/* {(
                    item.quantity * item.product_variants[0]?.variant_price
                  ).toLocaleString()}
                  đ */}
                </Text>
                <InputQuantityMini
                  min={1}
                  max={100}
                  value={item.quantity}
                  onChange={(quantity) => setQuantity(item.product_id, quantity)}
                />
              </View>
              <TouchableOpacity onPress={() => confirmDelete(item.product_id)}>
                <Ionicons name="trash-outline" size={20} color="red" className="ml-4" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="py-4 bg-white shadow-md rounded-lg mt-4 mb-8">
          <View className="flex-row items-center justify-between px-4 py-2">
            <Text className="font-c-bold text-xl">Tổng cộng</Text>
            <Text className="text-teal-500 font-c-bold text-xl">
              {/* {calculateTotal().toLocaleString()}đ */}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-pri-1 py-3 rounded-md items-center mx-4 mt-2"
            onPress={() => alert("Checkout!")}
          >
            <Text className="text-white font-c-bold">Mua hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-gray-800 w-3/4 rounded-lg p-6">
            <Text className="font-c-bold text-xl mb-4 text-gray-800 dark:text-white">
              Xác nhận xoá
            </Text>
            <Text className="text-gray-500 mb-6">
              Bạn có chắc chắn muốn xoá sản phẩm này không?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                className="bg-gray-300 dark:bg-gray-600 py-3 w-32 rounded-lg"
              >
                <Text className="text-gray-800 dark:text-white text-center text-sm">Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteCartItem}
                className="bg-red-500 py-3 w-32 rounded-lg"
              >
                <Text className="text-white text-center text-sm">Xoá</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
