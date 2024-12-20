import React from "react";
import { View, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/Text";
import { IProductProps } from "@/types/interfaces";
import { convertNumberToVND } from "@/utils/functions/convert";

interface ProductCardProps {
  product: IProductProps;
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={
        `/product/${product.product_slug}?pid=${encodeURIComponent(
          product.product_id_hashed
        )}` as any
      }
      className="relative rounded-xl bg-white shadow shadow-gray-200 dark:bg-gray-800 w-[48%] p-4"
    >
      {/* Discount Badge */}
      {product.highest_discount && (
        <View className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded z-10">
          <Text className="text-white text-xs font-c-bold">-{product.highest_discount}%</Text>
        </View>
      )}

      {/* Product Image */}
      <Image
        source={{ uri: product.product_img }}
        alt={product.product_slug}
        className="h-28 w-full object-contain rounded-md mb-2"
      />

      {/* Product Category */}
      <View>
        <Text className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-2">
          {product.category_name}
        </Text>
      </View>

      {/* Product Name */}
      <View>
        <Text
          className="font-c-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.product_name}
        </Text>
      </View>

      {/* Rating and Sold */}
      {/* <View className="flex-row items-center space-x-1 mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons
            key={index}
            name={
              index < (product.product_rating.rating_point ?? 0)
                ? "star"
                : "star-outline"
            }
            size={14}
            color="gold"
          />
        ))}
        <Text className="text-xs text-gray-500">
          ({product.product_sold_quantity} sold)
        </Text>
      </View> */}

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
    </Link>
  );
}
