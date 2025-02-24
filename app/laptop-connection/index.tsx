import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectionForm from "../../components/laptop-connnection/ConnectionForm";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";
import ScreenHeader from "../../components/ScreenHeader";
import SavedLaptopsSection from "../../components/laptop-connnection/SavedLaptopsSection";
import { LaptopConnection } from "../../types/LaptopConnection";
import CurrentConnection from "../../components/CurrentLaptopConnection";
import Colors from "../../constants/Colors";

const STORAGE_KEY = "saved_laptops";

export default function LaptopConnectionScreen() {
  const { isConnected, isLoading, connect } = useLaptopConnection();
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

  // Add state to track which laptop is being connected
  const [connectingLaptopId, setConnectingLaptopId] = useState<string | null>(
    null
  );

  const handleConnect = async (
    ipAddress: string,
    port: string,
    name: string
  ) => {
    connect(ipAddress, port, name);

    if (
      savedLaptops.some(
        (laptop) =>
          laptop.name === name &&
          laptop.ipAddress === ipAddress &&
          laptop.port === port
      )
    )
      return;

    const newLaptop: LaptopConnection = {
      id: Date.now().toString(),
      name,
      ipAddress,
      port,
      lastConnected: new Date().toLocaleString(),
      connectionStatus: "disconnected",
    };
    // If connection is successful, add to saved laptops and set as connected
    if (!isLoading) {
      const updatedLaptops = [newLaptop, ...savedLaptops];
      setSavedLaptops(updatedLaptops);
      await saveLaptopsToStorage(updatedLaptops);
    }
  };

  const handleSavedLaptopConnect = (laptop: LaptopConnection) => {
    setConnectingLaptopId(laptop.id);
    connect(laptop.ipAddress, laptop.port, laptop.name);
    if (!isLoading) {
      setConnectingLaptopId(null);
    }
  };

  // Update handleDeleteSavedLaptop to persist changes
  const handleDeleteSavedLaptop = async (id: string) => {
    const updatedLaptops = savedLaptops.filter((laptop) => laptop.id !== id);
    setSavedLaptops(updatedLaptops);
    await saveLaptopsToStorage(updatedLaptops);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Laptop Connection"
        subtitle="Connect to your laptop to enable remote control"
        icon={
          <MaterialIcons
            name="computer"
            size={28}
            color={isConnected ? Colors.success : Colors.textSecondary}
          />
        }
      />

      <View style={{ padding: 20 }}>
        <CurrentConnection />
      </View>

      <ScrollView style={styles.content}>
        <ConnectionForm onConnect={handleConnect} isLoading={isLoading} />

        <SavedLaptopsSection
          laptops={savedLaptops}
          onConnect={handleSavedLaptopConnect}
          onDelete={handleDeleteSavedLaptop}
          isLoading={isLoading}
          connectingLaptopId={connectingLaptopId}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  content: {
    padding: 20,
  },
  disconnectButton: {
    backgroundColor: Colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  disconnectText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
