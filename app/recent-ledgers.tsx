import { ScrollView, Text, View } from "react-native";
import BackHeader from "../components/BackHeader";
import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../context/transactions-context";

export default function RecentLedgers() {
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
          transactions.length > 0 ? (
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
          )
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
