# VYRON – Hardware Team Development Guide (Internal SIH Prototype)

## Smart India Hackathon 2026 – Internal College Selection

- **Problem Statement ID:** SIH26178
- **Theme:** Disaster Management
- **Project:** AI-Powered Environmental Intelligence Network
- **Prototype Platform:** ESP32 + Wi-Fi
- **Team:** VYRON

## Objective

Build a working prototype using **4 ESP32 Smart Nodes** and **1 ESP32 Gateway**.

For the college-level prototype:
- ESP32 instead of STM32
- Wi-Fi instead of LoRa
- Rule-based hazard detection instead of TinyML (if needed)

The architecture remains compatible with the final SIH version.

---

## Prototype Architecture

```text
Node-1 (Flood)
      │
Node-2 (Forest Fire)
      │
Node-3 (Pollution)
      │
Node-4 (Landslide)
      │
   Wi-Fi Network
      │
 ESP32 Gateway
      │
   Firebase
      │
Dashboard + Android App + SMS
```

---

## Hardware Goals

- Build 4 independent ESP32 sensor nodes.
- Detect Flood, Fire, Pollution and Landslide hazards.
- Send live data over Wi-Fi.
- Upload data to Firebase.
- Trigger LED and buzzer alerts.
- Demonstrate a complete end-to-end prototype.

---

## Component List

| Component | Qty |
|-----------|----:|
| ESP32 Dev Board | 5 |
| BME280 or DHT22 | 4 |
| Water Level Sensor | 1 |
| Rain Sensor | 2 |
| MQ135 | 2 |
| MQ2 | 2 |
| Flame Sensor | 1 |
| MPU6050 | 1 |
| Soil Moisture Sensor | 1 |
| RGB LED | 5 |
| Buzzer | 4 |

Already Available:
- Breadboards
- Jumper Wires
- Resistors
- Push Buttons

---

## Node-1 – Flood Monitoring

Components:
- ESP32
- Water Level Sensor
- Rain Sensor
- BME280/DHT22
- RGB LED
- Buzzer

Decision Logic:

```c
if(waterLevel > 80 && rainDetected)
    status = RED;
```

Output:
- Flood Risk
- LED Alert
- Buzzer Alert
- Firebase Update

---

## Node-2 – Forest Fire

Components:
- ESP32
- MQ135
- MQ2
- Flame Sensor
- BME280/DHT22
- RGB LED
- Buzzer

Decision Logic:

```c
if(MQ2 > threshold && flameDetected)
    status = RED;
```

Output:
- Fire Risk
- Local Alarm
- Firebase Alert

---

## Node-3 – Air Pollution

Components:
- ESP32
- MQ135
- MQ2
- BME280/DHT22
- RGB LED
- Buzzer

Decision Logic:

```c
if(MQ135 > threshold || MQ2 > threshold)
    status = ORANGE;
```

Output:
- Pollution Risk
- Dashboard Update

---

## Node-4 – Landslide Monitoring

Components:
- ESP32
- MPU6050
- Soil Moisture Sensor
- Rain Sensor
- BME280/DHT22
- RGB LED
- Buzzer

Decision Logic:

```c
if(soilMoisture > threshold && tilt > threshold)
    status = RED;
```

Output:
- Landslide Risk
- Firebase Alert

---

## Common ESP32 Connections

### BME280 (I²C)

| Sensor | ESP32 |
|---------|--------|
| VCC | 3.3V |
| GND | GND |
| SDA | GPIO21 |
| SCL | GPIO22 |

### MPU6050 (I²C)

| Sensor | ESP32 |
|---------|--------|
| SDA | GPIO21 |
| SCL | GPIO22 |

### Analog Sensors

Use ADC pins:
- GPIO32
- GPIO33
- GPIO34
- GPIO35

### RGB LED

- Red → GPIO25
- Green → GPIO26
- Blue → GPIO27

Use 220Ω resistors.

### Buzzer

Connect to GPIO18.

---

## LED Status Colors

| Color | Meaning |
|--------|----------|
| Green | Safe |
| Yellow | Warning |
| Orange | High Risk |
| Red | Critical |

---

## Hazard Decision Pipeline

```text
Sensor Reading
      │
      ▼
Filtering
      │
      ▼
Rule-Based Decision
      │
      ▼
Risk Score
      │
      ▼
LED + Buzzer
      │
      ▼
Wi-Fi
      │
      ▼
Firebase
```

---

## Firebase Data Format

Example JSON

```json
{
  "node":"VF-01",
  "hazard":"Flood",
  "risk":92,
  "battery":80,
  "status":"RED"
}
```

Fields:
- Node ID
- Hazard Type
- Risk Score
- Temperature
- Humidity
- Sensor Values
- Timestamp
- Battery

---

## Development Tasks

### Firmware
- Sensor Drivers
- Wi-Fi Connection
- Firebase Upload
- LED Control
- Buzzer Control

### Hardware Assembly
- Breadboard Wiring
- Power Distribution
- Connection Verification

### Testing

#### Individual Node
- Sensor works
- LED works
- Buzzer works
- Firebase update

#### Complete System
- Four nodes online
- Dashboard updates
- Alert generation
- Wi-Fi reconnect
- Live demonstration

---

## Demo Plan

### Flood Demo
- Pour water.
- Water level increases.
- LED turns Red.
- Buzzer sounds.
- Dashboard updates.

### Fire Demo
- Use incense smoke.
- MQ2 rises.
- Flame sensor detects.
- Red alert appears.

### Pollution Demo
- Expose MQ135 to smoke.
- Orange alert appears.

### Landslide Demo
- Tilt MPU6050.
- Landslide warning appears.

---

## GitHub Folder Structure

```text
VYRON-Hardware/
├── Node1_Flood/
├── Node2_Fire/
├── Node3_Pollution/
├── Node4_Landslide/
├── Gateway/
├── Circuit_Diagrams/
├── Proteus/
├── BOM/
├── Documentation/
└── README.md
```

---

## Final Deliverables

- 4 Working ESP32 Smart Nodes
- Wi-Fi Communication
- ESP32 Gateway
- Firebase Integration
- Breadboard Prototype
- Circuit Diagrams
- Firmware
- BOM
- Hardware Documentation

---

## Future SIH Upgrade

| Prototype | Final SIH Version |
|------------|-------------------|
| ESP32 | STM32L476RG |
| Wi-Fi | LoRa Mesh |
| Rule-Based Logic | TinyML |
| Breadboard | PCB |
| Basic Sensors | Industrial Sensors |

This prototype validates the complete architecture while keeping development fast and low-cost for the internal college SIH selection.
