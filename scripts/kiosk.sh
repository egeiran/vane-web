#!/bin/sh
# Åpner vekkerklokka i Google Chrome i fullskjerm (kiosk). launchd kjører dette når du logger inn.
# Chrome får egen profil, så den ikke blander seg med vanlig surfing, og lov til å spille lyd uten
# klikk først. Avslutt med ⌘Q.

PORT="${PORT:-4545}"
URL="http://127.0.0.1:$PORT"
PROFILE="$HOME/Library/Application Support/vane-web/chrome"

# Vent til serveren svarer (inntil ett minutt).
i=0
until curl -fs "$URL/api/view" >/dev/null 2>&1; do
  i=$((i + 1))
  [ "$i" -ge 60 ] && break
  sleep 1
done

exec open -na "Google Chrome" --args \
  --kiosk \
  --app="$URL" \
  --user-data-dir="$PROFILE" \
  --autoplay-policy=no-user-gesture-required \
  --lang=nb \
  --no-first-run \
  --no-default-browser-check \
  --disable-features=Translate \
  --disable-session-crashed-bubble \
  --noerrdialogs
