import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ArrowBackFix() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="absolute top-8 left-4"
    >
      <Ionicons
        name="arrow-back-outline"
        size={20}
        color={colorScheme === "dark" ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}
