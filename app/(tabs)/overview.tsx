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
        <View className="w-full flex mt-4 px-4 flex-row justify-between items-center font-semibold">
          <Text className="text-lg">Allocations</Text>
          <Text className="font-semibold text-blue-600">View All</Text>
        </View>
      </View>
    </View>
  );
}
