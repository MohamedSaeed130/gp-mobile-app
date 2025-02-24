import React, { useState, ReactElement } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ConnectionBanner from "../../components/mode-selection//ConnectionBanner";
import ModeCard from "../../components/mode-selection//ModeCard";
import ScreenHeader from "../../components/ScreenHeader";
import CurrentLaptopConnection from "../../components/CurrentLaptopConnection";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";
import { ControlMode } from "../../types/ControlMode";
import { useLaptopControl } from "../../contexts/LaptopControlContext";
import Colors from "../../constants/Colors";

export default function ModeSelectionScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<ControlMode>(null);
  const { isConnected } = useLaptopConnection();
  const { selectMode } = useLaptopControl();

  const buttonDisabled = !selectedMode || !isConnected;

  const modes: Array<{
    id: ControlMode;
    title: string;
    description: string;
    icon: ReactElement;
  }> = [
    {
      id: "remote",
      title: "Remote Control",
      description: "Control using on-screen joystick and buttons",
      icon: (
        <MaterialCommunityIcons
          name="remote-tv"
          size={28}
          color={Colors.primary}
        />
      ),
    },
    {
      id: "eye",
      title: "Eye Direction",
      description: "Control using eye movement tracking",
      icon: (
        <MaterialCommunityIcons
          name="eye-outline"
          size={28}
          color={Colors.primary}
        />
      ),
    },
    {
      id: "face",
      title: "Face Direction",
      description: "Control using face orientation",
      icon: (
        <MaterialCommunityIcons
          name="face-recognition"
          size={28}
          color={Colors.primary}
        />
      ),
    },
    {
      id: "hand",
      title: "Hand Gesture",
      description: "Control using hand gesture recognition",
      icon: (
        <MaterialCommunityIcons
          name="hand-front-right"
          size={28}
          color={Colors.primary}
        />
      ),
    },
  ];

  const handleStartControl = () => {
    selectMode(selectedMode);
    if (selectedMode === "remote") router.push("/remote-control");
  };

  const getStyledIcon = (icon: ReactElement, isSelected: boolean) => {
    return React.cloneElement(icon, {
      color: isSelected ? Colors.background : Colors.primary,
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Control Mode"
        subtitle="Select your preferred control method"
        icon={
          <MaterialIcons
            name="settings-input-component"
            size={28}
            color={Colors.textSecondary}
          />
        }
      />

      <ScrollView style={styles.content}>
        <CurrentLaptopConnection />

        <ConnectionBanner isConnected={isConnected} />

        <Text style={styles.sectionTitle}>Select Control Mode</Text>

        {modes.map((mode) => (
          <ModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            icon={getStyledIcon(mode.icon, selectedMode === mode.id)}
            isSelected={selectedMode === mode.id}
            isDisabled={!isConnected}
            onSelect={() => setSelectedMode(mode.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.startButton, buttonDisabled && styles.buttonDisabled]}
          onPress={handleStartControl}
          disabled={buttonDisabled}
        >
          <MaterialIcons name="play-arrow" size={24} color="white" />
          <Text style={styles.buttonText}>Start Control</Text>
        </Pressable>
      </View>
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
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: `${Colors.background}E6`,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: Colors.textLight,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
});
