#!/usr/bin/env python3
"""
Script to start both the Node.js backend and Python YOLO API
"""
import subprocess
import time
import sys
import os

def start_python_api():
    """Start the Python YOLO API"""
    print("🚀 Starting Python YOLO API on port 5001...")
    try:
        # Check if best.pt exists
        if not os.path.exists('best.pt'):
            print("❌ Error: best.pt file not found in current directory!")
            print("Please place your best.pt file in the project root directory.")
            return None
        
        # Install requirements if needed
        print("📦 Installing Python dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        
        # Start the Python API
        process = subprocess.Popen([sys.executable, "yolo_api.py"])
        time.sleep(3)  # Give it time to start
        return process
    except Exception as e:
        print(f"❌ Error starting Python API: {e}")
        return None

def start_node_backend():
    """Start the Node.js backend"""
    print("🚀 Starting Node.js backend on port 5000...")
    try:
        # Install Node.js dependencies
        print("📦 Installing Node.js dependencies...")
        subprocess.run(["npm", "install"], cwd="backend", check=True)
        
        # Start the backend
        process = subprocess.Popen(["npm", "run", "dev"], cwd="backend")
        time.sleep(3)  # Give it time to start
        return process
    except Exception as e:
        print(f"❌ Error starting Node.js backend: {e}")
        return None

def main():
    print("🎯 Starting Crater Detection Services...")
    print("=" * 50)
    
    # Start Python API
    python_process = start_python_api()
    if not python_process:
        print("❌ Failed to start Python API")
        return
    
    # Start Node.js backend
    node_process = start_node_backend()
    if not node_process:
        print("❌ Failed to start Node.js backend")
        python_process.terminate()
        return
    
    print("✅ Both services started successfully!")
    print("📱 Frontend: http://localhost:5173")
    print("🔧 Backend: http://localhost:5000")
    print("🤖 YOLO API: http://localhost:5001")
    print("\nPress Ctrl+C to stop all services...")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping services...")
        python_process.terminate()
        node_process.terminate()
        print("✅ Services stopped.")

if __name__ == "__main__":
    main() 