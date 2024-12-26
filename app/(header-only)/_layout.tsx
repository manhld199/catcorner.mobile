// import libs
import { View } from "react-native";
import { Slot } from "expo-router";
import { Fragment } from "react";

// import components
import { CustomerHeader } from "@/partials";

export default function RootLayout() {
  return (
    <Fragment>
      <CustomerHeader />

      <View className="flex-1">
        <Slot />
      </View>
    </Fragment>
  );
}
