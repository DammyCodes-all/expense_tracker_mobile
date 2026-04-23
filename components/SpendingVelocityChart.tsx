import { PieChart } from "@hugeicons/core-free-icons";
import React from "react";
import { Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";

interface Props {
  data?: number[];
  baseline?: number[];
  labels?: string[];
  percentChange?: number;
  remaining?: number;
}

export default function SpendingVelocityChart({
  data = [60, 80, 70, 45, 90, 85, 95],
  baseline = [80, 95, 90, 70, 100, 95, 100],
  labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  percentChange = 12.4,
  remaining = 1240,
}: Props) {
  const maxVal = Math.max(...baseline, ...data, 1);
  const MAX_HEIGHT = 120; // px

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
            className="text-sm text-green-600"
            style={{ fontFamily: "Manrope_600SemiBold" }}
          >
            {`↗ ${percentChange}%`}
          </Text>
        </View>
      </View>

      <View
        style={{ height: MAX_HEIGHT }}
        className="flex-row items-end justify-between px-2"
      >
        {data.map((val, idx) => {
          const base = baseline[idx] ?? 0;
          const baselineHeight = Math.round((base / maxVal) * MAX_HEIGHT);
          const actualHeight = Math.round((val / maxVal) * MAX_HEIGHT);

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
                {labels[idx]}
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
            {`$${remaining.toFixed(2)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
