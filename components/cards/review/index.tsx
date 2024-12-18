// import libs
import { Image, ScrollView, View } from "react-native";
import { Text } from "@/components/Text";
import { StarGroup } from "@/components";

export default function CardReview({ type = 1 }: { type?: number }) {
  if (type == 1)
    return (
      <View className="w-full h-[100px] p-4 bg-pri-5 rounded-lg flex flex-row gap-2">
        <View className="flex-1 flex flex-col gap-2">
          <Text className="line-clamp-2">
            CardReviewCardReviewCardReviewCardReviewCardReviewCardReview
          </Text>
          <View className="flex flex-row gap-2 items-center">
            <StarGroup rating={4.3} starSize={16} />
            <Text className="text-base text-gray-600">Tên người dùng</Text>
          </View>
        </View>

        <View className="w-[80px] aspect-square">
          <Image
            source={{
              uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
            }}
            className="w-full h-full rounded-lg"
          />
        </View>

        <View className="w-[80px] aspect-square">
          <Image
            source={{
              uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
            }}
            className="w-full h-full rounded-lg"
          />
        </View>
      </View>
    );
  else if (type == 2)
    return (
      <View className="w-full p-4 bg-pri-5 rounded-lg flex flex-col gap-2">
        <View className="flex flex-row gap-2 items-center">
          <View className="w-[40px] aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-full"
            />
          </View>

          <View className="flex flex-col gap-1">
            <Text className="text-base">Tê người dùng</Text>
            <Text className="text-base text-gray-600">19/09/2003 | Phân loại: Chicken 1.5kg</Text>
          </View>
        </View>
        <StarGroup rating={4.5} starSize={16} />
        <Text className="line-clamp-3">
          Nội dung đánh giágiáNội dung đánh giágiáNội dung đánh giágiáNội dung đánh giágiáNội
          dungNội dung đánh giágiáNội dung đánh giágiá đánh giágiáNội dung đánh giágiá
        </Text>
        <ScrollView horizontal={true}>
          <View className="w-[80px] mr-2 aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="w-[80px] mr-2 aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="w-[80px] mr-2 aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="w-[80px] mr-2 aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="w-[80px] mr-2 aspect-square">
            <Image
              source={{
                uri: "https://i.pinimg.com/236x/22/71/7f/22717fbab821717f70875f2d37d878dd.jpg",
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
        </ScrollView>
      </View>
    );
}
