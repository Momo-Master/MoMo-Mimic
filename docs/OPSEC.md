# 🛡️ MoMo-Mimic Operational Security Guide

> **Version:** 1.0.0 | **Classification:** Red Team Internal

---

## ⚠️ OPSEC WARNING

```
┌─────────────────────────────────────────────────────────────────┐
│                    ⚠️  OPSEC CRITICAL  ⚠️                        │
│                                                                  │
│  Physical security testing carries significant risk.            │
│  Poor OPSEC can lead to:                                        │
│                                                                  │
│  • Detection and device seizure                                 │
│  • Alarm triggering and security response                       │
│  • Legal consequences                                           │
│  • Physical confrontation                                       │
│  • Operation failure                                            │
│                                                                  │
│  ALWAYS operate under proper authorization!                     │
│  ALWAYS have your "get out of jail" letter ready!              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Pre-Operation Checklist

### 1. Authorization (MANDATORY)

```
□ Written authorization from client (signed)
□ Scope of engagement clearly defined
□ Physical access boundaries documented
□ Time windows approved
□ Emergency contacts established
□ Legal team notified
□ Insurance coverage verified
□ "Get out of jail free" letter on person
```

### 2. Device Preparation

```
□ Fresh MicroSD card (not reused from other ops)
□ Device tested and working
□ Payloads customized for target environment
□ WiFi SSID changed from default
□ WiFi password changed from default
□ Default credentials changed
□ Device labeled innocuously (if at all)
□ No identifying marks on device
```

### 3. Payload Review

```
□ Payload tested in lab environment
□ C2 callback IP/domain prepared
□ Listener running and tested
□ Payload doesn't damage target system
□ Cleanup procedures defined
□ Attribution minimized
```

### 4. Physical Prep

```
□ Cover identity prepared (if needed)
□ Appropriate attire for environment
□ Backup device available
□ Exit routes identified
□ Communication plan with team
```

---

## 🎭 Social Engineering Pretexts

### Pretext 1: IT Support

```
Scenario: "I'm from IT, here to check your computer"

Props needed:
• Polo shirt with generic IT logo
• Lanyard with fake badge
• Clipboard with checklist
• Laptop bag

Script:
"Hi, I'm from IT support. We've been having some 
network issues and need to check the connection 
on your machine. Can I plug this diagnostic tool 
in for a moment?"

Target: Individual workstations
Risk level: Medium
Success rate: High
```

### Pretext 2: Vendor/Contractor

```
Scenario: "I'm here to update the printer firmware"

Props needed:
• Business casual attire
• Vendor badge (if available)
• Tablet with "work orders"

Script:
"Good morning, I'm from [Printer Company]. We're 
rolling out a firmware update to all network 
printers. I just need to connect this for a few 
minutes."

Target: Network printers, shared devices
Risk level: Low
Success rate: High
```

### Pretext 3: Cleaning/Maintenance

```
Scenario: After-hours cleaning crew access

Props needed:
• Cleaning uniform
• Cleaning supplies
• Keys/access card (if provided)

Script:
[No script needed - avoid interaction]
Work silently, deploy device, leave.

Target: Unattended areas
Risk level: Low
Success rate: Very high
```

### Pretext 4: Conference Attendee

```
Scenario: At company event or conference

Props needed:
• Business casual attire
• Conference badge
• Business cards

Script:
"I'm having trouble connecting to the WiFi. 
Let me try plugging in directly... Do you mind 
if I use this port for a moment?"

Target: Conference rooms, common areas
Risk level: Medium
Success rate: Medium
```

### Pretext 5: New Employee

```
Scenario: "I just started and can't get my machine to work"

Props needed:
• Business casual attire
• "New employee" vibe
• Confused demeanor

Script:
"Hey, sorry to bother you. I just started this 
week and my laptop won't connect to the network. 
IT said to try this adapter..."

Target: Helpful coworkers' machines
Risk level: High
Success rate: Medium
```

---

## 📍 Deployment Scenarios

### Scenario A: USB Drop

**Concept:** Leave device in common area for victim to find and plug in.

```
Execution:
1. Prepare device with autorun payload
2. Label attractively:
   • "Confidential - HR Files"
   • "Executive Bonuses 2024"
   • "Building Access Codes"
3. Drop in parking lot, lobby, or break room
4. Wait for curious employee to plug in
5. Payload executes automatically

OPSEC Notes:
• Wear gloves when handling
• No fingerprints
• Remove any identifying marks
• Consider surveillance cameras
```

### Scenario B: Direct Insertion

**Concept:** Plug device into target machine yourself.

```
Execution:
1. Gain physical access (pretext or authorized)
2. Identify target machine
3. Check for observers
4. Insert device (5-10 seconds)
5. Wait for payload completion
6. Remove device (or leave for persistence)
7. Exit normally

OPSEC Notes:
• Practice insertion motion
• Know exact time needed
• Have cover story ready
• Don't rush, act natural
```

### Scenario C: Device Swap

**Concept:** Replace existing USB device with MoMo-Mimic.

```
Execution:
1. Identify target USB device (keyboard, mouse, hub)
2. Prepare MoMo-Mimic to look similar
3. Distract or wait for user absence
4. Swap devices
5. Original device disappears with you
6. MoMo-Mimic stays and operates

OPSEC Notes:
• Match form factor as closely as possible
• Test compatibility beforehand
• Have explanation if caught
```

### Scenario D: Printer Drop (Long-term)

**Concept:** Plant device behind/inside printer for persistent access.

```
Execution:
1. Access printer area (often unrestricted)
2. Insert MoMo-Mimic into available USB port
3. Position for concealment
4. Device provides ongoing WiFi access
5. Exfiltrate data remotely via WiFi

OPSEC Notes:
• Printers often in low-traffic areas
• USB ports often unused
• Long cable may help concealment
• Consider power availability
```

---

## 🚨 Incident Response

### If Questioned

```
DO:
✅ Stay calm and confident
✅ Have authorization letter ready
✅ Explain you're conducting authorized testing
✅ Offer to call your contact at the company
✅ Be polite and cooperative

DON'T:
❌ Run or act guilty
❌ Lie about your purpose
❌ Argue or become confrontational
❌ Resist if security detains you
❌ Destroy evidence
```

### If Device Discovered

```
IMMEDIATE (Device found, you're not present):

1. Assume compromise
2. Remote wipe if possible (via WiFi)
3. Notify team lead
4. Document timeline
5. Check if other devices affected
6. Review operation security

IF Device found while you're present:

1. Produce authorization letter
2. Explain purpose calmly
3. Offer to demonstrate
4. Call client contact if needed
5. Document the interaction
```

### If Detained by Security

```
1. Remain calm
2. Present authorization immediately
3. Ask to call:
   - Your manager
   - Client contact
   - Legal counsel
4. Do not resist
5. Do not argue
6. Do not admit to unauthorized activity
7. Exercise right to remain silent if unsure
```

### Emergency Contacts Template

```
PRIMARY CONTACT:
Name: [Client Security Lead]
Phone: [Number]
Knows about: Test authorization

SECONDARY CONTACT:
Name: [Your Manager]
Phone: [Number]

LEGAL:
Name: [Company Legal/Lawyer]
Phone: [Number]
Available: 24/7 emergency line

CODE WORD: [Agreed word to confirm identity]
```

---

## 🔐 Device Security

### Before Deployment

```
1. Wipe and fresh install
   - Never reuse cards between clients
   - Start with clean P4wnP1 image
   
2. Change defaults
   - WiFi SSID: Not "P4wnP1"
   - WiFi Password: Not "MaMe82"
   - SSH credentials: Changed
   
3. Remove identifying info
   - No hostname with your name
   - No personal SSH keys
   - No previous client data
```

### WiFi Security

```yaml
# Recommended WiFi config for stealth

wifi:
  mode: ap
  ssid: ""               # Hidden SSID
  hidden: true
  password: "RandomStr0ng!"
  channel: 11            # Less common channel
  
# Alternative: Blend in
wifi:
  ssid: "HP-Print-52-OfficeJet"  # Looks like printer
```

### SSH Hardening

```bash
# Change default password
passwd pi

# Add SSH key (remove password auth)
ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Disable password auth
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

---

## 🧹 Evidence Cleanup

### During Operation

```bash
# Clear bash history
history -c
unset HISTFILE

# Clear logs
sudo truncate -s 0 /var/log/*.log
sudo journalctl --vacuum-time=1s

# Remove temporary files
rm -rf /tmp/*
rm -rf /var/tmp/*
```

### Post-Operation

```bash
# 1. Remove all payloads
rm -rf /home/pi/payloads/*

# 2. Clear P4wnP1 logs
rm -rf /var/log/P4wnP1/*

# 3. Reset WiFi to defaults (then change again)
# 4. Wipe MicroSD or destroy if operation complete

# 5. For complete device sanitization:
# Overwrite MicroSD with zeros
sudo dd if=/dev/zero of=/dev/mmcblk0 bs=1M status=progress
```

### What NOT to Leave Behind

```
❌ SSH authorized_keys with your key
❌ Command history
❌ Downloaded files
❌ Custom scripts with comments/attribution
❌ Network logs showing C2 connections
❌ Successful payload outputs
```

---

## 🕐 Timing Considerations

### Best Times to Deploy

| Time | Risk | Notes |
|------|------|-------|
| **Lunch (12-1pm)** | Low | Desks unattended |
| **Early morning (7-8am)** | Low | Few people present |
| **Late evening (6-8pm)** | Low | Cleaning crews, few staff |
| **After hours** | Medium | Security may notice |
| **Weekends** | Variable | Depends on access |

### Worst Times to Deploy

| Time | Risk | Notes |
|------|------|-------|
| **Morning meetings (9-10am)** | High | Everyone at desks |
| **Deadline periods** | High | Extra attention |
| **Security incidents** | Very High | Heightened awareness |
| **Layoff announcements** | High | Paranoid atmosphere |

### Payload Timing

```javascript
// Add random delay to avoid pattern detection
delay(Math.random() * 2000 + 1000);  // 1-3 second random

// Avoid instant execution (suspicious)
// BAD:
delay(0);
type("malware");

// GOOD:
delay(2000);  // Natural USB enumeration time
type("notepad");  // Innocent first action
```

---

## 📝 Documentation

### Operation Log Template

```markdown
# Operation Log: [Client Name]
Date: YYYY-MM-DD
Operator: [Your Name]

## Pre-Op
- [ ] Authorization verified
- [ ] Device prepared
- [ ] Payloads tested
- [ ] Emergency contacts confirmed

## Timeline
| Time | Action | Result |
|------|--------|--------|
| 09:00 | Arrived on site | Normal |
| 09:15 | Accessed floor 3 | No challenge |
| 09:22 | Deployed device A | Success |
| 09:25 | Exited building | Normal |

## Devices Deployed
| ID | Location | Type | Status |
|----|----------|------|--------|
| MM-001 | F3-Printer | Persistent | Active |

## Notes
- Security guard at desk, didn't check bag
- Camera in lobby, none on floor 3

## Post-Op
- [ ] Devices retrieved/wiped
- [ ] Evidence cleanup complete
- [ ] Report submitted
```

### Finding Report Template

```markdown
# Physical Security Finding

## Summary
Deployed USB attack device that successfully 
executed payload on [X] endpoints.

## Risk Rating: HIGH

## Details
- Device type: MoMo-Mimic (HID injection)
- Deployment method: [Describe]
- Access required: [Badge/social engineering/none]
- Time to deploy: [X seconds]
- Detection: [None/Partial/Full]

## Evidence
- Screenshot of successful reverse shell
- List of captured credentials
- Network access achieved

## Remediation
1. Implement USB port blocking policy
2. Deploy endpoint USB device whitelisting
3. Physical security awareness training
4. USB port locks on sensitive systems
```

---

## ⚖️ Legal Considerations

### Required Documentation

```
BEFORE ANY OPERATION:

1. Master Service Agreement (MSA)
   - Liability coverage
   - Insurance requirements
   - Indemnification clauses

2. Statement of Work (SOW)
   - Scope of testing
   - Authorized areas
   - Prohibited actions
   - Time boundaries

3. Rules of Engagement (ROE)
   - What you can/cannot do
   - Escalation procedures
   - Emergency contacts

4. Authorization Letter
   - Signed by authorized executive
   - Your name and photo
   - Valid dates
   - Contact for verification
```

### Prohibited Actions

```
NEVER:
❌ Exceed authorized scope
❌ Access systems beyond scope
❌ Exfiltrate real sensitive data
❌ Cause system damage
❌ Install persistent malware (unless authorized)
❌ Share access with unauthorized parties
❌ Conduct testing outside approved windows
❌ Enter restricted areas without authorization
```

### Your Rights

```
IF QUESTIONED BY LAW ENFORCEMENT:

1. You have the right to remain silent
2. You have the right to an attorney
3. Present authorization documentation
4. Request to call your legal contact
5. Do not consent to searches beyond necessary
6. Document everything
```

---

## 📊 Risk Assessment Matrix

| Scenario | Detection Risk | Legal Risk | Physical Risk |
|----------|----------------|------------|---------------|
| USB Drop (parking lot) | Low | Medium | Low |
| Direct Insert (with pretext) | Medium | Low | Low |
| After-hours access | Medium | Low | Medium |
| Social engineering entry | High | Medium | Medium |
| Tailgating | Medium | Medium | Medium |
| Impersonating employee | High | High | Medium |

---

*MoMo-Mimic OPSEC Guide v1.0.0*
*Classification: Red Team Internal*

