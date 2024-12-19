// import { ToogleThemeModeMobile } from "@/components";
import { Ellipsis, MessageCircleQuestion, Settings } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CustomerHeaderMore() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="relative group flex cursor-pointer">
      {/* Ellipsis Icon */}
      <TouchableOpacity onPress={toggleMenu}>
        <Ellipsis className="text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300" />
      </TouchableOpacity>

      {isMenuOpen && (
        <View className="absolute right-0 top-full mt-4 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg transition-all duration-300">
          {/* Mũi tên của dropdown */}
          <View className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></View>

          <View className="py-3 space-y-2">
            {/* Theme Toggle */}
            {/* <TouchableOpacity className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <View className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <ToogleThemeModeMobile />
              </View>
            </TouchableOpacity> */}

            {/* Help Center */}
            <TouchableOpacity className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <View className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <MessageCircleQuestion />
                <Text className="font-medium">Help Center</Text>
              </View>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <View className="flex items-center space-x-4 text-pri-1 dark:text-white hover:text-teal-600 dark:hover:text-teal-300">
                <Settings />
                <Text className="font-medium">Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
