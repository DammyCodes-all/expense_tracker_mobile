import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import "./global.css";

export default function RootLayout() {
  const scheme = useColorScheme();
  const backgroundColor = scheme === "dark" ? "#000000" : "#ffffff";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor }}
        edges={["top", "bottom"]}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
