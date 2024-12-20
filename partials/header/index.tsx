import React, { Suspense } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  Search,
  ShoppingBag,
  Menu,
  MessageCircleMore,
} from "lucide-react-native";
import {
  CustomerHeaderCart,
  CustomerHeaderLogo,
  CustomerHeaderMenu,
} from "./components";
import CustomerHeaderSearch from "./components/header-search";

export default function CustomerHeader() {
  return (
    <View className="flex flex-col">
      <View className="flex-row items-center justify-between bg-pri-1 dark:bg-teal-700 py-2 px-4">
        {/* Logo */}
        <CustomerHeaderLogo />
        {/* Menu Icon */}
        <View className="flex gap-6 flex-row">
          <CustomerHeaderCart />
          <TouchableOpacity>
            <MessageCircleMore size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
