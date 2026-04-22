import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-2xl font-bold text-slate-800 mb-4">Tailwind Test</Text>

      <View className="w-48 h-32 bg-blue-500 rounded-lg mb-4 items-center justify-center shadow-lg">
        <Text className="text-white text-lg">Blue Box</Text>
      </View>

      <Pressable
        onPress={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-green-600 rounded-full mb-2"
      >
        <Text className="text-white">Press me</Text>
      </Pressable>

      <Text className="text-slate-600">Pressed {count} times</Text>
    </View>
  );
}
