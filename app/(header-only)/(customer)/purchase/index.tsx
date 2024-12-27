// import libs
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Link, useRouter } from "expo-router";
import {
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  MinusCircle,
  ShieldCheck,
  TicketMinus,
  UserRound,
  WalletMinimal,
} from "lucide-react-native";

// Import components
import { Text } from "@/components/Text";
import { CardCoupon, CardProductOrder, ModalBottomSheet, SelectAddress } from "@/components";
import { Textarea } from "@/components/Textarea";
import { Input } from "@/components/Input";

// import types
import { IAddress, IProductOrder, IPurchaseProduct } from "@/types/interfaces";

// import providers
import { AuthContext } from "@/providers";

// import utils
import { PAYMENT_PRODUCTS, PURCHASE_PRODUCTS, SHIPPING_COST } from "@/utils/constants/variables";
import { postData } from "@/utils/functions/handle";
import { PRODUCT_ORDER_URL } from "@/utils/constants/urls";
import { convertNumberToVND } from "@/utils/functions/convert";

export default function PurchasePage() {
  const router = useRouter();
  const { userInfo } = useContext(AuthContext) || { userInfo: null };

  const [purchaseProducts, setPurchaseProducts] = useState<IPurchaseProduct[]>([]);
  const [orderProducts, setOrderProducts] = useState<IProductOrder[]>([]);
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showMethodModal, setShowMethodModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(
    (userInfo && userInfo.user_name ? userInfo.user_name : "") as string
  );
  const [userPhone, setUserPhone] = useState<string>(
    (userInfo && userInfo.user_phone_number ? userInfo.user_phone_number : "") as string
  );
  // console.log("userPhone", userPhone, typeof userPhone, userInfo);
  const [userAddress, setUserAddress] = useState<IAddress>(
    (userInfo && userInfo.user_address
      ? userInfo.user_address[0]
      : {
          province: "",
          district: "",
          ward: "",
          street: "",
        }) as IAddress
  );
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "onl">("onl");
  const [note, setNote] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    const getPurchaseProducts = async () => {
      try {
        const storageData = await AsyncStorage.getItem(PURCHASE_PRODUCTS);

        if (storageData) {
          const parsedData = JSON.parse(storageData);
          await AsyncStorage.removeItem(PURCHASE_PRODUCTS);

          if (parsedData?.updatedAt) {
            const currentTime = Date.now();
            const timeElapsed = Math.floor((currentTime - parsedData.updatedAt) / 1000);
            const remainingTime = timeLeft - timeElapsed;

            if (remainingTime <= 0) {
              // Hết thời gian
              await AsyncStorage.removeItem(PURCHASE_PRODUCTS);
              Toast.show({
                type: "error",
                text1: "Oops!!!",
                text2: "Phiên thanh toán đã quá hạn, vui lòng thử lại sau!",
              });
              router.back();
              return;
            }

            setTimeLeft(remainingTime); // Cập nhật thời gian còn lại
            setPurchaseProducts(parsedData.products || []);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ AsyncStorage:", error);
      }
    };

    getPurchaseProducts();
  }, [router]);

  // Đếm ngược thời gian
  useEffect(() => {
    const interval = setInterval(async () => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Hết thời gian
          (async () => {
            await AsyncStorage.removeItem(PURCHASE_PRODUCTS);
            Toast.show({
              type: "error",
              text1: "Oops!!!",
              text2: "Phiên thanh toán đã quá hạn, vui lòng thử lại sau!",
            });
            clearInterval(interval);
            router.back();
          })();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, []);

  useEffect(() => {
    const getOrderProducts = async () => {
      try {
        if (purchaseProducts.length === 0) return;

        const { data } = await postData(PRODUCT_ORDER_URL, purchaseProducts);
        if (!data) {
          Toast.show({
            type: "error",
            text1: "Oops!!!",
            text2: "Có sự cố đã xảy ra, vui lòng thử lại sau!",
          });
          return;
        }
        setOrderProducts(data.data.products);
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    getOrderProducts();
  }, [purchaseProducts]);

  const handlePayment = async () => {
    try {
      // Kiểm tra các trường bắt buộc
      if (!userName.trim()) {
        Toast.show({
          type: "error",
          text1: "Lỗi!!!",
          text2: "Vui lòng nhập họ và tên người nhận.",
        });
        return;
      }

      if (!userPhone.trim()) {
        Toast.show({
          type: "error",
          text1: "Lỗi!!!",
          text2: "Vui lòng nhập số điện thoại người nhận.",
        });
        return;
      }

      if (
        !userAddress.province.trim() ||
        !userAddress.district.trim() ||
        !userAddress.ward.trim() ||
        !userAddress.street.trim()
      ) {
        Toast.show({
          type: "error",
          text1: "Lỗi!!!",
          text2: "Vui lòng cung cấp đầy đủ địa chỉ người nhận.",
        });
        return;
      }

      // Xóa dữ liệu PAYMENT_PRODUCTS cũ
      await AsyncStorage.removeItem(PAYMENT_PRODUCTS);
      // console.log("Đã xóa PAYMENT_PRODUCTS cũ");

      const orderId = `DH${Date.now()}${
        userInfo ? `.${userInfo.user_id}` : `.guest${userPhone}_${Math.round(Math.random() * 1000)}`
      }`;

      // Chuẩn bị dữ liệu mới để lưu
      const newPaymentData = {
        order_id: orderId,
        user_id: userInfo ? userInfo.user_id : undefined,
        order_products: orderProducts.map((product) => ({
          product_hashed_id: product.product_hashed_id,
          variant_id: product.product_variant._id,
          quantity: product.quantity,
          unit_price: product.product_variant.variant_price,
          discount_percent: product.product_variant.variant_discount_percent,
        })),
        order_buyer: {
          name: userName,
          phone_number: userPhone,
          address: userAddress,
        },
        order_note: note == "" ? undefined : note,
        shipping_cost: SHIPPING_COST,
        payment_method: paymentMethod,
        cancel_url: "catcorner://purchase-history?selectedTab=unpaid",
        return_url: `catcorner://order-success?orderId=${encodeURIComponent(orderId)}`,
      };

      // console.log("newPaymentData", newPaymentData);

      // Lưu lại PAYMENT_PRODUCTS mới
      await AsyncStorage.setItem(PAYMENT_PRODUCTS, JSON.stringify(newPaymentData));
      // console.log("Đã lưu PAYMENT_PRODUCTS mới:", newPaymentData);

      router.push("/payment");
    } catch (error) {
      console.error("Lỗi trong handlePayment:", error);
    }
  };

  // console.log("purchaseProducts", purchaseProducts);
  // console.log("orderProducts", orderProducts);
  // console.log("userInfo", userInfo);

  return (
    <View className="bg-bg-1 dark:bg-gray-800 relative">
      <ScrollView>
        {/* Product */}
        <View className="mt-4 p-4 flex flex-col gap-4 bg-white dark:bg-zinc-900 ">
          <Text className="font-c-semibold">Sản phẩm</Text>

          {orderProducts.map((product, index) => (
            <CardProductOrder key={`order product ${index}`} product={product} />
          ))}
          <View className="px-4 border-b-[1px] border-gray-100"></View>

          <View className="flex flex-row justify-between">
            <Text>
              Tổng số tiền ({orderProducts.reduce((acc, curr) => acc + curr.quantity, 0)} sản phẩm)
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-base text-gray-600 dark:text-gray-400 line-through">
                {convertNumberToVND(
                  orderProducts.reduce(
                    (acc, curr) => acc + curr.quantity * curr.product_variant.variant_price,
                    0
                  )
                )}
              </Text>
              <Text className="text-xl text-teal-600 dark:text-teal-400 font-c-bold">
                {convertNumberToVND(
                  orderProducts.reduce(
                    (acc, curr) =>
                      acc +
                      (curr.product_variant.variant_price *
                        curr.quantity *
                        (100 - (curr.product_variant.variant_discount_percent || 0))) /
                        100,
                    0
                  )
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View className="mt-4 p-4 bg-white dark:bg-zinc-900 flex flex-col gap-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center"
            onPress={() => setShowAddressModal(true)}
          >
            <View className="flex flex-col gap-2">
              <View className="w-full flex flex-row justify-between">
                <Text className="font-c-semibold">Thông tin người nhận</Text>
                <View className="flex flex-row gap-1 items-center">
                  <Text className="text-base text-gray-600 dark:text-gray-400">Chỉnh sửa</Text>
                  <ChevronRight color="#4b5563" size={16} />
                </View>
              </View>

              <View className="w-full flex flex-col gap-2">
                <View className="flex flex-row gap-2 items-center">
                  {(userName != "" || userPhone != "") && (
                    <UserRound color="#5eead4" fill="#5eead4" size={24} />
                  )}
                  {userName != "" && <Text className="font-c-medium">{userName}</Text>}

                  {userPhone != "" && (
                    <React.Fragment>
                      <Text>-</Text>
                      <Text className="text-gray-600 dark:text-gray-400">{userPhone}</Text>
                    </React.Fragment>
                  )}
                </View>

                {(userAddress.district != "" ||
                  userAddress.province != "" ||
                  userAddress.street != "" ||
                  userAddress.ward != "") && (
                  <Text className="line-clamp-2 text-base">
                    {Object.keys(userAddress).map((key, index) =>
                      (userAddress as any)[key]
                        ? index == 0
                          ? (userAddress as any)[key]
                          : ", " + (userAddress as any)[key]
                        : ""
                    )}
                    {/* {userAddress.province}, {userAddress.district}, {userAddress.ward},{" "}
                    {userAddress.street} */}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-4 border-b-[1px] border-gray-100"></View>

        {/* User info */}
        <ModalBottomSheet
          visible={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          title="Thông tin người nhận"
        >
          <View className="flex flex-col gap-2">
            <View className="flex flex-col gap-2">
              <Text>Họ và tên</Text>
              <Input
                placeholder="Nhập tên người nhận hàng"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text>Số điện thoại</Text>
              <Input
                placeholder="Nhập số điện thoại người nhận hàng"
                value={userPhone}
                onChangeText={setUserPhone}
              />
            </View>
            <View className="flex flex-col gap-2">
              <SelectAddress value={userAddress} onChange={setUserAddress} />
            </View>
          </View>
        </ModalBottomSheet>

        {/* Voucher */}
        <View className="p-4 bg-white dark:bg-zinc-900 flex flex-col gap-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center"
            onPress={() => setShowCouponModal(true)}
          >
            <Text className="font-c-semibold">Phiếu giảm giá</Text>
            <View className="flex flex-row gap-1 items-center">
              <View className="flex flex-row gap-2 items-center">
                <TicketMinus color="#ef4444" size={18} />
                <Text className="text-red-500">{convertNumberToVND(100998.5)}</Text>
              </View>
              <ChevronRight color="#4b5563" size={16} />
            </View>
          </TouchableOpacity>
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
        <View className="px-4 border-b-[1px] border-gray-100"></View>

        {/* Note */}
        <View className="p-4 bg-white dark:bg-zinc-900 flex flex-col gap-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center"
            onPress={() => setShowNoteModal(true)}
          >
            <Text className="font-c-semibold">Ghi chú</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-base text-gray-600 dark:text-gray-400">Để lại ghi chú</Text>
              <ChevronRight color="#4b5563" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        <ModalBottomSheet
          visible={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          title="Ghi chú"
          modalHeight="h-1/3"
        >
          <Textarea
            placeholder="Để lại ghi chú cho chúng mình nhé!"
            onChangeText={setNote}
            className="placeholder:text-lg"
            autoFocus={true}
          />
        </ModalBottomSheet>

        {/* Payment method */}
        <View className="mt-4 p-4 bg-white dark:bg-zinc-900 flex flex-col gap-4">
          <TouchableOpacity
            className="flex flex-row justify-between items-center"
            onPress={() => setShowMethodModal(true)}
          >
            <View className="flex flex-col gap-2">
              <View className="w-full flex flex-row justify-between">
                <Text className="font-c-semibold">Phương thức thanh toán</Text>
                <View className="flex flex-row gap-1 items-center">
                  <Text className="text-base text-gray-600 dark:text-gray-400">Xem thêm</Text>
                  <ChevronRight color="#4b5563" size={16} />
                </View>
              </View>

              <View className="mt-4 flex flex-col gap-4">
                {/* <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row gap-2 items-center">
                    <CircleDollarSign color="white" fill="#eab308" size={24} />
                    <Text>Thanh toán khi nhận hàng</Text>
                  </View>
                  {paymentMethod == "cod" ? (
                    <CircleCheck color="white" fill="#5eead4" size={24} />
                  ) : (
                    <MinusCircle color="white" fill="#d1d5db" size={24} />
                  )}
                </View> */}

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row gap-2 items-center">
                    <WalletMinimal color="white" fill="green" size={24} />
                    <Text>Thanh toán trực tuyến</Text>
                  </View>
                  {paymentMethod == "onl" ? (
                    <CircleCheck color="white" fill="#5eead4" size={24} />
                  ) : (
                    <MinusCircle color="white" fill="#d1d5db" size={24} />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <ModalBottomSheet
          visible={showMethodModal}
          onClose={() => setShowMethodModal(false)}
          title="Phương thức thanh toán"
        >
          <View className="mt-4 flex flex-row gap-2">
            {/* <TouchableOpacity
              className={`w-[49%] aspect-square rounded-lg flex flex-col justify-center items-center gap-2 ${
                paymentMethod == "cod"
                  ? "bg-teal-100 dark:bg-teal-600 border-2 border-teal-300"
                  : "bg-slate-100 dark:bg-zinc-600"
              }`}
              onPress={() => setPaymentMethod("cod")}
            >
              <View className="flex flex-col gap-2 items-center">
                <CircleDollarSign color="white" fill="#eab308" size={48} />
                <Text className="text-center">Thanh toán khi nhận hàng</Text>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              className={`w-[49%] aspect-square rounded-lg flex flex-col justify-center items-center gap-2 ${
                paymentMethod == "onl"
                  ? "bg-teal-100 dark:bg-teal-600 border-2 border-teal-300"
                  : "bg-slate-100 dark:bg-zinc-600"
              }`}
              onPress={() => setPaymentMethod("onl")}
            >
              <WalletMinimal color="white" fill="green" size={48} />
              <Text className="text-center">Thanh toán trực tuyến</Text>
            </TouchableOpacity>
          </View>
        </ModalBottomSheet>

        {/* Payment detail */}
        <View className="mt-4 p-4 mb-[64px] bg-white dark:bg-zinc-900 flex flex-col gap-4">
          <Text className="font-c-semibold">Chi tiết thanh toán</Text>
          <View className="flex flex-row justify-between items-center">
            <Text>Tổng tiền hàng</Text>
            <Text>
              {convertNumberToVND(
                orderProducts.reduce(
                  (acc, curr) => acc + curr.product_variant.variant_price * curr.quantity,
                  0
                )
              )}
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center">
            <Text>Khuyến mãi</Text>
            <Text className="text-teal-600 dark:text-teal-400">
              -
              {convertNumberToVND(
                orderProducts.reduce(
                  (acc, curr) =>
                    acc +
                    ((curr.product_variant.variant_price *
                      curr.product_variant.variant_discount_percent) /
                      100) *
                      curr.quantity,
                  0
                )
              )}
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center">
            <Text>Phí vận chuyển</Text>
            <Text>{convertNumberToVND(SHIPPING_COST)}</Text>
          </View>

          <View className="flex flex-row justify-between items-center">
            <Text>Phiếu giảm giá</Text>
            <Text className="text-teal-600 dark:text-teal-400">-{convertNumberToVND(0)}</Text>
          </View>

          <View className="px-4 border-b-[1px] border-gray-100"></View>

          <View className="flex flex-row justify-between items-center">
            <Text>Tổng thanh toán</Text>
            <Text>
              {convertNumberToVND(
                orderProducts.reduce(
                  (acc, curr) =>
                    acc +
                    (curr.product_variant.variant_price *
                      curr.quantity *
                      (100 - (curr.product_variant.variant_discount_percent || 0))) /
                      100,
                  0
                ) + SHIPPING_COST
              )}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="w-full h-[64px] absolute bottom-0 flex flex-row items-center gap-1 bg-white dark:bg-zinc-950">
        <ShieldCheck color="rgb(34 197 94)" size={18} />
        <Text className="w-3/6 text-sm">
          {" "}
          Bạn đồng ý với{" "}
          <Link href={"/term-of-service" as any} className="underline text-blue-500">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link href={"/privacy-policy" as any} className="underline text-blue-500">
            Chính sách quyền riêng tư
          </Link>{" "}
          .
        </Text>

        {/* Mua hang */}
        <TouchableOpacity
          className="flex-1 h-full p-2 bg-teal-500 dark:bg-teal-600 flex justify-center items-center"
          onPress={handlePayment}
        >
          <Text className="font-c-semibold text-white">Mua hàng ({timeLeft}s)</Text>
          <Text className="font-c-semibold text-white">
            {convertNumberToVND(
              orderProducts.reduce(
                (acc, curr) =>
                  acc +
                  (curr.product_variant.variant_price *
                    curr.quantity *
                    (100 - (curr.product_variant.variant_discount_percent || 0))) /
                    100,
                0
              ) + SHIPPING_COST
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
