# VYRON – Complete KiCad PCB & 3D Design Guide (Final SIH Project)

## Smart India Hackathon 2026 (SIH26178)

**Project:** AI-Powered Environmental Intelligence Network

**Final Hardware:** STM32L476RG + LoRa Mesh + Edge AI + ESP32 Gateway

---

# Purpose

This guide explains how to design the complete PCB and 3D model for the final SIH prototype in **KiCad 9**. Follow it from project creation to Gerber export.

---

# Final PCB Strategy

Instead of designing four different PCBs, design **one common STM32 PCB** and use different sensor connectors for each node.

Benefits:
- Lower manufacturing cost
- Easier maintenance
- One firmware base
- Scalable deployment

The same PCB becomes:

- VF-01 Flood Node
- VF-02 Forest Fire Node
- VA-03 Pollution Node
- VT-04 Landslide Node

---

# PCB Architecture

```text
Sensors
   │
Connectors
   │
STM32L476RG
   │
SX1278 LoRa
   │
Micro SD
   │
GPS
   │
LED + Buzzer
   │
Power Section
   │
Solar + Battery
```

---

# Software Required

| Software | Purpose |
|----------|---------|
| KiCad 9 | PCB Design |
| STM32CubeMX | Pin Planning |
| STM32CubeIDE | Firmware |
| Proteus | Simulation |
| Edge Impulse | TinyML |

---

# Folder Structure

```text
VYRON_Hardware/
├── KiCad/
│   ├── STM32_Common_Node/
│   ├── ESP32_Gateway/
│   ├── Libraries/
│   ├── 3D/
│   ├── Gerber/
│   └── README.md
```

---

# Step 1 – Create KiCad Project

Create:

```text
STM32_Common_Node
```

Files created:

- `.kicad_pro`
- `.kicad_sch`
- `.kicad_pcb`

---

# Step 2 – Page Setup

- A4
- Grid: 50 mil
- Schematic theme: Default

---

# Step 3 – Create Libraries

Create custom libraries.

```text
VYRON_Symbols
VYRON_Footprints
VYRON_3D
```

Store inside the project.

---

# Step 4 – Components

Main IC

- STM32L476RG (LQFP64)

Communication

- SX1278
- GPS Module
- Micro SD

Power

- TP4056
- AMS1117-3.3
- Schottky Diode
- 18650 Connector

Indicators

- RGB LED
- Buzzer

Programming

- SWD Header
- Reset Button

---

# Step 5 – Place STM32

Place STM32 at the center.

Keep 20 mm free space around it.

---

# Step 6 – Power Section

Place near one edge.

Order:

```text
Solar
 ↓
Schottky
 ↓
TP4056
 ↓
Battery
 ↓
AMS1117
 ↓
3.3V Rail
```

Use:
- 1 mm power traces
- 100 nF decoupling capacitors

---

# Step 7 – SWD Programming

Place a 6-pin header.

| Pin | Function |
|-----|----------|
|1|3.3V|
|2|SWDIO|
|3|GND|
|4|SWCLK|
|5|RESET|
|6|GND|

Keep it near the PCB edge.

---

# Step 8 – LoRa Placement

Place SX1278 on the top edge.

Keep the antenna outside the board.

Do not route copper under the antenna.

SPI connections:

| STM32 | LoRa |
|--------|------|
|PA5|SCK|
|PA6|MISO|
|PA7|MOSI|
|PB6|NSS|
|PB5|DIO0|
|PB4|RESET|

---

# Step 9 – GPS Placement

Place GPS opposite LoRa.

Keep away from switching regulators.

UART:

| STM32 | GPS |
|--------|-----|
|PA2|RX|
|PA3|TX|

---

# Step 10 – Micro SD

Place near LoRa.

SPI:

| STM32 | SD |
|--------|----|
|PA5|SCK|
|PA6|MISO|
|PA7|MOSI|

---

# Step 11 – Sensor Connectors

Use JST-XH 4-pin connectors.

## I²C

| Pin |
|-----|
|3.3V|
|GND|
|SDA|
|SCL|

For:

- BME280
- MPU6050

## Analog Connector

| Pin |
|-----|
|3.3V|
|GND|
|Signal|

For:

- Water Level
- MQ135
- Soil Moisture

## Digital Connector

| Pin |
|-----|
|3.3V|
|GND|
|Signal|

For:

- Rain
- Flame

---

# Step 12 – LED

Place near the edge.

Connections:

| LED | STM32 |
|------|--------|
|Red|PA8|
|Green|PA9|
|Blue|PA10|

---

# Step 13 – Buzzer

Place beside LED.

Keep the sound opening clear.

---

# Step 14 – ERC

Run:

```
Inspect → Electrical Rules Checker
```

Fix:

- Unconnected pins
- Missing power flags
- Floating nets

ERC should show **0 Errors**.

---

# Step 15 – Assign Footprints

| Component | Footprint |
|------------|-----------|
|STM32|LQFP-64|
|JST|JST-XH|
|LED|0603|
|Resistor|0603|
|Capacitor|0603|
|AMS1117|SOT-223|

---

# Step 16 – Open PCB Editor

Import schematic.

Update PCB.

---

# Step 17 – PCB Outline

Recommended:

```
100 mm × 80 mm
```

Corners:

- Radius: 3 mm

---

# Step 18 – Component Placement

Center

- STM32

Top

- LoRa

Bottom

- Power

Left

- Sensors

Right

- GPS
- SD

This keeps wiring short.

---

# Step 19 – Routing

## Trace Width

| Net | Width |
|-----|-------|
|Signals|0.25 mm|
|SPI|0.30 mm|
|UART|0.30 mm|
|Power|1.00 mm|

Use 45° corners.

Avoid loops.

---

# Step 20 – Ground Plane

Add:

```
Add Filled Zone
```

Net:

```
GND
```

Fill both sides.

This improves RF performance.

---

# Step 21 – Silkscreen

Add labels.

Example:

```
VF-01
VF-02
VA-03
VT-04
```

Also label every connector.

Example:

```
SDA
SCL
GND
3V3
```

---

# Step 22 – DRC

Run:

```
Inspect → Design Rules Checker
```

Fix:

- Clearance
- Overlap
- Width violations

DRC should show **0 Errors**.

---

# Step 23 – 3D Viewer

Open:

```
View → 3D Viewer
```

Check:

- Connector orientation
- Component height
- SD slot
- LoRa antenna clearance

Rotate the board.

---

# Step 24 – Improve 3D Appearance

Use realistic models.

Examples:

- JST Connector
- GPS Module
- LoRa Module

Set:

```
Footprint → 3D Models
```

Assign STEP models.

---

# Step 25 – ESP32 Gateway PCB

Create a second project.

Board size:

```
80 × 60 mm
```

Components:

- ESP32
- SX1278
- SD
- LEDs

---

# Step 26 – Export Manufacturing Files

Generate:

```
Gerber
```

Include:

- Top Copper
- Bottom Copper
- Silkscreen
- Solder Mask
- Edge Cuts

Generate:

```
Drill Files
```

Compress into:

```
ZIP
```

---

# Step 27 – Export 3D Models

Export:

- STEP
- WRL

Use STEP for:

- Fusion 360
- SolidWorks
- FreeCAD

---

# PCB Checklist

## Schematic

- [ ] ERC Clean
- [ ] Power Flags
- [ ] SWD Connected
- [ ] LoRa Connected
- [ ] GPS Connected

## PCB

- [ ] DRC Clean
- [ ] Ground Plane
- [ ] 45° Routing
- [ ] Connector Labels

## Manufacturing

- [ ] Gerbers
- [ ] Drill Files
- [ ] STEP Model

---

# Final Deliverables

## Common STM32 Node

- Schematic
- PCB
- STEP Model

## Gateway

- Schematic
- PCB
- STEP Model

## Manufacturing Package

- Gerbers
- Drill Files
- BOM
- Pick & Place

---

# SIH Judge Presentation Tips

Show this order:

1. Common PCB concept.
2. 3D model.
3. Flood sensor connector.
4. Fire sensor connector.
5. Pollution sensor connector.
6. Landslide connector.
7. LoRa placement.
8. Ground plane.
9. Gerber files.

Explain:

> "We designed one reusable STM32 PCB with modular sensor connectors. The same board becomes four different environmental nodes simply by changing the connected sensor module, making the solution scalable, cost-effective, and easy to deploy across villages, cities, forests, and industrial areas."
