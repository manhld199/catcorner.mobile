import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native"; // Quản lý theme trên React Native

export default function CustomerHeaderLogo() {
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
      onPress={() => console.log("Logo clicked")}
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
