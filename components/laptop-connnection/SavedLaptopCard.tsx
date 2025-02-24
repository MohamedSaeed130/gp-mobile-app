import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LaptopConnection } from "../../types/LaptopConnection";
import Colors from "../../constants/Colors";

interface SavedLaptopCardProps {
  laptop: LaptopConnection;
  onConnect: (laptop: LaptopConnection) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  connectingLaptopId: string | null;
}

const SavedLaptopCard = ({
  laptop,
  onConnect,
  onDelete,
  isLoading,
  connectingLaptopId,
}: SavedLaptopCardProps) => {
  const isThisLaptopConnecting = connectingLaptopId === laptop.id;
  const isDisabled = isLoading; // Any connection attempt disables all buttons

  return (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="computer" size={24} color={Colors.primary} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{laptop.name}</Text>
          <Text style={styles.info}>
            {laptop.ipAddress}:{laptop.port}
          </Text>
          <Text style={styles.lastConnected}>
            Last connected: {laptop.lastConnected}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(laptop.id)}
          disabled={isDisabled}
        >
          <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
        </Pressable>
        <Pressable
          style={[styles.connectButton, isDisabled && styles.buttonDisabled]}
          onPress={() => onConnect(laptop)}
          disabled={isDisabled}
        >
          <MaterialIcons
            name="link"
            size={20}
            color={isDisabled ? Colors.textLight : Colors.background}
          />
          <Text
            style={[
              styles.connectText,
              isDisabled && styles.connectTextDisabled,
            ]}
          >
            {isThisLaptopConnecting ? "Connecting..." : "Connect"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.componentBg,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mainContent: {
    flexDirection: "row",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  lastConnected: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  deleteButton: {
    padding: 8,
    marginRight: 10,
    backgroundColor: "#FFF1F0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  connectText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  connectTextDisabled: {
    color: "#999",
  },
});

export default SavedLaptopCard;
