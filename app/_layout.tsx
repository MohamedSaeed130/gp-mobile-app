import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";
import { LaptopControlProvider } from "../contexts/LaptopControlContext";

export default function Layout() {
  return (
    <LaptopConnectionProvider>
      <LaptopControlProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="laptop-connection/index" />
        </Stack>
      </LaptopControlProvider>
    </LaptopConnectionProvider>
  );
}
