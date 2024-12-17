// import libs
import { View, Image } from "react-native";
import { Link } from "expo-router";

// import components
import { Text } from "@/components/Text";
import { ICategory } from "@/types/interfaces";

export default function CardCategory({ category }: { category: ICategory }) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category.category_id_hashed)}` as any}
      className="w-[30%] pb-2 bg-pri-5 dark:bg-pri-7 rounded-md"
    >
      <View className="w-full flex flex-col justify-center items-center gap-2">
        {/* Container cho hình ảnh */}
        <View className="w-[100px] aspect-square">
          <Image
            source={{
              uri: category.category_img || require("@/assets/images/placeholder.png"),
            }}
            className="w-full h-full rounded-md"
            resizeMode="cover"
          />
        </View>

        {/* Dòng chữ */}
        <Text className="w-full text-base text-center font-c-bold line-clamp-1">
          {category.category_name}
        </Text>
      </View>
    </Link>
  );
}
