// import libs
import { View } from "react-native";
import { Slot } from "expo-router";
import { Fragment } from "react";

export default function RootLayout() {
  return (
    <Fragment>
      <View className="flex-1">
        <Slot />
      </View>
    </Fragment>
  );
}
