import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/Text";
import { ICategory } from "@/types/interfaces";

interface ProductCategoryCardProps {
  category: ICategory;
}

export default function ProductCategoryCard({
  category,
}: ProductCategoryCardProps) {
  return (
    <TouchableOpacity
      key={category.category_id_hashed}
      className="rounded-lg pt-2 pb-4 border border-pri-2 mr-4"
      style={{ width: 130 }}
    >
      <Image
        source={{ uri: category.category_img }}
        className="w-full h-24 object-contain mb-2"
      />
      <Text className="text-center font-c-semibold dark:text-white">
        {category.category_name}
      </Text>
    </TouchableOpacity>
  );
}
