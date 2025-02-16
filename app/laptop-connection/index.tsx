import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ConnectionStatus from "./components/ConnectionStatus";
import ConnectionForm from "./components/ConnectionForm";
import { useWebSocket } from "./hooks/useWebSocket";
import ScreenHeader from "../../components/ScreenHeader";
import SavedLaptopsSection from "./components/SavedLaptopsSection";
import { SavedLaptop } from "./types";
import CurrentConnection from "./components/CurrentConnection";

export default function LaptopConnectionScreen() {
  const { connect, disconnect, isConnected, isLoading, statusMessage } =
    useWebSocket();

  // TODO: Move this to persistent storage
  const [savedLaptops, setSavedLaptops] = useState<SavedLaptop[]>([
    {
      id: "1",
      name: "Home Laptop",
      ipAddress: "192.168.1.100",
      port: "8080",
      lastConnected: "2024-03-10 15:30",
    },
    // Add more saved laptops as needed
  ]);

  // Add state for currently connected laptop
  const [connectedLaptop, setConnectedLaptop] = useState<SavedLaptop | undefined>();

  const handleConnect = (ipAddress: string, port: string, name: string) => {
    connect(ipAddress, port);
    // If connection is successful, add to saved laptops and set as connected
    if (!isLoading) {
      const newLaptop: SavedLaptop = {
        id: Date.now().toString(),
        name,
        ipAddress,
        port,
        lastConnected: new Date().toLocaleString(),
      };
      setSavedLaptops((prev) => [newLaptop, ...prev]);
      setConnectedLaptop(newLaptop);
    }
  };

  const handleSavedLaptopConnect = (laptop: SavedLaptop) => {
    connect(laptop.ipAddress, laptop.port);
    if (!isLoading) {
      setConnectedLaptop(laptop);
    }
  };

  const handleDeleteSavedLaptop = (id: string) => {
    setSavedLaptops((prev) => prev.filter((laptop) => laptop.id !== id));
  };

  const handleDisconnect = () => {
    disconnect();
    setConnectedLaptop(undefined);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Laptop Connection"
        subtitle="Connect to your laptop to enable remote control"
        icon="computer"
        iconColor={isConnected ? "#34C759" : "#FF3B30"}
      />

      <ScrollView style={styles.content}>
        <CurrentConnection 
          isConnected={isConnected} 
          connectedLaptop={connectedLaptop}
        />

        <ConnectionForm onConnect={handleConnect} isLoading={isLoading} />

        <SavedLaptopsSection
          laptops={savedLaptops}
          onConnect={handleSavedLaptopConnect}
          onDelete={handleDeleteSavedLaptop}
          isLoading={isLoading}
        />

        {isConnected && (
          <Pressable 
            style={styles.disconnectButton} 
            onPress={handleDisconnect}
          >
            <MaterialIcons name="link-off" size={24} color="white" />
            <Text style={styles.disconnectText}>Disconnect</Text>
          </Pressable>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <MaterialIcons name="info" size={20} color="#666" />
        <Text style={styles.footerText}>
          Make sure your laptop is running the required server application
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    padding: 20,
  },
  disconnectButton: {
    backgroundColor: "#FF3B30",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  disconnectText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
});
