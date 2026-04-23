import React from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";

interface UsdAmountInputProps {
  value?: string;
  title?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
}

export default function UsdAmountInput({
  title = "amount",
  value,
  onChangeText,
  placeholder = "0.00",
  containerStyle,
}: UsdAmountInputProps) {
  return (
    <View
      className="mt-4 bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden z-10"
      style={containerStyle}
    >
      <View className="flex-row justify-between items-start mb-8">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </Text>

        <View
          className="bg-blue-700 px-6 py-3 absolute -right-6 -top-7"
          style={styles.usdBadge}
        >
          <Text
            className="text-white text-xs"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            USD
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <View style={styles.dollarContainer}>
          <Text className="text-gray-400 mr-1" style={styles.dollarSign}>
            $
          </Text>
        </View>

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          multiline={false}
          style={styles.amountInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  usdBadge: {
    borderBottomLeftRadius: 28,
  },
  dollarSign: {
    fontFamily: "Manrope_700Bold",
    includeFontPadding: false,
    fontSize: 34,
    lineHeight: 36,
    color: "#9CA3AF",
  },
  amountInput: {
    fontFamily: "Manrope_700Bold",
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingVertical: 0,
    lineHeight: 76,
    height: 76,
    fontSize: 56,
    color: "#0f172a",
    flex: 1,
  },
  dollarContainer: {
    height: 76,
    justifyContent: "center",
    marginRight: 8,
  },
});
