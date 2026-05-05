import { useTransactions } from "@/context/transactions-context";
import React, { useMemo } from "react";
import { Platform, Text, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { buildSpendingTrendSeries } from "../lib/spending-metrics";

interface SpendingTrendChartProps {
  data?: { value: number; label: string }[];
  dateRange?: string;
}

export default function SpendingTrendChart({
  data,
  dateRange,
}: SpendingTrendChartProps) {
  const { transactions } = useTransactions();
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === "web" && width >= 920;

  const derived = useMemo(
    () => buildSpendingTrendSeries(transactions),
    [transactions],
  );

  const chartData = data ?? derived.data;
  const resolvedDateRange = dateRange ?? derived.dateRange;
  const chartSpacing = isWideWeb
    ? Math.min(82, Math.max(58, (width - 160) / 16))
    : Math.min(64, Math.max(46, (width - 72) / 6));

  return (
    <View className="mt-6 rounded-3xl bg-white p-4 shadow web:border web:border-slate-100 web:shadow-sm">
      <View className="mb-4 flex flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            Spending Trend
          </Text>
          <Text className="text-sm text-gray-500">{resolvedDateRange}</Text>
        </View>
        <View className="h-3 w-3 rounded-full bg-blue-600" />
      </View>

      <View className="flex items-center justify-center">
        <LineChart
          data={chartData}
          height={200}
          showVerticalLines={false}
          curved
          spacing={chartSpacing}
          color="#2563eb"
          thickness={3}
          yAxisColor="transparent"
          xAxisColor="transparent"
          hideYAxisText={true}
          labelsExtraHeight={15}
          textColor="rgba(100, 100, 100, 0.8)"
          dataPointsHeight={12}
          dataPointsWidth={12}
          dataPointsRadius={6}
          isAnimated
          hideRules
          focusEnabled
          showStripOnFocus
          showTextOnFocus
          dataPointsColor="#2563eb"
          xAxisLabelTextStyle={{
            color: "rgba(100, 100, 100, 0.8)",
            fontSize: 12,
          }}
        />
      </View>
    </View>
  );
}
