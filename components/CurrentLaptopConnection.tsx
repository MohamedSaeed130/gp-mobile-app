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

  const getContainerStyle = () => {
    const statusColor = getStatusColor();
    return [
      styles.container,
      {
        borderColor: statusColor,
        borderWidth: isConnected || isLoading ? 2 : 1,
        transform: [{ scale: isConnected ? 1 : 0.98 }],
        backgroundColor: `${statusColor}10`,
      },
    ];
  };

  const getIconStyle = () => {
    return {
      opacity: isLoading ? 0.7 : 1,
      transform: [{ scale: isLoading ? 0.9 : 1 }],
    };
  };

  const getIconContainerStyle = () => {
    const statusColor = getStatusColor();
    return [
      styles.iconContainer,
      getIconStyle(),
      {
        backgroundColor: `${statusColor}20`,
      },
    ];
  };

  return (
    <View style={getContainerStyle()}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={getIconContainerStyle()}>
            <MaterialIcons name="computer" size={24} color={getStatusColor()} />
          </View>
          <Text
            style={[
              styles.status,
              { color: getStatusColor() },
              isLoading && styles.loadingText,
            ]}
          >
            {displayMessage}
          </Text>
        </View>
        {(isConnected || isLoading) && (
          <Pressable
            style={({ pressed }) => [
              styles.disconnectButton,
              pressed && styles.disconnectButtonPressed,
            ]}
            onPress={disconnect}
          >
            <Text style={styles.disconnectText}>
              {isLoading ? "Halt" : "Disconnect"}
            </Text>
          </Pressable>
        )}
      </View>

      {(isConnected || isLoading) && laptopConnection && (
        <View style={styles.details}>
          <Text style={styles.name}>
            {isLoading ? "Connecting to: " : ""}
            {laptopConnection.name}
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
    transform: [{ scale: 1 }],
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  loadingText: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
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
    shadowColor: Colors.error,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  disconnectButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  disconnectText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CurrentLaptopConnection;
