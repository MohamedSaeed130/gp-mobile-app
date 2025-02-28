import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import DownArrow from "./arrows-icons/DownArrow";
import UpArrow from "./arrows-icons/UpArrow";
import RightArrow from "./arrows-icons/RightArrow";
import LeftArrow from "./arrows-icons/LeftArrow";
import { useLaptopControl } from "../../contexts/LaptopControlContext";

const PadController = ({ size }: { size: number }) => {
  const { padMove } = useLaptopControl();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handlePressIn = (direction: string, moveFunction: () => void) => {
    setPressedButton(direction);
    moveFunction();
  };

  const handlePressOut = (stopFunction: () => void) => {
    setPressedButton(null);
    stopFunction();
  };

  return (
    <View style={styles.pad}>
      <Pressable
        onPressIn={() => handlePressIn("up", padMove.moveUp)}
        onPressOut={() => handlePressOut(padMove.stopMoving)}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressedButton === "up" ? 0.5 : 1 },
        ]}
      >
        <UpArrow width={size} height={size} />
      </Pressable>
      <View style={[styles.horizontalArrows, { gap: size }]}>
        <Pressable
          onPressIn={() => handlePressIn("left", padMove.moveLeft)}
          onPressOut={() => handlePressOut(padMove.stopMoving)}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressedButton === "left" ? 0.5 : 1 },
          ]}
        >
          <LeftArrow width={size} height={size} />
        </Pressable>
        <Pressable
          onPressIn={() => handlePressIn("right", padMove.moveRight)}
          onPressOut={() => handlePressOut(padMove.stopMoving)}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressedButton === "right" ? 0.5 : 1 },
          ]}
        >
          <RightArrow width={size} height={size} />
        </Pressable>
      </View>
      <Pressable
        onPressIn={() => handlePressIn("down", padMove.moveDown)}
        onPressOut={() => handlePressOut(padMove.stopMoving)}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressedButton === "down" ? 0.5 : 1 },
        ]}
      >
        <DownArrow width={size} height={size} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    alignItems: "center",
  },
  horizontalArrows: {
    flexDirection: "row",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PadController;
