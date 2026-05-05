import BackHeader from "@/components/BackHeader";
import CategoryCard from "@/components/form/CategoryCard";
import UsdAmountInput from "@/components/form/UsdAmountInput";
import { useTransactions } from "@/context/transactions-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddBudget() {
  const router = useRouter();
  const { addCategory } = useTransactions();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
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
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 88}
      className="flex-1 "
    >
      <BackHeader title="Add Budget" />

      <View className="px-4 py-6 flex gap-3 flex-1 web:mx-auto web:w-full web:max-w-[720px] web:px-8">
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
        <View className="mt-4">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-600 rounded-lg py-4 web:hover:bg-blue-700 web:active:bg-blue-800"
          >
            <Text className="text-white font-semibold text-center text-base">
              Save Up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
