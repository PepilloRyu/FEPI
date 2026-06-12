import http.server
import socketserver
import os

PORT = 5500
DIRECTORY = r"c:\Users\pepea\Downloads\FEPI-main\FEPI-main\Frontend"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        print(f"[MathGo] {self.address_string()} - {format % args}")

# Forzar IPv4 con bind_and_activate=True
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"[MathGo] Frontend corriendo en http://127.0.0.1:{PORT}/")
    print(f"[MathGo] Sirviendo desde: {DIRECTORY}")
    httpd.serve_forever()
