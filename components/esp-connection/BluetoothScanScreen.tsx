import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DeviceList from "./DeviceList";
import ScanHeader from "./ScanHeader";
import { BluetoothDevice } from "../../types/ui/ESPConnection";

const BluetoothScanScreen = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    // TODO: Implement actual BLE scanning logic
  };

  const stopScan = () => {
    setIsScanning(false);
    // TODO: Implement scan stop logic
  };

  const connectToDevice = (device: BluetoothDevice) => {
    // TODO: Implement device connection logic
  };

  return (
    <View style={styles.container}>
      <ScanHeader
        isScanning={isScanning}
        onScanPress={isScanning ? stopScan : startScan}
      />
      <DeviceList devices={devices} onDevicePress={connectToDevice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default BluetoothScanScreen;
