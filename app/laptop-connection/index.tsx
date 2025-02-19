import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectionForm from "./components/ConnectionForm";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";
import ScreenHeader from "../../components/ScreenHeader";
import SavedLaptopsSection from "./components/SavedLaptopsSection";
import { LaptopConnection } from "../../types/LaptopConnection";
import CurrentConnection from "../../components/CurrentLaptopConnection";

const STORAGE_KEY = "saved_laptops";

export default function LaptopConnectionScreen() {
  const { isConnected, isLoading, connect, disconnect } = useLaptopConnection();
  // Replace the hardcoded useState initialization
  const [savedLaptops, setSavedLaptops] = useState<LaptopConnection[]>([]);

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

  const saveLaptopsToStorage = async (laptops: LaptopConnection[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(laptops));
    } catch (error) {
      console.error("Error saving laptops:", error);
    }
  };

  // Add state for currently connected laptop
  const [connectedLaptop, setConnectedLaptop] = useState<
    LaptopConnection | undefined
  >();

  // Add state to track which laptop is being connected
  const [connectingLaptopId, setConnectingLaptopId] = useState<string | null>(
    null
  );

  const [attemptingLaptop, setAttemptingLaptop] =
    useState<LaptopConnection | null>(null);

  const handleConnect = async (
    ipAddress: string,
    port: string,
    name: string
  ) => {
    const newLaptop: LaptopConnection = {
      id: Date.now().toString(),
      name,
      ipAddress,
      port,
      lastConnected: new Date().toLocaleString(),
      connectionStatus: "disconnected",
    };
    setAttemptingLaptop(newLaptop);
    connect(ipAddress, port, name);
    // If connection is successful, add to saved laptops and set as connected
    if (!isLoading) {
      const updatedLaptops = [newLaptop, ...savedLaptops];
      setSavedLaptops(updatedLaptops);
      setConnectedLaptop(newLaptop);
      await saveLaptopsToStorage(updatedLaptops);
    }
  };

  const handleSavedLaptopConnect = (laptop: LaptopConnection) => {
    setConnectingLaptopId(laptop.id);
    setAttemptingLaptop(laptop);
    connect(laptop.ipAddress, laptop.port, laptop.name);
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
        <CurrentConnection />

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
});
