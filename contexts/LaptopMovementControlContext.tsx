import React, { createContext, useContext, useCallback } from "react";
import { JoystickData } from "../app/remote-controller/components/JoystickController";
import { useLaptopConnection } from "./LaptopConnectionContext";

// Define the context type
interface LaptopMovementControlContextType {
  padMove: {
    moveUp: () => void;
    moveDown: () => void;
    stopMoving: () => void;
    moveRight: () => void;
    moveLeft: () => void;
    stopSteering: () => void;
  };
  joystickMove: (data: JoystickData) => void;
}

// Create the context
const LaptopMovementControlContext = createContext<
  LaptopMovementControlContextType | undefined
>(undefined);

// Create the provider component
export function LaptopMovementControlProvider({
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

  const joystickMovementThreshold = 0.3;
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

  const value = {
    padMove,
    joystickMove,
  };

  return (
    <LaptopMovementControlContext.Provider value={value}>
      {children}
    </LaptopMovementControlContext.Provider>
  );
}

// Create a custom hook to use the context
export function useMovementControl() {
  const context = useContext(LaptopMovementControlContext);
  if (context === undefined) {
    throw new Error(
      "useMovementControl must be used within a MovementControlProvider"
    );
  }
  return context;
}
