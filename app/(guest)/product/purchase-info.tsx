// import libs
import { View, Image, TouchableOpacity } from "react-native";
import { useState, Fragment } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import components
import { Text } from "@/components/Text";
import { InputQuantity, ModalBottomSheet } from "@/components";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";

// import types
import { IProductVariant, IPurchaseProduct } from "@/types/interfaces";

export default function PurchaseInfo({
  type,
  title,
  action,
  actionTitle,
  showModal,
  setShowModal,
  productName,
  currentVariant,
  productVariants,
  setCurrentVariant,
  productId,
  storageName,
}: {
  type: string;
  title: string;
  action: () => void;
  actionTitle: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  productName: string;
  currentVariant: IProductVariant | undefined;
  productVariants: IProductVariant[];
  setCurrentVariant: React.Dispatch<React.SetStateAction<IProductVariant | undefined>>;
  productId: string;
  storageName: string;
}) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <ModalBottomSheet visible={showModal} onClose={() => setShowModal(false)} title={title}>
      <View className="flex flex-col gap-4">
        <View className="flex flex-row items-end gap-2">
          <View className="w-[120px] aspect-square border-2 rounded-lg border-teal-400 overflow-hidden">
            <Image source={{ uri: currentVariant?.variant_img }} className="w-full h-full" />
          </View>
          <View className="flex-1 h-full flex flex-col justify-start gap-2">
            <Text className="w-full line-clamp-2">{productName}</Text>
            {(currentVariant?.variant_discount_percent || 0) > 0 ? (
              <View className="flex flex-row gap-2 items-center">
                <Text className="line-through text-base font-c-regular text-gray-600 dark:text-gray-400">
                  {convertNumberToVND(currentVariant?.variant_price || 0)}
                </Text>
                <Text className="text-2xl font-c-semibold text-teal-400">
                  {convertNumberToVND(
                    currentVariant?.variant_discount_percent
                      ? (currentVariant.variant_price *
                          (100 - currentVariant.variant_discount_percent)) /
                          100
                      : currentVariant?.variant_price || 0
                  )}
                </Text>
                <Text className="h-7 text-base text-red-500 px-4 bg-red-100 rounded-lg">
                  -{currentVariant?.variant_discount_percent}%
                </Text>
              </View>
            ) : (
              <Text className="text-2xl font-c-semibold text-pri-6 dark:text-pri-7">
                {convertNumberToVND(currentVariant?.variant_price || 0)}
              </Text>
            )}

            <Text className="text-gray-600 dark:text-gray-400 font-c-regular">
              Tồn kho: {currentVariant?.variant_stock_quantity || 0}
            </Text>
          </View>
        </View>
        <View className="h-[1px] w-full bg-gray-100 dark:bg-gray-300"></View>

        <Text className="text-lg font-c-semibold">Phân loại</Text>
        <View className="flex flex-row flex-wrap gap-2">
          {(productVariants || []).map((item, index) => (
            <TouchableOpacity
              key={`buy variant ${index}`}
              className={`py-1 px-2 flex flex-row gap-1 items-center rounded-lg ${
                currentVariant?._id == item._id
                  ? "bg-white dark:bg-pri-7 border-[1px] border-teal-400 dark:border-gray-300"
                  : "bg-teal-100 dark:bg-zinc-700"
              }`}
              onPress={() => setCurrentVariant(item)}
            >
              <View className="w-[32px] aspect-square">
                <Image source={{ uri: item.variant_img }} className="w-full h-full" />
              </View>
              <Text className="text-base font-c-regular">{item.variant_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="h-[1px] w-full bg-gray-100 dark:bg-gray-300"></View>

        <View className="flex flex-row justify-between">
          <Text className="text-lg font-c-semibold">Số lượng</Text>
          <InputQuantity
            min={1}
            max={currentVariant?.variant_stock_quantity || 0}
            onChange={setQuantity}
          />
        </View>

        <TouchableOpacity
          className="w-full h-[40px] bg-teal-500 dark:bg-teal-600 rounded-lg flex justify-center items-center"
          onPress={async () => {
            try {
              console.log("Bắt đầu xử lý");

              // Lấy dữ liệu hiện tại từ AsyncStorage
              const currentStorage = await AsyncStorage.getItem(storageName);
              // console.log("currentStorage", currentStorage);

              // Parse dữ liệu hiện tại
              const parsedCurrentStorage: IPurchaseProduct[] =
                JSON.parse(currentStorage || "{}")?.products || [];

              // console.log("parsedCurrentStorage", parsedCurrentStorage);
              if (type == "buy") {
                await AsyncStorage.setItem(
                  storageName,
                  JSON.stringify({
                    updatedAt: Date.now(),
                    products: [
                      {
                        product_hashed_id: productId,
                        quantity,
                        variant_id: currentVariant?._id || "",
                      },
                    ],
                  })
                );

                action();
                return;
              }

              // Kiểm tra nếu sản phẩm đã tồn tại trong mảng
              const productIndex = parsedCurrentStorage.findIndex(
                (product) => product.product_hashed_id === productId
              );

              if (productIndex > -1) {
                // Nếu sản phẩm đã tồn tại, cập nhật thông tin
                parsedCurrentStorage[productIndex] = {
                  ...parsedCurrentStorage[productIndex],
                  quantity,
                  variant_id: currentVariant?._id || "",
                };
                // console.log("Cập nhật sản phẩm trong mảng");
              } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào mảng
                parsedCurrentStorage.push({
                  product_hashed_id: productId,
                  quantity,
                  variant_id: currentVariant?._id || "",
                });
                // console.log("Thêm sản phẩm mới vào mảng");
              }

              // console.log("products sau xử lý", parsedCurrentStorage);

              // Lưu lại mảng đã cập nhật vào AsyncStorage
              await AsyncStorage.setItem(
                storageName,
                JSON.stringify({ updatedAt: Date.now(), products: parsedCurrentStorage })
              );

              // console.log("Lưu trữ thành công");
              action(); // Gọi hành động tiếp theo nếu cần
            } catch (error) {
              console.error("Lỗi trong xử lý:", error);
            }
          }}
        >
          <Text className="font-c-semibold !text-xl text-white">{actionTitle}</Text>
        </TouchableOpacity>
      </View>
    </ModalBottomSheet>
  );
}
