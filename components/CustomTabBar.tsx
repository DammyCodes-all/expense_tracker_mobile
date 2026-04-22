import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OverviewIcon, BudgetIcon, InsightsIcon, SettingsIcon } from "./svg";

export default function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-row items-center justify-between mx-4 mb-4 px-3 py-2 rounded-2xl shadow-lg bg-white`}
      style={{ paddingBottom: insets.bottom ? insets.bottom : 12 }}
    >
      {state.routes.map((route: any, idx: number) => {
        const focused = state.index === idx;
        let Icon = OverviewIcon;
        if (route.name === "overview") Icon = OverviewIcon;
        if (route.name === "budgets") Icon = BudgetIcon;
        if (route.name === "insights") Icon = InsightsIcon;
        if (route.name === "settings") Icon = SettingsIcon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="flex-1 items-center"
          >
            <View
              className={
                focused ? "p-3 rounded-full bg-blue-50" : "p-3 rounded-full"
              }
            >
              <Icon
                width={20}
                height={20}
                color={focused ? "#0f172a" : "#94A3B8"}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
