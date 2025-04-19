import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function StopControlButton({
  onStop,
  disabled,
  style,
}: {
  onStop: () => void;
  disabled?: boolean;
  style: ViewStyle | undefined
}) {
  return (
    <Pressable
      style={[styles.stopButton, disabled && styles.buttonDisabled, style]}
      onPress={onStop}
      disabled={disabled}
      accessibilityLabel="Stop Control"
    >
      <MaterialIcons name="stop" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stopButton: {
    backgroundColor: "#d32f2f",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.textLight,
  },
});
