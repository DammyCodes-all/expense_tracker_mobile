import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import BackHeader from "../components/BackHeader";

export default function AddTransaction() {
  const [person, setPerson] = React.useState("");
  const [date, setDate] = React.useState("");
  const [allocation, setAllocation] = React.useState("");
  const [allocationOpen, setAllocationOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const CATEGORIES = [
    { label: "Transport", value: "transport" },
    { label: "Dining Out", value: "dining_out" },
    { label: "Groceries", value: "groceries" },
    { label: "Utilities", value: "utilities" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Technology", value: "technology" },
    { label: "Other", value: "other" },
  ];

  const handleAmountChange = (rawValue: string) => {
    const normalized = rawValue.replace(/,/g, ".");
    const numericOnly = normalized.replace(/[^0-9.]/g, "");

    // Keep only the first decimal point and clamp to 2 decimal places.
    const [whole = "", ...rest] = numericOnly.split(".");
    const decimals = rest.join("").slice(0, 2);

    if (rest.length > 0) {
      setAmount(`${whole}.${decimals}`);
      return;
    }

    setAmount(whole);
  };

  return (
    <View className="flex-1 mx-4 space-y-6">
      <BackHeader title="Add Transaction" />
      <View
        className="flex-1 space-y-6"
        style={{ padding: 12, paddingBottom: 32 }}
      >
        <View className="rounded-3xl bg-white w-full px-6 py-8 space-y-6 flex gap-6 shadow-sm">
          {/* Person Field */}
          <View className="flex gap-3">
            <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
              ADD TRANSACTION
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <MaterialCommunityIcons
                name="account"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 12 }}
              />
              <TextInput
                placeholder="John Doe"
                value={person}
                onChangeText={setPerson}
                placeholderTextColor="#D1D5DB"
                className="flex-1 text-base text-gray-800"
              />
            </View>
          </View>

          {/* Date Field */}
          <View className="flex gap-3">
            <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
              ADD TRANSACTION
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 12 }}
              />
              <TextInput
                placeholder="11/24/2023"
                value={date}
                onChangeText={setDate}
                placeholderTextColor="#D1D5DB"
                className="flex-1 text-base text-gray-800"
              />
            </View>
          </View>

          {/* Category Dropdown */}
          <View className="flex gap-3">
            <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
              ADD CATEGORY
            </Text>
            <DropDownPicker
              open={allocationOpen}
              setOpen={setAllocationOpen}
              value={allocation}
              setValue={setAllocation}
              items={CATEGORIES}
              placeholder="Select Category"
              // nestedScrollEnabled={true}
              containerStyle={{
                borderRadius: 8,
                backgroundColor: "transparent",
              }}
              style={{
                backgroundColor: "#F3F4F6",
                borderColor: "transparent",
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
              textStyle={{
                fontSize: 16,
                color: "#1F2937",
              }}
              placeholderStyle={{
                color: "#D1D5DB",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#F3F4F6",
                borderColor: "transparent",
                marginTop: 8,
                paddingHorizontal: 16,
              }}
              labelStyle={{
                fontSize: 16,
                color: "#1F2937",
              }}
            />
          </View>
        </View>

        {/* Amount Field */}
        <View className="mt-4 bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <View className="flex-row justify-between items-start mb-8">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              AMOUNT
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
          <View className="flex-row items-end">
            <Text
              className="text-gray-400 text-4xl mr-1"
              style={styles.dollarSign}
            >
              $
            </Text>
            <TextInput
              placeholder="0.00"
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              className="flex-1 text-5xl text-blue-900"
              multiline={false}
              style={styles.amountInput}
            />
          </View>
        </View>
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
    lineHeight: 52,
    marginBottom: 2,
  },
  amountInput: {
    fontFamily: "Manrope_700Bold",
    includeFontPadding: false,
    textAlignVertical: "bottom",
    paddingVertical: 0,
    lineHeight: 64,
    height: 64,
  },
});
