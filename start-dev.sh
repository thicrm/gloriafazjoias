#!/bin/bash

# Script to reliably start the Next.js development server
# This handles common macOS issues with file watchers and network interfaces

echo "🚀 Starting Gloria Faz Joias development server..."

# Kill any existing Next.js processes on common dev ports
for port in 3000 3001 3002; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $port in use. Freeing it..."
        lsof -ti:$port | xargs kill -9 2>/dev/null
        sleep 1
    fi
done

# Clear corrupted cache (fixes 404 on homepage)
if [ -d ".next" ]; then
    echo "📁 Clearing .next cache..."
    rm -rf .next
fi

# Increase file watcher limit on macOS (temporary, for this session)
if [[ "$OSTYPE" == "darwin"* ]]; then
    ulimit -n 10240 2>/dev/null || true
fi

echo "✨ Starting Next.js at http://127.0.0.1:3000"
echo "   Open this URL in your browser if it doesn't open automatically."
echo ""
npm run dev

if [ $? -ne 0 ]; then
    echo "⚠️  Standard mode failed, trying turbo mode..."
    npm run dev:turbo
fi
