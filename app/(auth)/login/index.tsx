import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Image } from "react-native";
import { Text } from "@/components/Text";

const Login = () => {
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
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
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
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Kiểm tra Password
    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    validateForm();
  };

  return (
    <ScrollView className="p-4">
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-1">
          <Text className="w-full text-center text-4xl font-c-bold">Welcome back!</Text>
          <Text className="text-center text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore.
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
            placeholder="Enter email address..."
            className={`placeholder:text-sm ${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.email ? <Text className="text-right text-red-500">{errors.email}</Text> : null}
        </View>

        {/* Password */}
        <View className="flex flex-col gap-2">
          <Text className={`text-gray-600 ${errors.password ? "text-red-500" : ""}`}>
            Password:
          </Text>

          <Input
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            placeholder="Enter password..."
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
            <Text className="font-c-bold">Login</Text>
          </Button>
          <Text className="text-center underline">Forgot your password?</Text>
        </View>

        <View className="flex flex-row items-center">
          <View className="w-1/4 h-[1px] bg-gray-600"></View>
          <Text className="w-1/2 text-xl text-center">Or sign up with</Text>
          <View className="w-1/4 h-[1px] bg-gray-600"></View>
        </View>

        <View className="w-full flex flex-row gap-2">
          <Button variant="rounded-border" size="xl" className="w-[49%] flex flex-row gap-2">
            <Image source={require("@/assets/images/brands/fb-logo.png")} />
            <Text className="text-gray-600">Facebook</Text>
          </Button>
          <Button variant="rounded-border" size="xl" className="w-[49%] flex flex-row gap-2">
            <Image source={require("@/assets/images/brands/gg-logo.png")} />
            <Text className="text-gray-600"> Google</Text>
          </Button>
        </View>

        <View className="pb-10">
          <Text className="text-gray-600 text-center">
            Not a member? Get exclusive access to exhibitions and events, free admission every day,
            and much more.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
