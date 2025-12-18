# 🔧 MoMo-Mimic Scripts

Utility scripts for MoMo-Mimic operations.

## 📁 Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `setup.sh` | Install MoMo-Mimic on P4wnP1 | `sudo ./setup.sh` |
| `listener.sh` | Start reverse shell listener | `./listener.sh [port]` |
| `cleanup.sh` | Secure wipe operational data | `sudo ./cleanup.sh` |
| `exfil_server.py` | HTTP server for data exfiltration | `python3 exfil_server.py` |

## 🚀 Quick Start

### On Attacker Machine

```bash
# 1. Start listener for reverse shells
./listener.sh 4444

# 2. In another terminal, start exfil server
python3 exfil_server.py -p 8080
```

### On MoMo-Mimic Device

```bash
# SSH to device
ssh pi@172.24.0.1

# Run setup
cd /path/to/MoMo-Mimic
sudo ./scripts/setup.sh
```

## 📋 Script Details

### setup.sh

Installs MoMo-Mimic payloads and configurations on P4wnP1:
- Copies payloads to `/usr/local/P4wnP1/HIDScripts/`
- Installs configuration files
- Creates mass storage image
- Sets proper permissions

### listener.sh

Quick listener for reverse shells:
- Auto-detects local IP
- Uses `rlwrap` for better shell experience if available
- Default port: 4444

### cleanup.sh

Securely wipes operational data:
- Clears bash history
- Shreds loot files
- Clears system logs
- Removes temporary files

### exfil_server.py

HTTP server for receiving exfiltrated data:
- Saves incoming POST data to `loot/` directory
- Auto-generates filenames with timestamps
- Previews received data
- Supports custom port and output directory

## ⚠️ Requirements

- Bash 4.0+
- Python 3.6+
- netcat (`nc`)
- Optional: `rlwrap`, `shred`

## 📝 Notes

- All scripts should be run from the `scripts/` directory
- `setup.sh` and `cleanup.sh` require root privileges
- Always test in a lab environment before deployment

