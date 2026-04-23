import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackHeader from "../components/BackHeader";

export default function AddTransaction() {
  const router = useRouter();
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");

  const CATEGORIES = [
    "Transport",
    "Dining Out",
    "Groceries",
    "Utilities",
    "Entertainment",
    "Technology",
    "Other",
  ];

  const handleAdd = () => {
    // TODO: Implement transaction creation logic
    router.back();
  };

  return (
    <View className="flex-1">
      <BackHeader title="Add Transaction" />
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <Text
          className="text-2xl mb-6"
          style={{ fontFamily: "Manrope_700Bold" }}
        >
          Add Transaction
        </Text>

        {/* Amount Input */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-600 mb-2">
            Amount
          </Text>
          <TextInput
            placeholder="$0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            className="border border-gray-300 rounded-lg p-4 text-lg"
            placeholderTextColor="#999"
          />
        </View>

        {/* Description Input */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-600 mb-2">
            Description
          </Text>
          <TextInput
            placeholder="What did you spend on?"
            value={description}
            onChangeText={setDescription}
            className="border border-gray-300 rounded-lg p-4 text-base"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-600 mb-3">
            Category
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full border ${
                  category === cat
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`${
                    category === cat ? "text-white" : "text-gray-700"
                  } font-medium`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-gray-200 rounded-lg py-4"
          >
            <Text className="text-center font-semibold text-gray-700">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAdd}
            className="flex-1 bg-blue-600 rounded-lg py-4"
          >
            <Text className="text-center font-semibold text-white">
              Add Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
