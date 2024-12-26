import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function CustomerHeaderCart() {
  const router = useRouter();

  return (
    <View className="relative">
      {/* Cart */}
      <TouchableOpacity
        className="relative flex text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
        onPress={() => router.push("/cart")}
      >
        <View className="relative flex">
          <ShoppingBag color="white" />
          <View className="absolute bottom-3 right-4 bg-orange-500 text-white text-[6px] font-medium w-6 h-6 flex items-center justify-center rounded-full">
            <Text className="text-xs text-white">12</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
