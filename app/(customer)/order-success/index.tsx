import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function PaymentSuccessPage() {
  return (
    <View>
      <Text>PaymentSuccessPage</Text>
      <Link href="/">Go to hompage</Link>
    </View>
  );
}
