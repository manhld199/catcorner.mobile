import React, { useEffect, useState } from "react";
import { View, Switch, Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    // Đồng bộ trạng thái switch với theme hệ thống
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const toggleColorScheme = () => {
    // Chuyển đổi giữa chế độ sáng và tối
    const newScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newScheme);
  };

  return (
    <View>
      <Switch value={isDarkMode} onValueChange={toggleColorScheme} />
    </View>
  );
}
