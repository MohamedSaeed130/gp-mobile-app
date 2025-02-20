import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  PanResponderGestureState,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useLaptopControl } from "../../../contexts/LaptopControlContext";

export interface JoystickData {
  x: number;
  y: number;
  angle: number;
  force: number;
}

interface JoystickProps {
  size?: number;
  stickSize?: number;
  neutralColor?: string;
  activeColor?: string;
  style?: StyleProp<ViewStyle>;
}

const JoystickController: React.FC<JoystickProps> = ({
  size = 150,
  stickSize = 60,
  neutralColor = "#888",
  activeColor = "#555",
}) => {
  const maxDistance = (size - stickSize) / 2;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [stickColor, setStickColor] = useState(neutralColor);

  const calculateAngle = (dx: number, dy: number): number => {
    return Math.atan2(dy, dx);
  };

  const calculateDistance = (dx: number, dy: number): number => {
    return Math.sqrt(dx * dx + dy * dy);
  };

  const { joystickMove } = useLaptopControl();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setStickColor(activeColor);
    },
    onPanResponderMove: (
      _: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => {
      let dx = gestureState.dx;
      let dy = gestureState.dy;
      const distance = calculateDistance(dx, dy);

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      pan.setValue({ x: dx, y: dy });

      const angle = calculateAngle(dx, dy);
      const force = distance / maxDistance;
      joystickMove({
        x: dx / maxDistance,
        y: dy / maxDistance,
        angle,
        force,
      });
    },
    onPanResponderRelease: () => {
      setStickColor(neutralColor);
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false,
      }).start();
      joystickMove({ x: 0, y: 0, angle: 0, force: 0 });
    },
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.background,
          styles.shadow,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.stick,
            {
              width: stickSize,
              height: stickSize,
              borderRadius: stickSize / 2,
              backgroundColor: stickColor,
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  stick: {
    position: "absolute",
    backgroundColor: "#888",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default JoystickController;
