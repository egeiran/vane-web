#!/bin/sh
# Fjerner vekkerklokka fra oppstarten. Innstillingene i data/ blir liggende.
set -u
for LABEL in no.egeiran.vane-web.server no.egeiran.vane-web.kiosk; do
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
  rm -f "$HOME/Library/LaunchAgents/$LABEL.plist"
done
echo "Vekkerklokka starter ikke lenger av seg selv."
