#!/bin/sh
# Installerer vekkerklokka på denne Macen som to LaunchAgents:
# - serveren, som alltid kjører og startes på nytt hvis den stopper
# - Chrome i fullskjerm, som åpnes når du logger inn
# Kjør på nytt etter `git pull` for å bygge nettsiden og starte serveren på nytt.
set -eu

cd "$(dirname "$0")/.."
REPO="$(pwd)"
NODE="$(command -v node || true)"

if [ -z "$NODE" ]; then
  echo "Fant ikke node. Installer Node 22.18 eller nyere, for eksempel med «brew install node»."
  exit 1
fi
if ! "$NODE" -e 'const [a, b] = process.versions.node.split(".").map(Number); process.exit(a > 22 || (a === 22 && b >= 18) ? 0 : 1)'; then
  echo "Node $("$NODE" -v) er for gammel. Vekkerklokka trenger 22.18 eller nyere."
  exit 1
fi
if [ ! -d "/Applications/Google Chrome.app" ]; then
  echo "Merk: fant ikke Google Chrome i /Applications. Fullskjermvisningen trenger Chrome."
fi

npm install
npm run build

AGENTS="$HOME/Library/LaunchAgents"
LOGS="$HOME/Library/Logs"
mkdir -p "$AGENTS" "$LOGS"
SERVER="no.egeiran.vane-web.server"
KIOSK="no.egeiran.vane-web.kiosk"

cat > "$AGENTS/$SERVER.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$SERVER</string>
  <key>ProgramArguments</key>
  <array>
    <string>$NODE</string>
    <string>$REPO/src/server/main.ts</string>
  </array>
  <key>WorkingDirectory</key><string>$REPO</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$LOGS/vane-web.log</string>
  <key>StandardErrorPath</key><string>$LOGS/vane-web.log</string>
</dict>
</plist>
PLIST

cat > "$AGENTS/$KIOSK.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$KIOSK</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/sh</string>
    <string>$REPO/scripts/kiosk.sh</string>
  </array>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
PLIST

for LABEL in "$SERVER" "$KIOSK"; do
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
  launchctl bootstrap "gui/$(id -u)" "$AGENTS/$LABEL.plist"
done

echo
echo "Ferdig. Vekkerklokka kjører på http://127.0.0.1:4545 og åpnes i Chrome når du logger inn."
echo "Loggen ligger i $LOGS/vane-web.log. Se README for innstillingene Macen trenger."
