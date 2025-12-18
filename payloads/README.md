# ⚔️ MoMo-Mimic Payload Library

P4wnP1 A.L.O.A. HID scripts for Red Team operations.

## 📁 Directory Structure

```
payloads/
├── windows/                    # Windows payloads
│   ├── win_reverse_shell.js    # PowerShell reverse shell
│   ├── win_mimikatz.js         # Credential dump
│   ├── win_wifi_passwords.js   # WiFi password extraction
│   ├── win_backdoor_user.js    # Hidden admin user
│   ├── win_disable_defender.js # Disable Windows Defender
│   └── win_uac_bypass.js       # UAC bypass techniques
│
├── linux/                      # Linux payloads
│   ├── linux_reverse_shell.js  # Bash reverse shell
│   ├── linux_ssh_key.js        # SSH key persistence
│   ├── linux_cron_backdoor.js  # Cron job backdoor
│   └── linux_password_dump.js  # /etc/shadow extraction
│
├── macos/                      # macOS payloads
│   ├── mac_reverse_shell.js    # Python reverse shell
│   ├── mac_keychain.js         # Keychain dump
│   └── mac_persistence.js      # LaunchAgent backdoor
│
├── multi/                      # Cross-platform payloads
│   ├── detect_os.js            # OS detection + auto shell
│   └── exfil_generic.js        # Universal data exfil
│
├── util/                       # Utility payloads
│   └── test_hid.js             # HID injection test
│
└── custom/                     # Your custom payloads (git-ignored)
    └── .gitkeep
```

## 🚀 Quick Start

### 1. Configure Payload

Edit the configuration section at the top of each payload:

```javascript
var LHOST = "YOUR_IP";      // Your listener IP
var LPORT = "4444";         // Your listener port
```

### 2. Start Listener

```bash
# Simple listener
nc -lvnp 4444

# Better experience with rlwrap
rlwrap nc -lvnp 4444

# Or use the included script
./scripts/listener.sh 4444
```

### 3. Deploy via P4wnP1

**Web UI:**
1. Connect to MoMo-Mimic WiFi
2. Open http://172.24.0.1:8000
3. Go to HIDScript tab
4. Load or paste payload
5. Click "Run"

**CLI:**
```bash
P4wnP1_cli hid run -n windows/win_reverse_shell.js
```

## 📊 Payload Matrix

| Payload | Admin | AV Risk | Time | Success |
|---------|-------|---------|------|---------|
| **Windows** |
| win_reverse_shell | No | Medium | 5s | 99% |
| win_mimikatz | Yes | High | 15s | 70% |
| win_wifi_passwords | No | Low | 8s | 95% |
| win_backdoor_user | Yes | Low | 10s | 90% |
| win_disable_defender | Yes | N/A | 12s | 80% |
| win_uac_bypass | No | Medium | 6s | 85% |
| **Linux** |
| linux_reverse_shell | No | N/A | 3s | 95% |
| linux_ssh_key | No | N/A | 5s | 99% |
| linux_cron_backdoor | No | N/A | 8s | 95% |
| linux_password_dump | Maybe | N/A | 4s | 80% |
| **macOS** |
| mac_reverse_shell | No | N/A | 4s | 90% |
| mac_keychain | Maybe | N/A | 10s | 60% |
| mac_persistence | No | N/A | 8s | 90% |
| **Multi** |
| detect_os | No | Medium | 5s | 95% |
| exfil_generic | No | Low | 15s | 90% |

## 🔧 Customization

### Keyboard Layout

```javascript
layout("us");    // US English (default)
layout("de");    // German
layout("fr");    // French
layout("tr");    // Turkish
layout("es");    // Spanish
```

### Typing Speed

```javascript
typingSpeed(0, 0);       // Maximum speed (default)
typingSpeed(50, 100);    // Human-like (50-100ms delay)
```

### Delays

```javascript
delay(2000);     // Wait 2 seconds
delay(Math.random() * 1000 + 500);  // Random 500-1500ms
```

## 🛡️ Evasion Tips

1. **Use human-like typing**: `typingSpeed(30, 80)`
2. **Add random delays**: Avoid predictable patterns
3. **AMSI bypass first**: For PowerShell payloads on Windows
4. **USB descriptor spoofing**: Look like legitimate device

## ⚠️ Important Notes

- **Always test in lab environment first**
- **Obtain proper authorization before testing**
- **Files in `custom/` are git-ignored for OPSEC**
- **Modify default passwords/IPs before deployment**

---

*MoMo-Mimic Payload Library - Part of the MoMo Platform*
