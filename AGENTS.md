## Vane vekkerklokke

En rolig vekkerklokke som kjører på en gammel MacBook (M1, macOS 26) på nattbordet, i samme stil som Vane-appen (`egeiran/vane`). Én bruker, bare `localhost`. Se `README.md` for døgnet, oppsettet og strukturen.

- All tekst er på norsk (bokmål). Ingen engelsk versjon trengs.
- Ren logikk ligger i `src/shared` og testes i `test/` med `node --test`. Døgnet (kveld, natt, soloppgang, alarm, morgen, dag) regnes ut i `src/shared/schedule.ts` (`evaluate`). Serveren og nettsiden skal ikke ha egne regler for fasene.
- `src/server/vekker.ts` gjør noe når fasen endrer seg. Alt som rører Macen (skjerm, volum, `caffeinate`, `afplay`), går gjennom `src/server/mac.ts`, som bare skriver til loggen utenfor macOS.
- Natta skal være helt mørk: skjermen slås av med `pmset displaysleepnow`. Ingen ting skal lyse om natta uten at brukeren har rørt Macen.
- Alarmen må aldri feile stille. Radio → innebygd lyd i nettleseren → `afplay` fra serveren.
- Fargene er Vanes (`src/theme.ts` i Vane) pluss varme kveldsfarger i `src/web/styles.css`. 1rem er 1/90 av skjermhøyden.
- Ingen statistikk, sporing eller skytjenester. Serveren lytter bare på `127.0.0.1`. Nettverk: MET (vær), brukerens iCal-adresse og radiostrømmen.
- Node kjører TypeScript direkte: `.ts` i importer, `import type` for typer, ingen `enum`, `namespace` eller parameteregenskaper (`erasableSyntaxOnly`).
- Kjør `npm test`, `npm run typecheck` og `npm run build` før noe er ferdig. Se skjermene med `VANE_NOW=2026-11-09T06:20 npm run server` (og `TZ=Europe/Oslo`).
