// import libs
import { Image, View } from "react-native";
import { Link } from "expo-router";

// import components
import { Text } from "@/components/Text";

// import interfaces
import { IProductSuggest } from "@/types/interfaces";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";

export default function CardSuggestedProduct({ product }: { product: IProductSuggest }) {
  return (
    <Link
      href={
        `/product/${product.product_slug}?pid=${encodeURIComponent(
          product.product_id_hashed
        )}` as any
      }
      className="flex-1 w-full p-1 bg-pri-5 dark:bg-pri-7 rounded-md flex flex-row"
    >
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-[86px] aspect-square">
          <Image
            source={{
              uri: product.product_img || require("@/assets/images/placeholder.png"),
            }}
            resizeMode="cover"
            className="w-full h-full rounded-md"
          />
        </View>

        <View className="flex-1 flex flex-col gap-2">
          <Text className="w-[90%] font-c-medium line-clamp-1">{product.product_name}</Text>

          <View className="flex flex-row gap-1">
            {(product.variant_names ?? []).map((variant, index) => (
              <View key={`${variant} ${index}`} className="w-[80px] p-1 bg-pri-2 rounded-md flex">
                <Text className="text-base text-center line-clamp-1">
                  {product.variant_names[0]}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex flex-row gap-2">
            <Text className="text-base font-c-bold text-pri-1 dark:text-pri-6">
              {convertNumberToVND(product.lowest_price)}
            </Text>
            {product.product_price && (
              <Text className="text-gray-600 dark:text-gray-300 line-through text-base">
                {convertNumberToVND(product.product_price)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Link>
  );
}
