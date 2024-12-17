import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Swiper from "react-native-swiper";
import { Text } from "@/components/Text";
import { getData } from "@/utils/functions/handle";
import { PRODUCT_DETAIL_URL } from "@/utils/constants/urls";
import { IProductDetail, IProductVariant } from "@/types/interfaces";
import { TouchableOpacity } from "react-native";
import { convertNumberToVND } from "@/utils/functions/convert";
import { ChevronRight, Star } from "lucide-react-native";
import { CardCoupon, ModalBottomSheet } from "@/components";

const { width } = Dimensions.get("window");

export default function ProductDetailPage() {
  const { id, pid } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [productData, setProductData] = useState<IProductDetail>();
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [currentVariant, setCurrentVariant] = useState<IProductVariant>();
  const [showCouponModal, setShowCouponModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsProductLoading(true);
        const { data, message } = await getData(
          `${PRODUCT_DETAIL_URL}/${encodeURIComponent((pid as string).replaceAll(" ", "+"))}`
        );
        // console.log("ressssssss", data.data.product);
        setProductData(data.data.product);
        setCurrentVariant(data.data.product.product_variants[0]);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (isProductLoading) return <ActivityIndicator size="large" color="#00bcd4" />;

  return (
    <ScrollView>
      <View className="bg-white py-4">
        {/* Slider Image */}
        <View className="flex-1">
          <Swiper
            autoplay
            loop
            showsPagination={true}
            onIndexChanged={(index) => setCurrentIndex(index + 1)}
            dotStyle={{
              opacity: 0,
            }}
            activeDotStyle={{
              opacity: 0,
            }}
            style={{ height: 250 }}
          >
            {productData?.product_imgs.map((item, index) => (
              <View key={`product img ${index}`} className="items-center justify-center">
                <Image source={{ uri: item }} className="w-full h-full" />
              </View>
            ))}
          </Swiper>

          <View className="absolute bottom-2 right-2 bg-black/60 px-3 py-1 rounded-2xl">
            <Text className="text-white text-sm">
              {currentIndex}/{productData?.product_imgs.length}
            </Text>
          </View>
        </View>

        {/* Variant */}
        <View className="mt-4 px-2 flex-1 flex-row gap-2">
          {productData?.product_variants.map((item, index) => (
            <TouchableOpacity
              key={`product variant img${index}`}
              className={`${
                currentVariant?._id == item._id ? "border-2 rounded-lg border-teal-400" : ""
              }`}
              onPress={() => setCurrentVariant(item)}
            >
              <Image source={{ uri: item.variant_img }} className="w-[60px] h-[60px]" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View className="mt-4 px-2 flex flex-col gap-2">
          {(currentVariant?.variant_discount_percent || 0) > 0 ? (
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-3xl font-c-semibold text-teal-400">
                {convertNumberToVND(
                  ((currentVariant?.variant_price || 0) *
                    (100 - (currentVariant?.variant_discount_percent || 0))) /
                    100
                ) || 0}
              </Text>
              <Text className="text-base line-through text-gray-600">
                {convertNumberToVND(currentVariant?.variant_price || 0)}
              </Text>
              <Text className="text-base text-red-500 px-2 bg-red-100 rounded-lg">
                -{currentVariant?.variant_discount_percent}%
              </Text>
            </View>
          ) : (
            <Text className="text-3xl font-c-semibold text-pri-6">
              {convertNumberToVND(currentVariant?.variant_price || 0)}
            </Text>
          )}
          <Text className="text-xl font-c-medium line-clamp-2">
            {currentVariant?.variant_name} - {productData?.product_name}
          </Text>
          <View className="flex flex-row gap-4 items-start">
            <View className="flex flex-row gap-2 items-center">
              <Star color="#fde047" size={18} fill="#fde047" />
              <Text>
                {productData?.product_avg_rating.rating_point} (
                {productData?.product_avg_rating.rating_count})
              </Text>
            </View>
            <Text className="text-base text-gray-500">|</Text>
            <Text>{productData?.product_sold_quantity} Đã bán</Text>
          </View>
        </View>
      </View>

      <View className="mt-4 py-4 px-2 bg-white flex flex-col gap-4">
        <TouchableOpacity
          className="flex flex-row justify-between items-center"
          onPress={() => setShowCouponModal(true)}
        >
          <Text className="font-c-semibold">Phiếu giảm giá</Text>
          <ChevronRight color="#4b5563" size={16} />
        </TouchableOpacity>

        <View className="flex flex-row gap-2 justify-between">
          <CardCoupon />
          <CardCoupon />
          <CardCoupon />
        </View>
      </View>

      <ModalBottomSheet
        visible={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        title="Danh sách phiếu giảm giá"
      >
        <View className="w-full flex flex-row gap-2 justify-between">
          <CardCoupon />
          <CardCoupon />
          <CardCoupon />
        </View>
      </ModalBottomSheet>
    </ScrollView>
  );
}
