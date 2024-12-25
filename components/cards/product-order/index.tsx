// import libs
import { Image, View } from "react-native";

// import components
import { Text } from "@/components/Text";

// import types
import { IProductOrder } from "@/types/interfaces";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";

export default function CardProductOrder({ product }: { product: IProductOrder }) {
  return (
    <View className="p-2 bg-pri-5 dark:bg-pri-6 rounded-lg flex flex-row gap-4">
      <View className="w-[100px] aspect-square rounded-lg border-[1px] border-gray-200 dark:border-gray-100 overflow-hidden bg-white dark:bg-gray-700">
        <Image source={{ uri: product.product_variant.variant_img }} className="w-full h-full" />
      </View>

      <View className="flex-1 flex flex-col justify-between">
        <View className="flex flex-col gap-1">
          <Text className="line-clamp-1">{product.product_name}</Text>
          <Text className="text-gray-600 dark:text-gray-300">
            Phân loại: {product.product_variant.variant_name}
          </Text>
        </View>

        <View className="flex flex-row justify-between">
          {product.product_variant.variant_discount_percent > 0 ? (
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-teal-400 font-c-semibold">
                {convertNumberToVND(
                  (product.product_variant.variant_price *
                    (100 - product.product_variant.variant_discount_percent)) /
                    100
                )}
              </Text>
              <Text className="text-base text-gray-600 dark:text-gray-300 line-through">
                {convertNumberToVND(product.product_variant.variant_price)}
              </Text>
            </View>
          ) : (
            <Text className="text-pri-6 font-c-semibold">
              {convertNumberToVND(product.product_variant.variant_price)}
            </Text>
          )}

          <Text>Số lượng: {product.quantity}</Text>
        </View>
      </View>
    </View>
  );
}
