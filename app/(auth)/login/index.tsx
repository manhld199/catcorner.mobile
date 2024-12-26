// import libs
import { TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

// import components
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

// import types
import { IUser } from "@/types/interfaces";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext) || {
    login: async (user: IUser) => {},
  };
  const { colorScheme } = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (text: string) => {
    setEmail(text);
    if (!text.match(emailRegex)) {
      setErrors((prev) => ({ ...prev, email: "Vui lòng nhập địa chỉ email hợp lệ." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Mật khẩu phải có ít nhất 6 ký tự." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Kiểm tra Email
    if (!email) {
      newErrors.email = "Email không được để trống.";
      valid = false;
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ.";
      valid = false;
    }

    // Kiểm tra Mật khẩu
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const user = {
        email: email,
        password: password,
      };

      await login(user);
    }
  };

  return (
    <View className="p-4 relative bg-white dark:bg-gray-800 w-full h-full flex flex-col justify-between">
      <View className="flex flex-col gap-3">
        <View className="flex flex-col gap-1">
          <Text className="w-full text-center text-4xl font-c-bold">Chào mừng trở lại!</Text>
          <Text className="text-center text-gray-600 dark:text-gray-400">
            Đăng nhập ngay, để tận hưởng vô vàn ưu đãi dành riêng cho thành viên nhé bạn!!!.
          </Text>
        </View>

        <View className="mx-auto w-[178px] h-[120px]">
          <Image
            source={require("@/assets/images/noti/cat-2.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Email */}
        <View className="flex flex-col gap-2">
          <Text
            className={`text-gray-600 dark:text-gray-400 ${errors.email ? "text-red-500" : ""}`}
          >
            Email:
          </Text>

          <Input
            value={email}
            onChangeText={validateEmail}
            inputMode="email"
            keyboardType="email-address"
            placeholder="Nhập địa chỉ email..."
            className={`placeholder:text-sm ${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.email ? <Text className="text-right text-red-500">{errors.email}</Text> : null}
        </View>

        {/* Mật khẩu */}
        <View className="flex flex-col gap-2">
          <Text
            className={`text-gray-600 dark:text-gray-400 ${errors.password ? "text-red-500" : ""}`}
          >
            Mật khẩu:
          </Text>

          <Input
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            placeholder="Nhập mật khẩu..."
            className={`placeholder:text-sm ${
              errors.password ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.password ? (
            <Text className="text-right text-red-500">{errors.password}</Text>
          ) : null}
        </View>

        <View className="w-full flex flex-col gap-2">
          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full h-14 rounded-full bg-green-500 flex justify-center items-center"
          >
            <Text className="font-c-semibold text-white text-2xl">Đăng nhập</Text>
          </TouchableOpacity>
          <Text className="text-center underline">
            <Link href="/forgot-password">Quên mật khẩu?</Link>
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <View className="w-1/4 h-[1px] bg-gray-600"></View>
          <Text className="w-1/2 text-xl text-center">Hoặc</Text>
          <View className="w-1/4 h-[1px] bg-gray-600"></View>
        </View>

        <View className="w-full flex flex-row gap-2">
          <Button variant="rounded-border" size="xl" className="w-[49%] flex flex-row gap-2">
            <Image source={require("@/assets/images/brands/fb-logo.png")} />
            <Text className="text-gray-600 dark:text-gray-400">Facebook</Text>
          </Button>
          <Button variant="rounded-border" size="xl" className="w-[49%] flex flex-row gap-2">
            <Image source={require("@/assets/images/brands/gg-logo.png")} />
            <Text className="text-gray-600 dark:text-gray-400">Google</Text>
          </Button>
        </View>
      </View>

      <View className="w-full flex flex-col gap-2">
        <TouchableOpacity
          className="w-full h-14 rounded-full border-2 border-green-500 flex justify-center items-center"
          onPress={() => router.push("/register")}
        >
          <Text className="text-green-500 font-c-semibold">Tạo tài khoản mới</Text>
        </TouchableOpacity>
        <View className="m-auto w-[250px] h-[40px]">
          {colorScheme == "light" ? (
            <Image
              source={require("@/assets/images/logo-pri.webp")}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("@/assets/images/logo-white.webp")}
              className="w-full h-full"
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Login;
