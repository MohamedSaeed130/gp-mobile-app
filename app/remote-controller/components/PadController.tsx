import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
} from "react-native";
import DownArrow from "./arrows-icons/DownArrow";
import UpArrow from "./arrows-icons/UpArrow";
import RightArrow from "./arrows-icons/RightArrow";
import LeftArrow from "./arrows-icons/LeftArrow";
import Colors from "../../../constants/Colors";

type onPressType = (event: GestureResponderEvent) => void;

interface PadControllerProps {
  size: number;
  onUp: onPressType;
  onDown: onPressType;
  onRight: onPressType;
  onLeft: onPressType;
}

const PadController = ({
  size,
  onUp,
  onDown,
  onRight,
  onLeft,
}: PadControllerProps) => {
  return (
    <View style={styles.pad}>
      <TouchableHighlight onPress={onUp} underlayColor={Colors.buttonPressed}>
        <UpArrow width={size} height={size} />
      </TouchableHighlight>
      <View style={[styles.horizontalArrows, { gap: size }]}>
        <TouchableHighlight
          onPress={onLeft}
          underlayColor={Colors.buttonPressed}
        >
          <LeftArrow width={size} height={size} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onRight}
          underlayColor={Colors.buttonPressed}
        >
          <RightArrow width={size} height={size} />
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={onDown} underlayColor={Colors.buttonPressed}>
        <DownArrow width={size} height={size} />
      </TouchableHighlight>
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
