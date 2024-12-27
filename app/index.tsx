import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ProductCard from "@/components/cards/product-card";
import { CardCategory, ProductCarousel, ProductCategories } from "@/components";
import { CustomerAppbar, CustomerHeader } from "@/partials";
import { Text } from "@/components/Text";
import { PRODUCT_LIST_NEWEST_URL, RECOMMEND_CATEGORY_URL } from "@/utils/constants/urls";
import { ICategory, IProductProps } from "@/types/interfaces";
import { getData } from "@/utils/functions/handle";

export default function HomeScreen() {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(false); // Loading state
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false); // Loading state
  const images = [
    "https://i.pinimg.com/550x/94/7e/db/947edbbf6ced34863fc8702ed29ef79f.jpg",
    "https://www.thepoetmagazine.org/wp-content/uploads/2024/06/meo-kho-hieu-meme.jpg",
    "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
  ];

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        setIsProductLoading(true);
        const { data, message } = await getData(PRODUCT_LIST_NEWEST_URL);
        // console.log(data);
        if (!data.data) {
          console.error("Lỗi khi lấy sản phẩm mới nhất:", message);
          return;
        }
        setProducts(data.data || []);
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm mới nhất:", error);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const { data, message } = await getData(RECOMMEND_CATEGORY_URL);
        // console.log("ressssssss", data.data);
        setCategories(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <CustomerHeader />

      <ScrollView className="bg-white flex-1 dark:bg-gray-800">
        {/* Carousel */}
        <ProductCarousel images={images} />

        {/* Banner */}
        <View className="mx-4 bg-pri-4 rounded-lg p-4 flex-row justify-between items-center mt-6">
          <View>
            <Text className="font-c-bold text-lg">Today's discount</Text>
            <TouchableOpacity className="mt-2 bg-white px-3 py-1 rounded-lg">
              <Text className="text-gray-800">More</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-12.jpg",
            }}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>

        {/* Danh mục */}
        <View className="mt-6">
          <Text className="mx-4 font-c-bold text-lg dark:text-white">Danh mục sản phẩm</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex-row mx-4 space-x-3"
          >
            {(categories || []).length > 0 ? (
              (categories || []).map((category, index) => (
                <View className="mr-2" key={index}>
                  <CardCategory category={category} className="min-w-[120px] p-2 w-full" />
                </View>
              ))
            ) : (
              <Text className="text-center text-gray-600 dark:text-gray-400">
                Không có danh mục nào.
              </Text>
            )}
          </ScrollView>
        </View>

        {/* Sản phẩm HOT */}
        <View className="mt-6">
          <View className="flex-row justify-between mx-4 mb-2">
            <Text className="font-c-bold text-lg dark:text-white">Sản phẩm mới nhất</Text>
            <TouchableOpacity>
              <Text className="text-teal-700 dark:text-teal-400">Xem thêm</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị trạng thái loading */}
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
      <CustomerAppbar />
    </>
  );
}
