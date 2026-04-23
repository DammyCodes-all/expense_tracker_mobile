import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface SaveButtonProps {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function SaveButton({
  label = "Save",
  onPress,
  disabled,
}: SaveButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-3 rounded-lg items-center justify-center ${disabled ? "bg-gray-300" : "bg-blue-600"}`}
    >
      <Text className="text-white font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
