import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ConnectionStatusCard from "./ConnectionStatusCard";

interface ConnectionStatusSectionProps {
  laptopConnected: boolean;
  espConnected: boolean;
}

const ConnectionStatusSection = ({
  laptopConnected,
  espConnected,
}: ConnectionStatusSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Connection Status</Text>
      <ConnectionStatusCard
        title="Laptop"
        isConnected={laptopConnected}
        icon="computer"
      />
      <ConnectionStatusCard
        title="Wheelchair"
        isConnected={espConnected}
        icon="bluetooth"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
});

export default ConnectionStatusSection; 