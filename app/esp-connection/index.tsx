import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import BluetoothScanScreen from "../../components/esp-connection/BluetoothScanScreen";
import ScreenHeader from "../../components/ScreenHeader";

const ESPConnectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Device Connection"
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
