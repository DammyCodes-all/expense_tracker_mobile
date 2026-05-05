import React, { ReactNode } from "react";
import { Platform, View } from "react-native";

export default function AppFrame({ children }: { children: ReactNode }) {
  if (Platform.OS !== "web") {
    return <View className="h-full bg-[#F7F9FB]">{children}</View>;
  }

  return (
    <View className="min-h-screen bg-[#E8EEF6]">
      <View className="mx-auto min-h-screen w-full max-w-[1180px] bg-[#F7F9FB] shadow-[0_30px_90px_rgba(15,42,87,0.14)] lg:border-x lg:border-[#DDE7F4]">
        {children}
      </View>
    </View>
  );
}
