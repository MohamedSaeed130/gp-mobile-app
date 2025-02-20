import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../../constants/Colors";

interface SpeedControllerProps {
  size: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const SpeedController = ({
  size,
  onIncrement,
  onDecrement,
}: SpeedControllerProps) => {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handlePressIn = (button: string, action: () => void) => {
    setPressedButton(button);
    action();
  };

  const handlePressOut = () => {
    setPressedButton(null);
  };

  const btnStyle = [styles.button, { width: size, height: size }];
  const txtStyle = [styles.text, { fontSize: size }];

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => handlePressIn("increment", onIncrement)}
        onPressOut={handlePressOut}
        style={[
          ...btnStyle,
          styles.topButton,
          { opacity: pressedButton === "increment" ? 0.5 : 1 },
        ]}
      >
        <Text style={txtStyle}>+</Text>
      </Pressable>
      <Pressable
        onPressIn={() => handlePressIn("decrement", onDecrement)}
        onPressOut={handlePressOut}
        style={[
          ...btnStyle,
          styles.bottomButton,
          { opacity: pressedButton === "decrement" ? 0.5 : 1 },
        ]}
      >
        <Text style={txtStyle}>-</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  topButton: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomButton: {
    color: "white",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    color: Colors.background,
  },
});

export default SpeedController;
