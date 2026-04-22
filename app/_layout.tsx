import { Slot } from "expo-router";
import { useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const scheme = useColorScheme();
  const backgroundColor = scheme === "dark" ? "#1a1a1a" : "#ffffff";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor }}
        edges={["top", "bottom"]}
      >
        <View className="bg-neutral-50 h-full">
          <Slot />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
