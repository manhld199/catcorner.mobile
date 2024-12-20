import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { ArrowBack, SwitchTheme } from "@/components";
import { Text } from "@/components/Text";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { colorScheme } = useColorScheme();

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const settingsOptions = [
    {
      id: 1,
      icon: "notifications-outline",
      label: "Notification",
      action: (
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      ),
    },
    {
      id: 2,
      icon: "moon-outline",
      label: "Dark Mode",
      action: <SwitchTheme />,
    },
    { id: 3, icon: "star-outline", label: "Rate App" },
    { id: 4, icon: "share-social-outline", label: "Share App" },
    { id: 5, icon: "lock-closed-outline", label: "Privacy Policy" },
    { id: 6, icon: "document-text-outline", label: "Terms and Conditions" },
    { id: 7, icon: "document-outline", label: "Cookies Policy" },
    { id: 8, icon: "mail-outline", label: "Contact" },
    { id: 9, icon: "chatbox-ellipses-outline", label: "Feedback" },
    { id: 10, icon: "log-out-outline", label: "Logout" },
  ];

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <ArrowBack />
        <Text className="text-lg font-bold text-black dark:text-white ml-4">
          Cài đặt
        </Text>
      </View>

      {/* Settings Options */}
      <View>
        {settingsOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700"
            onPress={() => {
              if (!item.action) alert(`${item.label} clicked!`);
            }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colorScheme === "dark" ? "white" : "black"} // Hiển thị màu tùy vào trạng thái dark mode
                className="mr-4"
              />
              <Text className="text-gray-800 dark:text-gray-300 text-base">
                {item.label}
              </Text>
            </View>
            {item.action || (
              <Ionicons
                name="chevron-forward-outline"
                size={16}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
