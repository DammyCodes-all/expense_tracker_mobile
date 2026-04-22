import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/Header";
import WealthCard from "../../components/WealthCard";

export default function Overview() {
  return (
    <View className="flex-1">
      <Header />
      <View className="mx-4 space-y-6">
        <WealthCard />
        {/* Allocations */}
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-lg">ALLOCATIONS</Text>
          <Text className="text-sm text-blue-600">View All</Text>
        </View>
      </View>
    </View>
  );
}
