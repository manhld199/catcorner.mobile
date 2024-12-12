// import libs
import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// import libs
import { getData, postData } from "@/utils/functions/handle";
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL, AUTH_ME_URL } from "@/utils/constants/urls";
import { getAccessToken, saveTokens } from "@/lib/authStorage";

interface IUser {
  user_id?: string;
  user_name?: string;
  email: string;
  user_role?: string;
  user_avt?: string;
  password?: string;
}

export interface IAuthContext {
  user: IUser | null;
  register: (user: IUser) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  const checkAuthState = async () => {
    try {
      // Lấy token và thông tin người dùng từ AsyncStorage
      const token = await getAccessToken();
      const storedUser = await AsyncStorage.getItem("user");

      if (!token || !storedUser) {
        setUser(null);
        return;
      }

      // Kiểm tra token hợp lệ nếu cần (thông qua API `/auth/me` hoặc giải mã JWT)
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.log("Failed to check auth state: ", err);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (user: IUser) => {
    try {
      const { data, message } = await postData(AUTH_LOGIN_URL, user);

      // console.log("{ data, message }", { data, message });

      if (!data)
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: message || "Đăng nhập thất bại. Vui lòng thử lại sau!",
        });

      await saveTokens(data.data.token, data.data.refreshToken);

      const userData = {
        user_id: data.data.user.id,
        user_name: data.data.user.name,
        email: data.data.user.email,
        user_role: data.data.user.role,
        user_avt: data.data.user.user_role,
      };

      setUser(userData);

      // Lưu thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      Toast.show({
        type: "success",
        text1: "Welcome!!!",
        text2: `Xin chào, ${data.data.user.name || "User"}!`,
      });

      router.push("/");
    } catch (err) {
      console.log("Failed: ", err);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
      });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear(); // Xóa tất cả token và dữ liệu lưu trữ
      setUser(null);

      Toast.show({
        type: "success",
        text1: "Goodbye!!!",
        text2: "Bạn đã đăng xuất thành công.",
      });

      // Điều hướng tới trang đăng nhập
      // router.replace("/login"); // Thay '/login' bằng đường dẫn của bạn
    } catch (err) {
      console.log("Logout Failed: ", err);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
      });
    }
  };

  const register = async (user: IUser) => {
    try {
      const { data, message } = await postData(AUTH_REGISTER_URL, user);
      // console.log("aaaaaaaaaa2");
      // console.log("aaaaaaaaaa1", user.email, data);

      if (!data)
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: message || "Đăng ký thất bại. Vui lòng thử lại sau!",
        });

      // console.log("aaaaaaaaaa3");
      Toast.show({
        type: "success",
        text1: "Success!!!",
        text2: message || "Đăng ký thành công. Vui lòng xác thực Email!",
      });

      router.push({
        pathname: "/verify-email",
        params: { email: encodeURIComponent(user.email), token: data.data.token },
      });
    } catch (err) {
      console.log("Failed: ", err);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
