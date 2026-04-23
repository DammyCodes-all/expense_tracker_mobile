import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
      colors={["#00327D", "#0047AB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        marginTop: 16,
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 24,
      }}
    >
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-sm font-semibold text-blue-100">
          LIQUID WEALTH PORTFOLIO
        </Text>
        <View className="rounded-full bg-[#4EDEA3]/20 px-3 py-1">
          <Text className="text-sm font-semibold text-green-600">
            {percentageChange}
          </Text>
        </View>
      </View>

      <Text
        className="text-4xl text-white mb-2"
        style={{ fontFamily: "Manrope_700Bold" }}
      >
        {amount}
      </Text>

      <Text className="text-blue-200 text-sm italic mb-6">
        Market valuation as of today
      </Text>

      <View className="flex-row gap-4">
        <Pressable
          onPress={onDeposit}
          className="flex-1 rounded-2xl bg-white/10 py-4"
        >
          <Text
            className="text-center text-white text-lg"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            DEPOSIT
          </Text>
        </Pressable>

        <Pressable
          onPress={onWithdraw}
          className="flex-1 rounded-2xl bg-white/10 py-4"
        >
          <Text
            className="text-center text-white text-lg"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            WITHDRAW
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
