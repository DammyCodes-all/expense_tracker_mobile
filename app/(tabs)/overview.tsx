import React from "react";
import { ScrollView, Text, View } from "react-native";
import Header from "../../components/Header";
import WealthCard from "../../components/WealthCard";
import CategoryCard from "../../components/CategoryCard";
import SpendingTrendChart from "../../components/SpendingTrendChart";
import {
  CarIcon,
  CuttleryIcon,
  BagIcon,
  MoneyIcon,
} from "../../components/svg";

const CATEGORIES = [
  {
    title: "Transport",
    amount: 320,
    budget: 700,
    icon: CarIcon,
  },
  {
    title: "Dining Out",
    amount: 485,
    budget: 500,
    icon: CuttleryIcon,
  },
  {
    title: "Groceries",
    amount: 250,
    budget: 400,
    icon: BagIcon,
  },
  {
    title: "Utilities",
    amount: 150,
    budget: 200,
    icon: MoneyIcon,
  },
  {
    title: "Entertainment",
    amount: 200,
    budget: 300,
    icon: CarIcon,
  },
];

export default function Overview() {
  return (
    <View className="flex-1">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="mx-4 space-y-6">
          <WealthCard />
          {/* Allocations */}
          <View className="w-full flex mt-4 px-4 flex-row justify-between items-center font-semibold">
            <Text className="text-lg">Allocations</Text>
            <Text className="font-semibold text-blue-600">View All</Text>
          </View>
          <ScrollView
            className="mt-4 -mx-3"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                amount={category.amount}
                budget={category.budget}
                icon={category.icon}
              />
            ))}
          </ScrollView>
          {/* Spending Trend Chart */}
          <SpendingTrendChart />

          <View className="w-full flex mt-4 px-4 flex-row justify-between items-center font-semibold">
            <Text className="text-lg">Recent Ledger</Text>
            <Text className="font-semibold text-blue-600">View All</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
