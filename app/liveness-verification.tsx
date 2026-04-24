import {
  ArrowRight,
  NeutralIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function LivenessVerification() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (
    <View className="flex-1 bg-[#EFF4FB]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-[320px] items-center">
          <HugeiconsIcon icon={NeutralIcon} />

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
              {!hasPermission
                ? "Requesting camera permission..."
                : "Center your face in the frame"}
            </Text>
          </View>

          <View className="mt-6 items-center justify-center">
            <View className="h-[250px] w-[250px] overflow-hidden rounded-full border-[6px] border-[#0E4EDB] bg-[#D7E6FF] shadow-[0_16px_40px_rgba(14,78,219,0.20)]">
              {device ? (
                <Camera
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={hasPermission}
                />
              ) : (
                <View className="flex-1 items-center justify-center bg-[#CFE0FF]">
                  <View className="h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#B7C9EA]">
                    <View className="h-5 w-5 rounded-sm border-4 border-[#B7C9EA]" />
                  </View>
                </View>
              )}

              <View className="absolute inset-x-6 top-6 rounded-full bg-black/30 px-3 py-2">
                <Text
                  className="text-center text-[12px] text-white"
                  style={{ fontFamily: "Manrope_600SemiBold" }}
                >
                  {hasPermission
                    ? "Align your face inside the circle"
                    : "Camera access required"}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center gap-2 rounded-full border border-[#D9E6FF] bg-white px-4 py-2 shadow-sm">
              <HugeiconsIcon icon={Shield01Icon} className="text-[#0E4EDB]" />
              <Text
                className="text-[12px] text-[#7A879A]"
                style={{ fontFamily: "Manrope_600SemiBold" }}
              >
                End-to-end encrypted
              </Text>
            </View>
          </View>

          <Pressable
            disabled={!hasPermission}
            className="mt-8 w-full rounded-xl bg-[#D7DEE8] px-6 py-4 opacity-90"
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text
                className="text-[15px] text-white"
                style={{ fontFamily: "Manrope_700Bold" }}
              >
                Start Verification
              </Text>
              <HugeiconsIcon
                icon={ArrowRight}
                size={16}
                className="text-white"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
