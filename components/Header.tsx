import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { BellDotIcon } from "@hugeicons/core-free-icons";

export default function Header() {
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex flex-row gap-4 items-center flex-1">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            }}
            className="w-12 h-12 rounded-full"
          />

          <Text
            className="text-lg  text-blue-700 font-sans"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            Sovereign Ledger
          </Text>
        </View>

        <View className="p-3 rounded-xl grid place-items-center bg-white shadow-sm">
          <HugeiconsIcon icon={BellDotIcon} size={24} />
        </View>
      </View>
    </View>
  );
}
