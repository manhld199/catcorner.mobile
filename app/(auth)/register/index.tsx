// import libs
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Link, useRouter } from "expo-router";

// import components
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

// import providers
import { AuthContext } from "@/providers";

interface IUser {
  user_id?: string;
  user_name?: string;
  email: string;
  user_role?: string;
  user_avt?: string;
  password?: string;
}

const Register = () => {
  const router = useRouter();

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
    if (text === "") setErrors((prev) => ({ ...prev, firstName: "First name is required." }));
    else if (!text.match(nameRegex)) {
      setErrors((prev) => ({ ...prev, firstName: "First name must contain only letters." }));
    } else {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  };

  const validateLastName = (text: string) => {
    setLastName(text);
    if (text === "") setErrors((prev) => ({ ...prev, lastName: "Last name is required." }));
    else if (!text.match(nameRegex)) {
      setErrors((prev) => ({ ...prev, lastName: "Last name must contain only letters." }));
    } else {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  };

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

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Password does not match." }));
    } else if (text === "") {
      setErrors((prev) => ({ ...prev, confirmPassword: "Confirm password is required" }));
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
        agreeTerm: "You must agree to the terms and conditions.",
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
      newErrors.firstName = "First name is required.";
      valid = false;
    } else if (!firstName.match(nameRegex)) {
      newErrors.firstName = "First name must contain only letters.";
      valid = false;
    }

    // Kiểm tra Last Name
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    } else if (!lastName.match(nameRegex)) {
      newErrors.lastName = "Last name must contain only letters.";
      valid = false;
    }

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

    // Kiểm tra Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password does not match.";
      valid = false;
    }

    // Kiểm tra Agree to Terms
    if (!agreeTerm) {
      newErrors.agreeTerm = "You must agree to the terms and conditions.";
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
          <Text className="w-full text-center text-4xl font-c-bold">Create your account</Text>
          <Text className="text-center text-red-500">
            Vui lòng không để trống các mục đánh dấu *
          </Text>
        </View>

        {/* First Name and Last Name */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> First Name:
          </Text>

          <Input
            value={firstName}
            onChangeText={validateFirstName}
            placeholder="Enter first name..."
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
            <Text className="text-red-500">*</Text> Last Name:
          </Text>

          <Input
            value={lastName}
            onChangeText={validateLastName}
            placeholder="Enter last name..."
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
            placeholder="Enter email address..."
            className={`placeholder:text-sm ${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.email ? <Text className="text-right text-red-500">{errors.email}</Text> : null}
        </View>

        {/* Password */}
        <View className="flex flex-col gap-2">
          <Text className="text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Password:
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

        {/* Confirm Password */}
        <View className="flex flex-col gap-2">
          <Text className="w-[150px] text-gray-600 dark:text-white font-c-semibold">
            <Text className="text-red-500">*</Text> Confirm password:
          </Text>

          <Input
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            secureTextEntry
            placeholder="Enter confirm password..."
            className={`placeholder:text-sm ${
              errors.confirmPassword ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />

          {errors.confirmPassword ? (
            <Text className="text-right text-red-500">{errors.confirmPassword}</Text>
          ) : null}
        </View>

        {/* Terms and Subscription */}
        <View className="flex flex-row gap-2">
          <Checkbox
            checked={agreeTerm}
            onCheckedChange={validateAgreeTerm}
            className={errors.agreeTerm ? "border-red-500" : ""}
          />
          <Text
            className={`text-gray-600 dark:text-white ${errors.agreeTerm ? "text-red-500" : ""}`}
          >
            Agree to our{" "}
            <Link href="/term-of-use" className="underline">
              Terms of use
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </Text>
        </View>

        <View className="flex flex-row gap-2">
          <Checkbox checked={agreeSubscribe} onCheckedChange={setAgreeSubscribe} />
          <Text className="text-gray-600 dark:text-white">Subscribe to our monthly newsletter</Text>
        </View>

        {/* Submit Button */}
        <Button variant="rounded-pri1" size="2xl" onPress={handleSubmit}>
          <Text className="font-c-bold">Sign up</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Register;
