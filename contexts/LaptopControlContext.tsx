import React, { createContext, useContext, useCallback } from "react";
import { JoystickData } from "../app/remote-control/components/JoystickController";
import { useLaptopConnection } from "./LaptopConnectionContext";
import { ControlMode } from "../types/ControlMode";

// Define the context type
interface LaptopControlContextType {
  padMove: {
    moveUp: () => void;
    moveDown: () => void;
    stopMoving: () => void;
    moveRight: () => void;
    moveLeft: () => void;
    stopSteering: () => void;
  };
  joystickMove: (data: JoystickData) => void;
  light: { on: () => void; off: () => void };
  alarm: { on: () => void; off: () => void };
  speed: { increase: () => void; decrease: () => void };
  selectMode: (mode: ControlMode) => void;
}

// Create the context
const LaptopControlContext = createContext<
  LaptopControlContextType | undefined
>(undefined);

// Create the provider component
export function LaptopControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sendMessage } = useLaptopConnection();

  const onSteeringOff = useCallback(
    () => sendMessage("stop_steering"),
    [sendMessage]
  );
  const onMovingOff = useCallback(
    () => sendMessage("stop_moving"),
    [sendMessage]
  );

  const padMove = {
    moveUp: useCallback(() => sendMessage("up"), [sendMessage]),
    moveDown: useCallback(() => sendMessage("down"), [sendMessage]),
    stopMoving: onMovingOff,
    moveRight: useCallback(() => sendMessage("right"), [sendMessage]),
    moveLeft: useCallback(() => sendMessage("left"), [sendMessage]),
    stopSteering: onSteeringOff,
  };

  const joystickMovementThreshold = 0.4;
  let isSteering = false;
  let isMoving = false;

  const joystickMove = useCallback(
    (data: JoystickData) => {
      if (
        data.y > -joystickMovementThreshold &&
        data.y < joystickMovementThreshold
      ) {
        if (isMoving) onMovingOff();
        isMoving = false;
      } else if (data.y < -joystickMovementThreshold && !isMoving) {
        sendMessage("up");
        isMoving = true;
      } else if (data.y > joystickMovementThreshold && !isMoving) {
        sendMessage("down");
        isMoving = true;
      }

      if (
        data.x > -joystickMovementThreshold &&
        data.x < joystickMovementThreshold
      ) {
        if (isSteering) onSteeringOff();
        isSteering = false;
      } else if (data.x < -joystickMovementThreshold && !isSteering) {
        sendMessage("left");
        isSteering = true;
      } else if (data.x > joystickMovementThreshold && !isSteering) {
        sendMessage("right");
        isSteering = true;
      }
    },
    [sendMessage, onMovingOff, onSteeringOff]
  );

  const light = {
    on: () => sendMessage("light_on"),
    off: () => sendMessage("light_off"),
  };
  const alarm = {
    on: () => sendMessage("alarm_on"),
    off: () => sendMessage("alarm_off"),
  };
  const speed = {
    increase: () => sendMessage("increase_speed"),
    decrease: () => sendMessage("decrease_speed"),
  };
  const selectMode = (mode: ControlMode) =>
    mode && sendMessage("select_mode:" + mode);

  const value = {
    padMove,
    joystickMove,
    light,
    alarm,
    speed,
    selectMode,
  };

  return (
    <LaptopControlContext.Provider value={value}>
      {children}
    </LaptopControlContext.Provider>
  );
}

// Create a custom hook to use the context
export function useLaptopControl() {
  const context = useContext(LaptopControlContext);
  if (context === undefined) {
    throw new Error(
      "useMovementControl must be used within a MovementControlProvider"
    );
  }
  return context;
}
