import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";
import { LaptopControlProvider } from "../contexts/LaptopControlContext";
import AppHeader from "../components/AppHeader";
import { View } from "react-native";

export default function Layout() {
  return (
    <LaptopConnectionProvider>
      <LaptopControlProvider>
        <View style={{ flex: 1 }}>
          <AppHeader />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="laptop-connection/index" />
          </Stack>
        </View>
      </LaptopControlProvider>
    </LaptopConnectionProvider>
  );
}
