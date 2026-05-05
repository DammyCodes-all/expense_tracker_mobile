import React, { Suspense } from "react";
import { Platform, Text, View } from "react-native";
import WebLivenessVerification from "../components/liveness/WebLivenessVerification";

const NativeLivenessVerification = React.lazy(
  () => import("../components/liveness/NativeLivenessVerification"),
);

export default function LivenessVerificationRoute() {
  if (Platform.OS === "web") {
    return <WebLivenessVerification />;
  }

  return (
    <Suspense
      fallback={
        <View className="flex-1 items-center justify-center bg-[#EFF4FB]">
          <Text className="text-[#0C2A57]">Loading verification...</Text>
        </View>
      }
    >
      <NativeLivenessVerification />
    </Suspense>
  );
}
