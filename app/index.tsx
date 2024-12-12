// import libs
import { View } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";

// import providers
import { AuthContext } from "@/providers";

// import utils
import { AUTH_REGISTER_URL } from "@/utils/constants/urls";

// import components
import { Text } from "@/components/Text";

export default function Screen() {
  const { user } = useContext(AuthContext) || { user: null };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6">
      <Text>ID: {user?.user_id}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Name: {user?.user_name}</Text>
      <Text>Role: {user?.user_role}</Text>
      <Text>Avatar: {user?.user_avt}</Text>

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
