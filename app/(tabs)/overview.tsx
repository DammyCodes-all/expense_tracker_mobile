import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import WealthCard from "../../components/WealthCard";

export default function Overview() {
  return (
    <View className="flex-1">
      <Header />
      <WealthCard />
    </View>
  );
}
