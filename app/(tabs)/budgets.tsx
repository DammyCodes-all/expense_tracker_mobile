import BudgetBurnCard from "@/components/BudgetBurnCard";
import CategoryChip from "@/components/CategoryChip";
import Header from "@/components/Header";
import SpendingVelocityChart from "@/components/SpendingVelocityChart";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTransactions } from "@/context/transactions-context";

export default function Budgets() {
  const router = useRouter();

  const { categories } = useTransactions();

  return (
    <View className="flex-1 relative">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 112 }}
      >
        <View className="mx-4 flex gap-6 web:mx-auto web:w-full web:max-w-[1080px] web:px-8">
          <View className="web:flex-row web:gap-6">
            <View className="web:flex-1">
              <BudgetBurnCard />
            </View>
            <View className="web:flex-1">
              <SpendingVelocityChart />
            </View>
          </View>
          <View className="p-4  bg-white rounded-3xl">
            <Text className=" mb-2 font-sans uppercase font-semibold">
              Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-3"
              contentContainerStyle={{ paddingHorizontal: 8, gap: 12 }}
            >
              {(categories || []).map((c) => (
                <CategoryChip key={c.id} title={c.name} icon={c.icon} />
              ))}

              <Pressable
                onPress={() => router.push("/add-budget")}
                className="bg-gray-200 rounded-2xl px-8 py-4 items-center justify-center"
              >
                <View className="">
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={18}
                    className="text-slate-700"
                  />
                </View>
                <Text className="text-sm font-semibold text-slate-700 mt-3">
                  New
                </Text>
              </Pressable>
            </ScrollView>
          </View>
          <Pressable
            className="flex flex-row bg-blue-700 font-sans rounded-2xl items-center justify-center gap-3 py-3 "
            onPress={() => router.push("/add-budget")}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={18} color="#fff" />
            <Text className="text-sm text-white font-semibold ml-2">
              Add New Category
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
