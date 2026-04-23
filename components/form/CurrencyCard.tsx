import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CurrencyCardProps {
  value?: string;
  onPress?: () => void;
}

export default function CurrencyCard({ value, onPress }: CurrencyCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl bg-white p-4 mb-4"
    >
      <View>
        <Text className="text-xs text-gray-500">Amount</Text>
        <Text className="text-2xl text-gray-900 font-semibold mt-1">
          {value ?? "$0.00"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
