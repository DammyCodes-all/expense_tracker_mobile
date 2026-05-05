import BackHeader from "@/components/BackHeader";
import CategoryCard from "@/components/form/CategoryCard";
import UsdAmountInput from "@/components/form/UsdAmountInput";
import { useTransactions } from "@/context/transactions-context";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddBudget() {
  const router = useRouter();
  const { addCategory } = useTransactions();
  const isWeb = Platform.OS === "web";

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  const handleBack = useCallback(() => {
    if (Platform.OS === "web") {
      const historyLength =
        typeof window !== "undefined" ? window.history.length : 0;

      if (historyLength > 1) {
        window.history.back();
        return;
      }

      router.replace("/budgets");
      return;
    }

    router.back();
  }, [router]);

  const handleSave = useCallback(() => {
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (!budget || Number(budget) <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }

    const id = `cat_${Date.now()}`;
    addCategory({
      id,
      name: name || "New Category",
      notes,
      budget: Number(budget) || 0,
      amountSpent: 0,
      currency: "USD",
      createdAt: new Date().toISOString(),
    });
    handleBack();
  }, [addCategory, budget, handleBack, name, notes]);

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
        handleBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleBack, handleSave, isWeb]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 88}
      className="flex-1 bg-[#F7F9FB]"
    >
      <View
        className="mx-4 web:mx-auto web:w-full web:max-w-[760px] web:px-8"
        style={{ flex: 1 }}
      >
        <BackHeader title="Add Budget" fallbackRoute="/budgets" />

        {isWeb ? (
          <View className="px-4 pb-5 pt-2 flex-1 justify-between web:px-0">
            <View className="flex gap-4">
              <View className="rounded-2xl px-4 py-3">
                <Text
                  className="text-sm text-blue-900"
                  style={{ lineHeight: 21 }}
                >
                  Set a clear limit for this category to keep spending in check.
                </Text>
              </View>

              <CategoryCard
                name={name}
                onNameChange={setName}
                notes={notes}
                onNotesChange={setNotes}
              />

              <UsdAmountInput
                value={budget}
                title="Category budget"
                onChangeText={setBudget}
              />
            </View>

            <View className="pt-3">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-blue-600 rounded-2xl py-4 web:hover:bg-blue-700 web:active:bg-blue-800"
                style={{
                  shadowColor: "#1D4ED8",
                  shadowOpacity: 0.18,
                  shadowOffset: { width: 0, height: 8 },
                  shadowRadius: 16,
                  elevation: 3,
                }}
              >
                <Text className="text-white font-semibold text-center text-base">
                  Save Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 12,
              paddingBottom: 48,
            }}
            nestedScrollEnabled
          >
            <View className="px-4 py-6 flex gap-5 web:px-0">
              <View className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-4">
                <Text
                  className="text-sm text-blue-900"
                  style={{ lineHeight: 21 }}
                >
                  Set a clear limit for this category to keep spending in check.
                </Text>
              </View>

              <CategoryCard
                name={name}
                onNameChange={setName}
                notes={notes}
                onNotesChange={setNotes}
              />

              <UsdAmountInput
                value={budget}
                title="Category budget"
                onChangeText={setBudget}
              />

              {/* Save Button */}
              <View className="mt-2 web:mt-4">
                <TouchableOpacity
                  onPress={handleSave}
                  className="bg-blue-600 rounded-2xl py-4 web:hover:bg-blue-700 web:active:bg-blue-800"
                  style={{
                    shadowColor: "#1D4ED8",
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 8 },
                    shadowRadius: 16,
                    elevation: 3,
                  }}
                >
                  <Text className="text-white font-semibold text-center text-base">
                    Save Budget
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
