import React from "react";
import { Text, TextInput, View } from "react-native";

interface LabelledInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
}

export default function LabelledInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: LabelledInputProps) {
  return (
    <View className="mb-4">
      <Text
        className="text-xs text-gray-700 mb-2"
        style={{ fontFamily: "Manrope_600SemiBold" }}
      >
        {label}
      </Text>
      <View className="rounded-lg bg-gray-100 px-4 py-3">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          className="text-base text-gray-800"
        />
      </View>
    </View>
  );
}
