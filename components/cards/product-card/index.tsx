import React from "react";
import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  product: {
    product_id_hashed: string;
    product_slug: string;
    product_imgs: string[];
    highest_discount?: number;
    category_name: string;
    product_name: string;
    variant_name: string[];
    lowest_price?: number;
    product_price: number;
    rating?: number;
    sold_quantity?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href="/#"
      className="relative rounded-xl bg-white shadow shadow-gray-200 dark:bg-gray-800 w-[48%] p-4"
    >
      {/* Discount Badge */}
      {product.highest_discount && (
        <View className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded z-10">
          <Text className="text-white text-xs font-bold">
            -{product.highest_discount}%
          </Text>
        </View>
      )}

      {/* Product Image */}
      <Image
        source={{ uri: product.product_imgs[0] }}
        alt={product.product_slug}
        className="h-28 w-full object-contain rounded-md mb-2"
      />

      {/* Product Category */}
      <View>
        <Text className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start mb-2">
          {product.category_name}
        </Text>
      </View>

      {/* Product Name */}
      <View>
        <Text
          className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.product_name}
        </Text>
      </View>

      {/* Rating and Sold */}
      <View className="flex-row items-center space-x-1 mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons
            key={index}
            name={index < (product.rating ?? 0) ? "star" : "star-outline"}
            size={14}
            color="gold"
          />
        ))}
        <Text className="text-xs text-gray-500">
          ({product.sold_quantity} sold)
        </Text>
      </View>

      {/* Variants */}
      <View className="flex-row flex-wrap gap-1 my-2">
        {product.variant_name.slice(0, 2).map((variant, index) => (
          <Text
            key={index}
            className="px-2 py-1 text-[8px] border border-teal-600 rounded-full text-teal-600"
          >
            {variant}
          </Text>
        ))}
        {product.variant_name.length > 3 && (
          <Text className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
            ...
          </Text>
        )}
      </View>

      {/* Price */}
      <View className="flex-row items-center justify-between w-ful">
        {product.lowest_price &&
        product.lowest_price !== product.product_price ? (
          <>
            <Text className="text-sm text-gray-500 line-through">
              {product.product_price.toLocaleString()}đ
            </Text>
            <Text className="text-base font-bold text-red-600">
              {product.lowest_price.toLocaleString()}đ
            </Text>
          </>
        ) : (
          <Text className="text-base font-bold text-red-600">
            {product.product_price.toLocaleString()}đ
          </Text>
        )}
      </View>
    </Link>
  );
}
