import { useTransactions } from "@/context/transactions-context";
import { PieChart } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import {
  buildBudgetSummary,
  buildSpendingVelocitySeries,
} from "../lib/spending-metrics";

interface Props {
  data?: number[];
  baseline?: number[];
  labels?: string[];
  percentChange?: number;
  remaining?: number;
}

export default function SpendingVelocityChart({
  data,
  baseline,
  labels,
  percentChange,
  remaining,
}: Props) {
  const { transactions, categories } = useTransactions();

  const derived = useMemo(
    () => buildSpendingVelocitySeries(transactions),
    [transactions],
  );

  const chartData: number[] = data ?? derived.data;
  const chartBaseline: number[] = baseline ?? derived.baseline;
  const chartLabels: string[] = labels ?? derived.labels;
  const chartPercentChange: number = percentChange ?? derived.percentChange;
  const chartRemaining = remaining ?? buildBudgetSummary(categories, transactions).remaining;

  const MAX_HEIGHT = 120; // px
  const seriesMax = Math.max(...chartBaseline, ...chartData, 1);
  const isPositive = chartPercentChange >= 0;

  return (
    <View className="rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between mb-8">
        <View>
          <Text
            className="text-lg text-gray-900"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            Spending Velocity
          </Text>
          <Text
            className="text-xs text-gray-400 mt-1"
            style={{ fontFamily: "Manrope_500Medium" }}
          >
            Trend relative to baseline
          </Text>
        </View>

        <View className="rounded-full bg-green-50 px-3 py-1">
          <Text
            className={`text-sm ${isPositive ? "text-green-600" : "text-rose-600"}`}
            style={{ fontFamily: "Manrope_600SemiBold" }}
          >
            {`${isPositive ? "↗" : "↘"} ${Math.abs(chartPercentChange).toFixed(1)}%`}
          </Text>
        </View>
      </View>

      <View
        style={{ height: MAX_HEIGHT }}
        className="flex-row items-end justify-between px-2"
      >
        {chartData.map((val: number, idx: number) => {
          const base = chartBaseline[idx] ?? 0;
          const baselineHeight = Math.round((base / seriesMax) * MAX_HEIGHT);
          const actualHeight = Math.round((val / seriesMax) * MAX_HEIGHT);

          return (
            <View key={idx} className="items-center" style={{ width: 30 }}>
              <View
                className="rounded-t-md"
                style={{
                  height: baselineHeight,
                  width: 20,
                  backgroundColor: "#E6EEF9",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  overflow: "hidden",
                }}
              >
                <View
                  className="rounded-t-md"
                  style={{
                    height: actualHeight,
                    width: "100%",
                    backgroundColor: "#5C9BD6",
                  }}
                />
              </View>

              <Text
                className="text-xs text-gray-400 mt-2"
                style={{ fontFamily: "Manrope_600SemiBold" }}
              >
                {chartLabels[idx]}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="mt-4 rounded-2xl bg-white border border-gray-100 p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-full">
              <HugeiconsIcon icon={PieChart} />
            </View>
            <Text
              className="text-sm text-gray-700"
              style={{ fontFamily: "Manrope_600SemiBold" }}
            >
              Budget Remaining
            </Text>
          </View>

          <Text
            className="text-sm text-green-600"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            {`$${chartRemaining.toFixed(2)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
