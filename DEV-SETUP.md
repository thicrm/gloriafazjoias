# Development Server Setup

## Quick Start

### Option 1: Using the startup script (Recommended)
```bash
./start-dev.sh
```

### Option 2: Using npm directly
```bash
npm run dev
```

## Troubleshooting Common Issues

### Issue 1: "Too many open files" error

**Temporary fix (current session only):**
```bash
ulimit -n 10240
npm run dev
```

**Permanent fix for macOS:**
1. Create/edit the file `/etc/sysctl.conf`:
   ```bash
   sudo nano /etc/sysctl.conf
   ```

2. Add these lines:
   ```
   kern.maxfiles=65536
   kern.maxfilesperproc=65536
   ```

3. Create/edit `/Library/LaunchDaemons/limit.maxfiles.plist`:
   ```bash
   sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
   ```

4. Add this content:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
     <dict>
       <key>Label</key>
       <string>limit.maxfiles</string>
       <key>ProgramArguments</key>
       <array>
         <string>launchctl</string>
         <string>limit</string>
         <string>maxfiles</string>
         <string>65536</string>
         <string>65536</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
       <key>ServiceIPC</key>
       <false/>
     </dict>
   </plist>
   ```

5. Set permissions and load:
   ```bash
   sudo chown root:wheel /Library/LaunchDaemons/limit.maxfiles.plist
   sudo chmod 644 /Library/LaunchDaemons/limit.maxfiles.plist
   sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
   ```

6. Restart your computer

7. Verify the changes:
   ```bash
   ulimit -n
   # Should show 65536 or higher
   ```

### Issue 2: Port 3000 already in use

**Find and kill the process:**
```bash
lsof -ti:3000 | xargs kill -9
```

Or use a different port:
```bash
npm run dev -- -p 3001
```

### Issue 3: Network interface errors

The `next.config.js` has been configured with polling instead of native file watchers to prevent this issue.

If you still see errors, try turbo mode:
```bash
npm run dev:turbo
```

## Project URLs

- Local: http://localhost:3000
- Network: Will be displayed when server starts

## Notes

- The startup script (`start-dev.sh`) automatically handles port conflicts and file watcher limits
- Changes to code will hot-reload automatically
- Press `Ctrl+C` to stop the server
