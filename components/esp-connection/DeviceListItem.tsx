import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { BluetoothDevice } from "../../types/ui/ESPConnection";

interface DeviceListItemProps {
  device: BluetoothDevice;
  onPress: () => void;
}

const DeviceListItem = ({ device, onPress }: DeviceListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{device.name || "Unknown Device"}</Text>
      <Text style={styles.id}>{device.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  id: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default DeviceListItem;
