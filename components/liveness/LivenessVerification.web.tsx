import {
  ArrowRight,
  NeutralIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type CameraStatus = "idle" | "checking" | "ready" | "blocked";

export default function LivenessVerification() {
  const router = useRouter();
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");

  const statusText =
    cameraStatus === "checking"
      ? "Checking camera permission..."
      : cameraStatus === "ready"
        ? "Camera available. Continue to dashboard."
        : cameraStatus === "blocked"
          ? "Camera unavailable. Web access is still allowed."
          : "Desktop web verification preview";

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (cameraStatus !== "checking") {
      return;
    }

    const requestCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setCameraStatus("blocked");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStatus("ready");
      } catch {
        setCameraStatus("blocked");
      }
    };

    requestCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStatus]);

  return (
    <View className="min-h-screen flex-1 bg-[#EAF1FA]">
      <View className="flex-1 items-center justify-center px-6 py-10">
        <View className="w-full max-w-[420px] items-center rounded-[28px] border border-[#D7E3F5] bg-white px-7 py-8 shadow-[0_24px_70px_rgba(15,42,87,0.14)]">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F1FF]">
            <HugeiconsIcon icon={NeutralIcon} size={28} color="#0E4EDB" />
          </View>

          <Text
            className="mt-5 text-center text-[32px] leading-[36px] text-[#0C2A57]"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            Identity Verification
          </Text>

          <Text
            className="mt-3 text-center text-[16px] leading-[23px] text-[#66758B]"
            style={{ fontFamily: "Manrope_500Medium" }}
          >
            Native face detection is not available on web yet, so this build
            lets you continue while keeping camera access as an optional check.
          </Text>

          <View className="mt-6 w-full rounded-3xl border border-[#CFE0F7] bg-[#F7FAFF] p-5">
            <View className="h-[220px] items-center justify-center rounded-[24px] border border-[#BFD3F0] bg-[#D7E6FF]">
              <View className="h-24 w-24 items-center justify-center rounded-full border-[6px] border-[#0E4EDB] bg-white">
                <HugeiconsIcon icon={Shield01Icon} size={34} color="#0E4EDB" />
              </View>
              <View className="mt-5 rounded-full bg-white px-4 py-2">
                <Text
                  className="text-center text-[13px] text-[#0C2A57]"
                  style={{ fontFamily: "Manrope_600SemiBold" }}
                >
                  {statusText}
                </Text>
              </View>
            </View>
          </View>

          {cameraStatus === "blocked" ? (
            <Text
              className="mt-4 text-center text-[13px] leading-[19px] text-[#A04444]"
              style={{ fontFamily: "Manrope_600SemiBold" }}
            >
              Browser camera access usually requires localhost, HTTPS, or an
              Electron permission handler. You can still continue on web.
            </Text>
          ) : null}

          <Pressable
            className="mt-7 w-full rounded-xl bg-[#0E4EDB] px-6 py-4"
            onPress={() => router.replace("/(tabs)/overview")}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text
                className="text-[15px] text-white"
                style={{ fontFamily: "Manrope_700Bold" }}
              >
                Continue to Dashboard
              </Text>
              <HugeiconsIcon icon={ArrowRight} size={16} color="#fff" />
            </View>
          </Pressable>

          <Pressable
            disabled={cameraStatus === "checking"}
            className="mt-3 w-full rounded-xl border border-[#C8D8EF] px-6 py-3"
            onPress={() => setCameraStatus("checking")}
          >
            <Text
              className="text-center text-[14px] text-[#0C2A57]"
              style={{ fontFamily: "Manrope_700Bold" }}
            >
              {cameraStatus === "checking"
                ? "Checking Camera..."
                : "Check Camera Permission"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
