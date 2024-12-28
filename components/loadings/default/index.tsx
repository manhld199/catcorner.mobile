import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useColorScheme } from "nativewind";

const LoadingDefault = ({ size }: { size?: number }) => {
  const { colorScheme } = useColorScheme();
  let animationRef = useRef();
  useEffect(() => {
    (animationRef as any).play();
  }, []);

  return (
    <View className="flex-1 w-full h-full flex justify-center items-center bg-transparent">
      <LottieView
        style={{ width: size || 250, height: size || 250 }}
        ref={(animation: any) => {
          animationRef = animation;
        }}
        source={require("./animation.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingDefault;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   smallText: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   lottieView: {
//     width: 300,
//     height: 300,
//   },
// });
