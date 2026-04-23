import { Menu01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface CategoryCardProps {
  name?: string;
  onNameChange?: (text: string) => void;
  notes?: string;
  onNotesChange?: (text: string) => void;
}

export default function CategoryCard({
  name,
  onNameChange,
  notes,
  onNotesChange,
}: CategoryCardProps) {
  return (
    <View className="rounded-3xl bg-white w-full px-6 py-8 shadow-sm">
      <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
        CATEGORY NAME
      </Text>

      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
        <HugeiconsIcon
          icon={UserIcon}
          size={20}
          color="#9CA3AF"
          style={{ marginRight: 12 }}
        />
        <TextInput
          placeholder="John Doe"
          value={name}
          onChangeText={onNameChange}
          placeholderTextColor="#D1D5DB"
          className="flex-1 text-base text-gray-800"
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <View style={styles.notesWrapper}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <HugeiconsIcon
              icon={Menu01Icon}
              size={18}
              color="#9CA3AF"
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                NOTES
              </Text>
              <TextInput
                placeholder="What was this for?"
                value={notes}
                onChangeText={onNotesChange}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                style={{
                  minHeight: 80,
                  color: "#374151",
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesWrapper: {
    borderColor: "#E6EEF9",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
});
