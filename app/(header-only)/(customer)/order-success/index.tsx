import { View, Text } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

export default function PaymentSuccessPage() {
  const { orderId } = useLocalSearchParams();
  console.log("sssssssssssssssssssss", orderId);

  return (
    <View>
      <Text>PaymentSuccessPage {decodeURIComponent(orderId as string)} -</Text>
      <Link href="/">Go to hompage</Link>
    </View>
  );
}
