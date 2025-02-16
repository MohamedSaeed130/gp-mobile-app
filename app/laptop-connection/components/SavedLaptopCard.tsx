import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SavedLaptop } from "../types";

interface SavedLaptopCardProps {
  laptop: SavedLaptop;
  onConnect: (laptop: SavedLaptop) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const SavedLaptopCard = ({
  laptop,
  onConnect,
  onDelete,
  isLoading,
}: SavedLaptopCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="computer" size={24} color="#007AFF" />
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
          disabled={isLoading}
        >
          <MaterialIcons name="delete-outline" size={20} color="#FF3B30" />
        </Pressable>
        <Pressable
          style={[styles.connectButton, isLoading && styles.buttonDisabled]}
          onPress={() => onConnect(laptop)}
          disabled={isLoading}
        >
          <MaterialIcons name="link" size={20} color="white" />
          <Text style={styles.connectText}>
            {isLoading ? "Connecting..." : "Connect"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  mainContent: {
    flexDirection: "row",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F0F8FF",
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
    backgroundColor: "#999",
  },
  connectText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default SavedLaptopCard;
