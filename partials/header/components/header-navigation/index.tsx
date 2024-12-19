import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CustomerHeaderNavigation() {
  return (
    <View className="flex space-x-8">
      {/* Navigation Links */}
      <TouchableOpacity>
        <Text className="phone:hidden laptop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold laptop:text-base desktop:block desktop:text-base tablet:text-sm">
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="phone:hidden desktop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block">
          Hot Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="phone:hidden desktop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block">
          Hot Sales
        </Text>
      </TouchableOpacity>
    </View>
  );
}
