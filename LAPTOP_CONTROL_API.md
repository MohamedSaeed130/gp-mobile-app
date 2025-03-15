# Laptop Control API

## Overview

This API describes the string commands sent from the application to the laptop, which then forwards these commands to the ESP32 microcontroller.

## Control Buttons

- "light_on": Turns on the ESP32's LED lights
- "light_off": Turns off the ESP32's LED lights
- "alarm_on": Activates the ESP32's buzzer alarm
- "alarm_off": Deactivates the ESP32's buzzer alarm
- "increase_speed": Increases the movement speed by one level
- "decrease_speed": Decreases the movement speed by one level

## Movement Remote Control

- "remote:forward": Moves the ESP32-controlled device forward
- "remote:backward": Moves the ESP32-controlled device backward
- "remote:right": Steers the ESP32-controlled device right
- "remote:left": Steers the ESP32-controlled device left
- "remote:stop": Stops movement in any direction

## Mode Selection

- "select_mode:eye": Switches to eye tracking mode - device follows user's eye gaze direction
- "select_mode:face": Switches to face tracking mode - device follows user's face movements
- "select_mode:hand": Switches to hand gesture mode - device responds to hand gesture commands
- "select_mode:voice": Switches to voice commands mode - device responds to voice commands
- "select_mode:reset": Deselects any mode in operation

## Communication Flow

1. Application → Laptop: Commands are sent as simple strings via WebSocket
2. Laptop → ESP32: The laptop forwards these commands to the ESP32 microcontroller
