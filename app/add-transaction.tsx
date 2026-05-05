import {
  Calendar03Icon,
  ChevronDown,
  Menu01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Dropdown } from "react-native-element-dropdown";
import BackHeader from "../components/BackHeader";
import { useTransactions } from "../context/transactions-context";
import { categoriesToOptions } from "../lib/categories";
import { LedgerTransaction } from "../lib/transactions";

export default function AddTransaction() {
  const router = useRouter();
  const { addTransaction, categories } = useTransactions();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isWideWeb = isWeb && width >= 1060;
  const isCompactWeb = isWeb && width < 760;

  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [allocation, setAllocation] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleBack = useCallback(() => {
    if (Platform.OS === "web") {
      const historyLength =
        typeof window !== "undefined" ? window.history.length : 0;

      if (historyLength > 1) {
        window.history.back();
        return;
      }

      router.replace("/overview");
      return;
    }

    router.back();
  }, [router]);

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

  const handleSave = useCallback(() => {
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
      categoryId: selectedCategoryObj?.id,
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
        onPress: handleBack,
      },
    ]);
  }, [addTransaction, allocation, amount, categories, date, handleBack, notes, person]);

  useEffect(() => {
    if (!isWeb) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        handleSave();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        if (isCalendarVisible) {
          setIsCalendarVisible(false);
          return;
        }

        handleBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleBack, handleSave, isCalendarVisible, isWeb]);

  const formContent = (
    <View
      style={{
        flexDirection: isWideWeb ? "row" : "column",
        gap: 14,
        flex: 1,
      }}
    >
      <View className="rounded-3xl border border-blue-100 bg-[#F7F9FB] px-5 py-5 shadow-sm">
        <Text className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
          Transaction details
        </Text>
        <Text className="mt-1 text-xs text-slate-500">
          Capture who, when, and category.
        </Text>

        <View className="mt-4 flex gap-3">
          <Text className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider">
            Person
          </Text>
          <View className="flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 gap-3">
            <HugeiconsIcon
              icon={UserIcon}
              size={18}
              color="#9CA3AF"
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="John Doe"
              value={person}
              onChangeText={setPerson}
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-sm text-gray-800"
            />
          </View>
        </View>

        <View className="mt-4 flex gap-3">
          <Text className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider">
            Date
          </Text>
          <TouchableOpacity
            onPress={() => setIsCalendarVisible(true)}
            className="flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 gap-3"
          >
            <HugeiconsIcon
              icon={Calendar03Icon}
              size={18}
              color="#9CA3AF"
              style={{ marginRight: 10 }}
            />
            <Text
              className={`flex-1 text-sm ${date ? "text-gray-800" : "text-gray-400"}`}
            >
              {date || "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4 flex gap-3">
          <Text className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider">
            Category
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
              borderColor: "#E2E8F0",
              borderWidth: 1,
              backgroundColor: "#F8FAFC",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
            containerStyle={{
              backgroundColor: "#F8FAFC",
              borderRadius: 16,
              marginTop: 6,
              borderColor: "#E2E8F0",
              borderWidth: 1,
              overflow: "hidden",
            }}
            placeholderStyle={{ color: "#9CA3AF", fontSize: 14 }}
            selectedTextStyle={{ color: "#1F2937", fontSize: 14 }}
            activeColor="#EFF6FF"
            itemContainerStyle={{
              borderRadius: 12,
              marginHorizontal: 8,
              marginVertical: 3,
            }}
            itemTextStyle={{ color: "#374151", fontSize: 14 }}
            renderRightIcon={() => (
              <HugeiconsIcon icon={ChevronDown} size={18} color="#9CA3AF" />
            )}
          />
        </View>
      </View>

      <View style={{ flex: isWideWeb ? 0.95 : 1 }}>
        <View className="rounded-3xl border border-blue-100 bg-white px-5 py-5 shadow-sm">
          <Text className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider mb-3">
            Amount
          </Text>
          <View className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
            <TextInput
              placeholder="0.00"
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholderTextColor="#9CA3AF"
              style={{
                fontFamily: "Manrope_700Bold",
                fontSize: isWeb ? 36 : 42,
                color: "#0f172a",
                paddingVertical: 0,
                height: isWeb ? 52 : 64,
              }}
            />
          </View>
        </View>

        <View className="mt-4 rounded-3xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
          <View className="flex-row items-start gap-2">
            <HugeiconsIcon
              icon={Menu01Icon}
              size={17}
              color="#9CA3AF"
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <View className="flex-1">
              <Text className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider mb-2">
                Notes
              </Text>
              <TextInput
                placeholder="What was this for?"
                value={notes}
                onChangeText={setNotes}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={isWeb ? 2 : 4}
                style={{
                  minHeight: isWeb ? 58 : 90,
                  color: "#374151",
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>
        </View>

        <View className="mt-4">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-600 rounded-2xl py-4 web:hover:bg-blue-700 web:active:bg-blue-800"
            style={{
              shadowColor: "#1D4ED8",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 16,
              elevation: 3,
            }}
          >
            <Text className="text-white font-semibold text-center text-base">
              Save Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 relative bg-[#F7F9FB]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 88}
      >
        <View
          className="mx-4 web:mx-auto web:w-full web:max-w-[1060px] web:px-8"
          style={{ flex: 1, paddingHorizontal: isCompactWeb ? 14 : 0 }}
        >
          <BackHeader title="Add Transaction" fallbackRoute="/overview" />

          {isWeb ? (
            <View
              className="px-2 pb-5 pt-1 web:px-0"
              style={{ flex: 1, overflow: "hidden" }}
            >
              {formContent}
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingTop: 8,
                paddingBottom: 112,
              }}
              nestedScrollEnabled
            >
              <View className="space-y-5">{formContent}</View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>

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
    </View>
  );
}
