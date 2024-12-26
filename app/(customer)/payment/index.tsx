// import libs
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

// import components
import { Text } from "@/components/Text";

const PAYMENT_PRODUCTS = "PAYMENT_PRODUCTS";

export default function PaymentPage() {
  const router = useRouter();

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const storedData = await AsyncStorage.getItem(PAYMENT_PRODUCTS);

        if (!storedData) {
          Toast.show({
            type: "error",
            text1: "Oops!!!",
            text2: "Không tìm thấy dữ liệu thanh toán, vui lòng thử lại sau!",
          });
          router.back();
          return;
        }

        const paymentData = JSON.parse(storedData);
        await AsyncStorage.removeItem(PAYMENT_PRODUCTS);
        // console.log("paymentData", paymentData);

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/payos/create-payment-link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          }
        );

        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Oops!!!",
            text2: "Không thể tạo liên kết thanh toán, vui lòng thử lại sau!",
          });
          router.back();
          return;
        }

        if (paymentData.payment_method == "onl") {
          const htmlContent = await response.text();
          setHtmlContent(htmlContent);
        } else if (paymentData.payment_method == "cod") {
          router.push(`/order-success?orderId=${encodeURIComponent(paymentData.order_id)}`);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: "Không thể tạo liên kết thanh toán, vui lòng thử lại sau!",
        });
        router.back();
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentLink();
  }, []);

  const handleShouldStartLoad = (event: any) => {
    const { url } = event;
    // console.log("URL được WebView gọi:", url);

    if (url.startsWith("catcorner://")) {
      Linking.openURL(url); // Xử lý custom scheme
      // router.replace("/"); // Chuyển hướng ứng dụng nếu cần
      return false; // Dừng WebView xử lý URL
    }
    return true; // Tiếp tục tải URL trong WebView
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!htmlContent) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lỗi khi tạo liên kết thanh toán.</Text>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={handleShouldStartLoad} // Thay thế phương thức này
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
