// import libs
import { View } from "react-native";
import { Link } from "expo-router";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Link href="/register" className="dark:text-white font-c-bold">
        Go to auth register
      </Link>
      <Link href="/login" className="dark:text-white font-c-bold-italic">
        Go to auth login
      </Link>
      <Link href="/profile" className="dark:text-white font-c-bold-italic">
        Go to auth login
      </Link>
    </View>
  );
}
