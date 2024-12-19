import { View, Text, useColorScheme } from "react-native";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface TabItemProps {
  href: string;
  iconName: keyof typeof Ionicons.glyphMap; // Type checking cho icon
  label: string;
}

export default function TabItem({ href, iconName, label }: TabItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const colorScheme = useColorScheme(); // Xác định chế độ sáng hoặc tối
  const activeColor =
    colorScheme === "dark" ? "rgb(20 184 166)" : "rgb(15 118 110)"; // Màu active thay đổi
  const textColor =
    isActive && colorScheme === "dark" ? "text-teal-500" : "text-teal-700";

  return (
    <Link href={href as any} className="flex items-center">
      <View className="flex flex-col items-center justify-center space-y-1">
        <Ionicons
          name={iconName}
          size={24}
          color={isActive ? activeColor : "rgb(156 163 175)"}
        />
        <Text
          className={`text-xs ${
            isActive ? `${textColor} font-semibold` : "text-gray-500"
          }`}
        >
          {label}
        </Text>
      </View>
    </Link>
  );
}
