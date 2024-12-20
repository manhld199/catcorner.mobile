<<<<<<< HEAD
import { router } from "expo-router";
=======
import { useRouter } from "expo-router";
>>>>>>> c3a798c5b3305f4aca1da53354a7734c81c5fac6
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native"; // Quản lý theme trên React Native

export default function CustomerHeaderLogo() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const systemTheme = useColorScheme(); // `light` hoặc `dark`

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Quản lý theme: dùng systemTheme hoặc light/dark theo hệ thống
  const currentTheme = systemTheme === "dark" ? "dark" : "light";

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={() => router.push("/")}
    >
      {/* Logo mobile */}
      <View style={{ display: "flex" }}>
        <Image
          source={require("@/assets/images/logo-white.webp")}
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
      </View>

      {/* Logo desktop */}
      {/* <View style={{ display: currentTheme === "light" ? "flex" : "none" }}>
        <Image
          source={
            currentTheme === "dark"
              ? require("@/assets/images/logo-white.webp")
              : require("@/assets/images/logo-pri.webp")
          }
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
      </View> */}
    </TouchableOpacity>
  );
}
