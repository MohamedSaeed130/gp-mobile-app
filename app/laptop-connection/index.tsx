import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectionForm from "./components/ConnectionForm";
import { useWebSocket } from "./hooks/useWebSocket";
import ScreenHeader from "../../components/ScreenHeader";
import SavedLaptopsSection from "./components/SavedLaptopsSection";
import { SavedLaptop } from "./types";
import CurrentConnection from "./components/CurrentConnection";

const STORAGE_KEY = "saved_laptops";

export default function LaptopConnectionScreen() {
  const { connect, disconnect, isConnected, isLoading, statusMessage } =
    useWebSocket();

  // Replace the hardcoded useState initialization
  const [savedLaptops, setSavedLaptops] = useState<SavedLaptop[]>([]);

  // Add useEffect to load saved laptops on component mount
  useEffect(() => {
    loadSavedLaptops();
  }, []);

  const loadSavedLaptops = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setSavedLaptops(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error loading saved laptops:", error);
    }
  };

  const saveLaptopsToStorage = async (laptops: SavedLaptop[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(laptops));
    } catch (error) {
      console.error("Error saving laptops:", error);
    }
  };

  // Add state for currently connected laptop
  const [connectedLaptop, setConnectedLaptop] = useState<
    SavedLaptop | undefined
  >();

  // Add state to track which laptop is being connected
  const [connectingLaptopId, setConnectingLaptopId] = useState<string | null>(
    null
  );

  const [attemptingLaptop, setAttemptingLaptop] = useState<SavedLaptop | null>(
    null
  );

  const handleConnect = async (
    ipAddress: string,
    port: string,
    name: string
  ) => {
    const newLaptop: SavedLaptop = {
      id: Date.now().toString(),
      name,
      ipAddress,
      port,
      lastConnected: new Date().toLocaleString(),
    };
    setAttemptingLaptop(newLaptop);
    connect(ipAddress, port);
    // If connection is successful, add to saved laptops and set as connected
    if (!isLoading) {
      const updatedLaptops = [newLaptop, ...savedLaptops];
      setSavedLaptops(updatedLaptops);
      setConnectedLaptop(newLaptop);
      await saveLaptopsToStorage(updatedLaptops);
    }
  };

  const handleSavedLaptopConnect = (laptop: SavedLaptop) => {
    setConnectingLaptopId(laptop.id);
    setAttemptingLaptop(laptop);
    connect(laptop.ipAddress, laptop.port);
    if (!isLoading) {
      setConnectedLaptop(laptop);
      setConnectingLaptopId(null);
    }
  };

  // Update handleDeleteSavedLaptop to persist changes
  const handleDeleteSavedLaptop = async (id: string) => {
    const updatedLaptops = savedLaptops.filter((laptop) => laptop.id !== id);
    setSavedLaptops(updatedLaptops);
    await saveLaptopsToStorage(updatedLaptops);
  };

  const handleDisconnect = () => {
    disconnect();
    setConnectedLaptop(undefined);
    setAttemptingLaptop(null);
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
          attemptingLaptop={attemptingLaptop}
          isLoading={isLoading}
          statusMessage={statusMessage}
        />

        <ConnectionForm onConnect={handleConnect} isLoading={isLoading} />

        <SavedLaptopsSection
          laptops={savedLaptops}
          onConnect={handleSavedLaptopConnect}
          onDelete={handleDeleteSavedLaptop}
          isLoading={isLoading}
          connectingLaptopId={connectingLaptopId}
        />

        {isConnected && (
          <Pressable style={styles.disconnectButton} onPress={handleDisconnect}>
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
