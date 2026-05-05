import BudgetBurnCard from "@/components/BudgetBurnCard";
import CategoryChip from "@/components/CategoryChip";
import Header from "@/components/Header";
import SpendingVelocityChart from "@/components/SpendingVelocityChart";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useTransactions } from "@/context/transactions-context";

export default function Budgets() {
  const router = useRouter();

  const { categories } = useTransactions();
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === "web" && width >= 920;
  const isCompactWeb = Platform.OS === "web" && width < 640;

  return (
    <View className="flex-1 relative">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWideWeb ? 128 : 112,
          paddingHorizontal: isCompactWeb ? 14 : 0,
        }}
      >
        <View
          className="mx-4 flex gap-6 web:mx-auto web:w-full"
          style={{
            maxWidth: Platform.OS === "web" ? 1120 : undefined,
            paddingHorizontal: isWideWeb ? 32 : 0,
          }}
        >
          <View
            style={{
              flexDirection: isWideWeb ? "row" : "column",
              gap: isWideWeb ? 24 : 0,
              alignItems: "stretch",
            }}
          >
            <View style={{ flex: 1 }}>
              <BudgetBurnCard />
            </View>
            <View style={{ flex: 1 }}>
              <SpendingVelocityChart />
            </View>
          </View>
          <View className="p-4 bg-white rounded-3xl web:border web:border-slate-100 web:shadow-sm">
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
                className="bg-gray-200 rounded-2xl px-8 py-4 items-center justify-center web:hover:bg-blue-50 web:hover:border-blue-100 web:border web:border-transparent"
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
            className="flex flex-row bg-blue-700 font-sans rounded-2xl items-center justify-center gap-3 py-3 web:hover:bg-blue-800 web:active:bg-blue-900"
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
