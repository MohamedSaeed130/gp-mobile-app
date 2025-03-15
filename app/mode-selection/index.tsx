import React, { useState, ReactElement } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import ConnectionBanner from "../../components/mode-selection//ConnectionBanner";
import ModeCard from "../../components/mode-selection//ModeCard";
import ScreenHeader from "../../components/ScreenHeader";
import CurrentLaptopConnection from "../../components/CurrentLaptopConnection";
import { ControlMode } from "../../types/ControlMode";
import Colors from "../../constants/Colors";
import StartControl from "../../components/mode-selection/StartControl";

export default function ModeSelectionScreen() {
  const [selectedMode, setSelectedMode] = useState<ControlMode>(null);

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
    {
      id: "voice",
      title: "Voice Commands",
      description: "Control using voice commands",
      icon: (
        <MaterialIcons name="keyboard-voice" size={28} color={Colors.primary} />
      ),
    },
  ];

  const getStyledIcon = (icon: ReactElement, isSelected: boolean) => {
    return React.cloneElement(icon, {
      color: isSelected ? Colors.background : Colors.primary,
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Control Mode"
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

        <ConnectionBanner />

        <Text style={styles.sectionTitle}>Select Control Mode</Text>

        <View style={{ paddingBottom: 20 }}>
          {modes.map((mode) => (
            <ModeCard
              key={mode.id}
              title={mode.title}
              description={mode.description}
              icon={getStyledIcon(mode.icon, selectedMode === mode.id)}
              isSelected={selectedMode === mode.id}
              onSelect={() => setSelectedMode(mode.id)}
            />
          ))}
        </View>
      </ScrollView>
      <StartControl selectedMode={selectedMode} />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  footer: {
    padding: 20,
    backgroundColor: `${Colors.background}E6`,
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
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
