import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { Text } from "@/components/Text";
import { getData } from "@/utils/functions/handle";
import { ICategory, IProductProps } from "@/types/interfaces";
import { ALL_CATEGORIES_URL, PRODUCT_CATEGORIES_URL } from "@/utils/constants/urls";
import ProductCard from "@/components/cards/product-card";

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  // console.log("iddddddddddddddddddddddddd", id);

  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProductProps[]>();
  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    const fetchProductAndCategory = async () => {
      try {
        setIsProductLoading(true);
        const { data, message } = await getData(
          `${PRODUCT_CATEGORIES_URL}/${encodeURIComponent(
            ((id || "") as string).replaceAll(" ", "+")
          )}`
        );
        const { data: cateData, message: cateMessage } = await getData(
          `${ALL_CATEGORIES_URL}/${encodeURIComponent(((id as string) || "").replaceAll(" ", "+"))}`
        );
        // console.log("dataaaaaaaaaaa", data.data);
        // console.log("dataaaaaaaaaaa", cateData.data);

        setProducts(data.data);
        setCategory(cateData.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProductAndCategory();
  }, []);

  // console.log("products", products);

  return (
    <ScrollView>
      <View className="p-4 flex flex-col items-center gap-4 bg-white dark:bg-gray-800">
        <Text className="font-c-semibold text-2xl">Sản phẩm theo danh mục</Text>
        <View className="p-4 mx-auto w-[200px] aspect-square bg-teal-100 rounded-xl overflow-hidden">
          <Image
            source={{ uri: category?.category_img || "" }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text className="font-c-semibold text-xl text-pri-6 dark:text-pri-2">
          {category?.category_name}
        </Text>

        <View className="w-4/5 h-[1px] bg-gray-200"></View>

        {isProductLoading ? (
          <View className="items-center justify-center py-6">
            <ActivityIndicator size="large" color="#00bfa5" />
          </View>
        ) : (
          <View className="w-full flex flex-row flex-wrap justify-between gap-y-4 gap-x-2 px-4">
            {(products || []).length > 0 ? (
              (products || []).map((product) => (
                <ProductCard key={product.product_id_hashed} product={product} />
              ))
            ) : (
              <Text className="text-center text-gray-600 dark:text-gray-400">
                Không có sản phẩm nào.
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
