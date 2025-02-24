import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import PadController from "./PadController";
import SpeedController from "./SpeedController";
import JoystickController from "./JoystickController";
import ControlCard, { ControlCardProps } from "./ControlCard";
import Alarm from "./controls-icons/Alarm";
import Bulb from "./controls-icons/Bulb";
import Joystick from "./controls-icons/Joystick";
import Pad from "./controls-icons/Pad";
import { useLaptopControl } from "../../contexts/LaptopControlContext";
import Colors from "../../constants/Colors";

type controllerType = "Pad" | "Joystick";

const controlCardSize = 30;
const padSize = 60;
const joystickSize = padSize * 3;
const joystickStickSize = 80;
const speedControllerSize = 50;

const Controls = () => {
  const [controllerType, setControllerType] = useState<controllerType>("Pad");
  const { light, alarm, speed } = useLaptopControl();

  const controlCards: Omit<ControlCardProps, "size">[] = [
    {
      Icon: Bulb,
      label: "Light",
      onPressIn: light.on,
      onPressOut: light.off,
    },
    {
      Icon: Alarm,
      label: "Alarm",
      onPressIn: alarm.on,
      onPressOut: alarm.off,
    },
    {
      Icon: controllerType == "Pad" ? Pad : Joystick,
      label: controllerType,
      onPressIn: () =>
        setControllerType(controllerType == "Pad" ? "Joystick" : "Pad"),
    },
    {
      Icon: () => <Text style={{ fontSize: 20, fontWeight: "bold" }}>80%</Text>,
      label: "Battery",
    },
  ];

  return (
    <View>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-around",
          },
        ]}
      >
        {controlCards.map((item, i) => (
          <ControlCard
            key={i}
            Icon={item.Icon}
            label={item.label}
            onPressIn={item.onPressIn}
            onPressOut={item.onPressOut}
            size={controlCardSize}
          />
        ))}
      </View>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 64,
            paddingHorizontal: 32,
          },
        ]}
      >
        <View style={[styles.controllerContainer, styles.center]}>
          <Text style={styles.controllerText}>Controller</Text>
          {controllerType == "Pad" ? (
            <PadController size={padSize} />
          ) : (
            <JoystickController
              size={joystickSize}
              stickSize={joystickStickSize}
              neutralColor={Colors.primary}
              activeColor="rgb(133 190 229)"
            />
          )}
        </View>
        <View style={[styles.controllerContainer, { alignItems: "center" }]}>
          <Text style={styles.controllerText}>Speed</Text>
          <SpeedController
            size={speedControllerSize}
            onDecrement={speed.decrease}
            onIncrement={speed.increase}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controllerContainer: {
    padding: 5,
  },
  controllerText: {
    padding: 5,
    fontSize: 16,
  },
  center: { justifyContent: "center", alignItems: "center" },
});

export default Controls;
