import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
} from "react-native";
import Colors from "../../../constants/Colors";

type onPressType = (event: GestureResponderEvent) => void;

interface SpeedControllerProps {
  size: number;
  onIncrement: onPressType;
  onDecrement: onPressType;
}

const SpeedController = ({
  size,
  onIncrement,
  onDecrement,
}: SpeedControllerProps) => {
  const btnStyle = [styles.button, { width: size, heigth: size }];
  const txtStyle = [styles.text, { fontSize: size }];

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={onIncrement}
        underlayColor={Colors.buttonPressed}
      >
        <View style={[...btnStyle, styles.topButton]}>
          <Text style={txtStyle}>+</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={onDecrement}
        underlayColor={Colors.buttonPressed}
      >
        <View style={[...btnStyle, styles.bottomButton]}>
          <Text style={txtStyle}>-</Text>
        </View>
      </TouchableHighlight>
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
    backgroundColor: "black",
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
    color: "white",
  },
});

export default SpeedController;
