import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CategoryCard from "../../components/CategoryCard";
import Header from "../../components/Header";
import SpendingTrendChart from "../../components/SpendingTrendChart";
import TransactionCard from "../../components/TransactionCard";
import WealthCard from "../../components/WealthCard";
import { useTransactions } from "../../context/transactions-context";
import { LedgerTransaction } from "../../lib/transactions";

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

const TRANSACTIONS: LedgerTransaction[] = [
  {
    id: "seed_apple_store",
    icon: "bag",
    title: "Apple Store",
    category: "Technology",
    time: "2:45 PM",
    amount: 1299.0,
    date: "OCT 12",
    isIncome: false,
    createdAt: "2025-10-12T14:45:00.000Z",
  },
  {
    id: "seed_dividend",
    icon: "money",
    title: "Dividend Payout",
    category: "Investment",
    time: "11:20 AM",
    amount: 450.25,
    date: "OCT 11",
    isIncome: true,
    createdAt: "2025-10-11T11:20:00.000Z",
  },
  {
    id: "seed_dining",
    icon: "cutlery",
    title: "The Gilded Fork",
    category: "Dining",
    time: "8:15 PM",
    amount: 240.5,
    date: "OCT 10",
    isIncome: false,
    createdAt: "2025-10-10T20:15:00.000Z",
  },
  {
    id: "seed_spotify",
    icon: "money",
    title: "Spotify Premium",
    category: "Entertainment",
    time: "10:30 AM",
    amount: 9.99,
    date: "OCT 9",
    isIncome: false,
    createdAt: "2025-10-09T10:30:00.000Z",
  },
];

export default function Overview() {
  const router = useRouter();
  const { transactions, isHydrated } = useTransactions();
  const recentLedger = isHydrated
    ? [...transactions, ...TRANSACTIONS]
    : TRANSACTIONS;

  return (
    <View className="flex-1 relative">
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
            {recentLedger.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction")}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <HugeiconsIcon icon={PlusSignIcon} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
