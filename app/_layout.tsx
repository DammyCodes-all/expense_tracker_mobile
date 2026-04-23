import { Slot } from "expo-router";
import { useColorScheme, View, Text as RNText } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { useEffect } from "react";

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

  const scheme = useColorScheme();
  const backgroundColor = scheme === "dark" ? "#1a1a1a" : "#ffffff";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor }}
        edges={["top", "bottom"]}
      >
        <View className="bg-[#F7F9FB] h-full">
          <Slot />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
