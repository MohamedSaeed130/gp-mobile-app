import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";
import { LaptopControlProvider } from "../contexts/LaptopControlContext";
import AppHeader from "../components/AppHeader";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Configure splash screen options
SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function Layout() {
  return (
    <LaptopConnectionProvider>
      <LaptopControlProvider>
        <View style={{ flex: 1 }}>
          <AppHeader />
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </LaptopControlProvider>
    </LaptopConnectionProvider>
  );
}
