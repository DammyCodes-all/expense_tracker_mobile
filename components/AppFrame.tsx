import React, { ReactNode } from "react";
import { Platform, View } from "react-native";

export default function AppFrame({ children }: { children: ReactNode }) {
  if (Platform.OS !== "web") {
    return <View className="h-full bg-[#F7F9FB]">{children}</View>;
  }

  return (
    <View className="min-h-screen bg-[rgb(242,242,242)]">
      <View className="mx-auto min-h-screen w-full max-w-[1180px] ">
        {children}
      </View>
    </View>
  );
}
