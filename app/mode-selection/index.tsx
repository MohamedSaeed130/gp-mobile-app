import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ConnectionBanner from "./components/ConnectionBanner";
import ModeCard from "./components/ModeCard";
import ScreenHeader from "../../components/ScreenHeader";
import LaptopConnectionStatus from "./components/LaptopConnectionStatus";

type ControlMode = "eye" | "face" | "hand" | null;

export default function ModeSelectionScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ControlMode>(null);

  // TODO: Get these from global connection context
  const isConnected = false;
  const connectedLaptopName = "Home Laptop"; // This should come from context

  const modes: Array<{
    id: ControlMode;
    title: string;
    description: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }> = [
    {
      id: "eye",
      title: "Eye Direction",
      description: "Control using eye movement tracking",
      icon: "visibility" as const,
    },
    {
      id: "face" as const,
      title: "Face Direction",
      description: "Control using face orientation",
      icon: "face" as const,
    },
    {
      id: "hand" as const,
      title: "Hand Gesture",
      description: "Control using hand gesture recognition",
      icon: "back-hand" as const,
    },
  ];

  const handleStartControl = () => {
    if (selectedMode) {
      // TODO: Set selected mode in global state
      router.push("/remote-controller");
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Control Mode"
        subtitle="Select your preferred control method"
        icon="settings-input-component"
      />

      <View style={styles.content}>
        <LaptopConnectionStatus
          isConnected={isConnected}
          connectedLaptopName={connectedLaptopName}
        />

        <ConnectionBanner isConnected={isConnected} />

        <Text style={styles.sectionTitle}>Select Control Mode</Text>

        {modes.map((mode) => (
          <ModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            icon={mode.icon}
            isSelected={selectedMode === mode.id}
            isDisabled={!isConnected}
            onSelect={() => setSelectedMode(mode.id)}
          />
        ))}
      </View>

      {selectedMode && (
        <View style={styles.footer}>
          <Pressable
            style={[styles.startButton, !isConnected && styles.buttonDisabled]}
            onPress={handleStartControl}
            disabled={!isConnected}
          >
            <MaterialIcons name="play-arrow" size={24} color="white" />
            <Text style={styles.buttonText}>Start Control</Text>
          </Pressable>
        </View>
      )}
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
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
  },
  startButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
});
