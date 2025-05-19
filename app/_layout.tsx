import { Stack } from "expo-router";
import { LaptopConnectionProvider } from "../contexts/LaptopConnectionContext";
import { LaptopControlProvider } from "../contexts/LaptopControlContext";
import { VitalStatsProvider } from "../contexts/VitalStatsContext";
import AppHeader from "../components/app-header/AppHeader";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { TokensProvider } from "../contexts/TokensContext";
import { UserInfoProvider } from "../contexts/UserInfoContext";
import { RelationsProvider } from "../contexts/RelationsContext";
import { NotificationsProvider } from "../contexts/NotificationsContext";

// Configure splash screen options
SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function Layout() {
  const [appReady, setAppReady] = useState(false);
  const pathname = usePathname();
  const showHeader =
    pathname != "/login" && pathname != "/register" && pathname != "/";

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
    <TokensProvider>
      <RelationsProvider>
        <NotificationsProvider>
          <UserInfoProvider>
            <VitalStatsProvider>
              <LaptopConnectionProvider>
                <LaptopControlProvider>
                  <View style={{ flex: 1 }}>
                    {showHeader && <AppHeader />}
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="index" />
                    <Stack.Screen name="login/index" />
                    <Stack.Screen name="home/index" />
                    <Stack.Screen name="laptop-connection/index" />
                    <Stack.Screen name="remote-control/index" />
                    <Stack.Screen name="notification-center/index" />
                    <Stack.Screen name="esp-connection/index" />
                    <Stack.Screen name="register/index" />
                    <Stack.Screen name="profile/index" />
                    <Stack.Screen name="relations/index" />
                    <Stack.Screen name="patient-report/index" />
                  </Stack>
                </View>
              </LaptopControlProvider>
            </LaptopConnectionProvider>
            </VitalStatsProvider>
          </UserInfoProvider>
        </NotificationsProvider>
      </RelationsProvider>
    </TokensProvider>
  );
}
