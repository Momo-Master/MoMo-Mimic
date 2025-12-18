#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# MoMo-Mimic Setup Script
# Configures P4wnP1 A.L.O.A. for MoMo-Mimic operation
# ═══════════════════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                     ║"
echo "║   ███╗   ███╗ ██████╗ ███╗   ███╗ ██████╗                          ║"
echo "║   ████╗ ████║██╔═══██╗████╗ ████║██╔═══██╗                         ║"
echo "║   ██╔████╔██║██║   ██║██╔████╔██║██║   ██║                         ║"
echo "║   ██║╚██╔╝██║██║   ██║██║╚██╔╝██║██║   ██║                         ║"
echo "║   ██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║╚██████╔╝                         ║"
echo "║   ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝                          ║"
echo "║                                                                     ║"
echo "║                     M I M I C   S E T U P                          ║"
echo "║                                                                     ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Check if running as root
# ─────────────────────────────────────────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[ERROR] Please run as root (sudo)${NC}"
    exit 1
fi

# ─────────────────────────────────────────────────────────────────────────────
# Check if P4wnP1 is installed
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Checking P4wnP1 installation...${NC}"
if [ ! -d "/usr/local/P4wnP1" ]; then
    echo -e "${RED}[ERROR] P4wnP1 not found at /usr/local/P4wnP1${NC}"
    echo -e "${YELLOW}[*] Please install P4wnP1 A.L.O.A. first${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] P4wnP1 found${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Get the script directory
# ─────────────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}[*] Project directory: ${PROJECT_DIR}${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Create directories
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Creating directories...${NC}"

mkdir -p /usr/local/P4wnP1/HIDScripts/MoMo-Mimic
mkdir -p /usr/local/P4wnP1/loot
mkdir -p /var/log/momo-mimic

echo -e "${GREEN}[✓] Directories created${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Copy payloads
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Installing payloads...${NC}"

if [ -d "${PROJECT_DIR}/payloads" ]; then
    cp -r "${PROJECT_DIR}/payloads/"* /usr/local/P4wnP1/HIDScripts/MoMo-Mimic/
    echo -e "${GREEN}[✓] Payloads installed${NC}"
else
    echo -e "${RED}[!] Payloads directory not found, skipping${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Copy configurations
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Installing configurations...${NC}"

if [ -d "${PROJECT_DIR}/config" ]; then
    # Backup existing configs
    if [ -d "/usr/local/P4wnP1/config" ]; then
        cp -r /usr/local/P4wnP1/config /usr/local/P4wnP1/config.backup.$(date +%Y%m%d)
    fi
    
    cp "${PROJECT_DIR}/config/"*.yaml /usr/local/P4wnP1/config/ 2>/dev/null || true
    echo -e "${GREEN}[✓] Configurations installed${NC}"
else
    echo -e "${RED}[!] Config directory not found, skipping${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Set permissions
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[*] Setting permissions...${NC}"

chmod -R 755 /usr/local/P4wnP1/HIDScripts/MoMo-Mimic
chown -R root:root /usr/local/P4wnP1/HIDScripts/MoMo-Mimic
chmod 755 /var/log/momo-mimic

echo -e "${GREEN}[✓] Permissions set${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Create mass storage image (if not exists)
# ─────────────────────────────────────────────────────────────────────────────
MASS_STORAGE_IMG="/usr/local/P4wnP1/loot/mass_storage.img"

if [ ! -f "$MASS_STORAGE_IMG" ]; then
    echo -e "${YELLOW}[*] Creating mass storage image (128MB)...${NC}"
    dd if=/dev/zero of="$MASS_STORAGE_IMG" bs=1M count=128 status=progress
    mkfs.vfat "$MASS_STORAGE_IMG"
    echo -e "${GREEN}[✓] Mass storage image created${NC}"
else
    echo -e "${GREEN}[✓] Mass storage image already exists${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   SETUP COMPLETE                                    ║${NC}"
echo -e "${GREEN}╠═══════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                                     ║${NC}"
echo -e "${GREEN}║  Payloads installed to:                                            ║${NC}"
echo -e "${GREEN}║    /usr/local/P4wnP1/HIDScripts/MoMo-Mimic/                        ║${NC}"
echo -e "${GREEN}║                                                                     ║${NC}"
echo -e "${GREEN}║  Configuration files:                                              ║${NC}"
echo -e "${GREEN}║    /usr/local/P4wnP1/config/                                       ║${NC}"
echo -e "${GREEN}║                                                                     ║${NC}"
echo -e "${GREEN}║  Next steps:                                                        ║${NC}"
echo -e "${GREEN}║    1. Edit payloads with your IP/settings                          ║${NC}"
echo -e "${GREEN}║    2. Change default WiFi password                                 ║${NC}"
echo -e "${GREEN}║    3. Reboot device: sudo reboot                                   ║${NC}"
echo -e "${GREEN}║    4. Access via: http://172.24.0.1:8000                           ║${NC}"
echo -e "${GREEN}║                                                                     ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
echo ""

