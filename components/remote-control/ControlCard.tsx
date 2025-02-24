import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Colors from "../../constants/Colors";

export interface ControlCardProps {
  Icon: (props: any) => React.JSX.Element;
  label: string;
  size: number;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
}

const ControlCard = ({
  Icon,
  label,
  size,
  onPressIn,
  onPressOut: onPressOff,
}: ControlCardProps) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={[styles.container, styles.center, { width: size }]}
      onPressIn={(event) => {
        if (!onPressIn) return;
        setPressed(true);
        onPressIn(event);
      }}
      onPressOut={(event) => {
        if (!onPressIn) return;
        onPressOff && onPressOff(event);
        setPressed(false);
      }}
    >
      <View
        style={[
          styles.iconContainer,
          styles.center,
          { backgroundColor: pressed ? Colors.primary : Colors.componentBg },
        ]}
      >
        <Icon
          width={size}
          height={size}
          fill={pressed ? "white" : Colors.textPrimary}
        />
      </View>
      <Text
        style={[styles.label, styles.center, { color: Colors.textSecondary }]}
      >
        {label}
      </Text>
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
