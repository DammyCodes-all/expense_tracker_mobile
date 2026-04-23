import { Note01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import BackHeader from "../components/BackHeader";
import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../context/transactions-context";

export default function RecentLedgers() {
  const router = useRouter();
  const { transactions, isHydrated } = useTransactions();

  return (
    <View className="flex-1 bg-white">
      <BackHeader title="Recent Ledger" />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isHydrated ? (
          <>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <View className="flex-1 items-center justify-center py-12">
                <Text
                  className="text-lg text-gray-500"
                  style={{ fontFamily: "Manrope_500Medium" }}
                >
                  No transactions yet
                </Text>
              </View>
            )}

            {/* New Entry Card */}
            <View className="mt-8 mb-4 items-center rounded-2xl bg-blue-50 py-8">
              <View className="mb-4 h-12 w-12 items-center justify-center rounded-2xl bg-blue-200">
                <HugeiconsIcon icon={Note01Icon} size={24} color="#2563eb" />
              </View>
              <Text
                className="text-lg text-gray-900"
                style={{ fontFamily: "Manrope_700Bold" }}
              >
                New Entry
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                Record a new Allocation
              </Text>
              <Pressable
                onPress={() => router.push("/add-transaction")}
                className="w-4/5 rounded-lg bg-blue-900 py-4 items-center"
              >
                <Text
                  className="text-base text-white"
                  style={{ fontFamily: "Manrope_700Bold" }}
                >
                  Quick Add
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <Text
              className="text-lg text-gray-400"
              style={{ fontFamily: "Manrope_500Medium" }}
            >
              Loading...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
