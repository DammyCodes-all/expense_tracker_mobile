import React from "react";
import { Pressable, Text, View } from "react-native";

function FaceBadge() {
  return (
    <View className="h-14 w-14 items-center justify-center rounded-full bg-[#D9E6FF] shadow-sm">
      <View className="h-7 w-7 items-center justify-center rounded-full border-2 border-[#0F2D5C]">
        <View className="absolute top-[6px] left-[8px] h-1.5 w-1.5 rounded-full bg-[#0F2D5C]" />
        <View className="absolute top-[6px] right-[8px] h-1.5 w-1.5 rounded-full bg-[#0F2D5C]" />
        <View className="absolute bottom-[6px] h-2 w-3 rounded-b-full border-b-2 border-[#0F2D5C]" />
      </View>
    </View>
  );
}

function ShieldPill() {
  return (
    <View className="flex-row items-center gap-2 rounded-full border border-[#D9E6FF] bg-white px-4 py-2 shadow-sm">
      <View className="h-4 w-4 items-center justify-center rounded-full bg-[#0E2D5A]">
        <View className="h-2 w-2 rounded-full border border-white" />
      </View>
      <Text
        className="text-[12px] text-[#7A879A]"
        style={{ fontFamily: "Manrope_600SemiBold" }}
      >
        End-to-end encrypted
      </Text>
    </View>
  );
}

export default function Livenesserification() {
  return (
    <View className="flex-1 bg-[#EFF4FB]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-[320px] items-center">
          <FaceBadge />

          <Text
            className="mt-5 text-center text-[30px] leading-[34px] text-[#0C2A57]"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            Identity Verification
          </Text>

          <Text
            className="mt-2 text-center text-[16px] leading-[22px] text-[#66758B]"
            style={{ fontFamily: "Manrope_500Medium" }}
          >
            We need to perform a quick liveness check
          </Text>

          <View className="mt-3 rounded-full border border-[#C5D6F5] bg-white px-4 py-2 shadow-sm">
            <Text
              className="text-[14px] text-[#0C2A57]"
              style={{ fontFamily: "Manrope_600SemiBold" }}
            >
              Center your face in the frame
            </Text>
          </View>

          <View className="mt-6 items-center justify-center">
            <View className="h-[230px] w-[230px] items-center justify-center rounded-full border-[6px] border-[#0E4EDB] bg-[#D7E6FF] shadow-[0_16px_40px_rgba(14,78,219,0.20)]">
              <View className="h-[205px] w-[205px] items-center justify-center rounded-full border-[6px] border-[#6EA0FF] bg-[#CFE0FF]">
                <View className="h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#B7C9EA]">
                  <View className="h-5 w-5 rounded-sm border-4 border-[#B7C9EA]" />
                </View>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <ShieldPill />
          </View>

          <Pressable
            disabled
            className="mt-8 w-full rounded-xl bg-[#D7DEE8] px-6 py-4 opacity-90"
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text
                className="text-[15px] text-white"
                style={{ fontFamily: "Manrope_700Bold" }}
              >
                Start Verification
              </Text>
              <Text className="text-[18px] text-white">→</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
