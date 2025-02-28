import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";
import { ControlMode } from "../../types/ControlMode";
import { useLaptopControl } from "../../contexts/LaptopControlContext";
import Colors from "../../constants/Colors";

export default function StartControl({
  selectedMode,
}: {
  selectedMode: ControlMode;
}) {
  const router = useRouter();
  const [startPressed, setStartPressed] = useState(false);
  const { isConnected } = useLaptopConnection();
  const { selectMode } = useLaptopControl();

  const buttonDisabled = !selectedMode || !isConnected;

  const handleStartControl = () => {
    setStartPressed(true);
    selectMode(selectedMode);
    if (selectedMode === "REMOTE") router.push("/remote-control");
  };

  return (
    <View style={styles.footer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
