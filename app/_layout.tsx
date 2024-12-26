// import styles
import "@/global.css";

// import libs
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Slot } from "expo-router";
import {
  JosefinSans_100Thin,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold,
  JosefinSans_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";

// import providers
import { AuthProvider, ThemeProvider } from "@/providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    JosefinSans_100Thin,
    JosefinSans_100Thin_Italic,
    JosefinSans_200ExtraLight,
    JosefinSans_200ExtraLight_Italic,
    JosefinSans_300Light,
    JosefinSans_300Light_Italic,
    JosefinSans_400Regular,
    JosefinSans_400Regular_Italic,
    JosefinSans_500Medium,
    JosefinSans_500Medium_Italic,
    JosefinSans_600SemiBold,
    JosefinSans_600SemiBold_Italic,
    JosefinSans_700Bold,
    JosefinSans_700Bold_Italic,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaView className="w-full h-full flex">
          <Slot />
          <Toast />
        </SafeAreaView>
      </ThemeProvider>
    </AuthProvider>
  );
}
