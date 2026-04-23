import React from "react";
import { Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ShoppingBag02Icon,
  Car01Icon,
  KitchenUtensilsIcon,
  Money03Icon,
} from "@hugeicons/core-free-icons";

const ICON_MAP: Record<string, any> = {
  car: Car01Icon,
  cutlery: KitchenUtensilsIcon,
  bag: ShoppingBag02Icon,
  money: Money03Icon,
};

interface CategoryCardProps {
  title: string;
  amount: number;
  budget: number;
  icon: string;
  iconColor?: string;
}

export default function CategoryCard({
  title,
  amount,
  budget,
  icon,
  iconColor = "#0047AB",
}: CategoryCardProps) {
  const iconObject = ICON_MAP[icon] || Money03Icon;
  const percentageSpent = (amount / budget) * 100;
  const amountLeft = budget - amount;
  const isOverBudget = amount > budget;

  // Determine progress bar color based on percentage
  let progressBarColor = "#0047AB";
  if (percentageSpent > 85) {
    progressBarColor = "#DC2626";
  } else if (percentageSpent > 70) {
    progressBarColor = "#EA580C";
  } else if (percentageSpent > 50) {
    progressBarColor = "#EAB308";
  }

  return (
    <View
      className="rounded-2xl p-4 bg-white"
      style={{
        width: 160,
        minHeight: 160,
      }}
    >
      <View className="items-start mb-3">
        <View className="p-2 rounded-full bg-slate-100 grid place-items-center">
          <HugeiconsIcon icon={iconObject} size={18} color={iconColor} />
        </View>
      </View>

      <Text className="text-sm font-semibold text-slate-700 mb-1">{title}</Text>

      <Text className="text-xl font-bold text-blue-700 mb-2">${amount}</Text>

      <View className="bg-slate-200 rounded-full h-2 mb-1.5 overflow-hidden">
        <View
          style={{
            width: `${Math.min(percentageSpent, 100)}%`,
            height: "100%",
            backgroundColor: progressBarColor,
          }}
        />
      </View>

      <Text
        className={`text-xs font-bold ${
          isOverBudget ? "text-red-600" : "text-slate-600"
        }`}
      >
        ${isOverBudget ? `${amount - budget} OVER` : `${amountLeft} LEFT`}
      </Text>
    </View>
  );
}
