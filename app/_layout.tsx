import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text as RNText, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TransactionsProvider } from "../context/transactions-context";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const scheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});

      const anyText = RNText as any;
      anyText.defaultProps = anyText.defaultProps || {};

      const existing = anyText.defaultProps.style;

      if (Array.isArray(existing)) {
        anyText.defaultProps.style = [
          { fontFamily: "Manrope_400Regular" },
          ...existing,
        ];
      } else if (existing) {
        anyText.defaultProps.style = [
          { fontFamily: "Manrope_400Regular" },
          existing,
        ];
      } else {
        anyText.defaultProps.style = { fontFamily: "Manrope_400Regular" };
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const backgroundColor = scheme === "dark" ? "#1a1a1a" : "#ffffff";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor }}
        edges={["top", "bottom"]}
      >
        <TransactionsProvider>
          <View className="bg-[#F7F9FB] h-full">
            <Slot />
          </View>
        </TransactionsProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
