import {
  Car01Icon,
  KitchenUtensilsIcon,
  Money03Icon,
  ShoppingBag02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ICON_MAP: Record<string, any> = {
  car: Car01Icon,
  cutlery: KitchenUtensilsIcon,
  bag: ShoppingBag02Icon,
  money: Money03Icon,
};

interface CategoryChipProps {
  title: string;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
}

export default function CategoryChip({
  title,
  icon = "bag",
  onPress,
}: CategoryChipProps) {
  const iconObject = ICON_MAP[icon] || Money03Icon;

  return (
    <Pressable
      onPress={onPress}
      className={`items-center justify-center rounded-xl px-8 py-4 ${"bg-gray-200"}`}
    >
      <View className={`items-center justify-center `}>
        <HugeiconsIcon icon={iconObject} size={18} className="text-slate-700" />
      </View>

      <Text
        className="text-sm text-slate-700 mt-2"
        style={{ fontFamily: "Manrope_600SemiBold" }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
