import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { SvgProps } from "react-native-svg";

export interface ControlCardProps {
  Icon: (props: any) => React.JSX.Element;
  label: string;
  size: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const ControlCard = ({ Icon, label, size, onPress }: ControlCardProps) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={[styles.container, styles.center, { width: size }]}
      onPressIn={(event) => {
        if (!onPress) return;
        setPressed(true);
        onPress(event);
      }}
      onPressOut={() => {
        if (!onPress) return;
        setPressed(false);
      }}
    >
      <View
        style={[
          styles.iconContainer,
          styles.center,
          { backgroundColor: pressed ? "black" : "white" },
        ]}
      >
        <Icon width={size} height={size} fill={pressed ? "white" : "black"} />
      </View>
      <Text style={[styles.label, styles.center]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  iconContainer: {
    padding: 16,
    borderRadius: "50%",
  },
  label: {
    fontSize: 18,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ControlCard;
