import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface SpendingTrendChartProps {
  data?: Array<{ value: number; label: string }>;
  dateRange?: string;
}

const DEFAULT_DATA = [
  { value: 50, label: "W1" },
  { value: 100, label: "W2" },
  { value: 420, label: "W3" },
  { value: 280, label: "W4" },
  { value: 320, label: "W5" },
];

export default function SpendingTrendChart({
  data = DEFAULT_DATA,
  dateRange = "Oct 1 - Oct 15, 2023",
}: SpendingTrendChartProps) {
  return (
    <View className="mt-6 rounded-3xl bg-white p-4 shadow">
      <View className="mb-4 flex flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            Spending Trend
          </Text>
          <Text className="text-sm text-gray-500">{dateRange}</Text>
        </View>
        <View className="h-3 w-3 rounded-full bg-blue-600" />
      </View>

      <View className="flex items-center justify-center">
        <LineChart
          data={data}
          height={200}
          showVerticalLines={false}
          curved
          spacing={80}
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
