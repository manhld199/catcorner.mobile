// import libs
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";

// import components
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

// import types
import { IUser } from "@/types/interfaces";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [agreeSubscribe, setAgreeSubscribe] = useState(false);

  const { register } = useContext(AuthContext) || {
    register: async (user: IUser) => {},
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerm: "",
  });

  const nameRegex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨứỪỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFirstName = (text: string) => {
    setFirstName(text);
    if (text === "") setErrors((prev) => ({ ...prev, firstName: "Hãy nhập tên." }));
    else if (!text.match(nameRegex)) {
      setErrors((prev) => ({ ...prev, firstName: "Tên chỉ được chứa các chữ cái." }));
    } else {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  };

  const validateLastName = (text: string) => {
    setLastName(text);
    if (text === "") setErrors((prev) => ({ ...prev, lastName: "Hãy nhập họ." }));
    else if (!text.match(nameRegex)) {
      setErrors((prev) => ({ ...prev, lastName: "Họ chỉ được chứa các chữ cái." }));
    } else {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    if (!text.match(emailRegex)) {
      setErrors((prev) => ({ ...prev, email: "Hãy nhập địa chỉ Email hợp lệ." }));
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

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Mật khẩu xác nhận không trùng khớp." }));
    } else if (text === "") {
      setErrors((prev) => ({ ...prev, confirmPassword: "Hãy nhập mật khẩu xác nhận." }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateAgreeTerm = (value: boolean) => {
    setAgreeTerm(value);
    if (value === true) setErrors((prev) => ({ ...prev, agreeTerm: "" }));
    else
      setErrors((prev) => ({
        ...prev,
        agreeTerm: "Bạn phải đồng ý với các điều khoản.",
      }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerm: "",
    };

    // Kiểm tra First Name
    if (firstName === "") {
      newErrors.firstName = "Hãy nhập tên.";
      valid = false;
    } else if (!firstName.match(nameRegex)) {
      newErrors.firstName = "Tên chỉ được chứa các chữ cái.";
      valid = false;
    }

    // Kiểm tra Last Name
    if (!lastName) {
      newErrors.lastName = "Hãy nhập họ.";
      valid = false;
    } else if (!lastName.match(nameRegex)) {
      newErrors.lastName = "Họ chỉ được chứa các chữ cái.";
      valid = false;
    }

    // Kiểm tra Email
    if (!email) {
      newErrors.email = "Hãy nhập địa chỉ Email.";
      valid = false;
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Hãy nhập địa chỉ Email hợp lệ.";
      valid = false;
    }

    // Kiểm tra Password
    if (!password) {
      newErrors.password = "Hãy nhập mật khẩu.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      valid = false;
    }

    // Kiểm tra Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Hãy nhập lại mật khẩu.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
      valid = false;
    }

    // Kiểm tra Agree to Terms
    if (!agreeTerm) {
      newErrors.agreeTerm = "Bạn phải đồng ý với các điều khoản.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const user = {
        user_name: `${firstName} ${lastName}`,
        email: email,
        password: password,
      };
      // console.log("user ", user);

      await register(user);
    }
  };

  return (
    <ScrollView className="p-4">
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-1">
          <Text className="w-full text-center text-4xl font-c-bold">Tạo tài khoản</Text>
          <Text className="text-center text-red-500">Hãy điền đủ các mục đánh dấu *</Text>
        </View>

        {/* First Name and Last Name */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Tên:
          </Text>

          <Input
            value={firstName}
            onChangeText={validateFirstName}
            placeholder="Nhập tên..."
            className={`placeholder:text-sm ${
              errors.firstName ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.firstName ? (
            <Text className="text-red-500 text-right">{errors.firstName}</Text>
          ) : null}
        </View>

        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Họ:
          </Text>

          <Input
            value={lastName}
            onChangeText={validateLastName}
            placeholder="Nhập họ..."
            className={`placeholder:text-sm ${
              errors.lastName ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.lastName ? (
            <Text className="text-red-500 text-right">{errors.lastName}</Text>
          ) : null}
        </View>

        {/* Email */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Email:
          </Text>

          <Input
            value={email}
            onChangeText={validateEmail}
            inputMode="email"
            keyboardType="email-address"
            placeholder="Nhập địa chỉ Email..."
            className={`placeholder:text-sm ${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.email ? <Text className="text-right text-red-500">{errors.email}</Text> : null}
        </View>

        {/* Password */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Mật khẩu:
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

        {/* Confirm Password */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Mật khẩu xác nhận:
          </Text>

          <Input
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            secureTextEntry
            placeholder="Hãy nhập lại mật khẩu..."
            className={`placeholder:text-sm ${
              errors.confirmPassword ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.confirmPassword ? (
            <Text className="text-right text-red-500">{errors.confirmPassword}</Text>
          ) : null}
        </View>

        {/* Terms and Subscription */}
        <View className="flex flex-row gap-3 items-center">
          <Checkbox
            checked={agreeTerm}
            onCheckedChange={validateAgreeTerm}
            className={errors.agreeTerm ? "border-red-500" : ""}
          />
          <Text
            className={`text-gray-600 dark:text-white ${errors.agreeTerm ? "text-red-500" : ""}`}
          >
            Bạn đồng ý với{" "}
            <Link href="/term-of-use" className="underline">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link href="/privacy-policy" className="underline">
              Chính sách bảo mật
            </Link>{" "}
            của CatCorner.
          </Text>
        </View>

        <View className="flex flex-row gap-3 items-center">
          <Checkbox checked={agreeSubscribe} onCheckedChange={setAgreeSubscribe} />
          <Text className="text-gray-600 dark:text-white">Đăng ký nhận ưu đãi hằng tháng!</Text>
        </View>

        {/* Submit Button */}
        <Button variant="rounded-pri1" size="2xl" onPress={handleSubmit}>
          <Text className="font-c-bold">Đăng ký</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Register;
