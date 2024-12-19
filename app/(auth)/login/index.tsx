// import libs
import { ScrollView, View } from "react-native";
import { useContext, useState } from "react";
import { Image } from "react-native";
import { Link } from "expo-router";

// import components
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

// import types
import { IUser } from "@/types/interfaces";

const Login = () => {
  const { login } = useContext(AuthContext) || {
    login: async (user: IUser) => {},
  };

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
    <ScrollView className="p-4">
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-1">
          <Text className="w-full text-center text-4xl font-c-bold">Chào mừng trở lại!</Text>
          <Text className="text-center text-gray-600">
            Đăng nhập ngay, để tận hưởng vô vàn ưu đãi dành riêng cho thành viên nhé bạn!!!.
          </Text>
        </View>

        {/* Email */}
        <View className="flex flex-col gap-2">
          <Text className={`text-gray-600 ${errors.email ? "text-red-500" : ""}`}>Email:</Text>

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
          <Text className={`text-gray-600 ${errors.password ? "text-red-500" : ""}`}>
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
          <Button variant="rounded-pri1" size="2xl" onPress={handleSubmit}>
            <Text className="font-c-bold">Đăng nhập</Text>
          </Button>
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
            <Text className="text-gray-600">Facebook</Text>
          </Button>
          <Button variant="rounded-border" size="xl" className="w-[49%] flex flex-row gap-2">
            <Image source={require("@/assets/images/brands/gg-logo.png")} />
            <Text className="text-gray-600">Google</Text>
          </Button>
        </View>

        <View className="pb-10">
          <Text className="text-gray-600 text-center">
            Chưa là thành viên? Trở thành thành viên để có quyền tận hưởng vô vàn khuyến mãi, quà
            tặng, và nhiều hơn nữa.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
