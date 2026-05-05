import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BudgetIcon, OverviewIcon } from "./svg";

const TAB_CONFIG = [
  { name: "overview", label: "OVERVIEW", Icon: OverviewIcon },
  { name: "budgets", label: "BUDGETS", Icon: BudgetIcon },
];
export default function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  return (
    <View
      className="bg-white"
      style={{
        alignSelf: isWeb ? "center" : "stretch",
        width: isWeb ? "100%" : undefined,
        maxWidth: isWeb ? 520 : undefined,
        marginBottom: isWeb ? 24 : 0,
        borderRadius: isWeb ? 26 : 24,
        borderWidth: isWeb ? 1 : 0,
        borderColor: "#E2EAF5",
        paddingBottom: isWeb ? 0 : (insets.bottom || 0) + 12,
        shadowColor: "#0F2A57",
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: isWeb ? 0.14 : 0,
        shadowRadius: 36,
        elevation: 10,
      }}
    >
      <View className="flex-row items-center justify-between px-3 gap-2 py-3">
        {TAB_CONFIG.map((tab, idx) => {
          const focused = state.index === idx;
          const { Icon } = tab;

          return (
            <Pressable
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              className={`flex-1 items-center gap-0.5 rounded-2xl px-2 py-3 web:hover:bg-slate-200 web:focus-visible:ring-2 web:focus-visible:ring-blue-500 ${
                focused ? "bg-blue-100" : ""
              }`}
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
