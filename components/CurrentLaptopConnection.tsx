import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLaptopConnection } from "../contexts/LaptopConnectionContext";

const CurrentLaptopConnection = () => {
  const {
    isConnected,
    isLoading,
    laptopConnection,
    error: statusMessage,
    disconnect,
  } = useLaptopConnection();
  const displayMessage =
    statusMessage ||
    (isConnected
      ? `${laptopConnection?.name}`
      : isLoading
      ? "Connecting"
      : "Not connected");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons
            name="computer"
            size={24}
            color={isConnected ? "#34C759" : isLoading ? "#007AFF" : "#FF3B30"}
          />
          <Text
            style={[
              styles.status,
              {
                color: isConnected
                  ? "#34C759"
                  : isLoading
                  ? "#007AFF"
                  : "#FF3B30",
              },
            ]}
          >
            {displayMessage}
          </Text>
        </View>
        {(isConnected || isLoading) && (
          <Pressable style={styles.disconnectButton} onPress={disconnect}>
            <Text style={styles.disconnectText}>
              {isLoading ? "Halt" : "Disconnect"}
            </Text>
          </Pressable>
        )}
      </View>

      {isConnected && laptopConnection && (
        <View style={styles.details}>
          <Text style={styles.name}>{laptopConnection.name}</Text>
          <Text style={styles.info}>
            {laptopConnection.ipAddress}:{laptopConnection.port}
          </Text>
        </View>
      )}

      {!isConnected && isLoading && laptopConnection && (
        <View style={styles.details}>
          <Text style={styles.name}>
            Connecting to: {laptopConnection.name}
          </Text>
          <Text style={styles.info}>
            {laptopConnection.ipAddress}:{laptopConnection.port}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  details: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  disconnectButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: "auto",
  },
  disconnectText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CurrentLaptopConnection;
