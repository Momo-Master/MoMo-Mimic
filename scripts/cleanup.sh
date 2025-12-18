#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# MoMo-Mimic Cleanup Script
# Securely wipe operational data
# ═══════════════════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}"
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                     ║"
echo "║              ⚠️  MOMO-MIMIC CLEANUP ⚠️                              ║"
echo "║                                                                     ║"
echo "║   This will permanently delete all operational data:               ║"
echo "║   - Captured credentials                                           ║"
echo "║   - Loot files                                                     ║"
echo "║   - Logs and history                                               ║"
echo "║   - Temporary files                                                ║"
echo "║                                                                     ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Confirmation
read -p "Are you sure you want to continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}[*] Cleanup cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}[*] Starting cleanup...${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Clear bash history
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Clearing bash history...${NC}"
history -c
cat /dev/null > ~/.bash_history
unset HISTFILE
echo -e "${GREEN}[✓] Bash history cleared${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Clear loot directory
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Clearing loot directory...${NC}"
if [ -d "/usr/local/P4wnP1/loot" ]; then
    # Secure delete with shred if available
    if command -v shred &> /dev/null; then
        find /usr/local/P4wnP1/loot -type f -exec shred -vfz -n 3 {} \; 2>/dev/null || true
    fi
    rm -rf /usr/local/P4wnP1/loot/*
    echo -e "${GREEN}[✓] Loot directory cleared${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Clear P4wnP1 logs
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Clearing P4wnP1 logs...${NC}"
if [ -d "/var/log/P4wnP1" ]; then
    rm -rf /var/log/P4wnP1/*
fi
if [ -d "/var/log/momo-mimic" ]; then
    rm -rf /var/log/momo-mimic/*
fi
echo -e "${GREEN}[✓] P4wnP1 logs cleared${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Clear system logs
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Clearing system logs...${NC}"
truncate -s 0 /var/log/*.log 2>/dev/null || true
truncate -s 0 /var/log/syslog 2>/dev/null || true
truncate -s 0 /var/log/auth.log 2>/dev/null || true
journalctl --vacuum-time=1s 2>/dev/null || true
echo -e "${GREEN}[✓] System logs cleared${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Clear temporary files
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Clearing temporary files...${NC}"
rm -rf /tmp/*
rm -rf /var/tmp/*
echo -e "${GREEN}[✓] Temporary files cleared${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Clear SSH keys (if requested)
# ─────────────────────────────────────────────────────────────────────────────
read -p "Clear SSH authorized_keys? (yes/no): " clear_ssh
if [ "$clear_ssh" == "yes" ]; then
    echo -e "${YELLOW}[*] Clearing SSH keys...${NC}"
    > ~/.ssh/authorized_keys
    > ~/.ssh/known_hosts
    echo -e "${GREEN}[✓] SSH keys cleared${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Reset WiFi to default (optional)
# ─────────────────────────────────────────────────────────────────────────────
read -p "Reset WiFi password to default? (yes/no): " reset_wifi
if [ "$reset_wifi" == "yes" ]; then
    echo -e "${YELLOW}[*] This would require P4wnP1 CLI...${NC}"
    echo -e "${YELLOW}[*] Please reset WiFi manually via Web UI${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    CLEANUP COMPLETE                                ║${NC}"
echo -e "${GREEN}╠═══════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  ✓ Bash history cleared                                           ║${NC}"
echo -e "${GREEN}║  ✓ Loot directory cleared                                         ║${NC}"
echo -e "${GREEN}║  ✓ P4wnP1 logs cleared                                            ║${NC}"
echo -e "${GREEN}║  ✓ System logs cleared                                            ║${NC}"
echo -e "${GREEN}║  ✓ Temporary files cleared                                        ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}[*] Recommend: Reboot device to clear memory${NC}"
echo -e "${YELLOW}    sudo reboot${NC}"

