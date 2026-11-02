# Stale SafeAreaView insets in a native sheet after rotation

Repro for [#781](https://github.com/appandflow/react-native-safe-area-context/issues/781) and [#802](https://github.com/appandflow/react-native-safe-area-context/issues/802) in react-native-safe-area-context. The fix is in [#803](https://github.com/appandflow/react-native-safe-area-context/pull/803).

It's a `SafeAreaView` with left and right edges, in a `ScrollView`, in an Expo Router `formSheet` (see `src/app/sheet.tsx`). The layout keeps the UI and JS threads busy, like an app with a 3D view would (see `src/app/_layout.tsx`).

Built with Expo SDK 58, RN 0.88.1, react-native-screens 4.30.1 and react-native-safe-area-context 5.11.0, on an iOS 27 simulator.

## Steps

1. `npm install`, then `npx expo run:ios`
2. Tap **Open sheet**
3. Rotate to landscape left, then landscape right, then back to portrait

The red frame should stay clear of the notch in landscape and reach both edges in portrait.

## What you'll see

![Before and after, 4x slower](media/before-after-4x-slow.gif)

Left is 5.11.0. Back in portrait the frame keeps the landscape inset until React commits again, because the sheet sits outside the provider and nothing tells the view its insets changed (#781).

Middle adds a `safeAreaInsetsDidChange` override. The insets follow now, but in landscape the frame stays under the notch for a few frames, because the async state update waits for the next event beat (#802).

Right also passes `unstable_Immediate`, like react-native-screens does for its screen state. Every frame is correct.

There's also an [MP4](media/before-after-4x-slow.mp4) of the same clip.

## Trying the fix

`fix.patch` has both changes. Run `patch -p1 < fix.patch`, then `npx expo run:ios` again.

On this branch, `fix.patch` matches the latest commit of #803 ([`9e0134d`](https://github.com/hirbod/react-native-safe-area-context/commit/9e0134d)). It only uses `unstable_Immediate` where React Native has it, so it also builds on RN 0.81 and older.
