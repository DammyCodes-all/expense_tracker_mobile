import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-4 py-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-3 bg-white rounded-xl shadow-sm"
      >
        <HugeiconsIcon
          icon={ArrowLeftIcon}
          size={24}
          color="#000"
          strokeWidth={2.3}
        />
      </TouchableOpacity>
      <Text className="text-lg font-bold ml-4 text-blue-600">{title}</Text>
    </View>
  );
}
