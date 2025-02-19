import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";

export default function Layout() {
  return (
    <LaptopConnectionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="laptop-connection/index" />
      </Stack>
    </LaptopConnectionProvider>
  );
}
