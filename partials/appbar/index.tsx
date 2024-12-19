import { View } from "react-native";
import TabItem from "./tab-item"; // Đường dẫn tới TabItem

const tabData = [
  { href: "/", iconName: "home", label: "Home" },
  { href: "/login", iconName: "heart", label: "Login" },
  { href: "/register", iconName: "chatbubble", label: "Signup" },
  { href: "/search", iconName: "search", label: "Search" },
  { href: "/profile", iconName: "person", label: "Profile" },
];

export default function AppBar() {
  return (
    <View className="absolute bottom-0 w-full flex flex-row justify-around items-center bg-white dark:bg-black py-3 border-t dark:border-black border-gray-200">
      {tabData.map((tab) => (
        <TabItem
          key={tab.href}
          href={tab.href}
          iconName={tab.iconName as any}
          label={tab.label}
        />
      ))}
    </View>
  );
}
