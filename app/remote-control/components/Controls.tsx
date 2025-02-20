import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import PadController from "./PadController";
import SpeedController from "./SpeedController";
import JoystickController, { JoystickData } from "./JoystickController";
import ControlCard, { ControlCardProps } from "./ControlCard";
import Alarm from "./controls-icons/Alarm";
import Bulb from "./controls-icons/Bulb";
import Joystick from "./controls-icons/Joystick";
import Pad from "./controls-icons/Pad";
import Colors from "../../../constants/Colors";
import { useLaptopControl } from "../../../contexts/LaptopControlContext";

type controllerType = "Pad" | "Joystick";

const controlCardSize = 30;
const padSize = 60;
const joystickSize = padSize * 3;
const joystickStickSize = 80;
const speedControllerSize = 40;

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
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-around" }}
        numColumns={4}
        data={controlCards}
        renderItem={({ item }) => (
          <ControlCard
            Icon={item.Icon}
            label={item.label}
            onPressIn={item.onPressIn}
            onPressOut={item.onPressOut}
            size={controlCardSize}
          />
        )}
      />
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
              neutralColor="black"
              activeColor={Colors.joystickPressed}
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
