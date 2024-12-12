// import libs
import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// import libs
import { postData } from "@/utils/functions/handle";
import { AUTH_REGISTER_URL } from "@/utils/constants/urls";

interface IUser {
  user_name: string;
  email: string;
  password: string;
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

  const login = async (user: IUser) => {
    // // Thay thế bằng API thực tế của bạn
    // if (email === "21521116@gm.uit.edu.vn" && password === "password") {
    //   console.log("aaaaaaaaaaaaaa yes");
    //   // setUser({ email });
    //   // await AsyncStorage.setItem("user", JSON.stringify({ email }));
    //   return true;
    // }
    // console.log("aaaaaaaaaaaaaa no");
    return {
      isSuccess: false,
      message: "",
    };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const register = async (user: IUser) => {
    try {
      const { data, message } = await postData(AUTH_REGISTER_URL, user);
      // console.log("aaaaaaaaaa2");
      console.log("aaaaaaaaaa1", user.email, data);

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
