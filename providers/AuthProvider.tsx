// import libs
import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// import libs
import { getData, postData } from "@/utils/functions/handle";
import {
  AUTH_LOGIN_URL,
  AUTH_REGISTER_URL,
  AUTH_ME_URL,
  AUTH_FORGOT_URL,
  AUTH_VERIFY_OTP_URL,
  AUTH_VERIFY_EMAIL_URL,
  AUTH_RESET_URL,
} from "@/utils/constants/urls";
import { getAccessToken, saveTokens } from "@/lib/authStorage";

// import types
import { IAuthContext, IUser } from "@/types/interfaces";

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const checkAuthState = async () => {
    try {
      // Lấy token và thông tin người dùng từ AsyncStorage
      const token = await getAccessToken();
      const storedUser = await AsyncStorage.getItem("user");

      if (!token || !storedUser) {
        setUserInfo(null);
        return;
      }

      // Kiểm tra token hợp lệ nếu cần (thông qua API `/auth/me` hoặc giải mã JWT)
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    } catch (err) {
      console.log("Failed to check auth state: ", err);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (user: IUser) => {
    try {
      const { data, message } = await postData(AUTH_LOGIN_URL, user);

      // console.log("{ data, message }", { data, message });

      if (!data) {
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: message || "Đăng nhập thất bại. Vui lòng thử lại sau!",
        });

        return;
      }

      await saveTokens(data.data.token, data.data.refreshToken);

      const userData = {
        user_id: data.data.user.id,
        user_name: data.data.user.name,
        email: data.data.user.email,
        user_role: data.data.user.role,
        user_avt: data.data.user.user_role,
        user_phone_number: data.data.user_phone_number,
        user_address: data.data.user_address,
      };

      setUserInfo(userData);

      // Lưu thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      Toast.show({
        type: "success",
        text1: "Welcome!!!",
        text2: `Xin chào, ${data.data.user.name || "User"}!`,
      });

      router.push("/");

      return;
    } catch (err) {
      console.log("Failed: ", err);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
      });

      return;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear(); // Xóa tất cả token và dữ liệu lưu trữ
      setUserInfo(null);

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
        pathname: "/verify-otp",
        params: {
          type: "register",
          email: encodeURIComponent(user.email as string),
          token: data.data.token,
        },
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

  const verifyEmail = async (user: IUser) => {
    if (!user.email || !user.token) {
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Xác thực Email thất bại, vui lòng thử lại sau!",
      });

      router.push("/register");
      return;
    }

    // console.log("tokekkkkkkkn", token);
    const { data, message } = await getData(
      `${AUTH_VERIFY_EMAIL_URL}?token=${user.token}&mobile=true`
    );
    // console.log("verifyRes", verifyRes);

    if (!data) {
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Xác thực Email thất bại, vui lòng thử lại sau!",
      });

      router.push("/register");
      return;
    }

    Toast.show({
      type: "success",
      text1: "Success!!!",
      text2: "Xác thực Email thành công!",
    });

    router.push("/login");
    return;
  };

  const forgotPassword = async (user: IUser, isResend: boolean) => {
    try {
      const { data, message } = await postData(AUTH_FORGOT_URL, user);
      // console.log("aaaaaaaaaa2");
      // console.log("aaaaaaaaaa1", user.email, data);

      if (!data) {
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: message || "Gửi mã OTP thất bại. Vui lòng thử lại sau!",
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Gửi lại OTP",
        text2: "Gửi mã OTP thành công. Vui lòng kiểm tra email.",
      });

      if (isResend) return;

      router.push({
        pathname: "/verify-otp",
        params: { type: "forgot", email: encodeURIComponent(user.email as string) },
      });

      return;
    } catch (err) {
      console.log("Failed: ", err);
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Có lỗi xảy ra. Vui lòng thử lại sau!",
      });

      return;
    }
  };

  const verifyOtp = async (user: IUser) => {
    if (!user.otp || !user.email) return false;

    const otpRes = await postData(AUTH_VERIFY_OTP_URL, { otp: user.otp, email: user.email });
    // console.log("otpRes", otpRes);

    if (!otpRes.data)
      return {
        data: null,
        message: otpRes.message || "Xác thực OTP thất bại. Vui lòng thử lại sau!!!",
      };

    return { data: otpRes.data, message: otpRes.data.data.message || "Xác thực OTP thành công!" };
  };

  const resetPassword = async (user: IUser) => {
    if (!user.reset_token || !user.new_password) {
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Đặt lại mật khẩu thất bại, vui lòng thử lại sau!",
      });

      router.push("/forgot-password");
      return;
    }

    const { data, message } = await postData(AUTH_RESET_URL, {
      resetToken: user.reset_token,
      new_password: user.new_password,
    });

    if (!data) {
      Toast.show({
        type: "error",
        text1: "Oops!!!",
        text2: "Đặt lại mật khẩu thất bại, vui lòng thử lại sau!",
      });

      router.push("/register");
      return;
    }

    Toast.show({
      type: "success",
      text1: "Success!!!",
      text2: "Đặt lại mật khẩu thành công!",
    });

    router.push("/login");
    return;
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
        register,
        forgotPassword,
        verifyEmail,
        verifyOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
