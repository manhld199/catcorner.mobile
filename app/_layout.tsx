// import styles
import "@/global.css";

// import libs
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
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

// import components
import { ThemeToggle } from "@/components";

// import providers
import { ThemeProvider } from "@/providers";

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
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Starter Base",
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
