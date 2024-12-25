import React from "react";
import { View } from "react-native";
import { useContext } from "react";

// Import components
import { CustomerAppbar } from "@/partials";
import { AuthenticatedUser, UnauthenticatedUser } from "./partials";
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

const options = [
  {
    id: 1,
    title: "Thông tin tài khoản",
    icon: "person-circle-outline",
    link: "/information",
  },
  {
    id: 2,
    title: "Lịch sử mua hàng",
    icon: "cart-outline",
    link: "/purchase-history",
  },
  {
    id: 3,
    title: "Cài đặt",
    icon: "settings-outline",
    link: "/settings",
  },
  {
    id: 4,
    title: "Đăng xuất",
    icon: "log-out-outline",
    link: "/#",
  },
];

const pre_options = [
  {
    id: 1,
    title: "Đăng nhập",
    icon: "person-outline",
    link: "/login",
  },
  {
    id: 2,
    title: "Đăng ký",
    icon: "person-add-outline",
    link: "/register",
  },
  {
    id: 3,
    title: "Cài đặt",
    icon: "settings-outline",
    link: "/settings",
  },
];

export default function ProfilePage() {
  const { userInfo } = useContext(AuthContext) || {};

  return (
    <>
      <View className="flex-1 bg-white dark:bg-gray-900 py-6">
        {userInfo ? (
          <AuthenticatedUser userInfo={userInfo} options={options} />
        ) : (
          <UnauthenticatedUser pre_options={pre_options} />
        )}
      </View>
      <CustomerAppbar />
    </>
  );
}
