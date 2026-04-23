import React from "react";
import { ScrollView, Text, View } from "react-native";
import Header from "../../components/Header";
import WealthCard from "../../components/WealthCard";
import CategoryCard from "../../components/CategoryCard";
import SpendingTrendChart from "../../components/SpendingTrendChart";
import TransactionCard from "../../components/TransactionCard";

const CATEGORIES = [
  {
    title: "Transport",
    amount: 320,
    budget: 700,
    icon: "car",
  },
  {
    title: "Dining Out",
    amount: 485,
    budget: 500,
    icon: "cutlery",
  },
  {
    title: "Groceries",
    amount: 250,
    budget: 400,
    icon: "bag",
  },
  {
    title: "Utilities",
    amount: 150,
    budget: 200,
    icon: "money",
  },
  {
    title: "Entertainment",
    amount: 200,
    budget: 300,
    icon: "car",
  },
];

const TRANSACTIONS = [
  {
    icon: "bag",
    title: "Apple Store",
    category: "Technology",
    time: "2:45 PM",
    amount: 1299.0,
    date: "OCT 12",
    isIncome: false,
  },
  {
    icon: "money",
    title: "Dividend Payout",
    category: "Investment",
    time: "11:20 AM",
    amount: 450.25,
    date: "OCT 11",
    isIncome: true,
  },
  {
    icon: "cutlery",
    title: "The Gilded Fork",
    category: "Dining",
    time: "8:15 PM",
    amount: 240.5,
    date: "OCT 10",
    isIncome: false,
  },
  {
    icon: "money",
    title: "Spotify Premium",
    category: "Entertainment",
    time: "10:30 AM",
    amount: 9.99,
    date: "OCT 9",
    isIncome: false,
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

          <View className="mt-4">
            {TRANSACTIONS.map((transaction, index) => (
              <TransactionCard
                key={index}
                transaction={transaction}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
