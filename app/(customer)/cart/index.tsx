import React, { useState } from "react";
import { View, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { ArrowBack, InputQuantityMini } from "@/components";

type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
};

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

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "101",
      name: "Pate cho mèo Royal Canin dành cho mèo con nhỏ không trưởng thành",
      variant: "Silver",
      price: 299000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
    {
      id: "102",
      name: "Jam Tangan Abelle",
      variant: "Rose Gold",
      price: 199000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
    {
      id: "103",
      name: "Pate cho mèo Royal Canin dành cho mèo con nhỏ không trưởng thành",
      variant: "Silver",
      price: 99000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
    {
      id: "104",
      name: "Jam Tangan Abelle",
      variant: "Rose Gold",
      price: 199000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
    {
      id: "105",
      name: "Pate cho mèo Royal Canin dành cho mèo con nhỏ không trưởng thành",
      variant: "Silver",
      price: 299000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
    {
      id: "106",
      name: "Jam Tangan Abelle",
      variant: "Rose Gold",
      price: 199000,
      quantity: 1,
      image:
        "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAscending, setIsAscending] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const confirmDelete = (itemId: string) => {
    setShowDeleteModal(true);
    setItemToDelete(itemId);
  };

  const deleteCartItem = () => {
    if (itemToDelete) {
      setCartItems(cartItems.filter((item) => item.id !== itemToDelete));
      setItemToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const sortItemsByPrice = () => {
    const sortedItems = [...cartItems].sort((a, b) =>
      isAscending ? a.price - b.price : b.price - a.price
    );
    setCartItems(sortedItems);
    setIsAscending(!isAscending);
  };

  const setQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const filteredCartItems = cartItems.filter((item) =>
    removeVietnameseTones(item.name)
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
            className="ml-2 flex-1 text-base placeholder:!text-base"
            placeholder="Tìm sản phẩm trong giỏ hàng..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Actions */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={toggleSelectAll}
          >
            <Ionicons
              name={
                selectedItems.length === cartItems.length
                  ? "checkbox"
                  : "square-outline"
              }
              size={18}
              color="#0F766E"
            />
            <Text className="ml-2 text-gray-800">Chọn tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center px-4 py-2 rounded-md"
            onPress={sortItemsByPrice}
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
              key={item.id}
              className="flex-row items-center px-4 py-4 border-b border-gray-200"
            >
              <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                <Ionicons
                  name={
                    selectedItems.includes(item.id)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={20}
                  color="#0F766E"
                />
              </TouchableOpacity>
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-md ml-4"
              />
              <View className="ml-4 flex-1">
                <Text className="font-c-medium line-clamp-1">{item.name}</Text>
                <Text className="text-gray-500 text-sm">
                  Variant: {item.variant}
                </Text>
                <Text className="text-teal-500 font-c-bold">
                  {(item.price * item.quantity).toLocaleString()}đ
                </Text>
                <InputQuantityMini
                  min={1}
                  max={100}
                  value={item.quantity}
                  onChange={(quantity) => setQuantity(item.id, quantity)}
                />
              </View>
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="red"
                  className="ml-4"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="py-4 bg-white shadow-md rounded-lg mt-4 mb-8">
          <View className="flex-row items-center justify-between px-4 py-2">
            <Text className="font-c-bold text-xl">Tổng cộng</Text>
            <Text className="text-teal-500 font-c-bold text-xl">
              {calculateTotal().toLocaleString()}đ
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
                <Text className="text-gray-800 dark:text-white text-center text-sm">
                  Huỷ
                </Text>
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
