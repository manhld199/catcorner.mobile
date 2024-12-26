import { TouchableOpacity, View } from "react-native";
import React from "react";
import { TicketCheck, Truck } from "lucide-react-native";
import { Text } from "@/components/Text";

export default function CardCoupon() {
  return (
    <TouchableOpacity className="w-[30%] aspect-[3/4] overflow-hidden bg-teal-100 dark:bg-teal-200 rounded-lg flex flex-col gap-2 items-center">
      <View className="w-full py-1 border-b-2 border-dashed border-white bg-teal-200 dark:bg-teal-500">
        <Text className="px-2 text-center font-c-medium">Freeship</Text>
      </View>
      <Text className="px-2 text-base text-center line-clamp-2 text-gray-700">
        Mô tả mô tẩ dmasdsdsabdbdsadsadadsadsadsadadsana
      </Text>
      <Text className="px-2 text-2xl text-center text-teal-600">123456k</Text>
      <View className="px-2 flex flex-row gap-1 items-center">
        <TicketCheck color="rgb(34 197 94)" size={16} />
        <Text className="text-base text-green-500 dark:text-green-700">Đã nhận</Text>
      </View>
    </TouchableOpacity>
  );
}
