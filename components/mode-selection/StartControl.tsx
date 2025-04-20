import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";
import { ControlMode } from "../../types/ui/ControlMode";
import { useLaptopControl } from "../../contexts/LaptopControlContext";
import Colors from "../../constants/Colors";
import StopControlButton from "./StopControlButton";

export default function StartControl({
  selectedMode,
  onStopComplete,
}: {
  selectedMode: ControlMode;
  onStopComplete?: () => void;
}) {
  const router = useRouter();
  const [startPressed, setStartPressed] = useState(false);
  const { isConnected } = useLaptopConnection();
  const { selectMode, reset } = useLaptopControl();

  const buttonDisabled = !selectedMode || !isConnected;

  const handleStartControl = () => {
    setStartPressed(true);
    if (selectedMode === "remote") router.push("/remote-control");
    else selectMode(selectedMode);
  };

  const [stopPressed, setStopPressed] = useState(false);
  const handleStopControl = () => {
    setStopPressed(true);
    setTimeout(() => {
      setStopPressed(false);
      reset();
      if (onStopComplete) onStopComplete();
    }, 200);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.buttonRow}>
        <Pressable
          style={[
            { opacity: startPressed ? 0.5 : 1 },
            styles.startButton,
            buttonDisabled && styles.buttonDisabled,
          ]}
          onPressIn={handleStartControl}
          onPressOut={() => setStartPressed(false)}
          disabled={buttonDisabled}
        >
          <MaterialIcons name="play-arrow" size={24} color="white" />
          <Text style={styles.buttonText}>Start Control</Text>
        </Pressable>
        <StopControlButton
          onStop={handleStopControl}
          disabled={buttonDisabled}
          style={stopPressed ? styles.stopButtonActive : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 12,
    backgroundColor: `${Colors.background}E6`,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: Colors.textLight,
  },
  stopButtonActive: {
    backgroundColor: "#ff6161",
    transform: [{ scale: 1.08 }],
    shadowColor: "#ff6161",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
