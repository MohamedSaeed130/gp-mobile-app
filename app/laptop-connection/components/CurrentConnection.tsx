import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SavedLaptop } from "../types";

interface CurrentConnectionProps {
  isConnected: boolean;
  connectedLaptop?: SavedLaptop;
  attemptingLaptop: SavedLaptop | null;
  isLoading: boolean;
  statusMessage: string;
}

const CurrentConnection = ({ 
  isConnected, 
  connectedLaptop,
  attemptingLaptop,
  isLoading,
  statusMessage,
}: CurrentConnectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="computer"
          size={24}
          color={isConnected ? "#34C759" : isLoading ? "#007AFF" : "#FF3B30"}
        />
        <Text 
          style={[
            styles.status, 
            { 
              color: isConnected ? "#34C759" : isLoading ? "#007AFF" : "#FF3B30" 
            }
          ]}
        >
          {statusMessage}
        </Text>
      </View>
      
      {isConnected && connectedLaptop && (
        <View style={styles.details}>
          <Text style={styles.name}>{connectedLaptop.name}</Text>
          <Text style={styles.info}>
            {connectedLaptop.ipAddress}:{connectedLaptop.port}
          </Text>
        </View>
      )}

      {!isConnected && isLoading && attemptingLaptop && (
        <View style={styles.details}>
          <Text style={styles.name}>Connecting to: {attemptingLaptop.name}</Text>
          <Text style={styles.info}>
            {attemptingLaptop.ipAddress}:{attemptingLaptop.port}
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
});

export default CurrentConnection; 