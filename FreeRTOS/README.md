
Project 2 - RTOS Multi-Sensor Simulation

Files included:
- firmware/main.c       : FreeRTOS multitasking firmware in C
- firmware/FreeRTOSConfig.h : Minimal FreeRTOS configuration

Description:
- Demonstrates FreeRTOS tasks for temperature, motion, and communication.
- UART output displayed on Proteus Virtual Terminal.
- Temperature task updates every 2s, Motion task every 3s, Communication task sends every 1s.
- Fully simulated in Proteus. No hardware required.

Instructions:
1. Create a new CCS project for MSP430.
2. Include FreeRTOS source files and the provided FreeRTOSConfig.h.
3. Add main.c to the project and compile.
4. Load the generated .hex file in Proteus MSP430 simulation.
5. Observe UART output on the Virtual Terminal.
