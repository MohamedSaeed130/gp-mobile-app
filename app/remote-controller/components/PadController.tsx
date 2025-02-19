import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import DownArrow from "./arrows-icons/DownArrow";
import UpArrow from "./arrows-icons/UpArrow";
import RightArrow from "./arrows-icons/RightArrow";
import LeftArrow from "./arrows-icons/LeftArrow";
import { useMovementControl } from "../../../contexts/LaptopMovementControlContext";

const PadController = ({ size }: { size: number }) => {
  const { padMove } = useMovementControl();

  return (
    <View style={styles.pad}>
      <Pressable onPressIn={padMove.moveUp} onPressOut={padMove.stopMoving}>
        <UpArrow width={size} height={size} />
      </Pressable>
      <View style={[styles.horizontalArrows, { gap: size }]}>
        <Pressable
          onPressIn={padMove.moveLeft}
          onPressOut={padMove.stopSteering}
        >
          <LeftArrow width={size} height={size} />
        </Pressable>
        <Pressable
          onPressIn={padMove.moveRight}
          onPressOut={padMove.stopSteering}
        >
          <RightArrow width={size} height={size} />
        </Pressable>
      </View>
      <Pressable onPressIn={padMove.moveDown} onPressOut={padMove.stopMoving}>
        <DownArrow width={size} height={size} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    backgroundColor: "white",
    alignItems: "center",
  },
  horizontalArrows: {
    flexDirection: "row",
  },
});

export default PadController;
