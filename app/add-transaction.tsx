import {
  Calendar03Icon,
  ChevronDown,
  Menu01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BackHeader from "../components/BackHeader";
import { useTransactions } from "../context/transactions-context";
import {
  CATEGORY_OPTIONS,
  createLedgerTransaction,
  TransactionCategoryValue,
} from "../lib/transactions";

export default function AddTransaction() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [person, setPerson] = React.useState("");
  const [date, setDate] = React.useState("");
  const [allocation, setAllocation] = React.useState<string | null>(null);
  const [allocationOpen, setAllocationOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleAmountChange = (rawValue: string) => {
    const normalized = rawValue.replace(/,/g, ".");
    const numericOnly = normalized.replace(/[^0-9.]/g, "");
    const [whole = "", ...rest] = numericOnly.split(".");
    const decimals = rest.join("").slice(0, 2);

    if (rest.length > 0) {
      setAmount(`${whole}.${decimals}`);
      return;
    }

    setAmount(whole);
  };

  const handleSave = () => {
    const amountValue = Number.parseFloat(amount);
    const selectedCategory = CATEGORY_OPTIONS.find(
      (category) => category.value === allocation,
    )?.value;

    if (!person.trim() || !date.trim() || !selectedCategory) {
      Alert.alert("Missing Details", "Please fill person, date, and category.");
      return;
    }

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    const transaction = createLedgerTransaction({
      person,
      date,
      allocation: selectedCategory as TransactionCategoryValue,
      amount: amountValue,
      notes,
    });

    addTransaction(transaction);

    Alert.alert("Saved", "Transaction saved", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 20}
    >
      <View className="flex-1 mx-4">
        <BackHeader title="Add Transaction" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 12, paddingBottom: 32 }}
          nestedScrollEnabled
        >
          <View className="space-y-6">
            <View className="rounded-3xl bg-white w-full px-6 py-8 flex gap-6 shadow-sm">
              {/* Person Field */}
              <View className="flex gap-3">
                <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  ADD TRANSACTION
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
                  <HugeiconsIcon
                    icon={Calendar03Icon}
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
                <Dropdown
                  data={CATEGORY_OPTIONS}
                  labelField="label"
                  valueField="value"
                  value={allocation}
                  onChange={(item) => setAllocation(item.value)}
                  placeholder="Select Category"
                  maxHeight={220}
                  style={{
                    backgroundColor: "#F3F4F6",
                    borderColor: "#BFDBFE",
                    borderWidth: 1.5,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                  containerStyle={{
                    backgroundColor: "#F9FAFB",
                    borderColor: "#E5E7EB",
                    borderWidth: 1,
                    borderRadius: 16,
                    marginTop: 6,
                    overflow: "hidden",
                  }}
                  placeholderStyle={{ color: "#D1D5DB", fontSize: 15 }}
                  selectedTextStyle={{ color: "#1F2937", fontSize: 15 }}
                  activeColor="#EFF6FF"
                  itemContainerStyle={{
                    borderRadius: 12,
                    marginHorizontal: 8,
                    marginVertical: 3,
                  }}
                  itemTextStyle={{ color: "#374151", fontSize: 15 }}
                  renderRightIcon={() => (
                    <HugeiconsIcon
                      icon={ChevronDown}
                      size={18}
                      color="#9CA3AF"
                    />
                  )}
                />
              </View>
            </View>

            {/* Amount Card */}
            <View
              className="mt-4 bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden z-10"
              style={{ zIndex: -10 }}
            >
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

              <View className="flex-row items-center">
                <View style={styles.dollarContainer}>
                  <Text
                    className="text-gray-400 mr-1"
                    style={styles.dollarSign}
                  >
                    $
                  </Text>
                </View>

                <TextInput
                  placeholder="0.00"
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="decimal-pad"
                  multiline={false}
                  style={styles.amountInput}
                />
              </View>
            </View>

            {/* Notes Field */}
            <View className="mt-4">
              <View
                className="shadow-sm"
                style={{
                  borderColor: "#93C5FD",
                  borderRadius: 12,
                  padding: 12,
                  zIndex: -10,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <View className="flex-row items-start gap-1">
                  <HugeiconsIcon
                    icon={Menu01Icon}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginRight: 12 }}
                  />
                  <View className="h-full">
                    <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                      NOTES
                    </Text>
                    <TextInput
                      placeholder="What was this for?"
                      value={notes}
                      onChangeText={setNotes}
                      placeholderTextColor="#9CA3AF"
                      multiline={true}
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

            {/* Save Button */}
            <View className="mt-4">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-blue-600 rounded-lg py-4"
              >
                <Text className="text-white font-semibold text-center text-base">
                  Save Up!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  },
  dollarContainer: {
    height: 76,
    justifyContent: "center",
    marginRight: 8,
  },
});
