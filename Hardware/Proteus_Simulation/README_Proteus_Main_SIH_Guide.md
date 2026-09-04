# VYRON – Complete Proteus Simulation Guide (Final SIH Project)

## Smart India Hackathon 2026 (SIH26178)

**Theme:** Disaster Management

**Project:** AI-Powered Environmental Intelligence Network

**Final Platform:** STM32L476RG + LoRa Mesh + TinyML + ESP32 Gateway

This guide explains how to create the complete Proteus simulation for the final SIH prototype with **4 STM32 smart sensor nodes**, an **ESP32 gateway**, and a simulation workflow that mirrors the real hardware.

---

# System Architecture

```text
VF-01 Flood Node
        │
VF-02 Fire Node
        │
VA-03 Pollution Node
        │
VT-04 Landslide Node
        │
   SX1278 LoRa Mesh
        │
   ESP32 Gateway
        │
   Firebase Cloud
        │
Dashboard + Android App + SMS
```

---

# Proteus Simulation Strategy

Proteus cannot fully simulate LoRa RF, TinyML inference, GPS satellites, or Firebase, so use these equivalents.

| Real Hardware | Proteus Equivalent |
|---------------|--------------------|
| STM32L476RG | STM32L476RG |
| SX1278 LoRa | Virtual Terminal (UART) |
| TinyML | Rule-based logic |
| GPS | Virtual Terminal |
| Firebase | Virtual Terminal |
| Water Level | Potentiometer |
| MQ135 | Potentiometer |
| Soil Moisture | Potentiometer |
| Rain Sensor | Push Switch |
| Flame Sensor | Push Switch |

---

# Required Software

- Proteus 8 Professional
- STM32CubeIDE
- STM32CubeMX
- Arduino IDE (ESP32 Gateway)
- KiCad
- Edge Impulse

---

# Project Structure

Create one Proteus project.

```text
VYRON_Final_SIH.pdsprj
│
├── Sheet-1 Overview
├── Sheet-2 Flood Node
├── Sheet-3 Forest Fire Node
├── Sheet-4 Pollution Node
├── Sheet-5 Landslide Node
└── Sheet-6 ESP32 Gateway
```

---

# Components

Search these in Proteus.

- STM32L476RG
- ESP32 DevKit
- BME280
- LED
- RGB LED
- BUZZER
- POT-HG
- SW-SPST
- Virtual Terminal
- Resistor
- Capacitor
- GND

---

# Common STM32 Wiring

## Power

| STM32 | Connection |
|--------|------------|
| VDD | 3.3V |
| VSS | GND |

Add a **100 nF capacitor** near the power pins.

## I²C Bus

| STM32 | Device |
|--------|--------|
| PB8 | SCL |
| PB9 | SDA |

Used by:

- BME280
- MPU6050

## SPI Bus

| STM32 | Device |
|--------|--------|
| PA5 | SCK |
| PA6 | MISO |
| PA7 | MOSI |

Used by:

- SX1278
- Micro SD

## UART

| STM32 | Device |
|--------|--------|
| PA2 | TX |
| PA3 | RX |

Used by:

- GPS
- PMS5003

---

# Sheet-1 Overview

Place labeled blocks for:

- Flood Node
- Fire Node
- Pollution Node
- Landslide Node
- Gateway

Use this sheet only for explaining architecture during the presentation.

---

# Sheet-2 – Flood Node (VF-01)

## Components

- STM32L476RG
- BME280
- Water Level Sensor
- Rain Sensor
- SX1278
- GPS
- SD Card
- RGB LED
- Buzzer

### Proteus Replacements

| Real Sensor | Proteus |
|-------------|---------|
| Water Level | Potentiometer |
| Rain Sensor | Push Switch |

### Connections

| Component | STM32 |
|-----------|--------|
| Water Level | PA0 |
| Rain Sensor | PA1 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| GPS TX | PA3 |
| GPS RX | PA2 |
| LED | PA8 |
| Buzzer | PA9 |

### Test

- Rotate the water potentiometer.
- Press the rain switch.

Expected output:

- Red LED
- Buzzer
- UART message

```text
VF-01
Water:92
Rain:YES
Risk:95
```

---

# Sheet-3 – Forest Fire Node (VF-02)

## Components

- STM32L476RG
- PMS5003
- MQ135
- Flame Sensor
- BME280
- SX1278
- GPS

### Proteus Replacements

| Real Sensor | Proteus |
|-------------|---------|
| PMS5003 | Potentiometer |
| MQ135 | Potentiometer |
| Flame | Push Switch |

### Connections

| Component | STM32 |
|-----------|--------|
| PMS5003 | PA2/PA3 |
| MQ135 | PA0 |
| Flame | PA1 |
| BME280 | PB8/PB9 |

Expected:

- Fire Risk
- Red LED
- Buzzer
- UART alert

---

# Sheet-4 – Air Pollution Node (VA-03)

## Components

- STM32L476RG
- PMS5003
- MQ135
- BME280

### Proteus Setup

Use two potentiometers.

| Component | STM32 |
|-----------|--------|
| PM Sensor | PA2 |
| MQ135 | PA0 |
| BME280 | PB8/PB9 |

Expected:

- Orange warning
- Pollution packet

---

# Sheet-5 – Landslide Node (VT-04)

## Components

- STM32L476RG
- MPU6050
- Soil Moisture
- Rain Sensor
- BME280

### Proteus Replacements

| Real Sensor | Proteus |
|-------------|---------|
| Soil Moisture | Potentiometer |
| Tilt | Push Switch |
| Rain | Push Switch |

### Connections

| Component | STM32 |
|-----------|--------|
| Soil Moisture | PA0 |
| Tilt | PA1 |
| MPU6050 | PB8/PB9 |
| Rain | PA4 |

Expected:

- Landslide warning

---

# Sheet-6 – ESP32 Gateway

## Components

- ESP32
- Virtual Terminal

### Connections

| ESP32 | Device |
|--------|--------|
| TX | Virtual Terminal RX |
| RX | Virtual Terminal TX |

Expected terminal output:

```text
Gateway
Packet Received
VF-03
Risk:84
```

---

# Firmware Flow

Every STM32 follows this sequence.

```text
Initialize
    ↓
Read Sensors
    ↓
Filter Noise
    ↓
TinyML (Real Hardware)
    ↓
Risk Score
    ↓
LED + Buzzer
    ↓
LoRa Packet
    ↓
Gateway
```

In Proteus, replace TinyML with threshold-based logic.

Example:

```c
if(sensor > threshold)
    status = RED;
```

---

# Virtual LoRa Communication

Instead of RF transmission:

- Send UART data from each node.
- Display packets on the Gateway Virtual Terminal.

Example:

```text
VF-02
Risk:94
Packet Received
```

---

# Risk Levels

| Risk | LED |
|------|-----|
| 0–30 | Green |
| 31–60 | Yellow |
| 61–85 | Orange |
| 86–100 | Red |

---

# Testing Sequence

## Flood

- Rotate Water Pot.
- Press Rain Switch.

## Fire

- Increase Smoke Pot.
- Press Flame Switch.

## Pollution

- Increase Gas Pot.

## Landslide

- Increase Soil Pot.
- Press Tilt Switch.

Verify LED, buzzer, and UART output for every node.

---

# Judge Demonstration (2 Minutes)

1. Open Overview sheet.
2. Show Flood Node and trigger flood.
3. Show Fire Node and trigger smoke.
4. Show Pollution Node.
5. Show Landslide Node.
6. Open Gateway.
7. Show received packets.
8. Explain that Firebase is demonstrated on real hardware.

---

# Common Proteus Errors

| Error | Solution |
|--------|----------|
| STM32 missing | Install STM32 library |
| No UART output | Check baud rate and TX/RX |
| LED not glowing | Verify GPIO and resistor |
| Buzzer silent | Use active buzzer |
| Potentiometer not changing | Configure analog input |

---

# Final Folder Structure

```text
VYRON_Proteus_Final/
│
├── VYRON_Final_SIH.pdsprj
├── STM32_Firmware/
├── ESP32_Gateway/
├── TinyML/
├── Libraries/
├── Screenshots/
└── README.md
```

---

# Deliverables

After completing the simulation, save:

- Proteus Project (.pdsprj)
- STM32 Firmware
- ESP32 Gateway Code
- Screenshots of all six sheets
- Simulation Video
- Wiring Documentation
- Testing Report

This Proteus project becomes the digital twin of the final SIH hardware, allowing the same wiring and firmware structure to be transferred later to KiCad PCB design and the physical prototype.
