# VYRON – STM32 Node Connections (Final SIH Project)

## Smart India Hackathon 2026 – Main SIH Prototype

**Project:** AI-Powered Environmental Intelligence Network

This document contains the complete wiring connections for all four STM32L476RG smart sensor nodes and the ESP32 Gateway used in the final SIH prototype.

---

# Common STM32 Pin Mapping

All four nodes follow the same pin layout so that one common PCB can be used for every node.

| STM32 Pin | Purpose |
|-----------|---------|
| 3.3V | Power for BME280, MPU6050, GPS, SX1278 |
| GND | Common Ground |
| PB8 | I²C SCL |
| PB9 | I²C SDA |
| PA5 | SPI SCK |
| PA6 | SPI MISO |
| PA7 | SPI MOSI |
| PA2 | UART TX |
| PA3 | UART RX |
| PA0 | ADC Sensor-1 |
| PA1 | Digital/ADC Sensor-2 |
| PA8 | RGB LED Red |
| PA9 | RGB LED Green |
| PA10 | RGB LED Blue |
| PA11 | Buzzer |
| PB4 | LoRa RESET |
| PB5 | LoRa DIO0 |
| PB6 | LoRa NSS |
| PB7 | SD Card CS |

Use **220Ω resistors** for every RGB LED pin and place **100nF decoupling capacitors** near every VDD pin.

---

# Node-1: Flood Monitoring (VF-01)

## Components

- STM32L476RG
- Water Level Sensor
- Rain Sensor
- BME280
- SX1278 LoRa
- GPS (NEO-6M)
- Micro SD Module
- RGB LED
- Buzzer

## Connections

| Component | STM32 Pin |
|-----------|-----------|
| Water Level (Analog) | PA0 |
| Rain Sensor (Digital) | PA1 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| GPS TX | PA3 |
| GPS RX | PA2 |
| LoRa SCK | PA5 |
| LoRa MISO | PA6 |
| LoRa MOSI | PA7 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| SD Card CS | PB7 |
| RGB Red | PA8 |
| RGB Green | PA9 |
| RGB Blue | PA10 |
| Buzzer | PA11 |

## Working

- Water level continuously increases.
- Rain sensor confirms rainfall.
- BME280 provides temperature, humidity, and pressure.
- TinyML calculates Flood Risk.
- LED turns Red.
- Buzzer sounds.
- Alert is transmitted through LoRa.

### Decision Logic

```c
if(waterLevel > threshold && rainDetected)
    status = RED;
```

---

# Node-2: Forest Fire Monitoring (VF-02)

## Components

- STM32L476RG
- PMS5003
- MQ135
- Flame Sensor
- BME280
- SX1278 LoRa
- GPS
- Micro SD
- RGB LED
- Buzzer

## Connections

| Component | STM32 Pin |
|-----------|-----------|
| MQ135 (Analog) | PA0 |
| Flame Sensor (Digital) | PA1 |
| PMS5003 TX | PA3 |
| PMS5003 RX | PA2 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa SCK | PA5 |
| LoRa MISO | PA6 |
| LoRa MOSI | PA7 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| SD Card CS | PB7 |
| RGB Red | PA8 |
| RGB Green | PA9 |
| RGB Blue | PA10 |
| Buzzer | PA11 |

## Working

- PMS5003 detects PM2.5 and PM10.
- MQ135 detects harmful gases.
- Flame sensor confirms fire.
- BME280 monitors weather conditions.
- TinyML generates Fire Risk.
- Local alarm is activated.
- Emergency alert is sent through LoRa.

### Decision Logic

```c
if(pmLevel > threshold && flameDetected)
    status = RED;
```

---

# Node-3: Air Pollution Monitoring (VA-03)

## Components

- STM32L476RG
- PMS5003
- MQ135
- BME280
- SX1278 LoRa
- GPS
- Micro SD
- RGB LED
- Buzzer

## Connections

| Component | STM32 Pin |
|-----------|-----------|
| MQ135 (Analog) | PA0 |
| PMS5003 TX | PA3 |
| PMS5003 RX | PA2 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa SCK | PA5 |
| LoRa MISO | PA6 |
| LoRa MOSI | PA7 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| SD Card CS | PB7 |
| RGB Red | PA8 |
| RGB Green | PA9 |
| RGB Blue | PA10 |
| Buzzer | PA11 |

## Working

- PMS5003 measures PM2.5 and PM10.
- MQ135 measures harmful gases.
- BME280 provides weather data.
- TinyML calculates Pollution Risk.
- Dashboard updates through the gateway.

### Decision Logic

```c
if(pmLevel > threshold || gasLevel > threshold)
    status = ORANGE;
```

---

# Node-4: Landslide Monitoring (VT-04)

## Components

- STM32L476RG
- MPU6050
- Soil Moisture Sensor
- Rain Sensor
- BME280
- SX1278 LoRa
- GPS
- Micro SD
- RGB LED
- Buzzer

## Connections

| Component | STM32 Pin |
|-----------|-----------|
| Soil Moisture (Analog) | PA0 |
| Rain Sensor (Digital) | PA1 |
| MPU6050 SDA | PB9 |
| MPU6050 SCL | PB8 |
| BME280 SDA | PB9 |
| BME280 SCL | PB8 |
| LoRa SCK | PA5 |
| LoRa MISO | PA6 |
| LoRa MOSI | PA7 |
| LoRa NSS | PB6 |
| LoRa DIO0 | PB5 |
| LoRa RESET | PB4 |
| SD Card CS | PB7 |
| RGB Red | PA8 |
| RGB Green | PA9 |
| RGB Blue | PA10 |
| Buzzer | PA11 |

## Working

- Soil moisture increases.
- MPU6050 detects tilt and vibration.
- Rain sensor confirms rainfall.
- TinyML calculates Landslide Risk.
- LED and buzzer activate.
- Alert is transmitted through LoRa.

### Decision Logic

```c
if(soilMoisture > threshold && tiltDetected)
    status = RED;
```

---

# ESP32 Gateway (5th ESP32)

## Components

- ESP32 Dev Board
- SX1278 LoRa
- Micro SD Module
- Wi-Fi

## Connections

| Component | ESP32 Pin |
|-----------|-----------|
| LoRa SCK | GPIO18 |
| LoRa MISO | GPIO19 |
| LoRa MOSI | GPIO23 |
| LoRa NSS | GPIO5 |
| LoRa DIO0 | GPIO14 |
| LoRa RESET | GPIO27 |
| SD Card CS | GPIO13 |
| USB Power | USB |
| Wi-Fi | Internal |

## Responsibilities

- Receive LoRa packets from all four nodes.
- Validate Node ID.
- Buffer data during network outages.
- Upload JSON to Firebase.
- Trigger Dashboard updates.
- Send Android notifications and SMS alerts.

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

| Buzzer | STM32 |
|---------|--------|
| + | PA11 |
| – | GND |

---

# Power Architecture

Every node follows the same power flow.

```text
Solar Panel
      │
Schottky Diode
      │
TP4056 Charger
      │
18650 Battery
      │
AMS1117-3.3
      │
STM32 + Sensors + LoRa
```

---

# STM32 Pin Usage Summary

| STM32 Pin | Used For |
|-----------|----------|
| PA0 | Analog Sensor-1 |
| PA1 | Digital Sensor |
| PA2 | GPS TX |
| PA3 | GPS RX |
| PA5 | SPI SCK |
| PA6 | SPI MISO |
| PA7 | SPI MOSI |
| PA8 | RGB Red |
| PA9 | RGB Green |
| PA10 | RGB Blue |
| PA11 | Buzzer |
| PB4 | LoRa RESET |
| PB5 | LoRa DIO0 |
| PB6 | LoRa NSS |
| PB7 | SD Card CS |
| PB8 | I²C SCL |
| PB9 | I²C SDA |

---

# Node Distribution

| Node | Purpose |
|------|----------|
| VF-01 | Flood Detection |
| VF-02 | Forest Fire Detection |
| VA-03 | Air Pollution Monitoring |
| VT-04 | Landslide Detection |
| Gateway | LoRa → Firebase |

---

# Hardware Validation Checklist

Before powering the board:

- [ ] 3.3V rail verified.
- [ ] GND continuity checked.
- [ ] SWD header connected.
- [ ] LoRa SPI verified.
- [ ] GPS UART verified.
- [ ] I²C devices detected.
- [ ] SD Card initialized.
- [ ] LED tested.
- [ ] Buzzer tested.
- [ ] No short circuits.

A correctly wired STM32 node should initialize all connected sensors, run TinyML inference locally, activate LED and buzzer alerts during hazardous conditions, transmit critical alerts through LoRa to the ESP32 Gateway, and continue logging data locally on the Micro SD card even if internet connectivity is unavailable.