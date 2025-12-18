# ⚙️ MoMo-Mimic Configuration Files

This directory contains P4wnP1 A.L.O.A. configuration files for MoMo-Mimic.

## 📁 Files

| File | Description |
|------|-------------|
| `usb_gadget.yaml` | USB device descriptor and gadget settings |
| `wifi.yaml` | WiFi access point and network settings |
| `triggers.yaml` | Event-based automation triggers |

## 🚀 Usage

### 1. Copy to P4wnP1

```bash
# SSH into MoMo-Mimic
ssh pi@172.24.0.1

# Copy configs
scp config/*.yaml pi@172.24.0.1:/usr/local/P4wnP1/config/
```

### 2. Apply Configuration

Via Web UI:
1. Open http://172.24.0.1:8000
2. Navigate to relevant section
3. Load configuration
4. Deploy

Via CLI:
```bash
P4wnP1_cli usb deploy -n keyboard_only
P4wnP1_cli wifi deploy -n default
P4wnP1_cli trigger deploy -n deployment
```

## ⚠️ Important

- **Change all default passwords before deployment!**
- **Test configurations in lab environment first**
- **Review trigger settings to avoid unintended execution**

## 📝 Customization

Edit YAML files to customize:
- USB device descriptors (VID/PID spoofing)
- WiFi SSID and password
- Automatic attack triggers
- GPIO button functions

