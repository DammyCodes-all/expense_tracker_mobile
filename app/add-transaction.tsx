import {
  Calendar03Icon,
  ChevronDown,
  Menu01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Dropdown } from "react-native-element-dropdown";
import BackHeader from "../components/BackHeader";
import UsdAmountInput from "../components/form/UsdAmountInput";
import { useTransactions } from "../context/transactions-context";
import { LedgerTransaction } from "../lib/transactions";
import { categoriesToOptions } from "../lib/categories";

export default function AddTransaction() {
  const router = useRouter();
  const { addTransaction, categories } = useTransactions();
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [allocation, setAllocation] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const formatDisplayDate = (value: Date) => {
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    const year = value.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const handleDateSelect = (value: Date) => {
    setSelectedDate(value);
    setDate(formatDisplayDate(value));
    setIsCalendarVisible(false);
  };

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
    const opts = categoriesToOptions(categories || []);
    const selectedCategoryId = opts.find(
      (category) => category.value === allocation,
    )?.value;

    if (!person.trim() || !date.trim() || !selectedCategoryId) {
      Alert.alert("Missing Details", "Please fill person, date, and category.");
      return;
    }

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    const selectedCategoryObj = (categories || []).find(
      (c) => c.id === selectedCategoryId,
    );

    const now = new Date();
    const formatTime = (d: Date) =>
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const transaction: LedgerTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      icon: (selectedCategoryObj?.icon as any) || "note",
      title: person.trim(),
      category: selectedCategoryObj?.name || "Other",
      time: formatTime(now),
      amount: amountValue,
      date: date.trim(),
      isIncome: false,
      createdAt: now.toISOString(),
      notes: notes?.trim() || undefined,
    };

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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 88}
    >
      <View className="mx-4" style={{ flex: 1 }}>
        <BackHeader title="Add Transaction" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 12,
            paddingBottom: 32,
            flexGrow: 1,
          }}
          nestedScrollEnabled
        >
          <View className="space-y-6">
            <View className="rounded-3xl bg-white w-full px-6 py-8 flex gap-6 shadow-sm">
              {/* Person Field */}
              <View className="flex gap-3">
                <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  ADD TRANSACTION
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 gap-3">
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
                <TouchableOpacity
                  onPress={() => setIsCalendarVisible(true)}
                  className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 gap-3"
                >
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    size={20}
                    color="#9CA3AF"
                    style={{ marginRight: 12 }}
                  />
                  <Text
                    className={`flex-1 text-base ${date ? "text-gray-800" : "text-gray-300"}`}
                  >
                    {date || "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Category Dropdown */}
              <View className="flex gap-3">
                <Text className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  ADD CATEGORY
                </Text>
                <Dropdown
                  data={categoriesToOptions(categories || [])}
                  labelField="label"
                  valueField="value"
                  value={allocation}
                  onChange={(item) => setAllocation(item.value)}
                  placeholder="Select Category"
                  maxHeight={220}
                  style={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                  containerStyle={{
                    backgroundColor: "#F9FAFB",

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

            <UsdAmountInput value={amount} onChangeText={handleAmountChange} />

            {/* Notes Field */}
            <View className="mt-4">
              <View
                className="shadow-sm"
                style={{
                  borderColor: "#93C5FD",
                  borderRadius: 12,
                  padding: 12,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <View className="flex-row items-start gap-2">
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
      <Modal
        animationType="slide"
        transparent
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingTop: 12,
              paddingBottom: 32,
              paddingHorizontal: 8,
            }}
          >
            {/* drag handle */}
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#E5E7EB",
                alignSelf: "center",
                marginBottom: 16,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Manrope_700Bold",
                  color: "#111827",
                }}
              >
                Pick a Date
              </Text>
              <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                <Text
                  style={{
                    color: "#2563EB",
                    fontFamily: "Manrope_600SemiBold",
                    fontSize: 14,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <CalendarPicker
              selectedStartDate={selectedDate || undefined}
              onDateChange={(value: any) => handleDateSelect(new Date(value))}
              startFromMonday
              width={Dimensions.get("window").width - 16}
              todayBackgroundColor="#EFF6FF"
              todayTextStyle={{
                color: "#2563EB",
                fontFamily: "Manrope_700Bold",
              }}
              selectedDayColor="#2563EB"
              selectedDayTextColor="#FFFFFF"
              dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
              textStyle={{
                color: "#374151",
                fontFamily: "Manrope_400Regular",
                fontSize: 14,
              }}
              monthTitleStyle={{
                color: "#111827",
                fontFamily: "Manrope_700Bold",
                fontSize: 16,
              }}
              yearTitleStyle={{
                color: "#111827",
                fontFamily: "Manrope_700Bold",
                fontSize: 16,
              }}
              previousTitleStyle={{
                color: "#2563EB",
                fontFamily: "Manrope_600SemiBold",
              }}
              nextTitleStyle={{
                color: "#2563EB",
                fontFamily: "Manrope_600SemiBold",
              }}
              dayShape="circle"
            />
          </View>
        </View>
      </Modal>
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
