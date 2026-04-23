import React from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";

export default function AddBudget() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <BackHeader title="Add Budget" />

      <View className="px-4 py-6">
        <Text className="text-base text-gray-700 mb-2" style={{ fontFamily: "Manrope_600SemiBold" }}>
          Category
        </Text>
        <TextInput className="rounded-lg border border-gray-200 p-3 mb-4" placeholder="e.g., Groceries" />

        <Text className="text-base text-gray-700 mb-2" style={{ fontFamily: "Manrope_600SemiBold" }}>
          Budget Limit
        </Text>
        <TextInput className="rounded-lg border border-gray-200 p-3 mb-4" placeholder="$0.00" keyboardType="numeric" />

        <Pressable onPress={() => router.back()} className="rounded-lg bg-blue-600 py-3 items-center mt-4">
          <Text className="text-white" style={{ fontFamily: "Manrope_700Bold" }}>
            Save Budget
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
