import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { ArrowBack, SwitchTheme } from "@/components";
import { Text } from "@/components/Text";
import { useRouter } from "expo-router"; // Import useRouter
import { AuthContext } from "@/providers";
import * as Notifications from "expo-notifications"; // Import thư viện notifications

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { colorScheme } = useColorScheme();
  const router = useRouter(); // Initialize router
  const { userInfo } = useContext(AuthContext) || {}; // Get userInfo from AuthContext

  // UseEffect để kiểm tra trạng thái quyền thông báo ban đầu
  useEffect(() => {
    const checkNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationsEnabled(status === "granted");
    };

    checkNotificationPermissions();
  }, []);

  // Yêu cầu quyền thông báo từ người dùng khi bật công tắc
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      // Kiểm tra và yêu cầu quyền thông báo
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setNotificationsEnabled(true);
        Alert.alert("Thông báo", "Bạn đã cấp quyền nhận thông báo.");
      } else {
        setNotificationsEnabled(false);
        Alert.alert("Thông báo", "Bạn đã từ chối quyền nhận thông báo.");
      }
    } else {
      // Nếu người dùng đã bật, chỉ cần tắt
      setNotificationsEnabled(false);
    }
  };

  // Các tùy chọn cài đặt
  const settingsOptions = [
    {
      id: 1,
      icon: "notifications-outline",
      label: "Thông báo",
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
      label: "Chế độ tối",
      action: <SwitchTheme />,
    },
    ...(userInfo
      ? [
          {
            id: 3,
            icon: "key-outline",
            label: "Đổi mật khẩu",
            onPress: () => router.push("/change-password"), // Navigate to /change-password
          },
        ]
      : []), // Chỉ thêm mục "Đổi mật khẩu" khi có userInfo
    { id: 4, icon: "star-outline", label: "Đánh giá ứng dụng" },
    { id: 5, icon: "lock-closed-outline", label: "Chính sách bảo mật" },
    { id: 6, icon: "document-text-outline", label: "Điều khoản sử dụng" },
    { id: 8, icon: "mail-outline", label: "Liên hệ với chúng tôi" },
    { id: 9, icon: "chatbox-ellipses-outline", label: "Khiếu nại" },
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
              if (item.onPress) {
                item.onPress(); // Trigger navigation or other action
              } else if (!item.action) {
                alert(`${item.label} clicked!`);
              }
            }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
                className="mr-4"
              />
              <Text className="text-gray-800 dark:text-gray-300">
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
