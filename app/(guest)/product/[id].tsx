// import libs
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  ChevronRight,
  MessageCircleMore,
  ShoppingCart,
  Star,
} from "lucide-react-native";
import { WebView } from "react-native-webview";

// import components
import { Text } from "@/components/Text";
import {
  CardCoupon,
  CardReview,
  ModalBottomSheet,
  StarGroup,
} from "@/components";
import PurchaseInfo from "./purchase-info";

// import utils
import { getData } from "@/utils/functions/handle";
import { PRODUCT_DETAIL_URL } from "@/utils/constants/urls";
import { convertNumberToVND } from "@/utils/functions/convert";

// import types
import { IProductDetail, IProductVariant } from "@/types/interfaces";

// import styles
import { injectedCSS } from "./injected-css";
import { CART_PRODUCTS, PURCHASE_PRODUCTS } from "@/utils/constants/variables";
import Toast from "react-native-toast-message";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id, pid } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [productData, setProductData] = useState<IProductDetail>();
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const [currentVariant, setCurrentVariant] = useState<IProductVariant>();
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const [showDesModal, setShowDesModal] = useState<boolean>(false);
  const [showSpeModal, setShowSpeModal] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsProductLoading(true);
        const { data, message } = await getData(
          `${PRODUCT_DETAIL_URL}/${encodeURIComponent(
            ((pid || "") as string).replaceAll(" ", "+")
          )}`
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

  if (isProductLoading)
    return <ActivityIndicator size="large" color="#00bcd4" />;

  return (
    <View className="relative">
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
                <View
                  key={`product img ${index}`}
                  className="items-center justify-center"
                >
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
          <View className="mt-4 px-4 flex-1 flex-row gap-2">
            {(productData?.product_variants || []).map((item, index) => (
              <TouchableOpacity
                key={`product variant img${index}`}
                className={`${
                  currentVariant?._id == item._id
                    ? "border-2 rounded-lg border-teal-400"
                    : ""
                }`}
                onPress={() => setCurrentVariant(item)}
              >
                <Image
                  source={{ uri: item.variant_img }}
                  className="w-[60px] h-[60px]"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Info */}
          <View className="mt-4 px-4 flex flex-col gap-2">
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
                <Text className="text-base text-red-500 px-4 bg-red-100 rounded-lg">
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

        {/* Voucher */}
        <View className="mt-4 py-4 px-4 bg-white flex flex-col gap-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center"
            onPress={() => setShowCouponModal(true)}
          >
            <Text className="font-c-semibold">Phiếu giảm giá</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-base text-gray-600">Xem thêm</Text>
              <ChevronRight color="#4b5563" size={16} />
            </View>
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

        {/* Description */}
        <TouchableOpacity
          className="mt-4 py-4 px-4 bg-white flex flex-col gap-4"
          onPress={() => setShowDesModal(true)}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="font-c-semibold">Mô tả sản phẩm</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-base text-gray-600">Xem thêm</Text>
              <ChevronRight color="#4b5563" size={16} />
            </View>
          </View>

          <View className="w-full h-[200px]">
            <WebView
              originWhitelist={["*"]}
              source={{
                html:
                  productData?.product_description || "<p>No description</p>",
              }}
              className="w-full h-full"
              scalesPageToFit={false}
              injectedJavaScript={injectedCSS}
            />
            <Text className="pl-3">...</Text>
          </View>
        </TouchableOpacity>

        <ModalBottomSheet
          visible={showDesModal}
          onClose={() => setShowDesModal(false)}
          title="Mô tả sản phẩm"
          useScrollView={false}
          modalHeight="h-2/3"
        >
          <WebView
            originWhitelist={["*"]}
            source={{
              html: productData?.product_description || "<p>No description</p>",
            }}
            className="w-full h-full"
            scrollEnabled={true}
            nestedScrollEnabled={true}
            scalesPageToFit={false}
            injectedJavaScript={injectedCSS}
          />
        </ModalBottomSheet>

        {/* Specification */}
        <TouchableOpacity
          className="mt-4 py-4 px-4 bg-white flex flex-col gap-4"
          onPress={() => setShowSpeModal(true)}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="font-c-semibold">Thông số sản phẩm</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-base text-gray-600">Xem thêm</Text>
              <ChevronRight color="#4b5563" size={16} />
            </View>
          </View>

          <View className="w-full flex flex-col gap-2">
            {(productData?.product_specifications || [])
              .slice(0, 3)
              .map((item, index) => (
                <View
                  key={`product spe ${index}`}
                  className={`w-full flex flex-row gap-2 pb-2 ${
                    index == 2
                      ? "border-none"
                      : "border-b-[1px] border-gray-200"
                  }`}
                >
                  <Text className="w-[49%] text-gray-600 font-c-medium">
                    {item.name}
                  </Text>
                  <Text className="w-1/2">{item.value}</Text>
                </View>
              ))}
          </View>
        </TouchableOpacity>

        <ModalBottomSheet
          visible={showSpeModal}
          onClose={() => setShowSpeModal(false)}
          title="Thông số sản phẩm"
        >
          <>
            {(productData?.product_specifications || []).map((item, index) => (
              <View
                key={`product spe ${index}`}
                className={`w-full flex flex-row gap-2 pb-2 ${
                  index ==
                  (productData?.product_specifications || []).length - 1
                    ? "border-none"
                    : "border-b-[1px] border-gray-200"
                }`}
              >
                <Text className="w-1/2 text-gray-600 font-c-medium">
                  {item.name}
                </Text>
                <Text>{item.value}</Text>
              </View>
            ))}
          </>
        </ModalBottomSheet>

        {/* Reviews */}
        <TouchableOpacity
          className="mt-4 py-4 px-4 bg-white flex flex-col gap-4 mb-[112px]"
          onPress={() => setShowReviewModal(true)}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="font-c-semibold">Đánh giá sản phẩm</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-base text-gray-600">Xem thêm</Text>
              <ChevronRight color="#4b5563" size={16} />
            </View>
          </View>

          <View className="flex flex-row gap-2 items-center">
            <StarGroup
              rating={productData?.product_avg_rating.rating_point || 0}
              starSize={18}
            />
            <Text className="text-red-500">
              {productData?.product_avg_rating.rating_point || 0}/5
            </Text>
            <Text className="text-gray-600">
              ({productData?.product_avg_rating.rating_count} đánh giá)
            </Text>
          </View>

          <View className="flex flex-col gap-2">
            <CardReview />
            <CardReview />
            <CardReview />
          </View>
        </TouchableOpacity>

        <ModalBottomSheet
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          modalHeight="h-full"
          useScrollView={false}
          customTitle={
            <View className="mb-3">
              <Text className="text-lg font-c-semibold">Đánh giá sản phẩm</Text>
              <View className="flex flex-row gap-2 items-center">
                <StarGroup
                  rating={productData?.product_avg_rating.rating_point || 0}
                  starSize={18}
                />
                <Text className="text-red-500">
                  {productData?.product_avg_rating.rating_point || 0}/5
                </Text>
                <Text className="text-gray-600">
                  ({productData?.product_avg_rating.rating_count} đánh giá)
                </Text>
              </View>
            </View>
          }
        >
          <ScrollView>
            <View className="mt-2 flex flex-col gap-2">
              <CardReview type={2} />
              <CardReview type={2} />
              <CardReview type={2} />
              <CardReview type={2} />
              <CardReview type={2} />
              <CardReview type={2} />
            </View>
          </ScrollView>
        </ModalBottomSheet>
      </ScrollView>

      {/* App bar */}
      <View className="w-full absolute bottom-[52px] flex flex-row items-center bg-white">
        <TouchableOpacity className="w-1/5 h-[52px] p-2 bg-white flex justify-center items-center">
          <MessageCircleMore color="#315475" size={24} />
        </TouchableOpacity>

        {/* Gio hang */}
        <TouchableOpacity
          className="w-1/5 h-[48px] p-2 bg-white flex justify-center items-center"
          onPress={() => setShowCartModal(true)}
        >
          <ShoppingCart color="#315475" size={24} />
        </TouchableOpacity>

        <PurchaseInfo
          title="Thông tin sản phẩm"
          action={() => {
            Toast.show({
              type: "success",
              text1: "Success!!!",
              text2: "Thêm giỏ hàng thành công.",
            });
            setShowCartModal(false);
          }}
          actionTitle="Thêm vào giỏ hàng"
          currentVariant={currentVariant}
          productVariants={productData?.product_variants || []}
          setCurrentVariant={setCurrentVariant}
          setShowModal={setShowCartModal}
          showModal={showCartModal}
          productId={pid as string}
          storageName={CART_PRODUCTS}
        />

        {/* Mua hang */}
        <TouchableOpacity
          className="w-3/5 h-[48px] p-2 bg-teal-500 flex justify-center items-center"
          onPress={() => setShowBuyModal(true)}
        >
          <Text className="font-c-semibold text-white">Mua ngay</Text>
          <Text className="font-c-semibold text-white">
            {convertNumberToVND(
              currentVariant?.variant_discount_percent
                ? (currentVariant.variant_price *
                    (100 - currentVariant.variant_discount_percent)) /
                    100
                : currentVariant?.variant_price || 0
            )}
          </Text>
        </TouchableOpacity>

        <PurchaseInfo
          title="Thông tin sản phẩm"
          actionTitle="Mua ngay"
          action={() => {
            setShowCartModal(false);
            router.push("/purchase");
          }}
          currentVariant={currentVariant}
          productVariants={productData?.product_variants || []}
          setCurrentVariant={setCurrentVariant}
          setShowModal={setShowBuyModal}
          showModal={showBuyModal}
          productId={pid as string}
          storageName={PURCHASE_PRODUCTS}
        />
      </View>
    </View>
  );
}
