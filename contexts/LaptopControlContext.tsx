import React, { createContext, useContext, useCallback } from "react";
import { JoystickData } from "../components/remote-control/JoystickController";
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

  const onStopping = useCallback(() => sendMessage("STOP"), [sendMessage]);

  const padMove = {
    moveUp: useCallback(() => sendMessage("MOVE"), [sendMessage]),
    moveDown: useCallback(() => sendMessage("BACK"), [sendMessage]),
    stopMoving: onStopping,
    moveRight: useCallback(() => sendMessage("RIGHT"), [sendMessage]),
    moveLeft: useCallback(() => sendMessage("LEFT"), [sendMessage]),
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
        sendMessage("MOVE");
        isMoving = true;
      } else if (data.y > joystickMovementThreshold && !isMoving) {
        sendMessage("BACK");
        isMoving = true;
      }

      if (
        data.x > -joystickMovementThreshold &&
        data.x < joystickMovementThreshold
      ) {
        if (isSteering) onStopping();
        isSteering = false;
      } else if (data.x < -joystickMovementThreshold && !isSteering) {
        sendMessage("LEFT");
        isSteering = true;
      } else if (data.x > joystickMovementThreshold && !isSteering) {
        sendMessage("RIGHT");
        isSteering = true;
      }
    },
    [sendMessage, onStopping]
  );

  const light = {
    on: () => sendMessage("LIGHT_ON"),
    off: () => sendMessage("LIGHT_OFF"),
  };
  const alarm = {
    on: () => sendMessage("ALARM_ON"),
    off: () => sendMessage("ALARM_OFF"),
  };
  const speed = {
    increase: () => sendMessage("INCREASE_SPEED"),
    decrease: () => sendMessage("DECREASE_SPEED"),
  };
  const selectMode = (mode: ControlMode) => mode && sendMessage(mode);

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
