# Laptop Control API

## Overview
This API describes the string commands sent from the application to the laptop, which then forwards these commands to the ESP32 microcontroller.

## Control Buttons
- "light_on": Turns on the ESP32's LED lights
- "light_off": Turns off the ESP32's LED lights
- "alarm_on": Activates the ESP32's buzzer alarm
- "alram_off": Deactivates the ESP32's buzzer alarm
- "speed_increase": Increases the movement speed by one level (max 5)
- "speed_decrease": Decreases the movement speed by one level (min 1)

## Movement Control
- "up": Moves the ESP32-controlled device forward
- "down": Moves the ESP32-controlled device backward
- "right": Steers the ESP32-controlled device right
- "left": Steers the ESP32-controlled device left
- "stop_moving": Stops forward/backward movement
- "stop_steering": Centers steering/stops turning

## Mode Selection
- "select_mode:remote": Switches to remote control mode - manual control using directional buttons
- "select_mode:eye": Switches to eye tracking mode - device follows user's eye gaze direction
- "select_mode:face": Switches to face tracking mode - device follows user's face movements
- "select_mode:hand": Switches to hand gesture mode - device responds to hand gesture commands

## Communication Flow
1. Application → Laptop: Commands are sent as simple strings via WebSocket
2. Laptop → ESP32: The laptop forwards these commands to the ESP32 microcontroller

## Command Format
Commands are sent as plain strings exactly as listed above. For example:
- "light_on"
- "up"
- "stop_moving"
