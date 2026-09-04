# VYRON – Complete Proteus Simulation Guide (Internal SIH Prototype)

## Smart India Hackathon 2026 – Internal College Selection

**Project:** AI-Powered Environmental Intelligence Network

**Prototype Platform:** ESP32 + Wi-Fi + Rule-Based Decision Logic

This guide explains how to build and simulate the complete VYRON prototype in Proteus 8 Professional.

---

# Simulation Goal

Build **4 ESP32-based Smart Nodes** and one **ESP32 Gateway** that demonstrates:

- Flood Detection
- Forest Fire Detection
- Air Pollution Detection
- Landslide Detection
- Wi-Fi communication concept
- Local LED and Buzzer alerts

> **Proteus Limitation:** ESP32 Wi-Fi and Firebase cannot be simulated directly. In Proteus, simulate sensor inputs, LED, buzzer and serial output. Use real ESP32 hardware for Wi-Fi and Firebase.

---

# Software Required

| Software | Purpose |
|----------|---------|
| Proteus 8 Professional | Circuit simulation |
| Arduino IDE | ESP32 programming |
| ESP32 Board Package | Firmware |
| GitHub | Code management |

---

# Step 1 – Install Proteus

1. Install Proteus 8 Professional.
2. Open Proteus.
3. Create a new project.
4. Name it **VYRON_Internal_SIH**.
5. Choose **Create Schematic Only**.

---

# Step 2 – Install ESP32 Library

Proteus does not include ESP32 by default.

1. Download the ESP32 Proteus Library.
2. Copy the `.LIB` and `.IDX` files into:

```text
C:\ProgramData\Labcenter Electronics\Proteus 8 Professional\LIBRARY
```

3. Restart Proteus.
4. Press **P**.
5. Search for **ESP32 DEVKIT V1**.

---

# Step 3 – Install Arduino IDE

1. Install Arduino IDE.
2. Open Preferences.
3. Add ESP32 Board Manager URL.
4. Install **ESP32 by Espressif**.
5. Select **ESP32 Dev Module**.

---

# Step 4 – Create Project Structure

Inside Proteus create:

```text
Node-1 Flood
Node-2 Fire
Node-3 Pollution
Node-4 Landslide
Gateway
```

Each node can be on a separate schematic page.

---

# Step 5 – Components Required

Search using **P**.

| Component | Search Name |
|-----------|-------------|
| ESP32 | ESP32 DEVKIT |
| LED | LED-RED |
| RGB LED | RGB LED |
| Buzzer | BUZZER |
| Potentiometer | POT-HG |
| Switch | SW-SPST |
| Virtual Terminal | Virtual Terminal |
| Resistor | RES |
| Capacitor | CAP |
| Ground | GND |

---

# Step 6 – Simulating Sensors

Some sensors are unavailable in Proteus.

Replace them with virtual inputs.

| Real Sensor | Proteus Replacement |
|-------------|----------------------|
| Water Level | Potentiometer |
| MQ135 | Potentiometer |
| MQ2 | Potentiometer |
| Soil Moisture | Potentiometer |
| BME280 | Fixed Analog Input |
| Rain Sensor | Push Switch |
| Flame Sensor | Push Switch |
| MPU6050 | Push Switch |

This allows the firmware logic to be tested.

---

# Step 7 – Build Node-1 (Flood)

## Components

- ESP32
- Potentiometer (Water Level)
- Push Switch (Rain)
- RGB LED
- Buzzer
- Virtual Terminal

## Wiring

| Component | ESP32 |
|-----------|--------|
| Water Pot | GPIO34 |
| Rain Switch | GPIO27 |
| LED Red | GPIO25 |
| LED Green | GPIO26 |
| LED Blue | GPIO14 |
| Buzzer | GPIO18 |
| UART TX | Virtual Terminal RX |

## Test

Rotate the potentiometer.

Expected:

- Water level increases.
- LED changes.
- Buzzer activates.
- Serial message appears.

---

# Step 8 – Build Node-2 (Fire)

## Components

- ESP32
- Potentiometer (MQ135)
- Potentiometer (MQ2)
- Switch (Flame)
- RGB LED
- Buzzer

## Wiring

| Component | ESP32 |
|-----------|--------|
| MQ135 | GPIO34 |
| MQ2 | GPIO35 |
| Flame | GPIO27 |
| LED | GPIO25 |
| Buzzer | GPIO18 |

## Test

Increase MQ2.

Press Flame switch.

Expected:

- Fire alert.
- Red LED.
- Buzzer.
- Serial output.

---

# Step 9 – Build Node-3 (Pollution)

## Components

- ESP32
- MQ135 Pot
- MQ2 Pot
- RGB LED
- Buzzer

## Wiring

| Component | ESP32 |
|-----------|--------|
| MQ135 | GPIO34 |
| MQ2 | GPIO35 |
| LED | GPIO25 |
| Buzzer | GPIO18 |

Expected:

- Orange warning.
- Risk value on Serial Monitor.

---

# Step 10 – Build Node-4 (Landslide)

## Components

- ESP32
- Soil Pot
- Rain Switch
- Tilt Switch
- RGB LED
- Buzzer

## Wiring

| Component | ESP32 |
|-----------|--------|
| Soil | GPIO34 |
| Rain | GPIO27 |
| Tilt | GPIO35 |
| LED | GPIO25 |
| Buzzer | GPIO18 |

Expected:

- Tilt detected.
- Landslide warning.

---

# Step 11 – Gateway

Proteus cannot simulate Wi-Fi.

Use:

- ESP32
- Virtual Terminal

Display received packets.

Example:

```text
Node VF-01

Flood Risk 92%

Status RED
```

---

# Step 12 – Arduino Firmware

Every node follows the same structure.

```text
Setup()

Initialize Pins

Connect Wi-Fi (Real Hardware)

Loop()

Read Sensors

Calculate Risk

Update LED

Update Buzzer

Send Serial

Upload Firebase (Real Hardware)
```

---

# Step 13 – Rule-Based Logic

## Flood

```c
if(waterLevel>80 && rain==1)
{
 status=RED;
}
```

## Fire

```c
if(smoke>70 && flame==1)
{
 status=RED;
}
```

## Pollution

```c
if(gas>60)
{
 status=ORANGE;
}
```

## Landslide

```c
if(soil>70 && tilt==1)
{
 status=RED;
}
```

---

# Step 14 – LED Logic

| Color | Meaning |
|--------|----------|
| Green | Safe |
| Yellow | Warning |
| Orange | High Risk |
| Red | Critical |

---

# Step 15 – Serial Output

Use Virtual Terminal.

Example

```text
Node:VF-01

Water:86

Rain:YES

Risk:92

Status:RED
```

---

# Step 16 – Testing Sequence

## Flood

- Rotate Water Pot.
- Press Rain Switch.
- Observe LED.
- Observe Buzzer.

## Fire

- Increase MQ2.
- Press Flame.
- Observe Alert.

## Pollution

- Increase MQ135.
- Observe Warning.

## Landslide

- Increase Soil Pot.
- Press Tilt.
- Observe Alert.

---

# Step 17 – Simulation Demonstration

Show judges:

1. Flood Node
2. Fire Node
3. Pollution Node
4. Landslide Node
5. Gateway Terminal
6. Explain Firebase works on real hardware.

---

# Common Proteus Errors

## ESP32 Not Found

- Install ESP32 Library.
- Restart Proteus.

## Virtual Terminal Empty

- Check UART pins.
- Match baud rate.

## LED Not Working

- Add resistor.
- Verify GPIO.

## Buzzer Silent

- Verify active buzzer.
- Check GPIO18.

---

# Final Proteus Project Structure

```text
VYRON_Proteus/
│
├── Node1_Flood.pdsprj
├── Node2_Fire.pdsprj
├── Node3_Pollution.pdsprj
├── Node4_Landslide.pdsprj
├── Gateway.pdsprj
├── Libraries/
├── Arduino_Code/
├── Screenshots/
└── README.md
```

---

# Deliverables

After completing the simulation, save:

- Proteus Project (.pdsprj)
- Arduino Code (.ino)
- Simulation Screenshots
- Node Wiring Diagrams
- Testing Results
- Demonstration Video

These files will provide a complete proof-of-concept before moving to the real ESP32 hardware prototype for the internal SIH selection.
