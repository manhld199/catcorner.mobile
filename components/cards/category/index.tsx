import { View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Text } from "@/components/Text";

export default function CardCategory() {
  return (
    <Link href="#" className="w-[30%] flex flex-col items-center justify-start">
      <View className="flex flex-col gap-2">
        {/* Container cho hình ảnh */}
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/db/16/7f/db167f5639b20ed2857ddd862626e24e.jpg",
          }}
          className="w-full aspect-[2/3] rounded-md"
          resizeMode="cover"
        />

        {/* Dòng chữ */}
        <Text className="w-full text-base text-center">Tên danh mục</Text>
      </View>
    </Link>
  );
}
