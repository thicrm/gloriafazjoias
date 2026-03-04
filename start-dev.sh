#!/bin/bash

# Script to reliably start the Next.js development server
# This handles common macOS issues with file watchers and network interfaces

echo "🚀 Starting Gloria Faz Joias development server..."

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use. Attempting to free it..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Increase file watcher limit on macOS (temporary, for this session)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📁 Adjusting file watcher limits for macOS..."
    ulimit -n 10240 2>/dev/null || echo "⚠️  Could not increase file limit (needs sudo)"
fi

# Start the development server
echo "✨ Starting Next.js..."
npm run dev

# If the above fails, try turbo mode as fallback
if [ $? -ne 0 ]; then
    echo "⚠️  Standard mode failed, trying turbo mode..."
    npm run dev:turbo
fi
