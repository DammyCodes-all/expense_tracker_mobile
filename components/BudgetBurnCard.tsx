import { useTransactions } from "@/context/transactions-context";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { buildBudgetSummary } from "../lib/spending-metrics";

interface BudgetBurnCardProps {
  title?: string;
  spent?: number;
  limit?: number;
  status?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function BudgetBurnCard({
  title = "MONTHLY BURN",
  spent = undefined,
  limit = undefined,
  status = "ON TRACK",
}: BudgetBurnCardProps) {
  const { categories, transactions } = useTransactions();

  const budgetSummary = buildBudgetSummary(categories, transactions);

  const finalLimit = typeof limit === "number" ? limit : budgetSummary.totalBudget || 1;
  const finalSpent = typeof spent === "number" ? spent : budgetSummary.totalSpent || 0;

  const safeLimit = Math.max(finalLimit, 1);
  const progress = Math.min(Math.max(finalSpent / safeLimit, 0), 1);
  const left = Math.max(finalLimit - finalSpent, 0);

  return (
    <LinearGradient
      colors={["#134AA3", "#0F4AA8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex gap-3"
      style={{
        marginTop: 12,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 14,
      }}
    >
      <View className="mb-3 flex-row items-start justify-between gap-2">
        <View className="flex gap-3">
          <Text
            className="text-xs tracking-[2.8px] text-blue-100"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            {title}
          </Text>
          <Text
            className="mt-1 text-[32px] leading-[36px] text-gray-100"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            {formatCurrency(finalSpent)}
          </Text>
        </View>
        <View className="rounded-full bg-[#0A8F5E] px-3 py-1">
          <Text
            className="text-sm text-[#D8FEEB]"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            {status}
          </Text>
        </View>
      </View>
      <View className="mb-4 mt-2 h-3 overflow-hidden rounded-full border border-[#CFD8E7] bg-[#D9E0EA]">
        <View
          className="h-full rounded-full bg-[#A8BDE0]"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </View>

      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm text-[#D5E6FF]"
          style={{ fontFamily: "Manrope_600SemiBold" }}
        >
          {`${Math.round(progress * 100)}% of ${formatCurrency(finalLimit)} limit`}
        </Text>
        <Text
          className="text-sm text-[#D5E6FF]"
          style={{ fontFamily: "Manrope_600SemiBold" }}
        >
          {`${formatCurrency(left)} left`}
        </Text>
      </View>
    </LinearGradient>
  );
}
