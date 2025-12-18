#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# MoMo-Mimic Listener Script
# Quick listener setup for reverse shells
# ═══════════════════════════════════════════════════════════════════════════

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Default port
PORT=${1:-4444}

# Banner
clear
echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                     ║"
echo "║              MoMo-Mimic Reverse Shell Listener                     ║"
echo "║                                                                     ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Get local IP
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo -e "${YELLOW}[*] Local IP Address: ${GREEN}${LOCAL_IP}${NC}"
echo -e "${YELLOW}[*] Listening Port:   ${GREEN}${PORT}${NC}"
echo ""
echo -e "${BLUE}[*] Update your payload with:${NC}"
echo -e "    LHOST = \"${LOCAL_IP}\""
echo -e "    LPORT = \"${PORT}\""
echo ""

# Check for rlwrap (better shell experience)
if command -v rlwrap &> /dev/null; then
    echo -e "${GREEN}[✓] rlwrap detected - enhanced shell enabled${NC}"
    echo ""
    echo -e "${YELLOW}[*] Starting listener on port ${PORT}...${NC}"
    echo -e "${YELLOW}[*] Waiting for connection...${NC}"
    echo ""
    rlwrap nc -lvnp "$PORT"
else
    echo -e "${YELLOW}[!] rlwrap not found - using basic netcat${NC}"
    echo -e "${YELLOW}    Install with: sudo apt install rlwrap${NC}"
    echo ""
    echo -e "${YELLOW}[*] Starting listener on port ${PORT}...${NC}"
    echo -e "${YELLOW}[*] Waiting for connection...${NC}"
    echo ""
    nc -lvnp "$PORT"
fi

