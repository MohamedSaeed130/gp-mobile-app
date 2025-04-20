import React, { createContext, useContext, useCallback } from "react";
import { JoystickData } from "../components/remote-control/JoystickController";
import { useLaptopConnection } from "./LaptopConnectionContext";
import { ControlMode } from "../types/ui/ControlMode";

// Define the context type
interface LaptopControlContextType {
  padMove: {
    moveUp: () => void;
    moveDown: () => void;
    stopMoving: () => void;
    moveRight: () => void;
    moveLeft: () => void;
  };
  joystickMove: (data: JoystickData) => void;
  light: { on: () => void; off: () => void };
  alarm: { on: () => void; off: () => void };
  speed: { increase: () => void; decrease: () => void };
  selectMode: (mode: ControlMode) => void;
  reset: () => void;
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

  const onStopping = useCallback(
    () => sendMessage("remote:stop"),
    [sendMessage]
  );

  const padMove = {
    moveUp: useCallback(() => sendMessage("remote:forward"), [sendMessage]),
    moveDown: useCallback(() => sendMessage("remote:backward"), [sendMessage]),
    stopMoving: onStopping,
    moveRight: useCallback(() => sendMessage("remote:right"), [sendMessage]),
    moveLeft: useCallback(() => sendMessage("remote:left"), [sendMessage]),
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
        if (isMoving) onStopping();
        isMoving = false;
      } else if (data.y < -joystickMovementThreshold && !isMoving) {
        padMove.moveUp();
        isMoving = true;
      } else if (data.y > joystickMovementThreshold && !isMoving) {
        padMove.moveDown();
        isMoving = true;
      }

      if (
        data.x > -joystickMovementThreshold &&
        data.x < joystickMovementThreshold
      ) {
        if (isSteering) onStopping();
        isSteering = false;
      } else if (data.x < -joystickMovementThreshold && !isSteering) {
        padMove.moveLeft();
        isSteering = true;
      } else if (data.x > joystickMovementThreshold && !isSteering) {
        padMove.moveRight();
        isSteering = true;
      }
    },
    [sendMessage, onStopping]
  );

  const light = {
    on: () => sendMessage("remote:light_on"),
    off: () => sendMessage("remote:light_off"),
  };
  const alarm = {
    on: () => sendMessage("remote:alarm_on"),
    off: () => sendMessage("remote:alarm_off"),
  };
  const speed = {
    increase: () => sendMessage("remote:increase_speed"),
    decrease: () => sendMessage("remote:decrease_speed"),
  };
  const selectMode = (mode: ControlMode) =>
    mode && sendMessage("select_mode:" + mode);

  const reset = () => sendMessage("reset");

  const value = {
    padMove,
    joystickMove,
    light,
    alarm,
    speed,
    selectMode,
    reset,
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
