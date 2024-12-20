import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProductCard from "@/components/cards/product-card";
import { ProductCarousel, ProductCategories } from "@/components";
import { CustomerAppbar } from "@/partials";
import { Text } from "@/components/Text";
import { PRODUCT_LIST_NEWEST_URL } from "@/utils/constants/urls";
import { IProductProps } from "@/types/interfaces";
import { getData } from "@/utils/functions/handle";

export default function HomeScreen() {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const images = [
    "https://i.pinimg.com/550x/94/7e/db/947edbbf6ced34863fc8702ed29ef79f.jpg",
    "https://www.thepoetmagazine.org/wp-content/uploads/2024/06/meo-kho-hieu-meme.jpg",
    "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
  ];

  // console.log("API: ", PRODUCT_LIST_NEWEST_URL);
  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        setLoading(true);
        const { data, message } = await getData(PRODUCT_LIST_NEWEST_URL);
        if (!data) {
          console.error("Lỗi khi lấy sản phẩm mới nhất:", message);
          return;
        }
        setProducts(data.products || []);
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm mới nhất:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);

  return (
    <>
      <ScrollView className="bg-white flex-1 dark:bg-zinc-900">
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

        {/* Pet Categories */}
        <View className="mt-6">
          <Text className="mx-4 font-c-bold text-lg dark:text-white">
            Danh mục sản phẩm
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex-row mx-4 space-x-3"
          >
            <ProductCategories />
          </ScrollView>
        </View>

        {/* Sản phẩm HOT */}
        <View className="mt-6">
          <View className="flex-row justify-between mx-4 mb-2">
            <Text className="font-c-bold text-lg dark:text-white">
              Sản phẩm mới nhất
            </Text>
            <TouchableOpacity>
              <Text className="text-teal-700 dark:text-teal-400">Xem thêm</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị trạng thái loading */}
          {loading ? (
            <View className="items-center justify-center py-6">
              <ActivityIndicator size="large" color="#00bfa5" />
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-3 px-4 mb-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.product_id_hashed} // Đảm bảo key là duy nhất
                    product={product}
                  />
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
