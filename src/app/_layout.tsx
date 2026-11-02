import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFrameCallback } from 'react-native-reanimated';

/** A busy UI thread (a stand-in for native rendering, e.g. a 3D view): busy 40 ms of every frame. */
const UI_BUSY_MS = 40;
/** A busy JS thread (a stand-in for heavy rendering): busy 900 ms of every 1000. */
const JS_BUSY_MS = 900;
const JS_EVERY_MS = 1000;

function busy(ms: number) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

export default function Layout() {
  useFrameCallback(() => {
    'worklet';
    const end = Date.now() + UI_BUSY_MS;
    while (Date.now() < end) {}
  });
  useEffect(() => {
    const timer = setInterval(() => busy(JS_BUSY_MS), JS_EVERY_MS);
    return () => clearInterval(timer);
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#111' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="sheet"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [1.0],
          sheetGrabberVisible: true,
          contentStyle: { backgroundColor: '#222' },
        }}
      />
    </Stack>
  );
}
