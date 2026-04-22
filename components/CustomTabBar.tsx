import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BudgetIcon, InsightsIcon, OverviewIcon, SettingsIcon } from "./svg";

const TAB_CONFIG = [
  { name: "overview", label: "OVERVIEW", Icon: OverviewIcon },
  { name: "budgets", label: "BUDGETS", Icon: BudgetIcon },
  { name: "insights", label: "INSIGHTS", Icon: InsightsIcon },
  { name: "settings", label: "SETTINGS", Icon: SettingsIcon },
];

export default function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="rounded-3xl bg-white"
      style={{
        paddingBottom: (insets.bottom || 0) + 12,
        elevation: 10,
      }}
    >
      <View className="flex-row items-center justify-between px-3 py-3">
        {TAB_CONFIG.map((tab, idx) => {
          const focused = state.index === idx;
          const { Icon } = tab;

          return (
            <Pressable
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              className={`flex-1 items-center gap-0.5 rounded-lg py-2 px-2 ${focused ? "bg-blue-100" : ""}`}
            >
              <View className="p-2">
                <Icon
                  width={20}
                  height={20}
                  color={focused ? "#0047AB" : "#94A3B8"}
                />
              </View>
              <Text
                className={`text-xs ${focused ? "text-blue-600 font-semibold" : "text-slate-500"}`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
