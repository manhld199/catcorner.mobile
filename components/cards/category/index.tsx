// import libs
import { View, Image } from "react-native";
import { Link } from "expo-router";

// import components
import { Text } from "@/components/Text";
import { ICategory } from "@/types/interfaces";

export default function CardCategory({ category }: { category: ICategory }) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category.category_id_hashed)}`}
      className="w-[30%] flex flex-col items-center justify-start"
    >
      <View className="w-full flex flex-col gap-2">
        {/* Container cho hình ảnh */}
        <View className="w-[100px] aspect-[2/3] flex-1">
          <Image
            source={{
              uri: category.category_img || require("@/assets/images/placeholder.png"),
            }}
            className="w-full h-full rounded-md"
            resizeMode="cover"
          />
        </View>

        {/* Dòng chữ */}
        <Text className="w-full text-base text-center">{category.category_name}</Text>
      </View>
    </Link>
  );
}
