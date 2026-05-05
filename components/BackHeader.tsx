import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

interface BackHeaderProps {
  title: string;
  fallbackRoute?: Href;
}

export default function BackHeader({
  title,
  fallbackRoute = "/budgets",
}: BackHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS === "web") {
      const historyLength =
        typeof window !== "undefined" ? window.history.length : 0;

      if (historyLength > 1) {
        window.history.back();
        return;
      }

      router.replace(fallbackRoute);
      return;
    }

    router.back();
  };

  return (
    <View className="flex-row items-center px-4 py-4">
      <Pressable
        onPress={handleBack}
        className="p-3 bg-white rounded-xl shadow-sm web:cursor-pointer"
      >
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          size={24}
          color="#000"
          strokeWidth={2.3}
        />
      </Pressable>
      <Text
        className="text-lg ml-4 text-blue-600"
        style={{ fontFamily: "Manrope_700Bold" }}
      >
        {title}
      </Text>
    </View>
  );
}
