import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const categories = [
  {
    id: 1,
    name: "Hạt dinh dưỡng",
    image:
      "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_256/f_auto/q_auto/v1734531549/catcorner/products/aak9xe2t5n7chyskmi5f?_a=BAVAZGDW0", // Link ảnh cho Cá ngừ
  },
  {
    id: 2,
    name: "Cát vệ sinh",
    image:
      "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_256/f_auto/q_auto/v1734531548/catcorner/products/bprsqxnfsaxmuktvmhhy?_a=BAVAZGDW0", // Link ảnh cho Thịt gà
  },
  {
    id: 3,
    name: "Hạt dinh dưỡng",
    image:
      "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_256/f_auto/q_auto/v1734531549/catcorner/products/aak9xe2t5n7chyskmi5f?_a=BAVAZGDW0", // Link ảnh cho Cá ngừ
  },
  {
    id: 4,
    name: "Cát vệ sinh",
    image:
      "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_256/f_auto/q_auto/v1734531548/catcorner/products/bprsqxnfsaxmuktvmhhy?_a=BAVAZGDW0", // Link ảnh cho Thịt gà
  },
];

export default function ProductCategories() {
  return (
    <View className="flex-row gap-4">
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          className="rounded-lg py-4 border border-pri-2"
          style={{ width: 130 }}
        >
          <Image
            source={{ uri: category.image }}
            className="w-full h-24 object-contain mb-2"
          />
          <Text className="text-center font-bold dark:text-white">
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
