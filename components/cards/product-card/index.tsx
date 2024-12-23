import React from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/Text";
import { IProductProps } from "@/types/interfaces";
import { convertNumberToVND } from "@/utils/functions/convert";
import { StarGroup } from "@/components";

interface ProductCardProps {
  product: IProductProps;
}
export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/product/${product.product_slug}?pid=${encodeURIComponent(product.product_id_hashed)}`
        )
      }
      // className="w-[48%] bg-pri-5 dark:bg-pri-7 rounded-md"
      className="rounded-xl bg-white shadow shadow-gray-400 dark:bg-gray-800 w-[48%]"
    >
      <View className="relative w-full p-4 flex flex-col justify-center items-center gap-2">
        {/* Discount Badge */}
        {product.highest_discount && (
          <View className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded z-10">
            <Text className="text-white text-xs font-c-bold">-{product.highest_discount}%</Text>
          </View>
        )}

        {/* <View className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded z-10">
          <Text className="text-white text-xs font-c-bold">-20%</Text>
        </View> */}

        {/* Product Image */}
        {/* Container cho hình ảnh */}
        <View className="w-full aspect-square">
          <Image
            source={{
              uri: "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp",
            }}
            className="w-full h-full rounded-md"
          />
        </View>

        {/* Product Category */}
        <Text className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-2">
          {product.category_name}
        </Text>

        {/* Product Name */}
        <Text className="w-full font-c-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-2">
          {product.product_name}
        </Text>

        {/* Rating and Sold */}
        <View className="w-full flex-row justify-start  items-center space-x-1 mb-2">
          <StarGroup rating={product?.product_rating?.rating_point || 0} starSize={16} />
          {/* {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={index < (product?.product_rating?.rating_point || 0) ? "star" : "star-outline"}
              size={14}
              color="gold"
            />
          ))} */}
          <Text className="text-xs text-gray-500"> ({product.product_sold_quantity} sold)</Text>
        </View>

        {/* Variants */}
        <View className="flex-row flex-wrap gap-1">
          {Array.isArray(product.variant_name) &&
            product.variant_name.length > 1 &&
            product.variant_name.slice(0, 2).map((variant, index) => (
              <Text
                key={index}
                className="px-2 py-1 text-[8px] border border-teal-600 rounded-full text-teal-600"
              >
                {variant}
              </Text>
            ))}
          {Array.isArray(product.variant_name) && product.variant_name.length > 3 && (
            <Text className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">...</Text>
          )}
        </View>

        {/* Price */}
        <View className="flex-row items-center justify-between w-full">
          {product.lowest_price && product.lowest_price !== product.product_price ? (
            <>
              <Text className="text-sm text-gray-500 line-through">
                {convertNumberToVND(product.product_price)}
              </Text>
              <Text className="text-base font-c-bold text-red-600">
                {convertNumberToVND(product.lowest_price)}
              </Text>
            </>
          ) : (
            <Text className="text-base font-c-bold text-red-600">
              {convertNumberToVND(product.product_price)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
