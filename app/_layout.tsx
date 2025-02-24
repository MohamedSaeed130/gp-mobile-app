import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";
import { LaptopControlProvider } from "../contexts/LaptopControlContext";
import AppHeader from "../components/AppHeader";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

// Configure splash screen options
SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function Layout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simulate loading (e.g., fetch data, load fonts)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appReady) {
    return null; // Keep splash screen until ready
  }

  return (
    <LaptopConnectionProvider>
      <LaptopControlProvider>
        <View style={{ flex: 1 }}>
          <AppHeader />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="laptop-connection/index" />
            <Stack.Screen name="remote-control/index" />
            <Stack.Screen name="esp-connection/index" />
          </Stack>
        </View>
      </LaptopControlProvider>
    </LaptopConnectionProvider>
  );
}
