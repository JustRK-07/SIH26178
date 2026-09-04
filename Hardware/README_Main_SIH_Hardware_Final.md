# VYRON – Main SIH Hardware Development Guide (Final Prototype)

## Smart India Hackathon 2026 – SIH26178

**Theme:** Disaster Management

**Project:** AI-Powered Environmental Intelligence Network

**Final Platform:** STM32L476RG + LoRa Mesh + Edge AI (TinyML)

---

# Objective

Build the final SIH prototype using **4 STM32-based Smart Sensor Nodes** connected through a **LoRa Mesh Network** with an **ESP32 Gateway**. Each node performs **on-device AI inference (TinyML)** and sends only critical alerts to the cloud.

## Final Architecture

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
          Wi-Fi / Internet
                 │
            Firebase Cloud
                 │
   Dashboard + Android App + SMS
```

---

# Hardware Overview

| Device | Quantity |
|---------|---------:|
| STM32L476RG | 4 |
| ESP32 Gateway | 1 |
| SX1278 LoRa | 5 |
| BME280 | 4 |
| Water Level Sensor | 1 |
| Rain Sensor | 2 |
| MQ135 | 2 |
| PMS5003 | 2 |
| Flame Sensor | 1 |
| MPU6050 | 1 |
| Soil Moisture | 1 |
| GPS Module | 4 |
| Micro SD Module | 5 |
| Solar Panel | 4 |
| TP4056 | 4 |
| 18650 Battery | 4 |
| RGB LED | 4 |
| Buzzer | 4 |

---

# Common STM32 Connections

Every node follows the same base wiring.

## Power

| Connection | Value |
|------------|-------|
| VCC | 3.3V |
| GND | Common Ground |

## I²C Bus

| STM32 Pin | Device |
|-----------|---------|
| PB9 | SDA |
| PB8 | SCL |

Used by:

- BME280
- MPU6050

## SPI Bus

| STM32 Pin | Device |
|-----------|---------|
| PA5 | SCK |
| PA6 | MISO |
| PA7 | MOSI |

Used by:

- SX1278 LoRa
- Micro SD

## UART

| STM32 Pin | Device |
|-----------|---------|
| PA2 | TX |
| PA3 | RX |

Used by:

- GPS
- PMS5003

---

# Node-1: Flood Monitoring (VF-01)

## Components

- STM32L476RG
- Water Level Sensor
- Rain Sensor
- BME280
- SX1278
- GPS
- SD Card
- RGB LED
- Buzzer
- Solar Power

## Pin Connections

| Component | STM32 |
|-----------|--------|
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| Water Level | PA0 |
| Rain Sensor | PA1 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| GPS TX | PA3 |
| GPS RX | PA2 |
| LED | PA8 |
| Buzzer | PA9 |

## AI Inputs

- Water Level
- Rainfall
- Temperature
- Humidity
- Pressure

## AI Output

- Flood Risk
- Confidence Score
- Local Alarm
- LoRa Alert

---

# Node-2: Forest Fire Monitoring (VF-02)

## Components

- STM32L476RG
- PMS5003
- MQ135
- Flame Sensor
- BME280
- SX1278
- GPS
- SD Card
- LED
- Buzzer

## Pin Connections

| Component | STM32 |
|-----------|--------|
| PMS5003 TX | PA3 |
| PMS5003 RX | PA2 |
| MQ135 | PA0 |
| Flame Sensor | PA1 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |

## AI Inputs

- PM2.5
- PM10
- Smoke
- Flame
- Temperature
- Humidity

## AI Output

- Fire Risk
- Confidence
- Emergency Alert

---

# Node-3: Air Pollution Monitoring (VA-03)

## Components

- STM32L476RG
- PMS5003
- MQ135
- BME280
- SX1278
- GPS
- SD Card
- LED
- Buzzer

## Pin Connections

| Component | STM32 |
|-----------|--------|
| PMS5003 TX | PA3 |
| PMS5003 RX | PA2 |
| MQ135 | PA0 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |

## AI Inputs

- PM2.5
- PM10
- Gas Level
- Temperature
- Humidity

## AI Output

- Pollution Risk
- Confidence Score

---

# Node-4: Landslide Monitoring (VT-04)

## Components

- STM32L476RG
- MPU6050
- Soil Moisture
- Rain Sensor
- BME280
- SX1278
- GPS
- SD Card
- LED
- Buzzer

## Pin Connections

| Component | STM32 |
|-----------|--------|
| MPU6050 SDA | PB9 |
| MPU6050 SCL | PB8 |
| Soil Moisture | PA0 |
| Rain Sensor | PA1 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |

## AI Inputs

- Soil Moisture
- Ground Tilt
- Vibration
- Rainfall
- Temperature
- Humidity

## AI Output

- Landslide Risk
- Confidence Score

---

# ESP32 Gateway

## Components

- ESP32
- SX1278 LoRa
- Micro SD
- Wi-Fi

## Connections

| Component | ESP32 |
|-----------|--------|
| SCK | GPIO18 |
| MISO | GPIO19 |
| MOSI | GPIO23 |
| NSS | GPIO5 |
| DIO0 | GPIO14 |
| RESET | GPIO27 |

## Responsibilities

- Receive LoRa packets
- Validate Node ID
- Buffer data
- Upload Firebase
- Auto-sync after reconnection

---

# TinyML Decision Pipeline

```text
Sensor Reading
      │
      ▼
Noise Filtering
      │
      ▼
Feature Extraction
      │
      ▼
TinyML Model
      │
      ▼
Risk Score
      │
      ▼
Confidence Score
      │
      ▼
LED + Buzzer
      │
      ▼
LoRa Alert
      │
      ▼
Gateway
      │
      ▼
Firebase
```

---

# Risk Levels

| Risk | Color |
|------|--------|
| 0–30 | Green |
| 31–60 | Yellow |
| 61–85 | Orange |
| 86–100 | Red |

---

# Local Alerts

Every node provides:

- RGB LED
- Buzzer
- Offline SD logging

Even without internet:

- AI continues running.
- Data is stored locally.
- LoRa continues working.
- Gateway syncs later.

---

# Testing Checklist

## Individual Node

- Sensor calibration
- TinyML inference
- Risk score generation
- GPS location
- LoRa transmission
- LED operation
- Buzzer operation

## LoRa Network

- Packet delivery
- Multi-node communication
- Retry mechanism
- Signal range

## Gateway

- LoRa reception
- Firebase upload
- Offline buffering
- Auto synchronization

## Complete System

- Flood demo
- Fire demo
- Pollution demo
- Landslide demo
- Dashboard update
- Android notification
- SMS alert

---

# GitHub Repository Structure

```text
VYRON-Hardware/
├── Node1_Flood/
├── Node2_Fire/
├── Node3_Pollution/
├── Node4_Landslide/
├── Gateway/
├── TinyML/
├── PCB/
├── Proteus/
├── BOM/
├── Firmware/
├── Documentation/
└── README.md
```

---

# Final Deliverables

- 4 STM32 Smart Nodes
- LoRa Mesh Network
- ESP32 Gateway
- TinyML Models
- PCB Design
- Proteus Schematics
- Firmware
- BOM
- Wiring Documentation
- Testing Report

---

# Judge Demonstration

1. Pour water → Flood Node turns RED.
2. Show smoke → Fire Node detects fire.
3. Increase gas level → Pollution Node updates.
4. Tilt the board → Landslide Node triggers.
5. Disconnect internet → Nodes continue working.
6. Reconnect → Gateway syncs all stored data.

---

# Internal Prototype vs Final SIH

| Internal Prototype | Final SIH |
|--------------------|-----------|
| ESP32 | STM32L476RG |
| Wi-Fi | LoRa Mesh |
| Rule-Based Logic | TinyML |
| Breadboard | Custom PCB |
| Basic Sensors | Calibrated Sensors |
| Direct Firebase | Gateway + Cloud |

This roadmap keeps the final SIH prototype aligned with Qualcomm's Edge AI vision while demonstrating a scalable, resilient, and practical disaster monitoring network.
