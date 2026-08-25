#!/usr/bin/env python3
"""
CampusNexus / Student Service System - Standalone Python Backend Server
Runs on http://127.0.0.1:8000
Provides REST API endpoints for listings, services, lost & found notices, requests, and chat.
Zero external dependencies required (uses built-in http.server, sqlite3, and json).
"""

import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

PORT = 8000
HOST = "127.0.0.1"
DB_FILE = "campus_nexus.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Listings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS listings (
        id TEXT PRIMARY KEY,
        pillar TEXT,
        title TEXT,
        description TEXT,
        category TEXT,
        pricing_type TEXT,
        price REAL,
        condition TEXT,
        course_code TEXT,
        location TEXT,
        college TEXT,
        images TEXT,
        tags TEXT,
        author_name TEXT,
        author_avatar TEXT,
        author_major TEXT,
        author_year TEXT,
        author_rating REAL,
        status TEXT,
        created_at TEXT
    )
    """)

    # Notices table (Lost & Found)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notices (
        id TEXT PRIMARY KEY,
        type TEXT,
        item_category TEXT,
        title TEXT,
        description TEXT,
        location TEXT,
        college TEXT,
        contact_name TEXT,
        contact_email TEXT,
        is_claimed INTEGER,
        reward TEXT,
        image TEXT,
        created_at TEXT
    )
    """)

    # Requests table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS requests (
        id TEXT PRIMARY KEY,
        listing_id TEXT,
        listing_title TEXT,
        sender_id TEXT,
        sender_name TEXT,
        status TEXT,
        message TEXT,
        proposed_date TEXT,
        proposed_location TEXT,
        created_at TEXT
    )
    """)

    conn.commit()
    conn.close()

class CampusAPIHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == "/" or path == "/health":
            self._set_headers(200)
            response = {
                "status": "online",
                "service": "CampusNexus Student Service System API",
                "url": f"http://{HOST}:{PORT}",
                "version": "1.0.0",
                "endpoints": [
                    "/api/listings",
                    "/api/notices",
                    "/api/requests",
                    "/api/stats"
                ]
            }
            self.wfile.write(json.dumps(response, indent=2).encode("utf-8"))
            return

        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        if path == "/api/listings":
            cursor.execute("SELECT * FROM listings ORDER BY rowid DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "listings": rows}).encode("utf-8"))
        
        elif path == "/api/notices":
            cursor.execute("SELECT * FROM notices ORDER BY rowid DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "notices": rows}).encode("utf-8"))

        elif path == "/api/requests":
            cursor.execute("SELECT * FROM requests ORDER BY rowid DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "requests": rows}).encode("utf-8"))

        elif path == "/api/stats":
            cursor.execute("SELECT COUNT(*) FROM listings")
            listings_count = cursor.fetchone()[0]
            cursor.execute("SELECT COUNT(*) FROM notices")
            notices_count = cursor.fetchone()[0]
            self._set_headers(200)
            self.wfile.write(json.dumps({
                "success": True,
                "total_listings": listings_count,
                "total_notices": notices_count,
                "server": "CampusNexus Python Engine"
            }).encode("utf-8"))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

        conn.close()

    def do_POST(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception:
            body = {}

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        if path == "/api/listings":
            item_id = f"item_{int(__import__('time').time() * 1000)}"
            cursor.execute("""
            INSERT INTO listings (id, pillar, title, description, category, pricing_type, price, location, college, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
            """, (
                item_id,
                body.get("pillar", "resource"),
                body.get("title", "Untitled Item"),
                body.get("description", ""),
                body.get("category", "general"),
                body.get("pricingType", "fixed"),
                body.get("price", 0.0),
                body.get("location", "Campus Library"),
                body.get("college", "Metropolitan Tech University")
            ))
            conn.commit()
            self._set_headers(201)
            self.wfile.write(json.dumps({"success": True, "id": item_id, "message": "Listing published successfully"}).encode("utf-8"))

        elif path == "/api/notices":
            notice_id = f"not_{int(__import__('time').time() * 1000)}"
            cursor.execute("""
            INSERT INTO notices (id, type, item_category, title, description, location, college, contact_name, contact_email, is_claimed, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))
            """, (
                notice_id,
                body.get("type", "lost"),
                body.get("itemCategory", "id_card"),
                body.get("title", "Lost Item"),
                body.get("description", ""),
                body.get("location", "Campus"),
                body.get("college", "Metropolitan Tech University"),
                body.get("contactName", "Student"),
                body.get("contactEmail", "student@metro.edu")
            ))
            conn.commit()
            self._set_headers(201)
            self.wfile.write(json.dumps({"success": True, "id": notice_id, "message": "Notice posted to Bulletin Board"}).encode("utf-8"))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

        conn.close()

def run():
    init_db()
    server_address = (HOST, PORT)
    httpd = HTTPServer(server_address, CampusAPIHandler)
    print(f"==================================================")
    print(f"  CampusNexus Server running on http://{HOST}:{PORT}")
    print(f"  REST API: http://{HOST}:{PORT}/api/listings")
    print(f"  Notice Board API: http://{HOST}:{PORT}/api/notices")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == "__main__":
    run()
