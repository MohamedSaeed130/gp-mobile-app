import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLaptopConnection } from "../contexts/LaptopConnectionContext";
import Colors from "../constants/Colors";

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

  const getStatusColor = () => {
    if (isConnected) return Colors.success;
    if (isLoading) return Colors.info;
    return Colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons
            name="computer"
            size={24}
            color={getStatusColor()}
          />
          <Text
            style={[
              styles.status,
              { color: getStatusColor() },
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

      {(isConnected || isLoading) && laptopConnection && (
        <View style={styles.details}>
          <Text style={styles.name}>
            {isLoading ? "Connecting to: " : ""}{laptopConnection.name}
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
    backgroundColor: Colors.componentBg,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    borderTopColor: Colors.divider,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  info: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  disconnectButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: "auto",
  },
  disconnectText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CurrentLaptopConnection;
