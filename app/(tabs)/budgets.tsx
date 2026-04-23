import Header from "@/components/Header";
import SpendingVelocityChart from "@/components/SpendingVelocityChart";
import BudgetBurnCard from "@/components/BudgetBurnCard";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Budgets() {
  return (
    <View className="flex-1 relative ">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="mx-4 flex gap-6">
          <BudgetBurnCard />
          <SpendingVelocityChart />{" "}
        </View>
      </ScrollView>
    </View>
  );
}
