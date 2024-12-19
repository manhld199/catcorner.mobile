import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import {
  Flame,
  Home,
  LayoutDashboard,
  Menu,
  Percent,
} from "lucide-react-native";
// import { ToogleThemeModeMobile } from "@/components";

export default function CustomerHeaderMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Menu button */}
      <View className="flex content-center space-x-4 phone:block laptop:hidden">
        <TouchableOpacity onPress={toggleMenu}>
          <Menu className="w-6 h-6 text-white" />
        </TouchableOpacity>
      </View>

      {/* Overlay */}
      {isMenuOpen && (
        <Pressable
          className="fixed inset-0 bg-black dark:bg-neutral-500 opacity-50 z-40"
          onPress={toggleMenu}
        ></Pressable>
      )}

      {/* Sidebar Menu */}
      <Modal
        visible={isMenuOpen}
        transparent
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <View
          className={`tablet:w-7/12 fixed inset-y-0 right-0 w-4/5 h-full z-50 bg-white dark:bg-zinc-900 shadow-md p-8 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Text className="text-xl phone_large:text-2xl font-bold mb-6 text-pri-1 py-4 dark:text-white">
            BẢNG ĐIỀU KHIỂN
          </Text>
          <View className="space-y-8">
            <TouchableOpacity className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Home className="w-6 h-6 text-pri-1 dark:text-white" />
              <Text className="font-semibold">Home</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Percent className="w-6 h-6 text-pri-1 dark:text-white" />
              <Text className="font-semibold">Hot Sale</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <Flame className="w-6 h-6 text-pri-1 dark:text-white" />
              <Text className="font-semibold">Hot Products</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <LayoutDashboard className="w-6 h-6 text-pri-1 dark:text-white" />
              <Text className="font-semibold">Categories</Text>
            </TouchableOpacity>

            {/* <View className="flex items-center space-x-4 text-pri-1 dark:text-white">
              <ToogleThemeModeMobile />
            </View> */}
          </View>
        </View>
      </Modal>
    </>
  );
}
