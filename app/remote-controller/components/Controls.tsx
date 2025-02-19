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
import { useLaptopConnection } from "../../../contexts/LaptopConnectionContext";
import { LaptopMovementControlProvider } from "../../../contexts/LaptopMovementControlContext";

type controllerType = "Pad" | "Joystick";

const controlCardSize = 30;
const padSize = 60;
const joystickSize = padSize * 3;
const joystickStickSize = 80;
const speedControllerSize = 40;

const Controls = () => {
  const { sendMessage } = useLaptopConnection();
  const [controllerType, setControllerType] = useState<controllerType>("Pad");

  const controlCards: Omit<ControlCardProps, "size">[] = [
    {
      Icon: Bulb,
      label: "Light",
      onPressIn: () => sendMessage("light_on"),
      onPressOut: () => sendMessage("light_off"),
    },
    {
      Icon: Alarm,
      label: "Alarm",
      onPressIn: () => sendMessage("alarm_on"),
      onPressOut: () => sendMessage("alarm_off"),
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
        <LaptopMovementControlProvider>
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
        </LaptopMovementControlProvider>
        <View style={[styles.controllerContainer, { alignItems: "center" }]}>
          <Text style={styles.controllerText}>Speed</Text>
          <SpeedController
            size={speedControllerSize}
            onDecrement={() => sendMessage("decrease_speed")}
            onIncrement={() => sendMessage("increase_speed")}
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
