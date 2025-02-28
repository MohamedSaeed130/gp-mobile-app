# Laptop Control API

## Overview

This API describes the string commands sent from the application to the laptop, which then forwards these commands to the ESP32 microcontroller.

## Control Buttons

- "LIGHT_ON": Turns on the ESP32's LED lights
- "LIGHT_OFF": Turns off the ESP32's LED lights
- "ALARM_ON": Activates the ESP32's buzzer alarm
- "ALARM_OFF": Deactivates the ESP32's buzzer alarm
- "INCREASE_SPEED": Increases the movement speed by one level
- "DECREASE_SPEED": Decreases the movement speed by one level

## Movement Control

- "MOVE": Moves the ESP32-controlled device forward
- "BACK": Moves the ESP32-controlled device backward
- "RIGHT": Steers the ESP32-controlled device right
- "LEFT": Steers the ESP32-controlled device left
- "STOP": Stops movement in any direction

## Mode Selection

- "REMOTE": Switches to remote control mode - manual control using directional buttons
- "EYE": Switches to eye tracking mode - device follows user's eye gaze direction
- "FACE": Switches to face tracking mode - device follows user's face movements
- "HAND": Switches to hand gesture mode - device responds to hand gesture commands
- "VOICE": Switches to voice commands mode - device responds to voice commands

## Communication Flow

1. Application → Laptop: Commands are sent as simple strings via WebSocket
2. Laptop → ESP32: The laptop forwards these commands to the ESP32 microcontroller

## Command Format

Commands are sent as plain strings exactly as listed above. For example:

- "LIGHT_ON"
- "MOVE"
- "STOP"
