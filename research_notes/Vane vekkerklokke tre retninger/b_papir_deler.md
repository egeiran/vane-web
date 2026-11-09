# Retning B «Papir og lys»: deler og priser for 7,5" e-papir med ESP32-S3

Notater for rapportskriveren. Undersøkt 2026-11-09. Kjøper bor i Trondheim.

**Om kildene.** Denne økten nådde ikke nettbutikkene direkte. seeedstudio.com, wiki.seeedstudio.com, files.seeedstudio.com, openelab, robotshop, waveshare, good-display, electrokit, digitalimport, kjell, aliexpress, lcsc og norges-bank var blokkert av nettverksregler. Prisene kommer derfor fra søkemotorens utdrag av butikksidene, og de kan være eldre enn utdraget tilsier. Tekniske fakta (pinner, oppfriskingstider, programvarestøtte) er lest direkte i kildefilene på GitHub: Seeeds wiki-kilde, TRMNL-fastvaren og GxEPD2.

**Valutakurs brukt:** 1 USD = 9,30 NOK ([currencybeacon, 9,2978 den 2026-11-02](https://currencybeacon.com/rates/USD/NOK)), 1 EUR = 10,45 NOK ([fxfeed, 10,4775 den 2026-11-05](https://fxfeed.io/currencies/pairs/eur-nok)). Kildene sprikte med omtrent ±0,3 NOK per USD. «Inkl. mva» betyr her norsk mva på 25 %.

---

## Spørsmål 1: TRMNL 7.5" (OG) DIY Kit: hva er med, hva koster det, og finnes det i Europa og Norge?

### Takeaway
Settet koster 44,90 USD uten mva hos Seeed. Det blir omtrent 522 NOK med 25 % norsk mva, før frakt. Settet har driverkort med XIAO ESP32-S3 Plus, 7,5" 800×480 svart/hvitt-panel, 2000 mAh batteri og en 10 cm FPC-forlenger, men ingen kasse. Lagerstatusen er ujevn. Ingen norsk forhandler ble funnet.

### Cited Findings
- Innhold: XIAO ePaper Display Dev Board med XIAO ESP32-S3 Plus, 7,5" svart/hvitt-panel på 800×480, 10 cm FPC-forlenger, FPC-kontakt og 2000 mAh Li-ion-batteri. Kassen følger ikke med. Det finnes åpne kassemodeller på Printables, Thingiverse og MakerWorld (trekant- og L-form). Driverkortet drives med 5 V. — [Seeed wiki, TRMNL-sett (kilde på GitHub)](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md), offentlig side [wiki.seeedstudio.com/trmnl_7inch5_diy_kit_main_page](https://wiki.seeedstudio.com/trmnl_7inch5_diy_kit_main_page/)
- Panelet har delvis oppfrisking på 0,34 s og full oppfrisking på 3,5 s. Batteriet holder i opptil 3 måneder i dyp søvn med oppfrisking hver 6. time. Settet virker med ESPHome/Home Assistant og Arduino. — [Seeed wiki, TRMNL-sett](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md)
- Wikien oppgir driftstemperatur fra −40 til 85 °C. Det er trolig kortets verdi, ikke panelets (se spørsmål 6). — [Seeed wiki, TRMNL-sett](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md)
- Prisen hos Seeed er 44,90 USD uten mva. Mouser-databladet sier «Excl. VAT» (udatert). — [Mouser-datablad 104991005](https://www.mouser.lt/datasheet/3/1361/1/104991005.pdf); [Liliputing (juli 2025)](https://liliputing.com/trmnl-7-5-og-diy-kit-is-a-battery-powered-36-e-ink-display-with-wifi-a-battery-and-dozens-of-software-plugins/)
- Ved lansering var forhåndsprisen 35,92 USD. Senere steg prisen til rundt 45 USD. — [Hackster](https://www.hackster.io/news/seeed-partners-with-trmnl-s-ryan-kulp-for-a-low-cost-diy-smart-desktop-epaper-display-kit-ff04e9591f50); [eSIM Studios (juli 2025)](https://esimstudios.blogspot.com/2025/07/trmnl-75-og-diy-kit-is-battery-powered.html)
- OpenELAB i EU har én oppføring på 53,85 € inkl. EU-mva og en annen på 45,99 USD (før 68,99 USD). Begge er udaterte utdrag og spriker. — [openelab.io](https://openelab.io/products/seeed-studio-trmnl-diy-kit); [openelab.com](https://openelab.com/products/seeed-studio-trmnl-diy-kit). OpenELAB har også svenske, danske og finske butikksider. — [openelab.io/sv](https://openelab.io/sv/products/seeed-studio-trmnl-diy-kit)
- RobotShop i USA: 47,26–48,04 USD «inkl. US tariffs», merket «re-stocking soon». — [RobotShop](https://www.robotshop.com/products/seeedstudio-trmnl-75-og-diy-kit)
- Unmanned Tech Shop i Storbritannia: 35,95 £, utsolgt. Pakronics i Australia: 90,31 AUD inkl. GST. — [Unmanned Tech](https://www.unmannedtechshop.co.uk/products/trmnl-7-5-og-diy-kit); [Pakronics](https://www.pakronics.com.au/products/trmnl-7-5-og-diy-kit-ss104991005)
- TRMNL-skyen med programtillegg krever en BYOD-lisens til 50 USD. — [Hackster](https://www.hackster.io/news/seeed-partners-with-trmnl-s-ryan-kulp-for-a-low-cost-diy-smart-desktop-epaper-display-kit-ff04e9591f50)
- Elfa Distrelec slås sammen med RS. Fra 18.05.2026 går det ikke lenger an å handle i Elfa Distrelecs nettbutikk. — [RS / Elfa Distrelec FAQ](https://se.rs-online.com/web/content/support/alla-artiklar/elfa-distrelec-faq)

### Inferences
- 1 stk fra Seeed: 44,90 USD × 9,30 = 418 NOK uten mva, som gir **≈ 522 NOK inkl. 25 % mva**, pluss frakt.
- 1 stk fra OpenELAB: 53,85 € × 10,45 = 563 NOK inkl. EU-mva. Hvis butikken trekker fra EU-mva (antatt 19 %) og Norge legger på 25 %, blir det ≈ 590 NOK. Begge tallene er før frakt.
- Vane-klokka trenger ikke TRMNL-lisensen. Den skal bruke egen fastvare (Arduino/ESP-IDF/ESPHome) mot Mac-serveren på `localhost`, og AGENTS.md sier «ingen skytjenester».
- Vane står på nattbordet med strøm. Batteriet i settet er derfor mest en reserve, for eksempel for at alarmen ikke skal svikte ved strømbrudd.

### Gaps
- Fraktpris fra Seeed til Norge ble ikke funnet, fordi seeedstudio.com var blokkert. Det er heller ikke bekreftet om Seeed er VOEC-registrert og krever inn norsk mva i kassen (se spørsmål 4).
- Ingen treff på settet hos Electrokit, Digitalimport, Kjell eller Elfa. Søket kan ha bommet, så dette bør sjekkes manuelt.
- Lagerstatus hos Seeed direkte i dag er ukjent.

---

## Spørsmål 2: Hvor mange GPIO-pinner er ledige på XIAO ESP32-S3 Plus-driverkortet når e-papiret er koblet til? Vane trenger 9 signaler.

### Takeaway
Driverkortet bruker 11 av de 20 GPIO-ene på XIAO ESP32-S3 Plus. Det er til e-papir, tre knapper og batterimåling. Bare GPIO8 (D9) og GPIO43 (D6) er ledige på den vanlige XIAO-raden. Sju til ligger på Plus-modulens loddeputer eller B2B-kontakt (GPIO11, 12, 13, 39, 40, 41, 42). Det blir 9 i teorien, akkurat det Vane trenger, men kortet ser ikke ut til å ha en utvidelseslist. I praksis må det loddes.

### Cited Findings
- XIAO ESP32-S3 Plus har disse pinnene:
  - Vanlig rad: D0=GPIO1, D1=GPIO2, D2=GPIO3, D3=GPIO4, D4=GPIO5, D5=GPIO6, D6=GPIO43 (TX), D7=GPIO44 (RX), D8=GPIO7 (SCK), D9=GPIO8 (MISO), D10=GPIO9 (MOSI).
  - Ekstra pinner: D11=GPIO38, D12=GPIO39, D13=GPIO40, D14=GPIO41, D15=GPIO42, D16=GPIO10, D17=GPIO13, D18=GPIO12, D19=GPIO11.
  - Annet: brukerlys GPIO21, Boot GPIO0. GPIO39–42 er også JTAG.
  - B2B-kontakten passer med Wio-SX1262-kortet.
  — [Seeed wiki, XIAO ESP32-S3, pinnekart for Plus](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/SeeedStudio_XIAO/SeeedStudio_XIAO_ESP32S3/XIAO_ESP32S3_Getting_Started.md)
- TRMNL-fastvarens enhetstabell for settet (`xiao_epaper_display`, bygget som `TRMNL_7inch5_OG_DIY_Kit` på `seeed_xiao_esp32s3`):

  | Funksjon | GPIO |
  |---|---|
  | EPD SCK | 7 |
  | MOSI | 9 |
  | CS | 44 |
  | RST | 38 |
  | DC | 10 |
  | BUSY | 4 |
  | Knapp (vekking) | 5 |
  | Batteri-ADC | 1 |
  | Batteri av/på | 6 |

  — [trmnl-firmware `src/board_config.cpp`](https://github.com/usetrmnl/trmnl-firmware/blob/main/src/board_config.cpp); [`platformio.ini`](https://github.com/usetrmnl/trmnl-firmware/blob/main/platformio.ini)
- Settet har tre brukerknapper på D1, D2 og D4 (GPIO2, 3 og 5) og én reset-knapp. Batterispenningen leses på D0 (GPIO1), og ADC-en slås av og på med GPIO6. — [Seeed wiki, TRMNL-sett med Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/cookbooks/arduino.md)
- Arduino-oppskriften for settet bruker `BOARD_SCREEN_COMBO 502` (7,5" svart/hvitt, UC8179) og `USE_XIAO_EPAPER_DISPLAY_BOARD_EE04`. Det tyder på at settets driverkort deler pinnekart med EE04. Panelet kobles i en 24-pins kontakt, og en jumper må stå på «24Pin». — [Seeed wiki, TRMNL-sett med Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/cookbooks/arduino.md)
- Seeeds egen tabell oppgir «Extension IO Port: /» (ingen) for EE04. Det billige «ePaper Driver Board» for vanlig XIAO har derimot en utvidelsesport «for flere sensorer». — [Seeed wiki, EE04](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/Expansion_Board_Series/ESP32_Series/EE04_GettingStart.md)
- Det billige ePaper Driver Board for XIAO bruker RST D0, CS D1, BUSY D2, DC D3 og SCK D8. — [The Pi Hut](https://thepihut.com/products/epaper-driver-board-for-xiao)
- reTerminal E1001 bruker disse GPIO-ene:

  | Funksjon | GPIO |
  |---|---|
  | EPD SCK / MOSI / CS / RST / DC / BUSY | 7 / 9 / 10 / 12 / 11 / 13 |
  | Knapper | 3, 4, 5 |
  | Summer | 45 |
  | Lys | 6 |
  | SHT4x (I²C) | 19, 20 |
  | Batteri-ADC / av og på | 1 / 21 |
  | SD-kort (EN, DET, CS, MISO) | 16, 15, 14, 8 |
  | Seriell | 43, 44 |

  I tillegg har E1001 en 8-pins utvidelseslist for UART, I²C og GPIO. — [Seeed wiki, reTerminal-periferi med Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/cookbooks/arduino_peripherals.md); [trmnl-firmware `board_config.cpp`](https://github.com/usetrmnl/trmnl-firmware/blob/main/src/board_config.cpp); [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md)
- En tredjepartsside sier at D2, D6 og D7 har oppgaver ved oppstart eller i systemet. Kilden er ikke offisiell. — [espboards.dev](https://www.espboards.dev/esp32/xiao-esp32s3-plus/)

### Inferences
- **Opptelling for TRMNL-settet.** Brukt: GPIO1, 2, 3, 4, 5, 6, 7, 9, 10, 38 og 44, altså 11 pinner. Ledig: GPIO8 (MISO, som et e-papir uten tilbakelesing trolig ikke trenger), GPIO43 (TX) og GPIO11, 12, 13, 39, 40, 41, 42. Det gir **9 ledige**, og Vane trenger 9:

  | Behov | Antall |
  |---|---|
  | I²S | 3 |
  | Lysstripe (data) | 1 |
  | Dreieknapp | 3 |
  | Kapasitiv berøring | 1 |
  | Summer | 1 |

- To pinner kan spares ved å bruke en av de tre innebygde knappene (GPIO2, 3 eller 5) som trykk i stedet for dreieknappens egen bryter. Da trenger dreieknappen bare A og B.
- Kapasitiv berøring på ESP32-S3 går bare på GPIO1–14, ifølge Espressifs datablad. Det er ikke sjekket i denne økten fordi docs.espressif.com var blokkert. Av de ledige pinnene kan i så fall bare GPIO8, 11, 12 og 13 brukes til berøring.
- GPIO39–42 er JTAG-pinner. De kan brukes som vanlige GPIO, men da går JTAG-feilsøking tapt.
- **Lodding.** EE04-familien har ingen utvidelseslist, og sju av de ni ledige pinnene ligger på Plus-modulens undersideputer eller B2B-kontakt. Utvidelse uten lodding er derfor neppe mulig på TRMNL-kortet.
- **reTerminal E1001** har enda færre ledige pinner. Den har allerede summer, knapper, SD-kort og sensor. Utvidelseslisten har 8 pinner inkludert strøm, og det holder ikke til I²S + lys + dreieknapp + berøring uten en I/O-utvider på I²C.

### Gaps
- Skjemaet for driverkortet (`XIAO_ePaper_driver_board_sch.pdf` på files.seeedstudio.com) var blokkert. Det er altså ikke bekreftet om kortet har loddeputer eller list for GPIO8, 43, 11–13 eller 39–42, eller om XIAO-en sitter i sokkel eller er loddet fast.
- Pinnerekkefølgen på reTerminal E1001s 8-pins list ble ikke funnet.

---

## Spørsmål 3: Hvilke alternativer finnes til settet, og hva følger med?

### Takeaway
Det finnes tre typer alternativer:
- **Løse deler:** panel + adapterkort + eget ESP32-S3-utviklingskort. Fra Good Display (GDEY075T7 + DESPI-C02) eller Waveshare (7,5" V2 + driverkort/HAT). Gir flest ledige pinner og bare pluggkoblinger.
- **Ferdige enheter:** reTerminal E1001 (69 USD) og XIAO 7.5" ePaper Panel (69 USD). Begge har kasse.
- E1001 er den mest komplette ferdige enheten: metallkasse, 3 knapper, summer, temperatur- og fuktsensor, sanntidsklokke og microSD. Den har ingen høyttaler og lite plass til utvidelser.

### Cited Findings
**(c) reTerminal E1001**
- ESP32-S3 med 8 MB PSRAM og 32 MB flash, microSD opptil 32 GB, Wi-Fi 4 og BT 5.0.
- 7,5" 800×480 svart/hvitt med 4 gråtoner, delvis oppfrisking, oppfrisking på 2–5 s.
- Temperatur- og fuktsensor og summer. Mikrofonen er «reserved» på E1001–E1003.
- 2000 mAh batteri som holder i ~3 måneder, USB-C 5 V/1 A, drift fra 0 til 40 °C.
- Metallkasse på 176 × 120 × 53 mm med fot (17 mm uten), 8-pins list (UART/I²C/GPIO), sertifisert FCC/CE/UKCA.
- **Veiledende pris 69,00 USD** (wiki oppdatert 2026-09-10).
— [Seeed wiki, reTerminal E-serien (kilde)](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md), offentlig side [wiki.seeedstudio.com/reterminal_e10xx_main_page](https://wiki.seeedstudio.com/reterminal_e10xx_main_page/)
- Wikien har en ESPHome-oppskrift for «PCF8563 RTC, microSD og innebygd PDM-mikrofon». Det spriker litt med «reserved» i spesifikasjonstabellen. — [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md)
- Lys på GPIO6, summer på GPIO45 (passiv PWM, kan spille melodier), 3 knapper og SHT4x-sensor. — [reTerminal-periferi](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/cookbooks/arduino_peripherals.md)
- Søsterenheter:

  | Modell | Skjerm | Delvis oppfrisking | Veil. pris |
  |---|---|---|---|
  | E1002 | 7,3" Spectra 6, farger | nei (15–20 s) | 99 USD |
  | E1003 | 10,3" berøring | ja | 159,90 USD |
  | E1004 | 13,3" farger | nei | 279,90 USD |

  — [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md)
- Butikkpriser for E1001:

  | Butikk | Pris | Merknad |
  |---|---|---|
  | Switch Science | 69 USD uten skatt / 14 425 ¥ inkl. skatt | |
  | OpenELAB | 78,49 USD | før 99,99 |
  | Amazon USA | 89,99 USD | 2026-05-12 |
  | Smarthome UK | 79,99 £ | utsolgt |
  | Pakronics | 143,32 AUD | |
  | RS UK | ukjent pris | oppført, varenr. 0830749 |

  — [Switch Science](https://www.switch-science.com/products/10802); [OpenELAB](https://openelab.com/products/seeed-studio-reterminal-e1001-monochrome-epaper-display); [SpecPicks](https://specpicks.com/product/B0FRFHVHNZ); [Smarthome UK](https://smarthomeshopuk.com/products/reterminal-e1001-7-5-monochrome-epaper-display-esp32-s3); [Pakronics](https://www.pakronics.com.au/products/reterminal-e1001-monochrome-epaper-display-ss100073581); [RS UK](https://uk.rs-online.com/web/p/hmi-displays/0830749); [CNX Software (sept. 2025)](https://www.cnx-software.com/2025/09/06/reterminal-e1001-e1002-esp32-s3-monochrome-color-epaper-displays/)

**(c) Seeed XIAO 7.5" ePaper Panel**
- Leveres med 3D-printet kasse i hvit PLA med fot, 178 × 131 × 19 mm.
- Priser:

  | Kilde | Pris | Merknad |
  |---|---|---|
  | CNX (april 2025) | 59 USD forhåndspris, 69 USD ordinær | |
  | RobotShop USA | 84,57 USD | |
  | RobotShop EU | 86,54 € | venter på påfyll |
  | Smarthome UK | 87,99 £ | |
  | Unmanned UK | 59,99 £ | utsolgt |

  — [CNX Software](https://www.cnx-software.com/2025/04/04/seeed-studio-xiao-7-5-epaper-panel-supports-esphome-firmware-arduino-programming/); [RobotShop](https://www.robotshop.com/products/seeedstudio-xiao-75-epaper-panel); [RobotShop EU](https://eu.robotshop.com/products/seeedstudio-xiao-75-epaper-panel); [Smarthome UK](https://smarthomeshopuk.com/products/xiao-7-5-epaper-panel); [Unmanned Tech](https://www.unmannedtechshop.co.uk/products/xiao-7-5-epaper-panel-for-home-assistant)
- Seeeds produktoversikt plasserer «XIAO 7.5" Panel» blant «All ESP32-S3 products» og oppgir TRMNL- og ESPHome-støtte. — [Seeed ePaper-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/seeed_epaper_displays.md)

**(b) Good Display GDEY075T7 + adapter**
- GDEY075T7: 7,5" svart/hvitt, 800×480, styrebrikke UC8179, SPI, 4 gråtoner. — [buyepaper (Good Display)](https://en.buyepaper.com/products/gdey075t7); [Good Display produkt 396](https://www.good-display.com/product/396.html); [datablad hos LaskaKit](https://www.laskakit.cz/user/related_files/gdey075t7.pdf)
- Pris: 38,80 USD hos buyepaper. Det er uklart om prisen gjelder bare panelet. — [buyepaper](https://buyepaper.com/products/gdey075t7)
- Adapterkortet DESPI-C02 (24-pins SPI-adapter, 41 × 22 mm) koster 6,99 USD. — [buyepaper DESPI-C02](https://en.buyepaper.com/products/development-kit-connection-adapter-board-for-eaper-display-demo-kit)
- Good Displays ESP32-L hovedkort koster 14,58 USD. Det har klassisk ESP32, ikke S3. — [buyepaper ESP32-L](https://buyepaper.com/products/main-board-esp32-arduino-esp32-development-platform-for-driving-e-paper-display)
- Evelta i India: 4145 INR inkl. GST. — [Evelta](https://evelta.com/7-5-inch-800x480-e-ink-screen-e-paper-display-black-white/)

**(a) Waveshare 7,5" V2 + driverkort**
- Waveshare markerer svart/hvitt-panelet på 7,5" med «Partial Refresh Support», med 0,4 s delvis oppfrisking i én spesifikasjonstabell. — [Waveshare 7.5inch e-Paper](https://www.waveshare.com/product/displays/e-paper/7.5inch-e-paper.htm)
- Opencircuit (NL): Waveshare 800×480 7,5" panel uten kort for 66,25 €, «tilgjengelig fra 2026-08-15». — [Opencircuit](https://opencircuit.shop/product/800-480-7.5inch-e-ink-raw-display)
- Waveshare (B) i tre farger: 45,27–47,99 USD. — [Waveshare 7.5inch e-Paper (B)](https://www.waveshare.com/product/displays/e-paper/7.5inch-e-paper-b.htm)
- The Pi Hut: laminert glasspanel i svart/hvitt for 67,20 £ inkl. mva. — [The Pi Hut](https://thepihut.com/products/7-5-e-paper-raw-panel-fully-laminated-800x480)
- Waveshare Universal e-Paper Raw Panel Driver Board (ESP32, klassisk): 14,19–14,99 USD. Switch Science: 2739 ¥ inkl. skatt. LCSC: rundt 12,33 USD for én. — [Waveshare e-paper-liste](https://www.waveshare.com/product/displays/e-paper.htm?p=3); [Switch Science](https://www.switch-science.com/products/10905); [LCSC-datablad](https://datasheet.lcsc.com/lcsc/2303281130_Waveshare-e-Paper-ESP32-Driver-Board_C5374679.pdf)
- Waveshare Universal e-Paper Raw Panel Driver HAT Rev 2.3 trenger at PWR kobles til VCC eller settes høy. Waveshare-kort med «clever» reset-krets kan trenge kortere reset-puls (`init(115200, true, 2, false)`). — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2/blob/master/README.md)

**Eget ESP32-S3-utviklingskort**
- ESP32-S3-DevKitC-1 N16R8:

  | Kilde | Pris |
  |---|---|
  | Prissporer USA | 8,99 USD |
  | camelcamelcamel | 9,99 USD (2026-06-06) |
  | Spotpear | 11,9 USD |
  | Mouser India | 1264,95 INR |
  | Fruugo | 15,95–48,95 USD |

  Kortene finnes med og uten påloddede lister («Welding / No Welding»). — [Spotpear](https://spotpear.com/shop/ESP32-S3-WROOM-1-DEV-KIT-N8R8-N16R8/ESP32-S3-DEV-KIT-N16R8.html); [camelcamelcamel](https://camelcamelcamel.com/product/B0FNQG84SN); [Mouser IN](https://www.mouser.in/c/?marcom=177331180); [Fruugo](https://www.fruugo.ca/esp32-s3-devkitc-1-development-board-module-equipped-with-the-esp32-s3-1-n16r8-module-wifi-welding/p-448645146)

**Seeeds egne løse deler**
- 7,5" svart/hvitt-panel (SKU 104990861): 35,00 USD uten mva i et Comet.bg-datablad fra 2026-06-01, der valutaen er litt uklar. Pakronics: 84,85 AUD inkl. GST. — [Comet.bg-datablad](https://store.comet.bg/download-file.php?id=30831); [Pakronics](https://www.pakronics.com.au/products/7-5-monochrome-epaper-display-with-800x480-pixels-ss104990861)
- ePaper Driver Board for XIAO: 4,90 USD. — [Hackster](https://hackster.io/news/seeed-studio-grows-the-small-xiao-ecosystem-with-new-add-on-boards-2ba2bb5a5382.amp)
- Adafruit selger også et 7,5" 800×480 UC8179-panel (nr. 6396). Prisen ble ikke hentet. — [Adafruit 6396](https://www.adafruit.com/product/6396)

### Inferences
- Settets panel bruker UC8179 og har 0,34 s delvis oppfrisking, akkurat som Good Displays tall for GDEY075T7. Panelet i TRMNL-settet og i E1001 er derfor trolig samme panelfamilie som GDEY075T7. Det er en slutning, ikke bekreftet av Seeed.
- **Waveshare V2 og GxEPD2.** GxEPD2 sier at Waveshare-paneler skal sammenlignes med tilsvarende Good Display-panel («same panel»). Waveshare 7,5" V2 knyttes vanligvis til GDEW075T7 (driveren `GxEPD2_750_T7`). Den har tregere tider enn GDEY075T7 (se spørsmål 5). Hvilken styrebrikke nyere V2-paneler fra Waveshare har, ble ikke bekreftet.
- Waveshares ESP32-driverkort har klassisk ESP32, ikke S3. For S3 trengs Waveshares e-Paper Driver HAT eller Good Displays DESPI-C02 + et eget S3-kort, koblet med Dupont-ledninger.
- **E1001 som utgangspunkt:** klokke, sanntidsklokke, summer, knapper og kasse er klare. Men det må lages egen kasse for lampe og høyttaler uansett, og E1001 har ingen I²S-høyttaler, så alarmlyden må komme fra en ekstern forsterker gjennom en liten list. Den lukkede metallkassen gjør det vanskelig å bygge inn lampe og diffusor.
- **XIAO 7.5" Panel** har bare en PLA-kasse og ingen ekstra periferi. Det gir lite i forhold til TRMNL-settet, og det koster 24 USD mer.

### Gaps
- Waveshares egen pris i dag for svart/hvitt-panelet V2 (uten kort) og for «e-Paper Driver HAT» ble ikke funnet, fordi waveshare.com var blokkert.
- Ingen AliExpress-priser for GDEY075T7 eller Waveshare 7,5" V2 ble funnet. Søkene ga ikke AliExpress-treff, og domenet var blokkert.
- Hvilken mikrokontroller XIAO 7.5" Panel har, ble ikke bekreftet. Seeeds oversikt plasserer det blant ESP32-S3-produktene, men det ble ikke sjekket mot produktsiden.
- Det er uklart om buyepapers 38,80 USD for GDEY075T7 gjelder bare panelet.

---

## Spørsmål 4: Hva koster hvert alternativ i NOK inkl. 25 % mva og frakt, for 1, 10 og 100 stk?

### Takeaway
For én prototype: TRMNL-settet ≈ 520–590 NOK, Good Display med eget S3-kort ≈ 640–670 NOK, og reTerminal E1001 / XIAO-panelet ≈ 800–900 NOK, alle inkl. mva. Med Waveshare-panelet fra en EU-butikk blir det ≈ 1000 NOK. Frakt kommer i tillegg, og prisen på den ble ikke funnet. Ingen leverandør oppgir mengdepriser for 10 eller 100 stk. De må forhandles.

### Cited Findings
- **VOEC:** utenlandske nettbutikker som er VOEC-registrert, krever inn norsk mva i kassen for varer under 3000 NOK per vare. For andre sendinger krever toll eller transportør inn mva ved innførsel. — [Toll.no, VOEC-ordningen](https://toll.no/en/online-shopping/the-voec-scheme); [Posten, mva og toll](https://www.posten.no/en/customs/receiving-from-abroad)
- Seeeds lager i Tyskland krever mva etter mottakerlandets sats. Seeed kan legge til toll for ordrer fra utenfor EU til EU, i tillegg til frakt og gebyr. Artikkelen nevner ikke Norge. — [Seeed support, DE-lager](https://support.seeed.cc/portal/en/kb/articles/customs-duties-and-taxes-for-de-warehouses)
- **Mengdepriser:** OpenELABs sider for Seeeds ePaper-sett sier at mengdepris gis på forespørsel med pristilbud. Ingen faste trinn er oppgitt. — [OpenELAB, XIAO ePaper Kit](https://openelab.io/products/seeed-studio-xiao-epaper-kit)
- Enhetspriser for løse deler som grunnlag for større serier: Seeeds panel 35 USD uten mva, Seeeds XIAO-driverkort 4,90 USD, Good Displays GDEY075T7 38,80 USD, DESPI-C02 6,99 USD, Waveshares ESP32-driverkort ~12,33 USD hos LCSC og ESP32-S3-DevKitC ~9–12 USD. — kilder i spørsmål 3.

### Inferences
**Én prototype** (kurs 9,30 NOK/USD og 10,45 NOK/EUR; frakt ikke med):

| Alternativ | Grunnlag | NOK inkl. 25 % mva |
|---|---|---|
| TRMNL 7.5" OG DIY Kit (Seeed) | 44,90 USD uten mva | **≈ 522** |
| TRMNL-settet (OpenELAB, EU) | 53,85 € inkl. EU-mva | ≈ 563–590 |
| GDEY075T7 + DESPI-C02 + ESP32-S3-DevKitC | 38,80 + 6,99 + 9–12 USD | **≈ 640–670** |
| reTerminal E1001 | veil. 69 USD uten mva | **≈ 802** (OpenELAB 78,49 USD ≈ 730–910) |
| XIAO 7.5" ePaper Panel | 69 USD (RobotShop EU 86,54 €) | ≈ 802–904 |
| Waveshare 7,5" panel (Opencircuit) + ESP32-driverkort + S3-kort | 66,25 € + 14,99 USD + 9–12 USD | ≈ 1000 (panel 692 + kort 174 + S3 105–138) |
| Seeed-panel + Seeed XIAO-driverkort + XIAO ESP32-S3 | 35 + 4,90 USD + ukjent | ≈ 465 + XIAO |

- **10 stk:** ingen trinnpris er publisert. Regn med omtrent samme pris per stk som for én. Frakten deles på ti, så den betyr mindre per enhet.
  - 10 TRMNL-sett ≈ 5220 NOK inkl. mva + én frakt.
  - Hver vare er under 3000 NOK, så VOEC kan gjelde hvis selgeren er registrert.
- **100 stk:** pristilbud fra Seeed eller Good Display. Ut fra løse deler (panel 35–39 USD + adapter 5–7 USD + S3-modul eller -kort 9–12 USD) blir bunnen **≈ 49–58 USD**, altså ≈ 455–540 NOK uten mva eller **≈ 570–675 NOK inkl. mva** per enhet, før frakt, kasse, lampe og lyd. For TRMNL-settet ligger listeprisen på ≈ 420 NOK uten mva. En eventuell rabatt for 100 stk er ukjent.
- Settet har litiumbatteri. Det kan gjøre frakten av mange sett dyrere eller tregere. Vane går på strøm, så en serieversjon kan droppe batteriet.

### Gaps
- Faktisk frakt til Trondheim fra Seeed, Good Display, Waveshare, OpenELAB og RobotShop er ukjent (sidene var blokkert).
- Om Seeed, OpenELAB eller Good Display/buyepaper er VOEC-registrert, er ikke bekreftet.
- Seeeds trinnpriser (1–9, 10–49, 100+) var ikke synlige uten tilgang til seeedstudio.com. Mengdepris for GDEY075T7 fra Good Display eller LCSC ble ikke funnet.
- Prisen på XIAO ESP32-S3 Plus alene ble ikke funnet.

---

## Spørsmål 5: Støtter panelet delvis oppfrisking, hvor fort går det, og virker det med GxEPD2 og TRMNL-fastvaren?

### Takeaway
Ja. GDEY075T7-klassen (UC8179) har delvis oppfrisking på ~0,34–0,45 s og rask full oppfrisking på ~1,2 s i GxEPD2. Det eldre GDEW075T7-panelet (det Waveshare V2 vanligvis knyttes til) bruker ~1,6 s delvis og ~4,2 s full. Både TRMNL-settet og E1001 har egne mål i TRMNL-fastvaren. Seeed sier at GxEPD2 kan brukes, men anbefaler sitt eget Seeed_GFX.

### Cited Findings
- GxEPD2 (versjon 1.6.9), `GxEPD2_750_GDEY075T7`: `hasPartialUpdate = true`, `hasFastPartialUpdate = true`, `full_refresh_time = 1200` ms, `partial_refresh_time = 450` ms, `power_on_time = 140` ms. `useFastPartialUpdateFromOTP = true` skal settes til `false` «for earlier batches». — [GxEPD2_750_GDEY075T7.h](https://github.com/ZinggJM/GxEPD2/blob/master/src/gdey/GxEPD2_750_GDEY075T7.h); [library.properties](https://github.com/ZinggJM/GxEPD2/blob/master/library.properties)
- Endringsloggen i GxEPD2 sier at «the actual GDEY075T7 panels have fast full refresh capability». Den nevner også at Power Save (PWS) er lagt til i init for GDEY075T7 på grunn av et problem med dithrede bilder, og at `writeImageToPrevious` er lagt til for GDEY075T7. — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2/blob/master/README.md)
- GxEPD2 `GxEPD2_750_T7` (GDEW075T7, GD7965): full oppfrisking 4200 ms, delvis 1600 ms. — [GxEPD2_750_T7.h](https://github.com/ZinggJM/GxEPD2/blob/master/src/epd/GxEPD2_750_T7.h)
- GxEPD2 sier at Waveshare-paneler skal sammenlignes med Good Display («same panel»). Lista over Good Display-paneler har GDEW075T7 (EK79655/GD7965) og GDEY075T7 (UC8179). — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2/blob/master/README.md)
- Good Display / buyepaper oppgir tallene 3,5 / 1,5 / 0,34 s for GDEY075T7. Kolonnenavnene var uklare i utdraget. En annen tabell sier «3». — [buyepaper](https://en.buyepaper.com/products/gdey075t7); [Goodereader](https://goodereader.com/blog/?p=240885)
- Seeed: settet har 0,34 s delvis og 3,5 s full oppfrisking. E1001 har delvis oppfrisking og «2–5 s refresh». — [TRMNL-sett](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md); [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md)
- Seeed anbefaler `Seeed_GFX`, men skriver at «you can drive Seeed ePaper with [GxEPD2] as well». — [Seeed, Work with Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/Application/work_with_arduino.md)
- Settets Arduino-oppskrift har et klokkeeksempel som tegner bare det som endres (delvis oppdatering) med Seeed_GFX. — [TRMNL-sett med Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/cookbooks/arduino.md)
- TRMNL-fastvaren har byggemålene `TRMNL_7inch5_OG_DIY_Kit`, `seeed_reTerminal_E1001` (med `PIN_BUZZER=45`), `waveshare-esp32-driver` og `seeed_xiao_esp32s3`. Den tegner med `bb_epaper`, ikke GxEPD2. Den har temperaturprofiler per paneltype («3 per size»). — [platformio.ini](https://github.com/usetrmnl/trmnl-firmware/blob/main/platformio.ini); [config.h](https://github.com/usetrmnl/trmnl-firmware/blob/main/include/config.h); [board_config.cpp](https://github.com/usetrmnl/trmnl-firmware/blob/main/src/board_config.cpp)
- Seeed lister ESPHome, TRMNL, Arduino, PlatformIO, SenseCraft Seeedash og Zephyr (E1001–E1003) som støttet programvare. — [Seeed ePaper-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/seeed_epaper_displays.md)
- Waveshare 7,5" svart/hvitt: «Partial refresh time 0.4s». En brukeranmeldelse advarer om at delvis oppfrisking ikke kan brukes hele tiden. Full oppfrisking må kjøres jevnlig, ellers bygger det seg opp spøkelsesbilder. — [Waveshare 7.5inch e-Paper](https://www.waveshare.com/product/displays/e-paper/7.5inch-e-paper.htm)

### Inferences
- Klokke på 7,5" GDEY075T7: minuttet kan byttes med delvis oppfrisking (~0,45 s) uten blink. Det bør kjøres en full oppfrisking (~1,2 s) med jevne mellomrom, for eksempel hver time eller når fasen skifter, for å fjerne spøkelsesbilder. Om natta bør hele skjermen ligge i ro.
- E-papir lyser ikke selv. Lyskravet om natta i AGENTS.md («ingen ting skal lyse») er derfor bare et spørsmål om lampa og lysdiodene på kortet. På E1001 gjelder det lyset på GPIO6. På XIAO-en gjelder det ladelyset, som ifølge pinnekartet sitter på `VCC_3V3` og trolig ikke kan styres fra programvaren.
- Vane bør ha egen fastvare (GxEPD2 eller Seeed_GFX) og ikke TRMNL-fastvaren, som henter bilder fra en sky eller BYOS-server. Siden fasene regnes ut i `evaluate` på Macen, kan Mac-serveren likevel lage hele skjermbildet og sende det til klokka. TRMNL kaller det BYOS, og Terminus er en selvdriftet BYOS-server. Det er en mulig arkitektur, ikke undersøkt videre her.

### Gaps
- Målte tider for delvis oppfrisking på Waveshare 7,5" V2 med GxEPD2 ble ikke funnet. Bare Waveshares påstand om 0,4 s og GxEPD2s tall for GDEW075T7 (1,6 s) er kjent.
- Temperaturgrenser for delvis oppfrisking på GDEY075T7 (datablad) ble ikke lest, fordi good-display.com var blokkert.

---

## Spørsmål 6: Hvilket alternativ er enklest å bygge med bare pluggkoblinger, og hvilke kjente problemer finnes?

### Takeaway
- **Display alene uten lodding:** TRMNL-settet (FPC + JST) eller E1001 (ferdig).
- **Med Vanes 9 ekstra signaler uten lodding:** løse deler. Good Display DESPI-C02 eller Waveshare-HAT + ESP32-S3-DevKitC med påloddede lister og Dupont-ledninger.

Kjente problemer:
- spøkelsesbilder ved delvis oppfrisking, nylig i TRMNL 1.8.18
- E1001 som ikke tegner med visse versjoner av `bb_epaper`
- falming ved mønstre med mye høyfrekvent innhold, for eksempel dithering
- skjør FPC-kabel
- 3,3 V-strøm til 7,5" paneler
- ujevn lagerstatus

### Cited Findings
- Settet: FPC-kabelen festes med lås, metallsiden opp. Batteriet kobles i en JST-kontakt. Det trengs ikke lodding. «The ribbon cable is fragile … Avoid bending it sideways.» Antennen kan flyttes ut av kassen for bedre Wi-Fi. — [TRMNL-sett](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md); [TRMNL-sett med Arduino](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/cookbooks/arduino.md)
- EE04-familien har ingen utvidelsesport («Extension IO Port: /»). — [Seeed wiki, EE04](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/Expansion_Board_Series/ESP32_Series/EE04_GettingStart.md)
- **TRMNL-sak #790** (2026-10-31): OG-skjermen fikk spøkelsesbilder etter fastvare 1.8.18 og «blinker» bare én gang. **PR #792** (lukket 2026-10-31) løser det ved å låse `bb_epaper` og bruke init-verdiene for 7,5" fra 2.1.9. Testet med oppfrisking hvert 60. sekund: 7 rene delvise oppfriskinger på rad. — [Sak #790](https://github.com/usetrmnl/trmnl-firmware/issues/790); [PR #792](https://github.com/usetrmnl/trmnl-firmware/pull/792)
- **TRMNL-sak #502** (2026-07-18): E1001 med fastvare 1.8.10 tegner ikke nye bilder. **PR #563** (åpen, 2026-08-19): med `bb_epaper` 2.1.9 viser panelet ingenting. Årsaken er en init uten BUSY-håndtrykk. OG-panelet tåler det, E1001-styrebrikken gjør ikke. — [PR #563](https://github.com/usetrmnl/trmnl-firmware/pull/563)
- **TRMNL-sak #768** (2026-10-23): bilder med mye høyfrekvent innhold (pikselpar av/på, altså dithering) gir falming og spøkelser på øvre del av skjermen, gradvis bedre nedover. Det skjer i alle oppfriskingsmoduser. — [Sak #768](https://github.com/usetrmnl/trmnl-firmware/issues/768)
- Andre åpne saker om spøkelsesbilder gjelder TRMNL X (#509, #795), ikke 7,5" OG. — [Sak #509](https://github.com/usetrmnl/trmnl-firmware/issues/509); [Sak #795](https://github.com/usetrmnl/trmnl-firmware/issues/795)
- GxEPD2:
  - «7.5" e-paper displays don't work reliable if fed from 3.3V Arduino pin»
  - Panelene trenger 3,3 V forsyning og datalinjer. Nyere Waveshare-kort har nivåomformer.
  - Endringsloggen nevner en motstand på DESPI-C02 («RESE needs to be 3 ohms on DESPI-C02 for this panel»). Det gjelder et bestemt panel og er ikke bekreftet for 7,5".
  — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2/blob/master/README.md)
- GxEPD2: for eldre partier av GDEY075T7 må `useFastPartialUpdateFromOTP` settes til `false`. — [GxEPD2_750_GDEY075T7.h](https://github.com/ZinggJM/GxEPD2/blob/master/src/gdey/GxEPD2_750_GDEY075T7.h)
- GxEPD2, generelt for andre paneler: rask delvis oppdatering støttes bare i vanlig temperaturområde og bør slås av ved ekstreme temperaturer (`hasFastPartialUpdate = false`). — [GxEPD2 README](https://github.com/ZinggJM/GxEPD2/blob/master/README.md)
- Temperatur: E1001 oppgir drift fra 0 til 40 °C. Settets wiki oppgir −40 til 85 °C. — [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md); [TRMNL-sett](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/trmnl_7inch5_diy_kit/getting_started_with_trmnl_kit.md)
- Lagerstatus:

  | Vare | Butikk | Status |
  |---|---|---|
  | TRMNL-settet | RobotShop | «re-stocking soon» |
  | TRMNL-settet | Unmanned UK | utsolgt |
  | E1001 | Smarthome UK | utsolgt |
  | XIAO-panelet | Unmanned UK, Pakronics | utsolgt |
  | XIAO-panelet | RobotShop EU | venter på påfyll |
  | Waveshare-panelet | Opencircuit | «tilgjengelig fra 2026-08-15» |

  — kilder i spørsmål 1 og 3.

### Inferences
**Enklest uten lodding, rangert:**
1. **ESP32-S3-DevKitC (med lister) + GDEY075T7 på DESPI-C02** eller **Waveshare 7,5" V2 + e-Paper Driver HAT**, koblet med Dupont-ledninger. 6 signaler går til e-papiret, og det er mange ledige pinner til I²S, lys, dreieknapp, berøring og summer. Brødbrett eller skrueklemmer holder.
2. **TRMNL-settet:** panelet er enkelt å koble, men ekstra periferi krever trolig lodding på XIAO-modulen (se spørsmål 2).
3. **E1001:** ferdig, men lukket metallkasse og en 8-pins list gir lite rom for lampe og lyd.

**Temperatur:** et soverom på 15–25 °C er innenfor normalområdet for alle alternativene. Settets −40 til 85 °C er trolig kortets verdi, ikke panelets, og bør ikke brukes som panelgrense.

**Råd mot falming (sak #768):** unngå dithrede bilder (som værikoner med raster) på 7,5"-panelet. Bruk rene svart/hvitt-flater og gråtoner.

**Programvare:** med egen GxEPD2-fastvare unngås `bb_epaper`-feilene i TRMNL-fastvaren (#790/#563). Fallgruvene med eldre panelpartier og strømforsyning gjelder fortsatt.

### Gaps
- Om det er nok plass rundt 24-pins FPC-kontakten til å bruke settets 10 cm forlenger i en egen kasse med lampe, ble ikke vurdert.

---

## Spørsmål 7: Hvilke produkter passer best, og hvorfor?

### Takeaway
Til prototypen anbefales **GDEY075T7 + DESPI-C02 + ESP32-S3-DevKitC-1 N16R8**. Det koster ≈ 640–670 NOK inkl. mva før frakt. Panelet er raskest i GxEPD2, det er mange ledige pinner, alt kan kobles uten lodding, og det er den billigste veien mot 100 stk. **TRMNL-settet** (≈ 522 NOK) er det billigste og raskeste for å teste skjerm og batteri, men det har for få pinner som kan brukes uten lodding. **reTerminal E1001** (≈ 802 NOK) er best som ferdig «skjermdel» hvis lampe og lyd legges i en egen enhet.

### Cited Findings
- GDEY075T7 har rask full oppfrisking (1,2 s) og delvis oppfrisking (0,45 s) i GxEPD2. GDEW075T7 har 4,2 s og 1,6 s. — [GxEPD2_750_GDEY075T7.h](https://github.com/ZinggJM/GxEPD2/blob/master/src/gdey/GxEPD2_750_GDEY075T7.h); [GxEPD2_750_T7.h](https://github.com/ZinggJM/GxEPD2/blob/master/src/epd/GxEPD2_750_T7.h)
- Settets driverkort bruker 11 GPIO og har ingen utvidelsesport. — [trmnl-firmware board_config.cpp](https://github.com/usetrmnl/trmnl-firmware/blob/main/src/board_config.cpp); [Seeed wiki, EE04](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/Expansion_Board_Series/ESP32_Series/EE04_GettingStart.md)
- E1001 har summer, 3 knapper, sanntidsklokke, sensor og metallkasse for 69 USD. — [reTerminal-oversikt](https://github.com/Seeed-Studio/wiki-documents/blob/docusaurus-version/sites/en/docs/Sensor/ePaper_Displays/reTerminal_E10xx/reterminal_e10xx_main_page.md)

### Inferences
- **Prototype:** GDEY075T7 + DESPI-C02 + ESP32-S3-DevKitC-1 N16R8. Det gir ≈ 30 ledige GPIO på et vanlig DevKitC (antall ikke sjekket i denne økten), plugg-og-ledning-montering, og GxEPD2 med testede tider. Alternativt kan Waveshare 7,5" V2 + HAT brukes hvis det finnes på lager i en EU-butikk. Det er dyrere i Opencircuits liste og tregere hvis det er et GDEW075T7-panel.
- **Billig skjermtest først:** et TRMNL-sett til ≈ 522 NOK gir panel, ESP32-S3 og batteri for under prisen av panel + adapter + S3-kort. Det kan senere brukes som «papirdel» med periferi koblet via I²C (for eksempel en I/O-utvider) på de få ledige pinnene, eller med lodding.
- **Serie med 10–100 stk:** egendesignet kretskort med ESP32-S3-modul + GDEY075T7 (eller Seeeds 7,5"-panel, 35 USD) kjøpt direkte fra Good Display eller Seeed etter pristilbud. Det gir ≈ 49–58 USD i elektronikk for papirdelen, før lampe, lyd og kasse.
- Den gjennomskinnelige diffusoren må 3D-printes uansett. E1001s metallkasse og XIAO-panelets PLA-kasse kan ikke ta en lampe uten at kassen bygges om. Ferdigkassene gir derfor lite for denne retningen.

### Gaps
- Hvor mange GPIO ESP32-S3-DevKitC-1 har ledig, ble ikke sjekket i denne økten (Espressifs dokumentasjon var blokkert).
- Ingen praktisk test eller anmeldelse sammenligner GDEY075T7 med panelet i TRMNL-settet, så det er ikke bekreftet at de er like.
