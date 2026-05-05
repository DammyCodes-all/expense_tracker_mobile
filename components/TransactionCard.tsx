import React from "react";
import { Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  LedgerTransaction,
  TRANSACTION_ICON_COMPONENTS,
} from "../lib/transactions";

interface TransactionCardProps {
  transaction: LedgerTransaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const amountColor = transaction.isIncome ? "text-green-500" : "text-red-500";
  const amountSign = transaction.isIncome ? "+" : "-";
  const iconObject =
    TRANSACTION_ICON_COMPONENTS[transaction.icon] ||
    TRANSACTION_ICON_COMPONENTS.note;

  return (
    <View className="mb-4 flex flex-row items-center rounded-xl bg-gray-200 p-4 web:hover:bg-gray-300 ">
      <View className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
        <HugeiconsIcon icon={iconObject} className="text-blue-600" size={20} />
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
