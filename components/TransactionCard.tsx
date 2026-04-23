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

interface Transaction {
  icon: string;
  title: string;
  category: string;
  time: string;
  amount: number;
  date: string;
  isIncome?: boolean;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const amountColor = transaction.isIncome ? "text-green-500" : "text-red-500";
  const amountSign = transaction.isIncome ? "+" : "-";
  const iconObject = ICON_MAP[transaction.icon] || Money03Icon;

  return (
    <View className="mb-4 flex flex-row items-center rounded-xl bg-gray-200 p-4">
      <View className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
        <HugeiconsIcon icon={iconObject} size={20} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">
          {transaction.title}
        </Text>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-xs font-medium uppercase text-gray-500">
            {transaction.category}
          </Text>
          <Text className="text-xs text-gray-400">•</Text>
          <Text className="text-xs text-gray-500">{transaction.time}</Text>
        </View>
      </View>

      <View className="flex items-end">
        <Text className={`text-base font-semibold ${amountColor}`}>
          {amountSign}${transaction.amount.toFixed(2)}
        </Text>
        <Text className="text-xs text-gray-400">{transaction.date}</Text>
      </View>
    </View>
  );
}
