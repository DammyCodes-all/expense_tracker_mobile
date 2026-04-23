import React, { useState } from "react";
import { View } from "react-native";
import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";
import UsdAmountInput from "@/components/form/UsdAmountInput";
import CategoryCard from "@/components/form/CategoryCard";
import SaveButton from "@/components/form/SaveButton";
import { useTransactions } from "@/context/transactions-context";

export default function AddBudget() {
  const router = useRouter();
  const { addCategory } = useTransactions();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <View className="flex-1 ">
      <BackHeader title="Add Budget" />

      <View className="px-4 py-6 flex gap-3">
        <CategoryCard name={name} onNameChange={setName} notes={notes} onNotesChange={setNotes} />

        <UsdAmountInput
          value={budget}
          title="Category budget"
          onChangeText={setBudget}
        />

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
