import {
  ArrowRight,
  NeutralIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CameraView,
  FaceDetectionResult,
  FaceDetectorClassifications,
  FaceDetectorLandmarks,
  FaceDetectorMode,
  useCameraPermissions,
} from "react-native-face-detector-camera";

export default function LivenessVerification() {
  const router = useRouter();
  const [status, requestPermission] = useCameraPermissions();
  const [challenge, setChallenge] = useState<"left" | "right" | "done">("left");
  const [instruction, setInstruction] = useState("Turn your head LEFT");
  const [debugText, setDebugText] = useState("Waiting for face...");

  const hasPermission = status?.granted ?? false;
  const stableFramesRef = useRef(0);
  const firstTurnSignRef = useRef<"negative" | "positive" | null>(null);
  const completionHandledRef = useRef(false);

  const YAW_THRESHOLD = 18;
  const REQUIRED_STABLE_FRAMES = 3;

  function normalizeAngle(angle: number) {
    if (angle > 180) {
      return angle - 360;
    }

    return angle;
  }

  function handleVerificationComplete() {
    if (completionHandledRef.current) {
      return;
    }

    completionHandledRef.current = true;
    setChallenge("done");
    setInstruction("Verification complete!");
    setDebugText("Liveness done. Redirecting to overview...");

    Alert.alert(
      "Verification complete",
      "Liveness check passed successfully.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)/overview"),
        },
      ],
      { cancelable: false },
    );
  }

  function processFaceDetection({ faces }: FaceDetectionResult) {
    if (!hasPermission || faces.length === 0 || challenge === "done") {
      stableFramesRef.current = 0;
      if (faces.length === 0) {
        setDebugText("No face detected");
      }
      return;
    }

    const rawYaw = faces[0]?.yawAngle ?? 0;
    const rawRoll = faces[0]?.rollAngle ?? 0;
    const yaw = normalizeAngle(rawYaw);
    const roll = normalizeAngle(rawRoll);

    setDebugText(
      `faces:${faces.length} yaw:${yaw.toFixed(1)} roll:${roll.toFixed(1)} step:${challenge} stable:${stableFramesRef.current}`,
    );

    let turnedToOppositeSide = false;

    if (challenge === "left") {
      if (Math.abs(yaw) >= YAW_THRESHOLD) {
        stableFramesRef.current += 1;
      } else {
        stableFramesRef.current = 0;
      }

      if (stableFramesRef.current >= REQUIRED_STABLE_FRAMES) {
        firstTurnSignRef.current = yaw < 0 ? "negative" : "positive";
        stableFramesRef.current = 0;
        setChallenge("right");
        setInstruction("Great. Now turn your head to the opposite side");
      }

      return;
    }

    if (challenge === "right") {
      const firstTurnSign = firstTurnSignRef.current;
      turnedToOppositeSide =
        firstTurnSign === "negative"
          ? yaw >= YAW_THRESHOLD
          : yaw <= -YAW_THRESHOLD;

      if (turnedToOppositeSide) {
        stableFramesRef.current += 1;
      } else {
        stableFramesRef.current = 0;
      }

      if (stableFramesRef.current >= REQUIRED_STABLE_FRAMES) {
        stableFramesRef.current = 0;
        handleVerificationComplete();
        return;
      }
    }
  }

  useEffect(() => {
    if (status && !status.granted) {
      requestPermission();
    }
  }, [status, requestPermission]);

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
              {!status
                ? "Checking camera permission..."
                : !hasPermission
                  ? "Requesting camera permission..."
                  : instruction}
            </Text>
          </View>

          <View className="mt-6 items-center justify-center">
            <View className="h-[250px] w-[250px] overflow-hidden rounded-full border-[6px] border-[#0E4EDB] bg-[#D7E6FF] shadow-[0_16px_40px_rgba(14,78,219,0.20)]">
              {hasPermission ? (
                <CameraView
                  style={StyleSheet.absoluteFill}
                  facing="front"
                  onFacesDetected={processFaceDetection}
                  faceDetectorSettings={{
                    mode: FaceDetectorMode.fast,
                    detectLandmarks: FaceDetectorLandmarks.none,
                    runClassifications: FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                  }}
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
                  {hasPermission ? instruction : "Camera access required"}
                </Text>
              </View>

              {hasPermission ? (
                <View className="absolute inset-x-4 bottom-5 rounded-xl bg-black/55 px-3 py-2">
                  <Text
                    className="text-center text-[11px] text-white"
                    style={{ fontFamily: "Manrope_600SemiBold" }}
                  >
                    {debugText}
                  </Text>
                </View>
              ) : null}
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
            disabled={!hasPermission || challenge !== "done"}
            className="mt-8 w-full rounded-xl bg-[#D7DEE8] px-6 py-4 opacity-90"
            onPress={() => router.replace("/(tabs)/overview")}
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
