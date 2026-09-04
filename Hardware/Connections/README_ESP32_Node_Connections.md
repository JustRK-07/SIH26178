# VYRON – ESP32 Node Connections (Internal SIH Prototype)

## Smart India Hackathon 2026 – Internal College Selection

**Project:** AI-Powered Environmental Intelligence Network

This document contains the complete wiring connections for all four ESP32 sensor nodes and the ESP32 Gateway used in the internal college SIH prototype.

---

# Common ESP32 Pin Mapping

All four nodes follow the same GPIO layout wherever possible.

| ESP32 Pin | Purpose |
|-----------|---------|
| 3.3V | Power for BME280, MPU6050, Soil Moisture |
| 5V (VIN) | Power for MQ135, MQ2, Rain Sensor Module, Flame Sensor |
| GND | Common Ground |
| GPIO21 | I²C SDA |
| GPIO22 | I²C SCL |
| GPIO25 | RGB LED Red |
| GPIO26 | RGB LED Green |
| GPIO14 | RGB LED Blue |
| GPIO18 | Buzzer |
| GPIO34 | ADC Sensor-1 |
| GPIO35 | ADC Sensor-2 |
| GPIO27 | Digital Sensor |

Use **220Ω resistors** for every RGB LED pin.

---

# Node-1: Flood Monitoring (VF-01)

## Components

- ESP32
- Water Level Sensor
- Rain Sensor
- DHT22/BME280
- RGB LED
- Buzzer

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| DHT22 Data | GPIO4 |
| Water Level (AOUT) | GPIO34 |
| Rain Sensor (DO) | GPIO27 |
| RGB Red | GPIO25 |
| RGB Green | GPIO26 |
| RGB Blue | GPIO14 |
| Buzzer | GPIO18 |
| VCC | 3.3V/5V |
| GND | GND |

## Working

- Water level continuously increases.
- Rain sensor confirms rainfall.
- ESP32 calculates Flood Risk.
- LED turns Red.
- Buzzer sounds.
- Data is uploaded to Firebase.

Decision Logic

```c
if(waterLevel > 80 && rainDetected)
    status = RED;
```

---

# Node-2: Forest Fire Monitoring (VF-02)

## Components

- ESP32
- MQ135
- MQ2
- Flame Sensor
- DHT22/BME280
- RGB LED
- Buzzer

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| DHT22 | GPIO4 |
| MQ135 (AOUT) | GPIO34 |
| MQ2 (AOUT) | GPIO35 |
| Flame Sensor (DO) | GPIO27 |
| RGB Red | GPIO25 |
| RGB Green | GPIO26 |
| RGB Blue | GPIO14 |
| Buzzer | GPIO18 |
| VCC | 5V |
| GND | GND |

## Working

- MQ2 detects smoke.
- MQ135 detects harmful gases.
- Flame sensor detects fire.
- ESP32 generates Fire Risk.
- Local alarm is activated.
- Firebase receives the alert.

Decision Logic

```c
if(MQ2 > threshold && flameDetected)
    status = RED;
```

---

# Node-3: Air Pollution Monitoring (VA-03)

## Components

- ESP32
- MQ135
- MQ2
- DHT22/BME280
- RGB LED
- Buzzer

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| DHT22 | GPIO4 |
| MQ135 (AOUT) | GPIO34 |
| MQ2 (AOUT) | GPIO35 |
| RGB Red | GPIO25 |
| RGB Green | GPIO26 |
| RGB Blue | GPIO14 |
| Buzzer | GPIO18 |
| VCC | 5V |
| GND | GND |

## Working

- MQ135 measures air quality.
- MQ2 detects smoke.
- ESP32 generates Pollution Risk.
- Dashboard updates in real time.

Decision Logic

```c
if(MQ135 > threshold || MQ2 > threshold)
    status = ORANGE;
```

---

# Node-4: Landslide Monitoring (VT-04)

## Components

- ESP32
- MPU6050
- Soil Moisture Sensor
- Rain Sensor
- DHT22/BME280
- RGB LED
- Buzzer

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| DHT22 | GPIO4 |
| MPU6050 SDA | GPIO21 |
| MPU6050 SCL | GPIO22 |
| Soil Moisture (AOUT) | GPIO34 |
| Rain Sensor (DO) | GPIO27 |
| RGB Red | GPIO25 |
| RGB Green | GPIO26 |
| RGB Blue | GPIO14 |
| Buzzer | GPIO18 |
| VCC | 3.3V/5V |
| GND | GND |

## Working

- Soil moisture increases.
- MPU6050 detects tilt.
- Rain sensor confirms rainfall.
- ESP32 generates Landslide Risk.
- LED and buzzer activate.
- Alert is uploaded to Firebase.

Decision Logic

```c
if(soilMoisture > threshold && tilt > threshold)
    status = RED;
```

---

# ESP32 Gateway (5th ESP32)

## Components

- ESP32 Dev Board
- Wi-Fi
- Status LED

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| Status LED | GPIO2 |
| USB Power | USB |
| Wi-Fi | Internal |

## Responsibilities

- Receive data from nodes (HTTP/MQTT).
- Upload JSON to Firebase.
- Show gateway connection status.

---

# LED Status Meaning

| LED Color | Status |
|------------|--------|
| 🟢 Green | Safe |
| 🟡 Yellow | Warning |
| 🟠 Orange | High Risk |
| 🔴 Red | Critical |

---

# Common Buzzer Connection

| Buzzer | ESP32 |
|---------|--------|
| + | GPIO18 |
| – | GND |

---

# GPIO Usage Summary

| GPIO | Used For |
|------|----------|
| GPIO4 | DHT22 |
| GPIO14 | RGB Blue |
| GPIO18 | Buzzer |
| GPIO21 | I²C SDA |
| GPIO22 | I²C SCL |
| GPIO25 | RGB Red |
| GPIO26 | RGB Green |
| GPIO27 | Rain/Flame Digital |
| GPIO34 | Analog Sensor-1 |
| GPIO35 | Analog Sensor-2 |

This pin mapping keeps every ESP32 node consistent, making wiring, firmware development, and debugging much easier during the internal SIH prototype.
