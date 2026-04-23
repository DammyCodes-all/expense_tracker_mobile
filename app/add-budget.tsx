import React, { useState } from "react";
import { View } from "react-native";
import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";
import LabelledInput from "@/components/form/LabelledInput";
import NotesField from "@/components/form/NotesField";
import CurrencyCard from "@/components/form/CurrencyCard";
import SaveButton from "@/components/form/SaveButton";
import { useTransactions } from "@/context/transactions-context";

export default function AddBudget() {
  const router = useRouter();
  const { addCategory } = useTransactions();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <View className="flex-1 bg-white">
      <BackHeader title="Add Budget" />

      <View className="px-4 py-6">
        <LabelledInput
          label="Category"
          placeholder="e.g., Groceries"
          value={name}
          onChangeText={setName}
        />

        <CurrencyCard
          value={budget ? `$${budget}` : undefined}
          onPress={() => {}}
        />

        <LabelledInput
          label="Budget Limit"
          placeholder="$0.00"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />

        <NotesField value={notes} onChangeText={setNotes} />

        <SaveButton
          label="Save Budget"
          onPress={() => {
            const id = `cat_${Date.now()}`;
            addCategory({
              id,
              name: name || "New Category",
              notes,
              budget: Number(budget) || 0,
              currency: "USD",
              createdAt: new Date().toISOString(),
            });
            router.back();
          }}
          disabled={!name}
        />
      </View>
    </View>
  );
}
