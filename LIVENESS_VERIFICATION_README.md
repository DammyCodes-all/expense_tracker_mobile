# Liveness Verification Flow (Beginner Guide)

This document explains the complete liveness logic in:

- app/liveness-verification.tsx

It is written for beginners, so each part explains both what it does and why it exists.

## 1) What this screen is trying to do

The liveness screen verifies that a real person is in front of the camera by asking for two motions:

1. Turn head to one side.
2. Turn head to the opposite side.

If both are detected steadily (not just one noisy frame), verification is marked complete.

After completion:

- an alert is shown
- the app navigates to the overview tab

## 2) High-level architecture

The screen has 4 main layers:

1. Permission layer
- Checks camera permission and requests it if needed.

2. Camera + detection layer
- Renders front camera preview.
- Receives face detection events from CameraView.

3. Liveness state machine layer
- Tracks which challenge step the user is on.
- Decides when a step is completed.

4. UI feedback layer
- Displays instructions.
- Shows live debug telemetry.
- Enables button only when done.

## 3) Important concepts used in code

### 3.1 React state vs ref

State (useState):
- Used for values that should re-render UI when changed.
- Examples: challenge, instruction, debugText.

Ref (useRef):
- Used for mutable values that should persist between frames without causing re-renders.
- Examples: stableFramesRef, firstTurnSignRef.

Why refs for frame logic?
- Face detection events can arrive frequently.
- If every small counter update used state, UI would re-render too often.

### 3.2 Face yaw angle

Yaw means left-right head rotation around the vertical axis.

Typical intuition:
- Positive yaw: turned one side
- Negative yaw: turned the other side

But your detector often returns raw angles in 0..360 format, for example:
- 357 degrees (which is effectively -3)
- 350 degrees (which is effectively -10)

So we normalize angle values.

Normalization rule in code:
- if angle > 180, use angle - 360
- else keep angle as-is

Examples:
- 357 -> -3
- 350 -> -10
- 44 -> 44

This fix is critical; without it, opposite-turn checks can fail.

## 4) Code walkthrough by section

## 4.1 Imports section

The file imports:

- expo-router useRouter:
  - lets us navigate to /(tabs)/overview

- React hooks:
  - useState for UI state
  - useRef for frame counters and one-time flags
  - useEffect for permission request side effect

- react-native-face-detector-camera:
  - CameraView: preview + detection
  - useCameraPermissions: permission hook
  - FaceDetectionResult and enums for detector settings

- React Native UI primitives and Alert:
  - Alert is used to show done message

## 4.2 Component setup

In LivenessVerification:

- router = useRouter()
  - used for navigation after completion

- [status, requestPermission] = useCameraPermissions()
  - permission state + function to ask for access

- challenge state:
  - "left" = first step
  - "right" = second step
  - "done" = completed

- instruction state:
  - text shown to user to guide next action

- debugText state:
  - telemetry shown on overlay for debugging

- hasPermission:
  - convenience boolean from permission status

Refs used:

- stableFramesRef:
  - counts consecutive frames that satisfy current condition

- firstTurnSignRef:
  - remembers direction of first successful turn
  - value is "negative" or "positive"

- lastLogTimestampRef:
  - log throttling (avoid spamming console)

- completionHandledRef:
  - ensures done alert/navigation logic runs once only

Constants:

- YAW_THRESHOLD = 18
  - minimum yaw magnitude to consider a meaningful turn

- REQUIRED_STABLE_FRAMES = 3
  - requires condition to be true for 3 consecutive frames
  - prevents accidental triggers due to noise

## 4.3 normalizeAngle(angle)

Purpose:
- convert raw 0..360 angle into signed -180..180 angle.

Why:
- liveness logic uses opposite directions; signed representation is easier and correct.

## 4.4 handleVerificationComplete()

Purpose:
- one-time completion handler.

What it does:

1. Checks completionHandledRef; exits if already completed.
2. Marks completionHandledRef true.
3. Sets challenge to done.
4. Updates instruction/debug text.
5. Shows Alert with Continue button.
6. On Continue, navigates to /(tabs)/overview.

Why this exists:
- face events continue arriving, so without a guard you could show multiple alerts.

## 4.5 processFaceDetection({ faces })

This is the core logic called whenever detector emits face data.

Step A: guard clauses

If any of these are true:
- no permission
- no faces detected
- already done

Then:
- reset stable frame counter
- optionally update debug text
- return early

Step B: read and normalize angles

- rawYaw/rawRoll from first face
- yaw/roll normalized with normalizeAngle

Step C: update debug text

- shows faces count, normalized yaw, normalized roll, current step, stable count

Step D: challenge logic

If challenge is left:

- condition is abs(yaw) >= threshold
  - this means user turned enough in either direction

- if true, increment stable frame count
- if false, reset stable frame count

- once stable frames reach REQUIRED_STABLE_FRAMES:
  - record first turn sign
  - reset stable counter
  - move challenge to right
  - update instruction to turn opposite side

If challenge is right:

- determine opposite direction based on first turn sign:
  - first was negative => now require yaw >= threshold
  - first was positive => now require yaw <= -threshold

- if opposite condition true, increment stable frames
- else reset

- when stable frames reach REQUIRED_STABLE_FRAMES:
  - reset stable counter
  - call handleVerificationComplete()

Step E: throttled logs

- every ~450ms, console logs diagnostic payload:
  - challenge
  - faces
  - yaw + rawYaw
  - roll + rawRoll
  - stableFrames
  - firstTurnSign
  - turnedToOppositeSide

Why this helps:
- lets you verify detector output and decision-making without flooding logs each frame.

## 4.6 useEffect for permission

Effect checks permission status.

If status exists and is not granted:
- calls requestPermission()

This makes onboarding automatic when screen loads.

## 4.7 Rendered UI

The UI shows:

1. Title/subtitle.
2. Status pill with permission/challenge instruction.
3. Circular camera area:
   - CameraView when permission granted.
   - Placeholder when denied/pending.
4. Top overlay text for current instruction.
5. Bottom debug overlay with live telemetry.
6. Security badge.
7. Start button:
   - enabled only when challenge === done and permission granted.
   - on press, navigates to /(tabs)/overview.

## 5) Why your earlier flow got stuck

Before angle normalization, raw yaw like 355 was treated as very positive, but semantically it is close to -5.

So opposite-side checks sometimes never matched even when user actually turned correctly.

Normalization fixed this mismatch.

## 6) Tuning knobs you can adjust

You can tune detection strictness with:

- YAW_THRESHOLD
  - lower value: easier to pass
  - higher value: stricter head turn

- REQUIRED_STABLE_FRAMES
  - lower value: faster, but more noise-sensitive
  - higher value: slower, but more robust

- minDetectionInterval in faceDetectorSettings
  - smaller: more frequent events
  - larger: fewer events, lighter CPU

## 7) Future improvements (optional)

1. Add a reset button to restart liveness from scratch.
2. Add a timeout if user does not complete in N seconds.
3. Save verification timestamp in storage/context.
4. Replace debug overlay with hidden dev-only mode.
5. Add centered-face bounding checks before accepting yaw.

## 8) Quick mental model

You can think of the flow as:

- Ask permission -> stream face data -> normalize angles -> detect first turn -> demand opposite turn -> complete -> alert -> navigate

That is the complete end-to-end liveness pipeline in this file.
