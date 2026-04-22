import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface WealthCardProps {
  amount?: string;
  percentageChange?: string;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export default function WealthCard({
  amount = "$42,950.40",
  percentageChange = "+12.5%",
  onDeposit,
  onWithdraw,
}: WealthCardProps) {
  return (
    <LinearGradient
      colors={["00327D", "#0047AB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24, overflow: "hidden" }}
      className="mx-4 mt-4 px-6 py-6"
    >
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-sm font-semibold text-blue-100">
          LIQUID WEALTH PORTFOLIO
        </Text>
        <View className="rounded-full bg-teal-600 px-3 py-1">
          <Text className="text-sm font-semibold text-white">
            {percentageChange}
          </Text>
        </View>
      </View>

      <Text className="text-4xl font-bold text-white mb-2">{amount}</Text>

      <Text className="text-blue-200 text-sm italic mb-6">
        Market valuation as of today
      </Text>

      <View className="flex-row gap-4">
        <Pressable
          onPress={onDeposit}
          className="flex-1 rounded-2xl bg-blue-800 py-4"
        >
          <Text className="text-center font-bold text-white text-lg">
            DEPOSIT
          </Text>
        </Pressable>

        <Pressable
          onPress={onWithdraw}
          className="flex-1 rounded-2xl bg-blue-800 py-4"
        >
          <Text className="text-center font-bold text-white text-lg">
            WITHDRAW
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
