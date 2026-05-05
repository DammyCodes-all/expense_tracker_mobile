import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CategoryCard from "../../components/CategoryCard";
import Header from "../../components/Header";
import SpendingTrendChart from "../../components/SpendingTrendChart";
import TransactionCard from "../../components/TransactionCard";
import WealthCard from "../../components/WealthCard";
import { useTransactions } from "../../context/transactions-context";

export default function Overview() {
  const router = useRouter();
  const { transactions, categories, categoryStats } = useTransactions();
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === "web" && width >= 920;
  const isCompactWeb = Platform.OS === "web" && width < 640;

  return (
    <View className="flex-1 relative">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWideWeb ? 128 : 112,
          paddingHorizontal: isCompactWeb ? 14 : 0,
        }}
      >
        <View
          className="mx-4 space-y-6 web:mx-auto web:w-full"
          style={{
            maxWidth: Platform.OS === "web" ? 1120 : undefined,
            paddingHorizontal: isWideWeb ? 32 : 0,
          }}
        >
          <View
            style={{
              flexDirection: isWideWeb ? "row" : "column",
              gap: isWideWeb ? 24 : 0,
              alignItems: "stretch",
            }}
          >
            <View style={{ flex: isWideWeb ? 1.05 : undefined }}>
              <WealthCard />
            </View>
            <View style={{ flex: isWideWeb ? 0.95 : undefined }}>
              <SpendingTrendChart />
            </View>
          </View>
          {/* Allocations */}
          <View className="w-full flex mt-4 px-1 web:px-0 flex-row justify-between items-center font-semibold">
            <Text className="text-lg font-sans">Allocations</Text>
            <Text className="font-semibold text-blue-600 cursor-pointer web:hover:text-blue-800">
              View All
            </Text>
          </View>
          <ScrollView
            className="mt-4 -mx-3"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {(categories || []).map((category) => {
              const stat = categoryStats[category.id];

              return (
                <CategoryCard
                  key={category.id}
                  title={category.name}
                  amount={stat?.spent ?? category.amountSpent ?? 0}
                  budget={stat?.budget ?? category.budget ?? 0}
                  icon={category.icon ?? "bag"}
                />
              );
            })}
          </ScrollView>

          <View className="w-full flex mt-4 px-1 web:px-0 flex-row justify-between items-center font-semibold">
            <Text className="text-lg font-sans">Recent Ledger</Text>
            <Pressable
              className="rounded-lg px-2 py-1 web:hover:bg-blue-50"
              onPress={() => router.push("/recent-ledgers")}
            >
              <Text className="font-semibold text-blue-600">View All</Text>
            </Pressable>
          </View>

          <View className="mt-4 rounded-3xl">
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction")}
        className="absolute bottom-6 right-6 web:bottom-28 web:right-10 w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center web:hover:bg-blue-700 web:active:bg-blue-800"
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
