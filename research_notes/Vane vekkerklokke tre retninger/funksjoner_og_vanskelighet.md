# Funksjoner og vanskelighetsgrad: rolig vekkerklokke med soloppgangslys på ESP32-S3

Retningene som sammenlignes: (B) 7,5" e-papir + LED-sol, (C) 7" RGB-fargeskjerm med berøring + LED-ring, (Loftie-stil) lite apparat som M5Stack Dial (1,28" rund skjerm) + LED-kuppellampe. Funksjonene er de samme som i dagens nettapp: dag, kveld, god natt (±5 min / ingen alarm), natt (helt mørkt, svakt rødt glimt ved berøring), soloppgang (30 min), alarm (NRK P1 Trøndelag MP3-strøm, volum opp over 3 min, hold 3 s for å stoppe, innebygd lyd som reserve, siste reserve fra serveren) og morgen (vær fra MET, dagens avtaler fra privat Google Kalender-iCal).

Merknad om kilder: Disse vertene kunne ikke hentes i denne økta (nettverksregler), så bare søkesammendrag ble brukt for dem: docs.espressif.com, docs.m5stack.com, docs.thingpulse.com, digikey.co.uk, liveworksleep.com. GitHub-API (gh) var også stengt, men github.com-sider kunne hentes med WebFetch. api.met.no kunne hentes direkte.

## 1. Internettradio på ESP32-S3 (ESP32-audioI2S eller ESP-ADF, MAX98357A, HTTPS, minne/CPU sammen med skjerm, volumrampe)

### Takeaway
Internettradio er godt løst på ESP32-S3 **med PSRAM**: ESP32-audioI2S (Arduino) spiller MP3/AAC m.m. over HTTP og HTTPS til en MAX98357A, har API for volumtrinn og egen volumkurve, og gir hendelser via én callback. Hovedrisikoene er at biblioteket krever PSRAM og flerkjernebrikke (utelukker trolig selve M5Stack Dial), versjonsfølsomhet mot arduino-esp32-kjernen, strømbrudd og hakking, og konkurranse om PSRAM-båndbredde med en 7" RGB-skjerm.

### Cited Findings
- ESP32-audioI2S støtter WAV, MP3, AAC, FLAC, Opus og Vorbis, beholderne OGG, MP4 og M3U8, 16–48 kHz. — [schreibfaul1/ESP32-audioI2S README](https://github.com/schreibfaul1/ESP32-audioI2S)
- README: "This library only works on multi-core chips like ESP32-S3, ESP32-S31 and ESP32-P4"; PSRAM er påkrevd; ESP32-S2 og ESP32-C3 støttes ikke; vanlig ESP32 har begrenset støtte. — [ESP32-audioI2S README](https://github.com/schreibfaul1/ESP32-audioI2S)
- Testede DAC/forsterkere: MAX98357A (3 W forsterker med DAC, koblet via DOUT, BCLK, LRC; stereo krever to stk.), UDA1334A, PCM5102A, CS4344. Med MAX98357A er I2S-utgangen alltid 48 kHz. — [ESP32-audioI2S README](https://github.com/schreibfaul1/ESP32-audioI2S)
- README-eksempelet bruker `audio.setVolume(21)` med kommentaren at området er 0–21 (standard). — [ESP32-audioI2S README](https://github.com/schreibfaul1/ESP32-audioI2S)
- Gjeldende `Audio.h` har `setVolume(uint8_t vol, uint8_t curve = 0)`, `setVolumeCurve(VolumeCurveFn curve)` (der `VolumeCurveFn = std::function<float(float t)>`), `setVolumeSteps(uint8_t steps)`, `getVolume()`, `setMute()` og en "volume fading"-parameter (1.0f rask … 100.0f langsom). — [Audio.h på GitHub](https://github.com/schreibfaul1/ESP32-audioI2S/blob/master/src/Audio.h)
- Tidligere var 21 volumtrinn hardkodet, noe som ble kritisert som grovt; `setVolumeSteps` ble foreslått i en diskusjon (nå finnes den i headeren). — [Diskusjon #450 (speil)](https://github.imc.re/schreibfaul1/ESP32-audioI2S/discussions/450); [Audio.h](https://github.com/schreibfaul1/ESP32-audioI2S/blob/master/src/Audio.h)
- HTTPS: `connecttohost(host, user, pwd)`, `setInsecure()` og `setCACert(rootCA)` finnes; TLS går gjennom en privat `NetworkClientSecure`. `setConnectionTimeout(timeout_ms, timeout_ms_ssl)` med standard 250 ms (HTTP) og 2700 ms (TLS). — [Audio.h](https://github.com/schreibfaul1/ESP32-audioI2S/blob/master/src/Audio.h)
- Feil og slutt på strøm meldes som hendelser (bl.a. `evt_eof`, `evt_log`) gjennom `audio_info_callback`; det finnes ingen egen feil-callback. Bufferstatus kan leses med `inBufferFilled()`, `inBufferFree()`. — [Audio.h](https://github.com/schreibfaul1/ESP32-audioI2S/blob/master/src/Audio.h)
- "Slow stream, dropouts are possible": en bruker med ESP32-S3 løste det ved å slå på PSRAM og justere menuconfig for HTTPS; tråden viser til bibliotekets eksempel "Better_WiFi_throughput". — [Diskusjon #528 (speil)](https://github-users.yhajoa.workers.dev/schreibfaul1/ESP32-audioI2S/discussions/528)
- Krasj med arduino-esp32 3.0.7 fordi konstruktøren kjørte før PSRAM var initialisert; vedlikeholderen foreslo eldre bibliotekversjon som omvei. — [Issue #875 (speil)](https://gb.xjqchip.workers.dev/schreibfaul1/ESP32-audioI2S/issues/875)
- Issue #1006: MP3-dekoderen bruker PSRAM som standard på S3, også på moduler uten PSRAM. — [ecosyste.ms-oversikt over issues](https://issues.ecosyste.ms/hosts/GitHub/repositories/schreibfaul1%2FESP32-audioI2S/issues)
- Siste versjon funnet: 3.4.2 (august 2025). — [arduinolibraries.info](https://www.arduinolibraries.info/libraries/esp32-audio-i2-s-master)
- En forumpåstand om at biblioteket ikke håndterer HTTPS gjelder et annet oppsett (VS1003) og motsies av API-et over. — [Arduino-forum, VS1003](https://forum.arduino.cc/t/esp-32s-with-vs1003-does-not-play-aac-stream/1234581)
- Espressifs nyere rammeverk GMF har eksemplet `pipeline_play_http_music`: io_http → dekoder → lydeffekter → io_codec_dev; m3u8 støttes ikke; standardkort er ESP32-S3-Korvo V3; bruksområder inkluderer internettradio. — [GMF pipeline_play_http_music](https://components.espressif.com/components/espressif/gmf_examples/versions/1.1.0/examples/pipeline_play_http_music)
- `esp-audio-player` (chmorgan, ESP-IDF-komponent): MP3 via libhelix, HTTP/HTTPS-strømming med buffer, helt åpen kildekode "unlike ESP-ADF, which has binary modules". — [esp-audio-player readme](https://components.espressif.com/components/chmorgan/esp-audio-player/versions/2.0.1/readme)
- `esp_mp3_player` (mydazy): HTTP chunked GET → 128 KB ringbuffer i PSRAM → MP3-dekoding → resampling; krever ESP-IDF ≥ 5.3 og PSRAM. — [esp_mp3_player readme](https://components.espressif.com/components/mydazy/esp_mp3_player/versions/0.2.0/readme)
- NRK brukte (2011) et navnemønster der suffiks angir bitrate: m = 96 kb/s MP3, h = 192 kb/s MP3; gamle lyd.nrk.no-adresser har sluttet å virke tidligere. — [rhythmbox-devel 2011](https://lists.gnome.org/archives/rhythmbox-devel/2011-January/msg00034.html); [GNOME bug 639266](https://bugzilla.gnome.org/show_bug.cgi?id=639266)

### Inferences
- Vanskelighet: **middels**. Selve avspillingen er "eksempelkode", men å gjøre den robust (gjentilkobling, oppdage stillhet, reserve) er det egentlige arbeidet.
- Volumrampe over 3 minutter: sett f.eks. `setVolumeSteps(64)` eller høyere og øk ett trinn med jevne mellomrom, eller bruk `setVolumeCurve` for en logaritmisk kurve. MAX98357A har (etter min bakgrunnskunnskap, ikke verifisert her) bare fast forsterkning via GAIN-pinnen og ingen digital volumstyring, så rampen må gjøres i programvare – det er greit.
- Minne/CPU med skjerm: Radio bruker PSRAM til inn- og samplebuffere. Retning C (7" RGB) bruker PSRAM til rammebuffer som skjermkontrolleren leser kontinuerlig (se avsnitt 6), så radio + LVGL + Wi-Fi konkurrerer om samme PSRAM-buss – den største tekniske risikoen i C. B (e-papir, statisk bilde) og Dial (liten SPI-skjerm) har ikke dette problemet.
- Retning Loftie-stil: Dial har etter alt å dømme ikke PSRAM og bare en summer (se avsnitt 6), så radioen må trolig ligge i en egen ESP32-S3 med PSRAM i lampefoten, med I2S-forsterker og høyttaler. Det gjør retningen til et to-brikke-system.
- Lås versjoner (arduino-esp32-kjerne og bibliotek) i PlatformIO; issue #875 viser at oppgraderinger kan knekke oppstarten.

### Gaps
- Fant ikke gjeldende strømadresse for NRK P1 Trøndelag eller om den er HTTP/HTTPS, MP3/AAC eller HLS. HLS (m3u8) støttes av ESP32-audioI2S, men ikke av GMF-eksemplet. Må sjekkes mot adressen dagens app bruker.
- Fant ingen målinger av RAM/CPU-bruk for ESP32-audioI2S samtidig med LVGL på RGB-skjerm.
- Fant ingen offisiell uttalelse om hvor stabilt HTTPS-strømmer går over mange timer; bare enkeltrapporter.

## 2. HTTPS og JSON fra MET (User-Agent, TLS-minne på ESP32-S3 med PSRAM)

### Takeaway
MET-kallet er lett: ett HTTPS-kall med identifiserende User-Agent, maks 4 desimaler i koordinatene, og respekt for `Expires`/`If-Modified-Since`. TLS koster omtrent 40 KB RAM per tilkobling (to 16 KB-buffere) som standard i intern RAM; dette kan flyttes til PSRAM eller reduseres, men det er fragmenteringsfeller.

### Cited Findings
- Hver forespørsel skal ha en identifiserende User-Agent med app-/domenenavn og kontaktinfo (e-post eller nettsted); uidentifiserte klienter kan blokkeres uten varsel; falske/tilfeldige User-Agent regnes som misbruk og kan gi permanent utestengelse. 403 skyldes ofte manglende/feil User-Agent. — [MET Terms of Service](https://api.met.no/doc/TermsOfService)
- Svar skal mellomlagres; ikke spør igjen før tidspunktet i `Expires`; bruk `If-Modified-Since` med nøyaktig forrige `Last-Modified`. Spre forespørsler over tid (tilfeldige minutter), ikke på hel time. — [MET Terms of Service](https://api.met.no/doc/TermsOfService)
- Bare HTTPS; klienter må støtte omdirigering og gzip. Koordinater kortes til maks 4 desimaler; 5+ desimaler gir 403 for nye produkter. Brudd gir 429. Grense 20 forespørsler/s totalt per applikasjon. — [MET Terms of Service](https://api.met.no/doc/TermsOfService)
- Standard mbedTLS-buffer er 16 KB, dvs. 32 KB for RX + TX; en utvikler rapporterer ca. 40 KB RAM bare for å åpne en TLS-tilkobling. — [esp32.com: RAM usage for mbedtls](https://esp32.com/viewtopic.php?p=24969)
- Med `CONFIG_MBEDTLS_DYNAMIC_BUFFER` kan TLS-utbufferen reduseres fra 16 KB til ned mot 2 KB. — [Espressif: ESP32 memory analysis case study](https://developer.espressif.com/blog/esp32-memory-analysis-case-study/)
- mbedTLS bruker intern RAM som standard; har modulen PSRAM kan konfigurasjonen endres slik at allokeringene går dit. — [Espressif FAQ mbedTLS (søkesammendrag)](https://docs.espressif.com/projects/esp-faq/en/latest/software-framework/protocols/mbedtls.html)
- Å sette `CONFIG_MBEDTLS_SSL_IN_CONTENT_LEN` under 16 KB kan gi minnelekkasjer under visse forhold (Espressif PR); en liten innbuffer kan feile med -0x7200 når serveren sender fulle 16 KB-poster. — [esp-idf PR #14614 (speil)](https://github.imc.re/espressif/esp-idf/pull/14614)
- Gjentatt allokering/frigjøring av 16 KB RX-buffer kan fragmentere heapen fordi den krever en sammenhengende 16 KB-blokk. — [micropython issue #8940](https://github.com/micropython/micropython/issues/8940)
- Bruk `esp_get_free_internal_heap_size()` (ikke `esp_get_free_heap_size()`, som teller med PSRAM) for å se om intern RAM er flaskehalsen. — [esp32.com: Not enough size of heap](https://esp32.com/viewtopic.php?p=123612)

### Inferences
- Vanskelighet: **lav–middels**. Med 8 MB PSRAM er minnet rikelig; utfordringen er å unngå at radio-TLS, MET-TLS og iCal-TLS kjører samtidig mot intern RAM. Gjør hentingene i serie, og helst ikke mens alarmen spiller.
- Locationforecast-JSON bør parses strømmende med filter (ArduinoJson har filter/strøm-deserialisering etter min bakgrunnskunnskap – ikke verifisert i denne runden), slik at bare de få timene morgenvisningen trenger, lagres.
- MET krever gzip-støtte; de fleste ESP32-HTTP-klienter dekomprimerer ikke automatisk. Enklest er å ikke be om gzip (ikke sende `Accept-Encoding`), men det bør prøves mot API-et.
- Forskjell mellom retningene: liten. Dial har lite plass til værvisning, så der kan man nøye seg med ett symbol og én temperatur.

### Gaps
- Fant ikke typisk størrelse på `locationforecast/2.0/compact`-svaret i byte.
- Fikk ikke hentet Espressifs egne mbedTLS-sider (docs.espressif.com var stengt), så Kconfig-navn for "allocate in external RAM" er ikke verifisert.

## 3. Google Kalender-iCal på mikrokontroller (størrelse, RRULE, tidssoner, biblioteker, strømmende parsing)

### Takeaway
Dette er **den vanskeligste enkeltfunksjonen** å gjøre korrekt på enheten. Det finnes ingen moden libical-tilsvarende for ESP32; uICAL er det nærmeste (C++11, strømmende, RRULE), men er lite, lite vedlikeholdt og sier ingenting om VTIMEZONE. Dagens nettapp bruker ical.js med VTIMEZONE-registrering, flyttede forekomster (RECURRENCE-ID) og avlyste avtaler – full paritet på en mikrokontroller er mye arbeid. Det realistiske er enten et forenklet delsett på enheten eller å la en hjelper (f.eks. Macen) utvide avtalene til en liten JSON-liste.

### Cited Findings
- uICAL: C++-bibliotek for RFC 5545, rettet mot små innebygde/Arduino/IoT-enheter, "pure C++ to the C++11 standard with minimal STL usage"; MIT-lisens; 39 commits, 31 stjerner, 1 åpen issue. — [sourcesimian/uICAL](https://github.com/sourcesimian/uICAL)
- uICAL om RRULE: koden "satisfies all the RRULE test cases I've found so far"; forfatteren kaller RRULE kompleks. — [uICAL README](https://github.com/sourcesimian/uICAL)
- uICAL er strømmende: `VObjectStream` kaster linjer og komponenter som ikke trengs, og et filter i `Calendar::load` beholder bare ønskede avtaler. Første versjon var "simply too big to fit into my chosen device", så strenger og strømmer er byttbare adaptere. Kjører på ESP8266; ESP32 nevnes ikke; eksemplene bruker UTC-tider. VTIMEZONE nevnes ikke. Forfatteren viser til libical for bredere behov. — [uICAL README](https://github.com/sourcesimian/uICAL)
- Arduino-registeret viser uICAL 0.0.1 datert 2022-01-21. — [arduinolibraries.info: uICAL](https://www.arduinolibraries.info/libraries/u-ical)
- ThingPulse (ESPaper Calendar): på grunn av iCalendar-formatet og gjentakende avtaler må en stor del av dataene ligge i minnet under parsing; løsningen deres målrettet ESP8266 med under 40 KB RAM og må "parse the calendar, clean data, handle time, date, and timezone calculations and evaluate the rules for recurring events". Google Kalender-adresser støttes. — [ThingPulse ESPaper Calendar (søkesammendrag)](https://docs.thingpulse.com/guides/espaper-calendar/)
- En kommentar om et ESP32-C3-e-papirprosjekt: å holde en kopi i minnet og så parse "rarely works well" fordi man ender med flere kopier av dataene; anbefaler strømming. — [r/esp32-tråd (speil)](https://lr.eu.psf.lt/r/esp32/comments/1iyvkjr/esp32c3_epaper_powered_calendarweather_station/meyadnz/?context=3)
- Inkplates Google Kalender-eksempel bruker en offentlig kalender og Google Calendar API med API-nøkkel, ikke den hemmelige iCal-adressen. — [Inkplate google_calendar-eksempel](https://components.espressif.com/components/solderedelectronics/inkplate/versions/1.2.0/examples/inkplate10/projects/google_calendar)
- Den hemmelige iCal-adressen fungerer for private kalendere fordi det lange tilfeldige tokenet er passordet; den kan tilbakestilles. — [nocal.app: finne ICS-adresse](https://nocal.app/help/google-calendar/find-public-ics-url); [usecarly: Google Calendar ICS URL](https://www.usecarly.com/blog/how-to-get-google-calendar-ics-url)
- MagicMirror-forumet beskriver en kalenderkilde som sender alt og derfor er en "memory hog"; et annet dokument advarer om at tidligere avtaler i en feed kan gi store datamengder og synkfeil. — [MagicMirror-forum](https://forum.magicmirror.builders/post/35053); [Nexcess/The Events Calendar](https://docs.nexcess.com/software/the-events-calendar/troubleshoot-subscribe-export/)
- Dagens nettapp (`src/server/ical.ts`) bruker ical.js: registrerer alle VTIMEZONE, kobler RECURRENCE-ID-unntak til hovedavtalen, hopper over `STATUS:CANCELLED`, håndterer heldagsavtaler og avtaler uten varighet, og itererer gjentakelser med et tak på 50 000 forekomster. — lokal kode: `/home/user/vane-web/src/server/ical.ts`

### Inferences
- Vanskelighet på enheten: **høy** for full korrekthet (RRULE med BYDAY/BYMONTHDAY/UNTIL/COUNT, EXDATE, RECURRENCE-ID-overstyringer, VTIMEZONE vs. TZID-navn, heldagsavtaler, sommertid). **Middels** for et delsett ("enkeltavtaler + ukentlige/daglige gjentakelser, tider i Europe/Oslo eller UTC"). **Lav** hvis en hjelper utvider avtalene.
- Strategi A (på enheten): last ned med HTTPS i biter, strøm gjennom en linjeparser, behold bare VEVENT som kan treffe "i dag" (DTSTART ≤ i dag og (ingen RRULE og DTEND ≥ i dag, eller RRULE uten UNTIL i fortiden)). Med 8 MB PSRAM kan man også laste hele feeden til PSRAM hvis den er noen få MB, og så parse – enklere, men skjør hvis kalenderen vokser.
- Strategi B (hjelper): la dagens TypeScript-server (som allerede gjør dette riktig med ical.js) eksponere `GET /i-dag.json` på lokalnettet, så ESP32 bare henter en liten JSON. Det bryter ikke "ingen sky", men krever at Macen fortsatt står på – noe som kanskje strider mot hensikten med å flytte til ESP32. En Raspberry Pi eller ruterens container er alternativer.
- Strategi C: dropp kalenderen i Loftie-stil-retningen (skjermen er for liten uansett), eller vis bare "neste avtale".
- Forskjell mellom retningene: B (7,5" e-papir) og C (7") har plass til en avtaleliste og "trenger" funksjonen; Dial har knapt plass, så kravet kan senkes der.

### Gaps
- Fant ingen offisiell kilde på hvor stor en Google Kalender-iCal-feed typisk er, eller om den inneholder alle tidligere avtaler (etter min erfaring gjør den det, og den kan bli flere MB, men det er ikke verifisert her).
- Fant ingen aktiv libical-port til ESP-IDF eller andre vedlikeholdte C/C++-iCal-biblioteker for mikrokontrollere enn uICAL.
- Fant ikke om uICAL håndterer VTIMEZONE, EXDATE eller RECURRENCE-ID; README sier det ikke.

## 4. Tidshold (NTP, Europe/Oslo med sommertid, RTC-brikker, oppførsel etter strømbrudd)

### Takeaway
Lett og godt dokumentert: `configTzTime()` med POSIX-strengen `CET-1CEST,M3.5.0,M10.5.0/3` gir riktig norsk tid inkludert sommertid. Den viktige delen for en vekkerklokke er hva som skjer når strømmen går og Wi-Fi ikke er tilbake: uten batteri-RTC vet ESP32 ikke hva klokka er, og alarmen kan feile stille.

### Cited Findings
- ESP32 kan hente NTP-tid og bruke en POSIX-tidssonestreng for sommertid via `configTzTime()`/`setenv("TZ")`. — [Random Nerd Tutorials: ESP32 NTP timezones and DST](https://randomnerdtutorials.com/esp32-ntp-timezones-daylight-saving/)
- Flere ESP32-eksempler bruker `CET-1CEST,M3.5.0,M10.5.0/3` for mellomeuropeisk tid. — [Arduino-forum: ESP32 + DS3231 + NTP med sommertid](https://forum.arduino.cc/t/esp32-update-time-of-ds3231-rtc-with-ntp-server-incl-daylight-saving-time-for-de/667367); [Wokwi-eksempel](https://wokwi.com/projects/394583241154084865)
- DS3231-eksempler bruker `rtc.lostPower()` ved oppstart for å avgjøre om tiden må settes; flagget kan bety tomt eller manglende batteri. — [Random Nerd Tutorials: ESP32 + DS3231](https://randomnerdtutorials.com/esp32-ds3231-real-time-clock-arduino/)
- Tasmota-brukere rapporterer at tidsstyrte handlinger ikke virker etter strømbrudd fordi tiden nullstilles. — [Tasmota-diskusjon #21336](https://github.com/arendst/Tasmota/discussions/21336)
- M5Stack Dial har en RTC8563 på I2C (G11/G12). — [M5Stack Dial-dokumentasjon (søkesammendrag)](https://docs.m5stack.com/en/core/M5Dial)

### Inferences
- Vanskelighet: **lav** for NTP + tidssone; **lav–middels** for robust strømbruddshåndtering.
- Lagre UTC i RTC-en og bruk TZ-regelen bare ved visning; da blir sommertidsovergangen riktig også uten nett.
- Alarmtid og innstillinger lagres i NVS (flash), slik at de overlever strømbrudd.
- Hvis tiden er ukjent etter oppstart (ingen RTC-tid, ingen NTP), bør klokka vise det tydelig og helst varsle (f.eks. et kort pip), siden en alarm som "ikke vet hva klokka er" er en stille feil.
- Retningsforskjell: Dial har RTC innebygd; for B og C må man legge til en RTC (DS3231/PCF85063) med myntcelle hvis kortet ikke har det.

### Gaps
- Fant ikke om Waveshare ESP32-S3-Touch-LCD-7 har innebygd RTC.
- Ingen kilde på drift for ESP32s interne klokke over et døgn uten NTP.

## 5. Oppsett uten app (portal / Wi-Fi-provisjonering) og OTA-oppdatering

### Takeaway
En "fangeportal" (soft-AP + nettside) gir oppsett uten app og er godt støttet (WiFiManager for Arduino, egne ESP-IDF-komponenter). OTA med automatisk tilbakerulling finnes i ESP-IDF. Risikoen er detaljer: WiFiManager har en kjent S3-feil, og tilbakerulling avhenger av bootloader-versjon. For Vane trengs i tillegg en lokal innstillingsside (alarmtid, iCal-adresse, posisjon) – den kan gjenbruke samme webserver.

### Cited Findings
- WiFiManager-issue: `autoConnect()` går alltid til AP-portalen etter omstart på ESP32-S3; rapportøren mener Wi-Fi-driveren ikke er slått på ved oppstart på S3 slik den er på ESP32. — [WiFiManager issue #1703 (speil)](https://fr.github.com/tzapu/WiFiManager/issues/1703)
- En ESP-IDF-komponent for Wi-Fi-provisjonering med fangeportal støtter ESP32, S2, S3, C3, C6, H2 og P4, og har et `force_portal`-flagg for å åpne portalen uten å slette lagrede data. — [esp-idf-wifi-provisioner](https://components.espressif.com/components/michmich/esp-idf-wifi-provisioner/versions/0.4.0/examples/basic)
- I nyere ESP-IDF er app-tilbakerulling slått på som standard med automatisk bekreftelse; tidligere måtte appen selv kalle `esp_ota_mark_app_valid_cancel_rollback()`. Enheter med eldre bootloader får ikke sikkerhetsnettet bare ved å oppdatere appen. — [ESP-IDF migreringsguide 6.2 (søkesammendrag)](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/migration-guides/release-6.x/6.2/system.html); [ESP-IDF OTA for ESP32-S3](https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/api-reference/system/ota.html)
- Under flash-skriving (bl.a. OTA) er PSRAM utilgjengelig på ESP32-S3, noe som gir skjermdrift på RGB-skjermer. — [Espressif FAQ LCD (søkesammendrag)](https://docs.espressif.com/projects/esp-faq/en/latest/software-framework/peripherals/lcd.html)

### Inferences
- Vanskelighet: **lav–middels**. Fangeportal + innstillingsside er kjent mønster; en TypeScript-utvikler vil føle seg hjemme med HTML-delen.
- Espressifs offisielle "unified provisioning" bruker deres egen mobilapp (BLE/SoftAP) etter min bakgrunnskunnskap; det passer dårlig med "ingen app", så fangeportal er riktig valg.
- OTA: enkleste vei er opplasting av `.bin` via den lokale nettsiden (ingen sky). Tilbakerulling bør slås på fra første dag, fordi bootloaderen ikke kan oppdateres trygt senere.
- Retning C: OTA skriver til flash og stopper PSRAM-tilgang → skjermen kan flimre/forskyves under oppdatering; akseptabelt hvis man viser en "oppdaterer"-skjerm eller slår av bakgrunnslyset.
- Ingen påstand fra Vane-oppsettet om "bare 127.0.0.1" kan overføres direkte: en ESP32 med innstillingsside lytter på lokalnettet. Det bør beskyttes (f.eks. bare tillate endringer en kort stund etter knappetrykk på enheten).

### Gaps
- Fant ikke om WiFiManager-feilen på S3 er rettet i siste versjon.
- Fant ikke vedlikeholdsstatus for esp-idf-wifi-provisioner.

## 6. Skjermarbeid: LVGL på 7" RGB-panel, e-papir med GxEPD2, liten rund GC9A01 (M5Stack Dial)

### Takeaway
- **C (7" RGB + LVGL)** er den tyngste skjermjobben: ESP32-S3 må hente hele bildet fra PSRAM kontinuerlig, og Wi-Fi/flash-skriving gir kjent skjermdrift og flimring. Det kan løses (ESP-IDF ≥ 5.1, bounce buffer, lavere PCLK), men ytelsen er beskjeden (~14 fps i en LVGL 8-måling på 800×480).
- **B (7,5" e-papir)** er lett å tegne til og helt mørk om natta (lyser ikke), men full oppfrisking tar ~3–3,5 s med blinking, delvis oppfrisking gir skygger, og det finnes ingen berøring eller eget lys for "glimtet".
- **Dial (240×240 GC9A01)** er lett grafisk, men skjermen er bitteliten og kortet mangler etter alt å dømme PSRAM og høyttaler.

### Cited Findings
RGB 7" (C):
- Espressif: total skjermdrift skyldes at PCLK er for høy for PSRAM/GDMA-båndbredden; PSRAM og flash deler SPI-grensesnitt, og PSRAM er avslått under flash-skriving (Wi-Fi, OTA, BLE). Anbefaler bounce buffer ("the larger the buffer, the better"), redusere PSRAM-båndbredde brukt av Wi-Fi/flash, og cache line 32 B (64 B med bounce buffer). Krever ESP-IDF release/v5.1 eller nyere. Testet grense 800×480 og maks 59 fps (PCLK 30 MHz). — [Espressif FAQ LCD (søkesammendrag)](https://docs.espressif.com/projects/esp-faq/en/latest/software-framework/peripherals/lcd.html)
- Bounce buffer bruker intern SRAM: `bounce_buffer_size * bytes_per_pixel * 2`. — [ESP-IDF rgb_panel-eksempel](https://github.com/espressif/esp-idf/blob/v5.2/examples/peripherals/lcd/rgb_panel/README.md)
- En bruker med 480×480-panel løste drift ved å senke PCLK fra 16 til 12 MHz. — [esp32.com p=147498](https://esp32.com/viewtopic.php?p=147498)
- `CONFIG_LCD_RGB_RESTART_IN_VSYNC=y` løste bildeforskyvning på ESP32-S3-LCD-EV-Board. — [esp32.com p=135775](https://esp32.com/viewtopic.php?p=135775)
- Rapporter om horisontal forskyvning når Wi-Fi slås på, og glitching under Wi-Fi-tilkobling på ESP32-8048S043. — [LVGL-forum: horizontal offset with Wi-Fi](https://forum.lvgl.io/t/lvgl-horizontal-offset-when-esp32-s3-wifi-enabled-esp-idf/21888); [LVGL-forum: glitching while connecting to Wi-Fi](https://forum.lvgl.io/t/display-glitching-while-connecting-to-wifi-esp32s3-8048s043/12075)
- Ca. 14 fps på 800×480 16-bit RGB med LVGL 8.3.11 i direct mode med to fullskjerms PSRAM-buffere. — [LVGL-forum: ESP32S3 LovyanGFX double buffer direct mode](https://forum.lvgl.io/t/esp32s3-with-lovyangfx-double-buffer-with-direct-render-mode/17929)
- Et 800×480-prosjekt (ESP32-8048S050C, LVGL 9.4): dobbel buffring gir jevnere rulling og unngår riving, men pga. busskonkurranse senkes PCLK typisk til 14 MHz; fullfarge-rammebuffer får ikke plass i intern RAM og ligger i PSRAM. — [osrtos: ESP32-8048S050C med LVGL 9.4](https://osrtos.com/projects/esp32-8048s050c-with-lvgl-9-4-and-freertos/)
- Espressifs `esp_lvgl_adapter` har en rivefri vei for RGB-skjermer som venter på bufferbytte. — [esp_lvgl_adapter lvgl_dummy_draw](https://components.espressif.com/components/espressif/esp_lvgl_adapter/versions/0.7.5/examples/lvgl_dummy_draw)
- Waveshare ESP32-S3-Touch-LCD-7: 8 MB PSRAM, 16 MB flash, 7" 800×480, GT911 5-punkts berøring; ca. £36 hos The Pi Hut. Waveshares egen tabell oppgir 1024×600 for raden, i strid med andre kilder. — [The Pi Hut](https://thepihut.com/products/esp32-s3-development-board-with-7-capacitive-touch-display-800-x-480); [atomic14 kortside](https://www.atomic14.com/esp32/boards/waveshare-esp32-s3-touch-lcd-7/)

E-papir 7,5" (B):
- GDEY075T7 (800×480, UC8179): full oppfrisking ca. 3 s, rask oppfrisking 1,5 s, delvis 0,3 s ved 25 °C; Good Display anbefaler full oppfrisking etter hver femte raske/delvise. — [Good Display produktside](https://www.good-display.com/product/396.html)
- Annen spesifikasjon: full 3,5 s, delvis 0,34 s. — [buyepaper GDEY075T7](https://buyepaper.com/products/gdey075t7)
- GxEPD2 siste versjon 1.6.9; GDEY075T7 har "fast full refresh capability" (v1.5.4); differensielle bølgeformer er et kompromiss med skygger, særlig med store fonter; noen paneler "needs multiple full refreshes after extended use of partial updates"; første oppfrisking må være full; ved utvidet temperatur bør `hasFastPartialUpdate = false`; "7.5" e-paper displays don't work reliable if fed from 3.3V Arduino pin". Paged tegning begrenser RAM; full buffer velges med `page_height` = skjermhøyde. — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2)
- Kontrasten blekner etter gjentatte oppfriskinger på GDEY075T7 med GxEPD2 og XIAO ESP32-S3. — [Arduino-forum: contrast fading GDEY075T7](https://forum.arduino.cc/t/issue-with-e-ink-display-contrast-fading-after-refresh-gxepd2-xiaoesp32-s3-gdey075t7/1368106)
- Full oppfrisking hvert 10. bilde fjernet skygger, men var for tregt for den brukerens formål. — [Core Electronics-forum](https://forum.core-electronics.com.au/t/e-ink-display-integration-ghosting-and-refresh-challenges/23151)
- Gråtone-delvis-vindu ser dårlig ut på GDEY075T7; GxEPD2_4G slår det av som standard. — [Arduino-forum: GxEPD2_4G GDEY075T7](https://forum.arduino.cc/t/gxepd2-4g-750-gdey075t7-fast-partial-refresh-with-paged-gfx-not-working/1358138)

Rund 1,28" (Dial):
- M5Stack Dial: 1,28" rund 240×240 GC9A01, FT3267-berøring, roterende enkoder (16 hakk, 64 pulser/omdreining), RTC8563, summer 80 dB, WS1850S RFID. — [M5Stack Dial-dokumentasjon (søkesammendrag)](https://docs.m5stack.com/en/core/M5Dial); [CNX Software](https://www.cnx-software.com/2023/10/08/m5dial-an-esp32-s3-smart-rotary-knob-with-a-touchscreen-display/?amp=1)
- PSRAM er omstridt: én lanseringsomtale sier "512kB of static RAM (SRAM), 8MB of pseudo-static RAM (PSRAM)" for originalen (søkesammendraget skilte ikke klart mellom Hackster og IoT Insider); en tredjeparts kortside sier at Stamp-S3A (Dial v1.1) har 8 MB flash og ingen PSRAM. M5Stacks egne sider som ble funnet, nevner ikke PSRAM. — [Hackster](https://hackster.io/news/m5stack-launches-the-m5dial-a-swish-iot-rotary-encoder-with-a-built-in-color-touchscreen-display-438513c4e52c); [IoT Insider](https://www.iotinsider.com/?p=8216); motsagt av [espboards.dev](https://www.espboards.dev/esp32/m5stack-dial/)

### Inferences
- Beregninger: 800×480×2 B = 768 000 B (~750 KB) per RGB565-rammebuffer → må i PSRAM; to buffere ~1,5 MB. 800×480 1-bit e-papir = 48 000 B → får plass i intern RAM. 240×240×2 B = 115 200 B → delbuffere i intern RAM holder.
- C er vanskeligst (**høy**): LVGL-læring, PSRAM-tuning, Wi-Fi-drift, og samtidig radio som også bruker PSRAM. Fordelen er at nattbordsfasene (rød kveld, svart natt, soloppgangsfarger på skjermen) kan gjøres som i dag. Natt: bakgrunnslyset må kunne slås helt av; "glimtet" krever dimbart bakgrunnslys (PWM). Det må sjekkes på kortet – på noen Waveshare-kort styres bakgrunnslyset via en IO-utvider (av/på), etter min bakgrunnskunnskap; ikke verifisert. Strøm-LED-er på utviklingskort kan også bryte "helt mørk".
- B er lettest å tegne (**lav–middels**), men tidsvisning hvert minutt med delvis oppfrisking gir skygger; en full oppfrisking (3–3,5 s, blinker svart/hvitt) bør gjøres f.eks. hver time eller ved faseskifte. Om natta er blinkingen usynlig (e-papir lyser ikke), men da er heller ikke klokka synlig: "glimtet" må lages med lys (f.eks. LED-solen på lav rød, eller en liten frontbelysning). Ingen berøring → fysiske knapper for ±5 min, glimt og "hold 3 s".
- Dial er grafisk lett (**lav–middels**: M5GFX/LovyanGFX eller LVGL på 240×240), enkoderen passer perfekt til ±5 min. Men morgenvisningen (vær + avtaler) får knapt plass, og manglende PSRAM/høyttaler betyr at lyd og LED-lampe trolig må ligge i en egen enhet.
- Norske tegn (æøå) må med i fontene: i LVGL lages fonter med fontkonverteren med valgt tegnområde; i Adafruit GFX/GxEPD2 er standardfontene 7-bit, så man trenger U8g2-fonter eller egne konverterte fonter. (Bakgrunnskunnskap, ikke verifisert i denne runden.)

### Gaps
- Fant ingen LVGL 9-måling av fps på 800×480 ESP32-S3 med Wi-Fi og lydstrøm samtidig.
- Fikk ikke bekreftet PSRAM på M5Stack Dial (docs.m5stack.com var stengt).
- Fant ikke om Waveshare 7"-kortets bakgrunnslys kan dimmes med PWM.

## 7. LED-soloppgang: hvor mye lys, SK6812 RGBW-lumen og antall, jevn dimming i bunnen, varme og strøm

### Takeaway
Kommersielle vekkelys sikter mot 250–315 lux ved ansiktet på 40–50 cm, og studier har brukt 0 → 250 lux over 30 min. Det tilsvarer omtrent 60 cd mot ansiktet, dvs. noen hundre lumen fra en lampe som ikke er rettet – grovt 15–40 SK6812 RGBW-LED-er ved full styrke (5–15 W ved 5 V). Det vanskelige er ikke toppen, men bunnen: 8-bits SK6812 gir et synlig første trinn i et mørkt rom. Det løses med temporal dithering, ved å slå på én og én LED, eller ved å bruke PWM-drevne LED-er med 14-bits LEDC.

### Cited Findings
- Philips HF3470: 250 lux; HF3471: 0–250 lux på 40–50 cm; HF3475 og HF3480: 0–300 lux på 40–50 cm; soloppgangen varer 30 min. — [Philips HF3470](https://www.philips.com/c-p/HF3470_01/wake-up-light); [Philips HF3480-manual (manualslib)](https://www.manualslib.com/manual/413415/Philips-Hf3480.html?page=3); [Philips-dokument](https://www.documents.philips.com/assets/20211006/f8c0e4079fda4a979c2dadb900f111a8.pdf)
- Philips SmartSleep HF3670: 25 lysstyrketrinn, maks 315 lux, 4 soltemaer; HF3650: maks 310 lux, 25 trinn. — [Philips HF3670](https://www.usa.philips.com/c-p/HF3670_60/smartsleep-wake-up-light); [Philips HF3650](https://www.philips.ca/c-p/HF3650_60/smartsleep-sleep-and-wake-up-light)
- Lab-studie (Liège): lys fra 0 til 250 lux over 30 min før oppvåkning bedret subjektivt velvære, humør og kognitiv ytelse sammenlignet med svakt lys, med minimal effekt på døgnrytmefasen. — [Gabel m.fl. 2013 (ORBi)](https://orbi.uliege.be/bitstream/2268/171514/1/Gabel_CI_2013.pdf)
- Hjemmestudie med 0, 50 og 250 lux: daggrylys reduserte klager på søvninerti. — [Wikipedia: Dawn simulation](https://en.wikipedia.org/wiki/Dawn_simulation)
- Lumie oppgir ikke lux for Bodyclock Luxe 750DAB eller Shine 300; Shine 300 bruker fargene varm hvit, oransje og rød; soloppgang/solnedgang 15–90 min. — [Lumie Bodyclock Luxe 750DAB](https://lumie.com/products/bodyclock-luxe-750dab); [Front Desk Review: Shine 300](https://frontdeskreview.com/product/sunrise-alarm-clocks/lumie-bodyclock-shine-300/)
- SK6812 RGBW 5050 per farge: R 550–700 mcd, G 1100–1400 mcd, B 200–400 mcd (ingen hvit-verdi oppgitt). — [SuperLightingLED SK6812-datablad](https://www.superlightingled.com/PDF/SPEC/SK6812-White-LED-Datasheet-PDF.pdf)
- SK6812 RGBW-stripe 60 LED/m, 24 W/m: ca. 1331 lm/m med alle kanaler på 100 % (ca. 55 lm/W). — [LEDYI 5050 SK6812 RGBW-spesifikasjon](https://www.ledyilighting.com/wp-content/uploads/2021/10/5050smd-60leds-10mm-SK6812-RGBW-specification.pdf)
- SK6812 RGBWW-stripe 60 LED/m: ca. 950 lm/m for varm hvit-kanalen (2700 K). — [LuxaLight-datablad](https://www.luxalight.eu/sites/default/files/downloads/2021-08/Datasheet_LS5RGBWW60BLKSK6812PLX.pdf)
- Arduino-ESP32 LEDC tillater 1–14 bit på ESP32-S3; dutyverdien kan ikke være 2^oppløsning. — [Arduino-ESP32 LEDC API](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/ledc.html); [ESP-IDF LEDC ESP32-S3](https://docs.espressif.com/projects/esp-idf/en/v5.4.1/esp32s3/api-reference/peripherals/ledc.html)
- Eksempel: 80 MHz APB-klokke gir 5 kHz ved 14 bit. — [EasyEDA/LCKFB ESP32-S3 PWM-wiki](https://openkits-wiki.easyeda.com/en/esp32s3r8n8/arduino-beginner/pwm.html)
- FastLED temporal dithering slår inn automatisk når hovedlysstyrken senkes, virker ikke ved 255, og blir bedre jo oftere `FastLED.show()` kalles. — [FastLED temporal dithering (speil)](https://mftest.danlj.org/t/fastled-temporal-dithering-fastled-users-can-easily-scale-the-brightness-and-power-consumption-of/63753)
- FastLED fikk RGBW-støtte i 3.7.7 (`setRgbw(RgbwDefault())`), og bare ESP32-familien støtter det med egen driver. — [r/FastLED 3.7.7 RGBW (speil)](https://lr.eu.psf.lt/r/FastLED/comments/1fic82o/fastled_377_rgbw_now_in_api/lnhdja9/?context=3)
- Temporal dithering kan gi synlig flimmer hvis LED-oppdateringsraten er lav. — [HyperHDR wiki: ICE RGBW](https://hyperhdr-wiki.pages.dev/ICE-RGBW)
- Adafruit NeoPXL8 HDR gir 16-bits fargekomponenter (64-bit RGBW) og temporal dithering, egnet for flerkjernebrikker som ESP32-S3. — [NeoPXL8 HDR-guide](https://www.binaryemotions.com/blog/updated-library-and-guide-and-introducingneopxl8hdr/)
- WLED har rettet "jumpiness" i gradienter ved lav lysstyrke; en WLED-bruker rapporterte at SK6812 RGBW fungerer i ensfarget modus men blir "rainbowy mess" ved fading (trolig oppsettfeil). — [WLED-commit 186c4a7](https://git.sebastienjean.net/jeans/WLED/src/commit/186c4a7724b82efe469417e7feecc4d45454b7f7); [WLED-forum](https://wled.discourse.group/t/sk6812-rgbw-unstable/2351)
- Lumie Shine 300s adapter gir 15 V 1 A (15 W). — [Lumie Shine 300-manual](https://cdn.shopify.com/s/files/1/0665/8909/files/S-BC300i1808-web.pdf)

### Inferences
- Lysmengde (regnet ut): E = I/d² → 300 lux på 0,45 m krever I ≈ 300 × 0,2025 ≈ 61 cd mot ansiktet. En lambertsk flate med 61 cd toppintensitet sender ut ca. π × 61 ≈ 190 lm. En lampe som lyser i alle retninger (kuppel/ring) treffer ansiktet med en mindre andel, så 300–600 lm totalt er et rimelig mål for å nå 250–300 lux; mindre (100–200 lm) holder for et "mildt" vekkelys som Loftie (som ikke oppgir lux).
- LED-antall (regnet ut, med usikre tall): 1331 lm/m ÷ 60 ≈ 22 lm per SK6812 RGBW med alle kanaler; 950 lm/m ÷ 60 ≈ 16 lm per LED for varm hvit på RGBWW. Det gir ca. 15–40 LED-er for 300–600 lm. Strøm: 24 W/m ÷ 60 ≈ 0,4 W per LED → 30 LED-er ≈ 12 W ≈ 2,4 A ved 5 V. Dette krever egen 5 V-forsyning (ikke USB fra ESP32-kortet), tykke ledere og aluminium/varmeavledning i en liten kuppel.
- Bunnen av kurven: SK6812 har 8 bit per kanal (bakgrunnskunnskap). Med 30 LED-er på 1/255 av 300 lux er første trinn ~1 lux – synlig i et kullsvart rom. Tiltak: (1) slå på én og én LED på laveste nivå (romlig dithering gir ×30 flere trinn), (2) temporal dithering (FastLED/NeoPXL8 HDR), (3) bruke vanlige PWM-drevne LED-strenger (rød + ravgul + varm hvit) med konstantstrømsdriver og 14-bits LEDC (16 384 trinn) – mest jevnt, men mer maskinvare.
- Fargeforløpet (svart → dyp rød → oransje → varm hvit) passer RGBW/RGBWW godt: rød kanal alene først, så rød+grønn (oransje), så hvit (helst varm hvit 2700–3000 K). Gamma-korrigering er nødvendig for at rampen skal oppleves jevn.
- Retningsforskjell: B ("LED-sol") og Loftie-kuppel er frittstående lyskilder og kan dimensjoneres for lux. C har skjermen selv som lyskilde i tillegg, men en 7" LCD gir ikke i nærheten av 250 lux; LED-ringen må gjøre jobben.

### Gaps
- Fant ingen pålitelig lumen/mcd-verdi for hvit-kanalen i en enkelt SK6812 RGBW (Digi-Key/Adafruit-databladet kunne ikke hentes).
- Fant ikke lux eller lumen for Loftie Lamp, Lumie Bodyclock eller Hatch Restore 3 (ikke publisert ifølge Front Desk Review).
- Fant ikke originalartikkelen for Thorn m.fl. (2004) eller Gimenez m.fl. (bare omtaler).

## 8. Alarmrobusthet (watchdog, reserve-tone, piezo)

### Takeaway
"Aldri stille" kan bygges med tre lag tilsvarende dagens kjede: radio → lydfil i flash via samme forsterker → piezo/summer på egen pinne som ikke er avhengig av nett, I2S eller forsterker. ESP-IDFs task watchdog gir bare advarsel som standard; den må settes til panikk/omstart, og etter omstart må alarmtilstanden leses fra NVS slik at alarmen fortsetter.

### Cited Findings
- Task watchdog: ved tidsavbrudd skrives bare en advarsel og backtrace; omstart skjer bare med `CONFIG_ESP_TASK_WDT_PANIC`. Oppgaver meldes på med `esp_task_wdt_add()` og må kalle `esp_task_wdt_reset()`; tidsavbrudd settes med `CONFIG_ESP_TASK_WDT_TIMEOUT_S` eller `esp_task_wdt_init()`; brukeren kan definere `esp_task_wdt_isr_user_handler`. — [ESP-IDF Watchdogs (ESP32-S3, v5.2)](https://docs.espressif.com/projects/esp-idf/en/v5.2/esp32s3/api-reference/system/wdts.html)
- ESP32-audioI2S melder slutt på strøm (`evt_eof`) og logghendelser via `audio_info_callback`, og bufferfyllingen kan leses med `inBufferFilled()`; tidsavbrudd for TLS-tilkobling er 2700 ms som standard. — [Audio.h](https://github.com/schreibfaul1/ESP32-audioI2S/blob/master/src/Audio.h)
- M5Stack Dial har en innebygd summer på 80 dB. — [M5Stack Dial-dokumentasjon (søkesammendrag)](https://docs.m5stack.com/en/core/M5Dial)
- Tidsstyrte handlinger feiler etter strømbrudd når tiden nullstilles. — [Tasmota-diskusjon #21336](https://github.com/arendst/Tasmota/discussions/21336)

### Inferences
- Vanskelighet: **middels** – ikke vanskelig kode, men krever disiplin og testing av feilsituasjoner (trekk ut Wi-Fi, feil strømadresse, frakoblet høyttaler, omstart midt i alarmen).
- Mønster: en egen "alarmvakt"-oppgave med høy prioritet som (a) starter radio, (b) sjekker innen f.eks. 10–15 s at bufferen fylles og at det ikke kom feil, ellers bytter til lydfil fra LittleFS, (c) starter piezo uansett hvis ingen lyd er bekreftet etter f.eks. 30 s, (d) melder seg på task watchdog. Piezo på LEDC-tone er uavhengig av I2S og nett.
- Kan ikke oppdage en frakoblet eller ødelagt høyttaler i programvare; derfor bør piezoen være en del av alarmen (f.eks. etter noen minutter uten "stopp") – samme tanke som dagens `afplay`-reserve.
- Lagre "alarm pågår siden kl. X" i RTC-minne/NVS, slik at en omstart (watchdog, strøm) fortsetter alarmen i stedet for å glemme den.
- Retningsforskjell: Dial har summer innebygd; B og C trenger en piezo på kortet. Med to-brikke-oppsett (Dial + lampe) må begge kunne alarmere hvis forbindelsen mellom dem faller.

### Gaps
- Fant ingen publisert referansedesign for "feilsikker vekkerklokke" på ESP32.

## 9. Kommersielle referanser (Loftie Clock, Loftie Lamp, Philips SmartSleep, Lumie Bodyclock, Hatch Restore)

### Takeaway
Markedet tilbyr 30-minutters (Philips) til 9-minutters (Loftie Lamp) soloppgang, 250–315 lux der det oppgis (bare Philips oppgir lux), innebygde lyder, sjelden internettradio, og ofte app + abonnement. Vanlige klager er app/Wi-Fi/Bluetooth-tilkobling, abonnementer og kundestøtte. Ingen av dem viser vær og kalender fra egne kilder uten sky – det er Vanes særpreg.

### Cited Findings
Loftie Clock:
- Tofaset alarm, nattlys, "blackout"-modus, dimbar skjerm, Bluetooth-høyttaler, 100+ gratis lyder; 2,4 GHz Wi-Fi trengs for oppsett og oppdateringer; offline-modus holder tid og alarmer i gang; valgfritt Loftie+-medlemskap. — [Loftie Clock (produkt)](https://byloftie.com/products/loftie-clock); [Loftie: WiFi and technical specs](https://byloftie.com/pages/wifi-and-technical-specs)
- Pris ca. $150–160. — [LiveWorkSleep (søkesammendrag)](https://liveworksleep.com/loftie-clock-review/); [Mattress Clarity](https://www.mattressclarity.com/reviews/loftie-lamp-review/)
- Klager: Bluetooth-tilkobling over tid og sporadisk flimrende skjerm; abonnement lagt til i kassen uten at kunden visste det; treg kundestøtte; "my second one that doesn't work after a few months"; liten skjerm og få knapper. — [Interior Insider](https://www.interiorinsider.com/article/is-loftie-worth-it); [Trustpilot](https://www.trustpilot.com/review/byloftie.com?page=8); [Bloomingdale's](https://www.bloomingdales.com/shop/product/p?ID=4894442)
- Batteribackup ca. 5 timer ifølge den japanske produktsiden; engelske kilder nevner ikke batteri. — [Loftie (japansk)](https://byloftie.com/ja/products/loftie)

Loftie Lamp:
- Lyser opp nedenfra og opp over 9 minutter ved alarmtid; solnedgang; 50+ farge-/lysstyrkekombinasjoner; lux ikke publisert; 16" høy. Pris oppgitt til $250–300. — [Loftie Lamp unique features](https://learn.byloftie.com/loftie-lamp-unique-features); [Front Desk Review: Loftie Lamp](https://frontdeskreview.com/product/wake-up-lights/loftie-lamp/); [Tuft & Needle](https://beta.tuftandneedle.com/products/loftie-smart-sunrise-table-lamp)

Philips:
- HF34xx: 250–300 lux på 40–50 cm, 30 min soloppgang; SmartSleep HF3670: 315 lux, 25 trinn, 4 soltemaer; HF3650: 310 lux. — se kilder i avsnitt 7.
- Klager: app-tilkobling (krever sterkt Wi-Fi på soverommet), ingen Bluetooth-musikk, kan ikke laste ned flere lyder, uvant berøringsmeny, ustødig. Snitt 4,3/5 (70+ anmeldelser på Philips) og 4,4/5 (1 200+ på Amazon). — [Top Ten Reviews](https://www.toptenreviews.com/philips-smartsleep-connected-review); [Android Authority](https://androidauthority.com/philips-smartsleep-wake-up-light-review-1174446); [TechRadar](https://www.techradar.com/reviews/philips-somneo-sleep-and-wake-up-light)

Lumie:
- Bodyclock Luxe 750DAB: soloppgang/solnedgang 15–90 min, DAB-radio, 30+ lyder, Bluetooth-høyttalere, "low-blue light", USB; sertifisert som medisinsk utstyr (UK MDR 2002 / EU MDR 2017/745). — [Lumie Luxe 750DAB](https://lumie.com/products/bodyclock-luxe-750dab)
- Bodyclock Shine 300: 15 lyder, FM-radio, varm hvit/oransje/rød, ca. $169 (US), 3 års garanti, 45 dagers prøvetid. — [Lumie Shine 300 (US)](https://lumie.com/en-us/products/bodyclock-shine-300); [Tom's Guide](https://www.tomsguide.com/wellness/sleep/lumie-bodyclock-shine-300-sunrise-alarm-clock-review)

Hatch Restore 3:
- Listepris $169,99; Hatch+ etter 30 dagers prøve $4,99/mnd eller $49,99/år; uten abonnement 40+ søvnlyder og 20+ alarmlyder; ingen Bluetooth; høyttaleren får ros; Tom's Guide 4,5/5 og "best sunrise alarm clock" 2025. — [Tom's Guide-test](https://www.tomsguide.com/wellness/sleep-tech/hatch-restore-3-sunrise-alarm-clock-review); [theSkimm](https://www.theskimm.com/sleep-tech/hatch-restore-3-review); [Wareable](https://www.wareable.com/health-tech/hatch-restore-3-review); [Tom's Guide Sleep Awards 2025](https://www.tomsguide.com/wellness/sleep-tech/toms-guide-sleep-awards-2025-best-sunrise-alarm-clock)
- Uten abonnement er særlig tilpasning av kveldsrutinen begrenset. — [HGTV](https://www.hgtv.com/shopping/product-reviews/hatch-restore-3-review)

### Inferences
- Vane-funksjoner som skiller seg ut: internettradio som vekking (bare Lumie har kringkastingsradio, via DAB/FM), vær og kalender om morgenen, og ingen app/konto/abonnement. Klagene i markedet (app, abonnement, sky, tilkobling) er nettopp det Vane unngår.
- Lysmål: Philips (250–315 lux, 30 min) er det eneste tallfestede målet og er nær forskningsoppsettet (250 lux, 30 min). Loftie Lamp går for et kortere, mildere forløp (9 min). Vanes 30 minutter følger Philips/forskningen.
- Retning B ligner mest Philips/Lumie (lyskilde + enkel visning), C ligner et "smart display", og Loftie-stil ligner Loftie Clock + Loftie Lamp (to produkter, $150 + $250–300).

### Gaps
- Fant ikke lux/lumen for Loftie Lamp, Lumie eller Hatch.
- Fant ikke systematiske feilrater; klager kommer fra enkeltanmeldelser og Trustpilot (anekdotisk).

## 10. Grovt anslag for fastvareinnsats (personuker) per retning, for en erfaren TypeScript-utvikler som er ny i innebygd C++

### Takeaway
Grovt anslag (egen vurdering, ikke fra kilder): **B ≈ 11–18 personuker, C ≈ 13–21, Loftie-stil ≈ 12–20**, hvis iCal parses på enheten. Lar man en hjelper utvide kalenderen til JSON, går 2–4 uker ut av alle. C er mest risikabel på grunn av PSRAM-konkurranse mellom RGB-skjerm, Wi-Fi og radio; Loftie-stil er mest risikabel arkitektonisk fordi den trolig krever to brikker.

### Cited Findings
- Ingen kilder gir personuke-anslag for slike prosjekter. Tallene under bygger på funnene i avsnitt 1–8, særlig: radio krever PSRAM og flerkjerne ([ESP32-audioI2S](https://github.com/schreibfaul1/ESP32-audioI2S)); RGB-drift med Wi-Fi/flash ([Espressif FAQ LCD](https://docs.espressif.com/projects/esp-faq/en/latest/software-framework/peripherals/lcd.html)); e-papir-oppfrisking og skygger ([GxEPD2](https://github.com/ZinggJM/GxEPD2), [Good Display](https://www.good-display.com/product/396.html)); iCal-kompleksitet ([uICAL](https://github.com/sourcesimian/uICAL), [ThingPulse](https://docs.thingpulse.com/guides/espaper-calendar/)); Dial uten PSRAM (omstridt) ([espboards.dev](https://www.espboards.dev/esp32/m5stack-dial/)).

### Inferences
Felles grunnmur (alle retninger), anslått:
| Del | Vanskelighet | Personuker |
|---|---|---|
| Verktøy, C++/FreeRTOS-læring (PlatformIO/Arduino-ESP32 eller ESP-IDF) | middels for TS-utvikler | 1–2 |
| Wi-Fi, fangeportal, lokal innstillingsside, NVS | lav–middels | 1,5–2,5 |
| Tid: NTP, Europe/Oslo, RTC, strømbrudd | lav | 0,5–1 |
| Fasemotor (port av `evaluate` fra `src/shared/schedule.ts`), testet på vertsmaskin | lav | 0,5–1 |
| MET-vær (HTTPS, User-Agent, cache, JSON-filter) | lav–middels | 1 |
| iCal på enheten (delsett / full) – eller hjelper som lager JSON | middels–høy / lav | 2–4 / 0,5 |
| Radio + volumrampe + reservelyd + piezo + alarmvakt | middels | 2–3 |
| LED-soloppgang (fargekurve, gamma, jevn bunn) | middels | 1–2 |
| OTA, tilbakerulling, watchdog, logging | lav–middels | 1 |
| Sum felles | | ca. 10,5–17,5 (med iCal på enheten) |

Retningsspesifikt tillegg:
- **B (7,5" e-papir + LED-sol): +1,5–3 uker.** GxEPD2-tegning, fonter med æøå, strategi for delvis/full oppfrisking, fysiske knapper (ingen berøring), "glimt" via lys. Lavest teknisk risiko. Svakhet: ingen farger, treg oppdatering, glimtet krever egen lyskilde.
- **C (7" RGB + LED-ring): +3–5 uker.** LVGL (nytt rammeverk), bounce buffer/PCLK-tuning mot Wi-Fi-drift, dimbart bakgrunnslys for rødt glimt og helsvart natt, berøringsgrensesnitt for god natt-justering, og måling av radio + skjerm samtidig. Høyest risiko for "fungerer på benken, hakker om morgenen".
- **Loftie-stil (Dial + LED-kuppel): +2–4 uker.** Liten skjerm er lett (enkoder passer til ±5 min), men trolig to fastvarer: Dial (UI, RTC, summer) og en ESP32-S3 med PSRAM i lampefoten (radio, I2S-forsterker, LED-er, strøm), med en forbindelse mellom dem (ESP-NOW/UART/Wi-Fi) som også må være feilsikker. Morgeninfo må forenkles kraftig (kan redusere iCal-kravet).

Hvordan vanskeligheten per funksjon skiller seg mellom retningene (sammendrag):
| Funksjon | B e-papir | C 7" RGB | Loftie-stil (Dial) |
|---|---|---|---|
| Radio | lett å kombinere (skjerm bruker ikke PSRAM-båndbredde) | PSRAM-konkurranse med skjerm | trenger egen brikke med PSRAM |
| Natt helt mørk | best (lyser ikke) | krever at bakgrunnslys slås helt av, og ingen strøm-LED | lett (liten skjerm av) |
| Rødt glimt ved berøring | krever lys (LED) + knapp | lett hvis bakgrunnslys kan dimmes | lett |
| Soloppgang | LED-sol | LED-ring (+ skjermfarger) | LED-kuppel |
| God natt ±5 min | knapper | berøring | enkoder (best) |
| Morgen: vær + avtaler | god plass, gråtoner | god plass, farger | svært lite plass |
| Hold 3 s for stopp | knapp | knapp/berøring | knapp på Dial |

### Gaps
- Ingen eksterne kilder for innsatsanslag; tallene er skjønn og bør justeres etter en 1–2 ukers "spike" (radio + skjerm + Wi-Fi samtidig på valgt kort).
- Maskinvarearbeid (kretskort, LED-driver, kabinett, varme, strømforsyning) er ikke med i tallene.
