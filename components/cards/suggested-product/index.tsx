// import libs
import { Image, View } from "react-native";
import { Link } from "expo-router";

// import components
import { Text } from "@/components/Text";

export default function CardSuggestedProduct() {
  return (
    <Link
      href="#"
      className="overflow-hidden px-2 pt-2 pb-4 bg-pri-2 dark:bg-pri-7 rounded-md flex flex-row last:border-none"
    >
      <View className="flex flex-row gap-2">
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/db/16/7f/db167f5639b20ed2857ddd862626e24e.jpg",
          }}
          resizeMode="cover"
          className="w-[72px] aspect-square rounded-md"
        />

        <View className="flex-1 flex flex-col gap-2">
          <Text className="line-clamp-1 font-c-medium">
            Test product abcabscahdshadhsd sancsakjcsadgsdascb
          </Text>

          <View className="flex flex-row gap-2">
            <Text className="text-gray-600 dark:text-gray-300 line-through text-base">
              100.000.000đ
            </Text>
            <Text className="text-base font-c-bold text-pri-1 dark:text-pri-6">100.000.000đ</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}
