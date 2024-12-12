// import libs
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { AUTH_REGISTER_URL } from "@/utils/constants/urls";
import { Button } from "@/components/Button";
import Toast from "react-native-toast-message";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6">
      <Link
        href="/verify-email?email=leducmanh123kt@gmail.com"
        className="dark:text-white font-c-bold"
      >
        Go to auth verify
      </Link>

      <Link href="/register" className="dark:text-white font-c-bold">
        Go to auth register
      </Link>
      <Link href="/login" className="dark:text-white font-c-bold-italic">
        Go to auth login
      </Link>

      <Text>{AUTH_REGISTER_URL}</Text>
    </View>
  );
}
