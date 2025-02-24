import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import BluetoothScanScreen from "../../components/esp-connection/BluetoothScanScreen";
import ScreenHeader from "../../components/ScreenHeader";

const ESPConnectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Device Connection"
        subtitle="Connect to your wheelchair's ESP32 module"
        // icon="bluetooth"
        // iconColor={isConnected ? '#34C759' : '#FF3B30'}
      />
      <BluetoothScanScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ESPConnectionScreen;
