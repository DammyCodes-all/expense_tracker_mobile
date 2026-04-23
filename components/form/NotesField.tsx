import React from "react";
import { Text, TextInput, View } from "react-native";

interface NotesFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function NotesField({
  label = "Notes",
  value,
  onChangeText,
}: NotesFieldProps) {
  return (
    <View className="mb-4">
      <Text
        className="text-xs text-gray-700 mb-2"
        style={{ fontFamily: "Manrope_600SemiBold" }}
      >
        {label}
      </Text>

      <View
        className="rounded-lg bg-white"
        style={{ borderColor: "#E6EEF9", borderWidth: 1, padding: 12 }}
      >
        <TextInput
          placeholder="What was this for?"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          style={{ minHeight: 100, textAlignVertical: "top", color: "#374151" }}
        />
      </View>
    </View>
  );
}
