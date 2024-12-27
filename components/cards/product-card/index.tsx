import React, { Fragment } from "react";
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
      className="rounded-lg bg-white shadow shadow-gray-400 dark:bg-pri-6 w-[48%]"
    >
      <View className="relative w-full p-2 flex flex-col justify-center gap-2">
        {/* Discount Badge */}
        {(product.highest_discount || 0) > 0 && (
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
              // uri: "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp",
              uri:
                product.product_img ||
                "https://dogily.vn/wp-content/swift-ai/images/wp-content/uploads/2021/08/tuoi-tho-meo-munchkin-jpg.webp",
            }}
            className="w-full h-full rounded-md"
          />
        </View>

        {/* Product Category */}
        <Text className="text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-teal-600 px-2 py-1 rounded-full self-start mb-2">
          {product.category_name}
        </Text>

        {/* Product Name */}
        <Text className="w-full font-c-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
          {product.product_name}
        </Text>

        {/* Rating and Sold */}
        <View className="w-full flex-row justify-start  items-center space-x-1 mb-2">
          <StarGroup rating={product?.product_rating?.rating_point || 5} starSize={18} />
          {/* {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={index < (product?.product_rating?.rating_point || 0) ? "star" : "star-outline"}
              size={14}
              color="gold"
            />
          ))} */}
          <Text className="text-sm text-gray-600 dark:text-white">
            {" "}
            ({product.product_sold_quantity} sold)
          </Text>
        </View>

        {/* Variants */}
        {/* <View className="flex-row flex-wrap gap-1">
          {Array.isArray(product.variant_name) &&
            product.variant_name.length > 1 &&
            product.variant_name.slice(0, 2).map((variant, index) => (
              <Text
                key={index}
                className="px-2 py-1 text-xs border border-teal-600 dark:border-teal-400 rounded-full text-teal-600 dark:text-teal-400"
              >
                {variant}
              </Text>
            ))}
          {Array.isArray(product.variant_name) && product.variant_name.length > 3 && (
            <Text className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:text-white rounded-full">
              ...
            </Text>
          )}
        </View> */}

        {/* Price */}
        <View className="mt-4 flex-row items-center justify-between w-full">
          {product.lowest_price && product.lowest_price !== product.product_price ? (
            <Fragment>
              <Text className="text-sm text-gray-600 dark:text-white line-through">
                {convertNumberToVND(product.product_price)}
              </Text>
              <Text className="text-lg font-c-bold text-red-600 dark:text-red-500">
                {convertNumberToVND(product.lowest_price)}
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text></Text>
              <Text className="text-lg font-c-bold text-red-600 dark:text-red-500">
                {convertNumberToVND(product.product_price)}
              </Text>
            </Fragment>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
