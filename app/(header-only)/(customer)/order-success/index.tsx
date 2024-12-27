import { View, Text } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

export default function PaymentSuccessPage() {
  const { orderId, orderCode } = useLocalSearchParams();
  // console.log("orrrrrrrrrrrrrrrrr", orderId);

  // URL trả về từ trang thanh toán
  // catcorner://order-success?orderId=DH1735300685321.675db4ebd2bd3ceb35c55d8e&code=00&id=8ba86e3e0b5b463eb984f7f3395b531e&cancel=false&status=PAID&orderCode=735300685321
  return (
    <View>
      <Text>PaymentSuccessPage {decodeURIComponent(orderId as string)} -</Text>
      <Link href="/">Go to hompage</Link>
    </View>
  );
}
