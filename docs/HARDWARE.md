# 🛠️ MoMo-Mimic Hardware Guide

> **Version:** 1.0.0 | **Last Updated:** 2025-12-18

---

## 📋 Bill of Materials

### Essential Components

| Component | Model | Purpose | Cost | Link |
|-----------|-------|---------|------|------|
| **SBC** | Raspberry Pi Zero 2 W | Main processor | ~$15 | [raspberrypi.com](https://raspberrypi.com) |
| **USB Adapter** | Zero Stem Kit | USB-A dongle form | ~$10 | [zerostem.io](https://zerostem.io) |
| **Storage** | MicroSD 16-32GB | OS + Payloads | ~$10 | Any Class 10 |
| **Enclosure** | 3D Printed Case | Disguise | ~$5 | Custom design |

**Total: ~$40**

### Optional Components

| Component | Purpose | Cost |
|-----------|---------|------|
| USB-C OTG Adapter | Alternative connection | ~$5 |
| Heat sink | Thermal management | ~$3 |
| Status LED | Visual feedback | ~$2 |
| Tactile button | Manual trigger | ~$1 |

---

## 🔧 Hardware Assembly

### Option 1: Zero Stem Kit (Recommended)

The Zero Stem Kit converts your Pi Zero into a USB dongle form factor.

```
┌────────────────────────────────────────────────────────────────┐
│                    ASSEMBLY DIAGRAM                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Raspberry Pi Zero 2 W                                        │
│   ┌─────────────────────────────────────────┐                  │
│   │  ┌─────┐                                │                  │
│   │  │ USB │ ← Micro USB (don't use)       │                  │
│   │  └─────┘                                │                  │
│   │                                         │                  │
│   │  ┌─────┐                                │                  │
│   │  │ PWR │ ← Micro USB Power (don't use) │                  │
│   │  └─────┘                                │                  │
│   │                                         │                  │
│   │  ○ ○ ○ ○    ← Test Pads (PP1, PP6,     │                  │
│   │              PP22, PP23)                │                  │
│   │                                         │                  │
│   └─────────────────────────────────────────┘                  │
│                      │                                          │
│                      │ Solder/Connect                          │
│                      ▼                                          │
│   ┌─────────────────────────────────────────┐                  │
│   │           Zero Stem Kit                  │                  │
│   │                                          │                  │
│   │   ┌──────────────────────┐              │                  │
│   │   │      USB-A Male      │──────────────┼───► To Target PC │
│   │   └──────────────────────┘              │                  │
│   │                                          │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

#### Test Pad Pinout

| Pad | Function | Wire Color |
|-----|----------|------------|
| PP1 | 5V Power | Red |
| PP6 | Ground | Black |
| PP22 | USB D+ | Green |
| PP23 | USB D- | White |

#### Assembly Steps

```bash
# Tools needed:
- Soldering iron (fine tip)
- Solder (lead-free, thin gauge)
- Wire strippers
- Multimeter (for testing)

# Steps:
1. Position Zero Stem on Pi Zero test pads
2. Align PP1, PP6, PP22, PP23 connections
3. Solder each pad carefully
4. Test continuity with multimeter
5. Insert MicroSD card
6. Test boot by plugging into PC
```

### Option 2: USB Shim (Solderless)

For those who prefer not to solder:

```
┌─────────────────────────────────────────────────────────────────┐
│                    USB SHIM METHOD                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Pi Zero                USB Shim               USB-A Cable     │
│   ┌──────┐              ┌──────┐              ┌──────────────┐  │
│   │      │              │      │              │              │  │
│   │ USB  │──Micro USB──►│ Shim │──USB-A F───►│ USB-A Male   │  │
│   │ Port │              │      │              │ (to target)  │  │
│   │      │              │      │              │              │  │
│   └──────┘              └──────┘              └──────────────┘  │
│                                                                  │
│   Pros: No soldering required                                   │
│   Cons: Bulkier, less reliable connection                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Option 3: Pogo Pin Adapter

```
Pogo pins press against test pads without soldering.

┌────────────────────────────────────────┐
│            POGO PIN SETUP              │
├────────────────────────────────────────┤
│                                        │
│   Pi Zero                              │
│   ┌─────────────────────┐              │
│   │                     │              │
│   │   ○ ○ ○ ○  ← Pads   │              │
│   │   ↑ ↑ ↑ ↑           │              │
│   └───┼─┼─┼─┼───────────┘              │
│       │ │ │ │                          │
│   ┌───▼─▼─▼─▼───────────┐              │
│   │   ↓ ↓ ↓ ↓           │              │
│   │   Pogo Pin Board    │              │
│   │                     │              │
│   │   USB-A Connector   │─────► Target │
│   └─────────────────────┘              │
│                                        │
│   Spring-loaded pins maintain contact  │
│                                        │
└────────────────────────────────────────┘
```

---

## 🎨 Enclosure Design

### 3D Printed USB Drive Case

Design a case that looks like a generic USB flash drive:

```
┌────────────────────────────────────────────────────────────────┐
│                    ENCLOSURE DESIGN                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   External Dimensions:                                          │
│   ┌─────────────────────────────────┐                          │
│   │                                 │  Length: 55mm            │
│   │   ███████████████████████████   │  Width:  22mm            │
│   │                                 │  Height: 10mm            │
│   └─────────────────────────────────┘                          │
│                                                                 │
│   Cross Section:                                                │
│   ┌─────────────────────────────────┐                          │
│   │  ┌───────────────────────────┐  │                          │
│   │  │    Pi Zero 2 W            │  │  ← Internal cavity      │
│   │  │    + Zero Stem            │  │                          │
│   │  └───────────────────────────┘  │                          │
│   │         USB-A Male ═══════════╗ │  ← Protrudes from case  │
│   └────────────────────────────────╝┘                          │
│                                                                 │
│   Features:                                                     │
│   • Ventilation slots (hidden)                                 │
│   • MicroSD access slot                                        │
│   • Activity LED window (optional)                             │
│   • Lanyard hole                                               │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### STL Files

```
enclosure/
├── top_shell.stl       # Top half of case
├── bottom_shell.stl    # Bottom half
├── cap.stl             # USB port cap
└── README.md           # Print settings
```

### Print Settings

| Setting | Value |
|---------|-------|
| Material | ABS or PETG (heat resistant) |
| Layer Height | 0.15mm |
| Infill | 20% |
| Supports | Yes (for USB opening) |
| Color | Matte Black or Gray |

---

## ⚡ Power Considerations

### Power Draw

| State | Current | Power |
|-------|---------|-------|
| Idle | ~120mA | 0.6W |
| WiFi Active | ~200mA | 1.0W |
| HID Attack | ~180mA | 0.9W |
| Full Load | ~350mA | 1.75W |

### Power Sources

```
┌─────────────────────────────────────────────────────────────────┐
│                    POWER OPTIONS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. Target USB Port (Primary)                                  │
│      └── Gets power directly from victim PC                    │
│      └── USB 2.0: 500mA (sufficient)                           │
│      └── USB 3.0: 900mA (more than enough)                     │
│                                                                  │
│   2. USB Hub/Charger                                            │
│      └── For pre-deployment testing                            │
│      └── Must provide 5V/1A minimum                            │
│                                                                  │
│   3. Battery Pack (for standalone operation)                    │
│      └── Optional: Add LiPo + charging circuit                 │
│      └── Enables WiFi-only mode without target PC              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Thermal Management

```
Pi Zero 2 W can throttle at high temperatures.

Mitigation:
• Add small copper heat sink to CPU
• Include ventilation in enclosure
• Limit continuous heavy operations

Temperature Limits:
• Normal: 40-60°C
• Warning: 60-80°C  
• Throttle: 80°C+
• Shutdown: 85°C
```

---

## 📡 Wireless Capabilities

### Built-in WiFi

| Spec | Value |
|------|-------|
| Standard | 802.11 b/g/n |
| Frequency | 2.4 GHz |
| Antenna | Internal PCB |
| Range | ~10-30m indoors |

### Built-in Bluetooth

| Spec | Value |
|------|-------|
| Standard | Bluetooth 4.2, BLE |
| Range | ~10m |
| Use | Remote trigger, beacon |

### Extending Range (Optional)

```
External antenna mod (advanced):
1. Remove RF shield
2. Locate antenna trace
3. Cut trace
4. Solder U.FL connector
5. Attach external antenna

Warning: Voids warranty, FCC non-compliant
```

---

## 🔌 GPIO Options

### Available GPIO

```
Pi Zero 2 W has 40-pin GPIO header (unpopulated)

Useful pins for MoMo-Mimic:
┌────────────────────────────────────────┐
│ Pin │ Function    │ Use               │
├────────────────────────────────────────┤
│ 3   │ GPIO 2 (SDA)│ I2C Display      │
│ 5   │ GPIO 3 (SCL)│ I2C Display      │
│ 11  │ GPIO 17     │ Status LED       │
│ 13  │ GPIO 27     │ Trigger Button   │
│ 15  │ GPIO 22     │ Panic Button     │
└────────────────────────────────────────┘
```

### LED Indicator (Optional)

```javascript
// P4wnP1 LED control
function setLED(state) {
    // GPIO 17 for status LED
    if (state) {
        exec("gpio -g write 17 1");
    } else {
        exec("gpio -g write 17 0");
    }
}

// Blink pattern for status
function blinkStatus() {
    for (var i = 0; i < 3; i++) {
        setLED(true);
        delay(100);
        setLED(false);
        delay(100);
    }
}
```

### Button Trigger (Optional)

```yaml
# P4wnP1 trigger config
triggers:
  - name: gpio_button
    type: gpio
    gpio_pin: 27
    pull: up
    edge: falling
    action: run_script
    script: instant_shell.js
```

---

## 🧪 Testing & Validation

### Pre-Deployment Checklist

```bash
# 1. Basic boot test
# Plug into USB port, wait 60s
# Check for P4wnP1 WiFi network

# 2. WiFi connectivity
# Connect phone to P4wnP1 SSID
# Access http://172.24.0.1:8000

# 3. HID test
# Create simple payload:
layout("us");
delay(2000);
press("GUI-r");
delay(500);
type("notepad");
press("ENTER");
delay(1000);
type("MoMo-Mimic Test Successful!");

# 4. Network gadget test
# Check if new network adapter appears
# Windows: Network Connections
# Linux: ip link show

# 5. Mass storage test
# Enable mass storage gadget
# Check if drive appears
```

### Quality Assurance Matrix

| Test | Windows | Linux | macOS |
|------|---------|-------|-------|
| USB Recognition | ✅ | ✅ | ✅ |
| HID Keyboard | ✅ | ✅ | ✅ |
| HID Mouse | ✅ | ✅ | ✅ |
| Ethernet (RNDIS) | ✅ | ❌ | ❌ |
| Ethernet (ECM) | ❌ | ✅ | ✅ |
| Mass Storage | ✅ | ✅ | ✅ |
| Composite | ✅ | ✅ | ✅ |

---

## 🔧 Troubleshooting

### Device Not Recognized

```
Symptom: PC shows "Unknown USB Device"

Solutions:
1. Check solder joints on test pads
2. Verify USB cable/connector
3. Try different USB port
4. Check MicroSD card is properly inserted
5. Re-flash P4wnP1 image
```

### WiFi Not Appearing

```
Symptom: P4wnP1 SSID not visible

Solutions:
1. Wait longer (up to 90s for first boot)
2. Check WiFi config in /boot/config.txt
3. Verify wpa_supplicant.conf
4. Check hostapd service status
5. Reboot device
```

### HID Not Typing

```
Symptom: Keyboard recognized but no typing

Solutions:
1. Check keyboard layout matches target OS
2. Increase delays between keystrokes
3. Verify HID gadget is enabled
4. Check for locked screen (won't work)
5. Test with simple payload first
```

### Overheating

```
Symptom: Device becomes hot, performance drops

Solutions:
1. Add heatsink to CPU
2. Improve case ventilation
3. Reduce continuous operation time
4. Disable unused features
5. Use lower WiFi power mode
```

---

## 📦 Accessories

### Recommended Extras

| Item | Purpose | Priority |
|------|---------|----------|
| MicroSD Reader | Reflashing | Essential |
| USB Extension | Testing reach | Useful |
| USB Hub | Multi-device test | Useful |
| Multimeter | Debugging | Useful |
| Heat shrink | Cable management | Optional |
| USB port blocker | Training prop | Optional |

### Carrying Kit

```
Field Kit Suggestion:
┌────────────────────────────────────┐
│  Small pelican-style case          │
│                                    │
│  • 2x MoMo-Mimic devices          │
│  • 2x Spare MicroSD cards         │
│  • 1x USB-A to USB-C adapter      │
│  • 1x Short USB extension         │
│  • 1x SD card reader              │
│  • 1x Tweezers (for SD card)      │
│  • Written authorization letter    │
│                                    │
└────────────────────────────────────┘
```

---

*MoMo-Mimic Hardware Guide v1.0.0*

