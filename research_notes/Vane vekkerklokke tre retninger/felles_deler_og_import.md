# Felles deler, priser og import til Norge (ESP32-S3-vekkerklokke med soloppgangslys)

Undersøkt 9. november 2026. Alle søk er gjort denne datoen. Forbehold om metoden: WebFetch var sperret for alle verter i økta (toll.no, skatteetaten.no, jlcpcb.com, bytt.no, norges-bank.no; curl mot data.norges-bank.no fikk 403 fra proxyen). Funnene bygger derfor på søkeresultater og utdrag fra søkemotoren, ikke på fulle sider. Tallene bør sjekkes mot de levende sidene før bestilling. Skal primærkildene leses, må vertene toll.no, skatteetaten.no, norges-bank.no og jlcpcb.com tillates i øktas nettverksinnstillinger.

Omregning i hele notatet (se avsnittet om valuta): **1 USD = 9,30 NOK** (9,2978, 2. nov. 2026) og **1 EUR = 10,41 NOK** (10,413, 2. nov. 2026). GBP-, AUD- og CNY-priser er ikke regnet om fordi jeg ikke fant en datert kurs. «Inkl. mva.» betyr norsk mva. på 25 %.

## 1. Valutakurser (USD→NOK, EUR→NOK)

### Takeaway
Tidlig i november 2026 lå USD/NOK rundt 9,30 og EUR/NOK rundt 10,41. Kronen hadde styrket seg gjennom oktober. Norges Banks egne kurser kunne ikke hentes.

### Cited Findings
- USD/NOK midtkurs 9,2978 den 2. november 2026. Kursen falt gjennom oktober fra omtrent 9,6 til omtrent 9,2. — [CurrencyBeacon USD/NOK](https://currencybeacon.com/rates/USD/NOK)
- Wise viser 1 USD = 9,293 NOK (udatert). En annen side viser 9,5080 (udatert). — [Wise USD→NOK](https://wise.com/us/currency-converter/usd-to-nok-rate/history); [bestexchangerates](https://bestexchangerates.com/rates/usd-to-nok?amount=1000)
- EUR/NOK 10,413, sist oppdatert 2. november 2026 kl. 22:05 GMT. — [Currencylive](https://currencylive.com/exchange-rate/20-eur-to-nok-exchange-rate-today/)
- Tidligere i 2026: EUR/NOK cirka 10,75 den 7. oktober 2026 og 10,97 den 5. august 2026. — [currencyconvert.online](https://currencyconvert.online/eur/nok/100); [OFX](https://www.ofx.com/en-gb/exchange-rates/eur-to-nok/)
- Norges Bank holdt styringsrenten på 4,50 % i november 2026 (via en Nomura-kommentar). — [FXStreet/Nomura, 5. nov. 2026](https://www.fxstreet.com/news/norwegian-krone-gradual-disinflation-delays-rate-cuts-nomura-202611051200)

### Inferences
- Kursene over gir EUR/USD ≈ 1,12, som henger sammen. Kortkjøp (AliExpress, Mouser) får typisk et påslag fra banken eller kortselskapet på 1–2 % over midtkurs. Det er ikke kildebelagt her, men bør tas med i en sikkerhetsmargin.
- Kronen har svingd med cirka 5 % over høsten 2026. Ved budsjettering bør man regne med ±5 % på priser i USD og EUR.

### Gaps
- Norges Banks offisielle dagskurser (norges-bank.no / data.norges-bank.no) var sperret i økta. Tallene over er midtkurser fra kommersielle sider.
- Jeg fant ingen datert GBP/NOK-, AUD/NOK- eller CNY/NOK-kurs, så priser fra The Pi Hut (GBP), Core Electronics (AUD) og element14 Kina (CNY) er ikke regnet om.

## 2. Komponentpriser (1, 10 og 100 stk.)

### Takeaway
Originaldelene fra Adafruit har oppgitte kvantumspriser: MAX98357A koster 5,95/5,36/4,76 USD (≈ 55/50/44 kr eks. mva.), og en 12-LED RGBW-ring i varm hvit koster 9,50/8,55/7,60 USD (≈ 88/80/71 kr). En SK6812-stripe med 60 LED/m koster cirka 80–100 kr per meter fra vestlige forhandlere. Mean Well GST25E05-P1J (5 V 4 A) koster cirka 10–13 EUR (≈ 105–135 kr eks. mva.). Jeg fant ingen bekreftede priser fra AliExpress eller LCSC.

### Cited Findings
**LED: SK6812 RGBW, stripe og ringer**
- Adafruit NeoPixel-ring med 12 RGBW-LED, varm hvit (~3000 K), produkt 2851: 9,50 USD (1 stk.), 8,55 USD (10–99 stk.), 7,60 USD (100+). DigiKey: 8,07 EUR eks. mva. — [Adafruit 2851](https://www.adafruit.com/products/2851); [DigiKey 2851](https://www.digikey.at/en/products/detail/adafruit-industries-llc/2851/5878295)
- Ring med 24 RGBW-LED i varm hvit (Adafruit 2861): 14,78 GBP eks. mva. hos DigiKey UK. The Pi Hut: 19,20 GBP inkl. britisk mva. (lite på lager). — [DigiKey UK 2861](https://www.digikey.co.uk/en/products/detail/adafruit-industries-llc/2861/5878440); [The Pi Hut, ring med 24](https://thepihut.com/products/adafruit-neopixel-ring-24-x-5050-rgbw-leds-w-integrated-drivers)
- Ring med 16 RGBW-LED (Adafruit 2854): 24,05 AUD inkl. GST hos Pakronics. Adafruit-prisen var ikke synlig. — [Pakronics 2854](https://www.pakronics.com.au/products/neopixel-ring-16-x-5050-rgbw-leds-w-integrated-drivers-ada2854)
- Adafruit-ringene kan leveres med enten WS2812B- eller SK6812-LED (samme protokoll og lysstyrke). Ringene trenger et bibliotek som støtter RGBW. — [Adafruit 2861](https://www.adafruit.com/products/2861)
- The Pi Hut: RGBW-stripe, 60 LED/m, 1 m, 14,40 GBP inkl. britisk mva. (hvittonen står ikke i utdraget). — [The Pi Hut, RGBW-stripe](https://thepihut.com/products/flexible-rgbw-led-strip-neopixel-ws2812-sk6812-compatible-60-led-metre)
- Cool Components (UK): RGBW 60 LED/m i kald hvit, 1 m, 7,78 GBP eks. mva. — [Cool Components](https://coolcomponents.co.uk/collections/all/products/digital-rgbw-addressable-led-weatherproof-strip-60-led-cool-white-1m)
- Superlighting (US): 5 m SK6812, 5 V, 60 LED/m, varm hvit/dagslys (to hvite, ikke RGBW), 43,98 USD (≈ 8,80 USD/m ≈ 82 kr/m eks. mva.). — [Superlighting](https://www.superlightingled.com/product_spec.php?products_id=2396)

**LED: COB-stripe med høy CRI (alternativ for jevnere dimming)**
- Jeg fant ingen 5 V COB-stripe med 2700 K og CRI 90+ med tydelig pris per meter. En Alibaba-oppføring (5 V, 320 LED/m, 2700 K, CRI 90+) har uklar prisenhet. — [Alibaba COB 5V](https://www.alibaba.co.uk/product-detail/High-CRI90-High-Quality-Cob-LED_1601375306685.html)
- Referansepriser for 12/24 V: 5 m 24 V COB-sett med 90+ CRI, 2700–6500 K og fjernkontroll for 35,99 USD (≈ 67 kr/m inkl. kontroller); 5 m 24 V med 95 CRI for 139 USD (≈ 258 kr/m); 5 m 95+ CRI med 120 LED/m for 92,88 USD (≈ 173 kr/m). — [Superbrightleds-sett](https://www.superbrightleds.com/stk-nxk90-5m420-rf-01); [Waveform Lighting](https://store.waveformlighting.com/products/ultra-high-95-cri-led-strip-lights-for-home-residential)
- 12 V COB i 2700 K med CRI 90+ (1000 lm/m): 10 m-rull til 60 GBP (prisformatet på siden er tvetydig). — [Hiline Lighting](https://hiline-lighting.co.uk/gb/single-colour-led-strips/1098-10m-cob-led-strip-2700k-cri90-528-leds-10w-5060440718113.html)

**I2S-forsterker MAX98357A**
- Adafruit 3006: 5,95 USD (1–9 stk.), 5,36 USD (10–99), 4,76 USD (100+). Hodelisten følger med, men må loddes på selv («Some soldering is required to attach the header»). — [Adafruit 3006](https://www.adafruit.com/products/3006)
- The Pi Hut: 5,70 GBP inkl. britisk mva. (tilbudspris). — [The Pi Hut 3006](https://thepihut.com/products/adafruit-i2s-3w-class-d-amplifier-breakout-max98357a)
- Kloner: Noen kloner leveres med løs hodeliste og en 2-polet skrueterminal som man lodder på selv. En forhandler i Hongkong selger en versjon med 7-pinners liste ferdig loddet for 25 HKD (≈ 3,20 USD ≈ 30 kr). En AliExpress-«wiki»-side advarer om at noen selgere merker DIN som «SDATA». — [Universal-Solder](https://www.universal-solder.ca/product/max98357-class-d-amplifier-3w-i2s-interface/); [SCCC Ltd](https://scccltd.com/products/max98357a-i2s-audio-amplifier-module.oembed); [AliExpress Wiki](https://www.aliexpress.com/s/wiki-ssr/article/max98357a-module-spec)
- DFRobot-versjonen (DFR0954): 12,32 AUD inkl. GST. — [Pakronics DFR0954](https://pakronics.com.au/products/max98357-i2s-amplifier-module-df-dfr0954)

**Høyttaler (40 mm, 4 Ω, 3 W)**
- Adafruit 3968 (40 mm, 4 Ω, 3 W): 4,95 USD per stk. hos DigiKey US (≈ 46 kr eks. mva.). — [DigiKey 3968](https://www.digikey.cn/en/products/detail/adafruit-industries-llc/3968/9745251)
- PUI Audio AS04004PR-R (40 mm, 4 Ω, 3 W, 100 Hz–20 kHz): 59,77 CNY per stk., 52,92 CNY ved 10+ hos element14 Kina. — [element14 AS04004PR-R](https://www.element14.cn/en-CN/pui-audio/as04004pr-r/speaker-100hz-20khz-4ohm-86dba/dp/4412328)
- Ole Wolff OWS-4021TA-4 (4 Ω, 3 W, 100 Hz–20 kHz) finnes hos DigiKey (prisen var ikke synlig). — [DigiKey OWS-4021TA-4](https://www.digikey.com/en/products/detail/ole-wolff-electronics-inc/OWS-4021TA-4/16735143)

**Betjening (dreieknapp)**
- KY-040-modul (Tindie): 4,03 USD per stk. ved 1–2 stk., 1,50 USD ved 10+ (≈ 37 / 14 kr eks. mva.). — [Tindie KY-040](https://www.tindie.com/products/mmm999/5v-ky-040-rotary-encoder-module-avr-pic/)
- Fruugo: 5 stk. KY-040 for 11,95 USD + 8,49 USD frakt. — [Fruugo 5 stk.](https://www.fruugo.ca/5-pcs-ky-040-rotary-encoder-module-360-degree-rotary-encoder-with-knobs-cap-brick-sensor-modules-for-light-control-etc/p-463352752)

**Strømforsyning**
- Mean Well GST25E05-P1J (5 V, 4 A, 20 W, Euro-plugg): Bürklin cirka 12,96 EUR per stk. (258 stk. på lager, levering om 5 dager); Welectron 10,00 EUR eks. mva. (11,90 EUR inkl. tysk mva. på 19 %); EVE Electronics cirka 11,77 EUR fra 10 stk. — [Bürklin](https://www.buerklin.com/en/p/mean-well/plug-in-power-supplies/gst25e05-p1j/62C2013); [Welectron](https://welectron.com/Meanwell-GST25E05-P1J-Wall-Power-Supply-5V-4A); [EVE Electronics](https://www.eve-electronics.com/mean-well-plug-in-switching-power-supply-series-gst25e-20-w-5-v-4-a-erp-2-gst25e05-p1j-1.html)
- RS Norge: Mean Well 20 W plug-in-adapter, 5 V 4 A, 159,48 kr eks. mva. / 199,35 kr inkl. mva. Modellnummeret står ikke i utdraget, så det er ikke bekreftet at det er GST25E05-P1J. — [RS Norge 1176175](https://no.rs-online.com/web/p/ac-dc-adapters/1176175)
- Electrokit selger en 5 V 4 A bordnettadapter (20 W). Prisen var ikke synlig. — [Electrokit](https://www.electrokit.com/nataggregat-desktop-5vdc-4a-20w-1)
- USB-C PD-triggerkort: 5-pakning for 6,99 USD på Amazon per 6. juli 2026 (≈ 13 kr per stk.); Flying Tech (UK) 3,70 GBP inkl. mva.; Core Electronics 6,70 AUD inkl. GST. — [camelcamelcamel](https://camelcamelcamel.com/product/B0GTTW9643); [Flying Tech](https://www.flyingtech.co.uk/product/usb-c-pd-trigger-module-5v-9v-12v-15v-20v-adjustable-voltage-selector-board/); [Core Electronics](https://core-electronics.com.au/usb-c-pd-trigger-board-selectable-voltage.html)

**Smådeler**
- M3-innpressingsmuttere (heat-set), 100 stk.: fra 2,40 USD (M3×4,0, ukjent nettbutikk) til 10,99 USD (Prusa/CNC Kitchen, utsolgt) og 44,45 USD (Zoro, koniske). — [Notredame-High](https://notredame-high.co.uk/products/211244778/100pcs-threaded-inserts-m3sx40-brass-heat-set-insert-for-pla/); [Prusa](https://www.prusa3d.com/product/heat-set-inserts-m3-standard-100-pcs/); [Zoro](https://zoro.com/bsc-preferred-tapered-heat-set-inserts-for-plastic-brass-m3-x-050-mm-thread-size-6400-mm-installed-lngth-100pk-94180a333/i/G611638880)

### Inferences
- Adafruit-forsterkeren må loddes uansett (hodelisten er løs). Hvis loddefri montering er et mål, er en klone med ferdig loddet liste (≈ 30 kr) både billigere og enklere. Pinnemerkingen må da sjekkes mot databladet.
- RGBW i varm hvit (~3000 K) finnes som ring fra Adafruit. For stripe er de fleste vestlige tilbud RGBW i kald eller nøytral hvit, eller stripe med bare to hvite. Varm RGBW-stripe kjøpes nok i praksis fra AliExpress eller BTF-Lighting. Det er ikke kildebelagt her.
- En COB-stripe med høy CRI selges nesten bare på 12 V eller 24 V. Med en 5 V-forsyning trengs da en egen 12 V-forsyning eller en boost-omformer i tillegg til MOSFET-driveren. Det øker kostnaden og kompleksiteten sammenlignet med SK6812.
- Strømtrekk: SK6812 RGBW på full hvit trekker mye per LED (datablad typisk ~60–80 mA per LED med alle fire kanaler, ikke kildebelagt i denne økta). 60 LED/m på full styrke kan derfor overstige 4 A. En 5 V 4 A-forsyning holder for en ring eller en kort stripe, eller for en full meter med begrenset lysstyrke i programvaren.
- Mean Well GST25E05-P1J fra en tysk forhandler (10,00 EUR eks. mva. ≈ 104 kr, + 25 % norsk mva. ≈ 130 kr) er billigere enn RS Norge (199 kr inkl. mva.), men frakten kommer i tillegg.

### Gaps
- Jeg fant ingen bekreftede AliExpress- eller LCSC-priser for SK6812 RGBW-stripe i varm hvit, SK6812-ringer, MAX98357A-kloner, EC11, høyttalere, knapper, mikrobrytere, piezosummere, kobbertape, JST-XH/PH, Dupont eller skruer. Søkeresultatene viste bare AliExpress-«wiki»-sider uten priser.
- Ingen priser for stor trykknapp, mikrobryter, piezosummer, kobbertape, JST-XH/JST-PH-sett, Dupont-kabler eller M3-skruer.
- Ingen norske butikkpriser (Kjell, Elfa Distrelec, Digitalimport, Proshop, Komplett) for disse delene, fordi butikksidene ikke kunne hentes.
- Ingen kvantumspriser for 100 stk. Mean Well, høyttalere eller LED-stripe.

## 3. 3D-printing: filamentpriser i Norge, forbruk per kabinett og NTNUs verksteder

### Takeaway
I Norge koster PETG cirka 170–240 kr/kg og PLA cirka 150–300 kr/kg hos vanlige forhandlere. Et kabinett på 15–25 cm bruker trolig 150–350 g, altså cirka 25–85 kr i filament (anslag, ikke kildebelagt). MAKE NTNU (Realfagbiblioteket) og Omega Verksted har 3D-printere, men jeg fant ingen pris for filament eller printing.

### Cited Findings
- PETG 1 kg på Prisjakt: eSUN PETG hvit fra 179 kr, Spectrum PETG svart fra 173 kr, Verbatim transparent blå PETG 219 kr, Clas Ohlson PETG svart 300 kr. — [Prisjakt, filament 1 kg](https://www.prisjakt.no/s/filament-1kg/)
- PrimaCreator PETG i transparent blå, 1 kg: billigste pris 240 kr. — [Prisjakt PrimaCreator](https://www.prisjakt.no/product.php?p=6494624)
- Proshop: Spectrum PETG Premium (1 kg), billigste privatfrakt 109 kr (produktprisen var ikke synlig). — [Proshop](https://www.proshop.no/Filament-3D-Printer/Spectrum-3D-Filament-PETG-Premium-175mm-Lion-Orange-1kg/3438359)
- RS Norge (bedriftspris): Verbatim PETG 1,75 mm 1 kg, 419,77 kr eks. mva. / 524,71 kr inkl. mva. RS PRO PETG i transparent og gjennomskinnelig finnes også. — [RS Norge Verbatim](https://no.rs-online.com/web/p/3d-printing-materials/2020385); [RS PRO Transparent PETG](https://no.rs-online.com/web/p/3d-printing-materials/1901955)
- PLA 1 kg: ELEGOO PLA 149 kr og Clas Ohlson PLA 300 kr (Prisjakt). Clas Ohlson PLA 299 kr med «kjøp 3, betal for 2», men utsolgt. Kjell har Addnorth E-PLA 1 kg (svensk produsent), prisen var ikke synlig. — [Prisjakt PLA](https://www.prisjakt.no/s/pla-filament-1kg/); [Kjell Addnorth E-PLA](https://www.kjell.com/no/produkter/elektro-og-verktoy/3d-skriver-og-filament/filament/pla/addnorth-e-pla-filament-175-mm-1000-g-hvit-p88938)
- 3DJake har eSUN PETG for Norge. — [3DJake](https://www.3djake.no/esun-3d-utskriftsmateriale/esun-petg-filament)
- MAKE NTNU, en frivillig studentorganisasjon, driver verkstedet i Realfagbiblioteket. Rommet med 3D-printere er forbeholdt studenter og ansatte som har tatt kurs. Verkstedet er åpent for alle NTNU-studenter og -ansatte med adgangskort. Printerne bookes på makentnu.no med Feide-innlogging. — [Realfagbiblioteket: Rom og utstyr](https://www.ntnu.no/ub/bibliotek/real/rom-og-utstyr); [NTNU Natural Science Library facilities](https://www.ntnu.edu/ub/libraries/science/facilities)
- MAKE NTNU-reglene: all 3D-printing bookes i kalenderen, og man skal ha minst 10 % mer filament enn Cura beregner. Feil på printerne meldes til 3Dprint@makentnu.no. — [MAKE NTNU-presentasjon (Google Slides)](https://docs.google.com/presentation/d/19LJlpfmFCpsR0HN78Pc3noyTNtaoGnkZ/htmlpresent)
- Omega Verksted er et studentdrevet maker- og hackerspace i den gamle elektrobygningen på Gløshaugen, med 3D-printere og laserkutter. Wikien beskriver det som uavhengig og åpent, med livstidsmedlemskap. — [Omega Verksted (hackerspaces.org)](https://wiki.hackerspaces.org/Omega_Verksted); [Omega Verksted Confluence](https://confluence.omegav.no)
- IVB-maskinverkstedet ved NTNU: Noe materiale er kjøpt inn til prosjekter eller undervisning, mens annet kan brukes gratis. Det finnes også en nettbutikk der studenter og ansatte kan kjøpe materiale til rimelig pris (filament er ikke nevnt). — [NTNU IVB maskin](https://www.ntnu.no/ivb/maskin)
- NTNU har også faglaber for additiv tilvirkning (MTP Prototypelab, Material Extrusion AM Lab, IVB Additive Manufacturing Laboratory), men sidene sier ingenting om priser. — [MTP Prototypelaben](https://ntnu.no/mtp/laboratorier/prototypelab); [Material Extrusion AM Lab](https://ntnu.edu/mtp/material-extrusion-additive-manufacturing-lab)

### Inferences
- Forbruk per kabinett (anslag, ikke kildebelagt): En boks på 20 × 10 × 10 cm har cirka 1000 cm² overflate. Med 2 mm vegg blir det cirka 200 cm³, eller cirka 250 g PLA/PETG (tetthet ~1,24–1,27 g/cm³), før innfyll og støtte. Med 1,2–1,6 mm vegger og lite innfyll blir det typisk 150–300 g. For 15–25 cm kan man regne 150–350 g, inkludert lysspreder og bunnplate.
- Filamentkostnad per klokke: 150–350 g × 150–240 kr/kg ≈ 25–85 kr. Det er inkludert mva., men ikke frakt (Proshop-frakt fra 109 kr, som fordeles over flere ruller).
- En gjennomskinnelig «natural»/transparent PETG som lysspreder over LED-ene koster omtrent det samme som vanlig PETG (Verbatim transparent 219 kr, PrimaCreator 240 kr).
- Regelen om å «ha minst 10 % mer filament enn Cura beregner» kan tyde på at man stiller med egen filament hos MAKE NTNU, men det er ikke bekreftet.
- Kjøperen må være NTNU-student eller -ansatt (med kurs) for å bruke MAKE NTNU. Omega Verksted krever medlemskap.

### Gaps
- Jeg fant ingen kilde om hva MAKE NTNU eller Omega Verksted tar for filament eller printing, eller hva medlemskapet i Omega koster. Spør 3Dprint@makentnu.no og Omega direkte.
- Jeg fant ingen kildebelagte tall for gram per kabinett på 15–25 cm. Tallene over er regnet ut.
- Ingen pris for 1 kg PLA hos Kjell, Komplett eller Proshop i 2026 (sidene kunne ikke hentes).

## 4. Import til Norge: VOEC, gebyrer og regelendringer 2025–2026

### Takeaway
VOEC gjelder fortsatt i november 2026 med grensen **per vare** under 3000 kr. Hos registrerte selgere betales 25 % mva. i kassen, og varen er fritatt for toll uten fortollingsgebyr. Uten VOEC, eller hvis én vare koster over 3000 kr, må hele sendingen fortolles. Da kommer et gebyr i tillegg til mva.: Posten cirka 278 kr (sekundærkilde), DHL minst 229 kr. Norge har ikke innført EUs nye toll eller håndteringsgebyr på lavverdipakker, men Stortinget har bedt regjeringen utrede det.

### Cited Findings
- VOEC: Varer med lav verdi er varer verdsatt til 2999 kr eller mindre. Grensen gjelder per vare, og kunden kan få mange varer i samme sending så lenge hver vare koster under 3000 kr. Ordningen administreres av Skatteetaten. Registrering er obligatorisk over 50 000 kr i omsetning til Norge. — [Tolletaten: Handle fra en VOEC-registrert nettbutikk](https://www.toll.no/no/netthandel/VOEC); [Tolletaten: Om VOEC-ordningen](https://www.toll.no/no/bedrift/import/voec/om-voec-ordningen)
- Varer kjøpt gjennom VOEC er fritatt for tollavgift. — [Tolletaten VOEC (nynorsk)](https://www.toll.no/no/netthandel/1.april/voec/); [Tolletaten EN: The VOEC scheme](https://toll.no/en/online-shopping/the-voec-scheme)
- Én kilde sier at verdigrensen er eksklusive frakt og forsikring. — [Easyship: Shipping to Norway](https://easyship.com/countries/shipping-to-norway)
- Hvis en sending har både varer under og over 3000 kr, faller hele sendingen utenfor VOEC, og Norge beregner avgifter på alle varene. — [Zonos: Norway VOEC scheme](https://zonos.com/docs/guides/country-guides/norway-voec-scheme)
- 350-kronersgrensen ble avviklet 1. januar 2024. Etter det må varer utenfor VOEC deklareres fra første krone. — [Tolletaten: Nå avvikles siste del av 350-kronersgrensen](https://www.toll.no/no/bedrift/nyheter-for-naeringslivet/na-avvikles-siste-del-av-350-kronersgrensen)
- DHL: Siden 2024 må alle sendinger inn i Norge fortolles, uansett verdi. — [DHL Norge FAQ](https://mydhl.express.dhl/no/en/help-and-support/faqs/payment-billing.html)
- Posten: Mottakeren betaler normalt et fortollingsgebyr til Posten Bring i tillegg til avgiftene til staten (beløpet står ikke i utdraget). — [Posten: vilkår for fortolling ved import](https://www.posten.no/en/terms-and-conditions/customs-clearance-receiving)
- Postens fortollingsgebyr i 2026 oppgis til 278 kr for pakker over 3000 kr eller fra butikker som ikke er VOEC-registrert. En kilde oppgir 46 kr for varer på 0–500 kr. En annen oppgir et spenn fra 46 kr til over 400 kr, avhengig av fraktselskap. Alt dette er sekundærkilder (bytt.no). Teksten er dels usammenhengende, og Postens prisliste ble ikke bekreftet. — [bytt.no: Tollgebyr på netthandel i 2026](https://www.bytt.no/artikler/forbruker/a-lpkm/tollgebyr-pa-netthandel-i-2026-slik-unngar-du-postens-ekstraregning); [bytt.no: Slik beregner du totalprisen](https://www.bytt.no/artikler/forbruker/a-oeyd/slik-beregner-du-totalprisen-pa-netthandel-og-unngar-gebyrfellen)
- Tolletaten har en egen side om deklareringsgebyr (innholdet kunne ikke hentes). — [Tolletaten: Deklareringsgebyr](https://www.toll.no/no/netthandel/deklareringsgebyr)
- DHL Express Norge (private): Gebyret er 5 % av importavgiftene, minst 229 kr. Fra 1. januar 2026 kommer et standardgebyr på 79 kr per fortolling. Betalingslenke sendes på SMS, WhatsApp eller e-post. Bare én kilde nevner tallet 79 kr. — [DHL Norge FAQ](https://mydhl.express.dhl/no/en/help-and-support/faqs/payment-billing.html); [DHL: nye tollregler 2026](https://www.dhl.com/no-en/home/important-information/2026/new-customs-rules.html)
- UPS: Jeg fant ingen publisert tollklareringsgebyr for private i Norge. UPS sin norske tilleggsprisliste for 2026 gjelder bedriftskunder. — [UPS tilleggstjenester Norge (PDF)](https://ups.com/assets/resources/webcontent/en_GB/additional-service-charge-no.pdf)
- Tolletatens Treff-løsning fases ut og kan brukes til 15. september 2026. — [Tolletaten: Slik melder du VOEC digitalt](https://www.toll.no/no/bedrift/import/voec/slik-melder-du-voec-digitalt)
- EU innførte 1. juli 2026 en midlertidig tollavgift på lavverdisendinger (til og med 150 euro) og fra 1. november 2026 et kontrollgebyr (Union Handling Fee). For varer til Norge gjelder fortsatt norske regler (VOEC, norsk mva. og toll). Stortinget har bedt regjeringen utrede toll og mulig kontrollgebyr på lavverdipakker, og Finansdepartementet følger opp. — [Regjeringen: Spørsmål og svar om «Temu-tollen»](https://www.regjeringen.no/no/aktuelt/sporsmal-og-svar-om-hvordan-eus-nye-tollavgift-pa-lavverdiforsendelser-pavirker-norge-temu-tollen/id3169027/); [Tolletaten: EU innfører kontrollgebyr på fjernsalg](https://www.toll.no/no/om-oss/aktuelt-fra-tolletaten/eu-innforer-kontrollgebyr-pa-fjernsalg)
- Bedrifter: Electrokit selger til norske bedrifter uten mva. Bedriften står selv for mva. og eventuell toll ved henting. — [Electrokit: vilkår for bedrifter](https://www.electrokit.com/villkor-foretag/)

**Hvilke selgere krever inn mva. (VOEC)?**
- Skatteetaten har en offentlig liste over VOEC-registrerte nettbutikker, men den kunne ikke hentes i økta. — [Skatteetaten: VOEC-registeret](https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/utland/e-handel-voec/nettbutikker-og-e-markedsplasser-som-er-registrert-i-voec-registeret/)
- AliExpress: Ifølge en tredjepartsblogg krever AliExpress inn mva. i kassen, og Choice-ordrer har ofte avgiftene inkludert. Det er ikke bekreftet av AliExpress eller Skatteetaten. — [Tredjepartsblogg om AliExpress-avgifter](https://aliexpress-bot-website.pages.dev/en/blog/aliexpress-import-duty-customs-guide/)
- Electrokit (Sverige): leverer utenfor EU bare til Norge og legger på norsk mva. etter VOEC-reglene for privatkunder. Kunden betaler i SEK. — [Electrokit: vilkår for forbrukere](https://www.electrokit.com/villkor-konsument); [Electrokit: generelle vilkår](https://www.electrokit.com/general-terms)
- Mouser/DigiKey: Forumposter beskriver begge som DDP («delivered duty paid»), men postene gjelder mest EU. En post sier at DigiKey ikke dekker tollkostnadene. Jeg fant ingen Norge-spesifikk bekreftelse. — [EEVblog-forum](https://www.eevblog.com/forum/beginners/ordering-components-in-europe-digikey-and-import-tax/); [diyAudio](https://www.diyaudio.com/community/goto/post?id=7229378)
- Waveshare: prisene er uten avgifter og frakt, og «taxes will be generated during customs clearance». Det tyder på at Waveshare ikke krever inn mva. i kassen. — [Waveshare FAQ](https://www.waveshare.com/shopping_q_a); [Waveshare Shipping Terms](https://www.waveshare.com/shipping)
- Seeed: Supportsidene omtaler bare lageret i Tyskland (19 % tysk mva. i kassen for kunder utenfor EU). Norge og VOEC er ikke nevnt. — [Seeed: Customs, duties and taxes (DE-lager)](https://support.seeed.cc/portal/en/kb/articles/customs-duties-and-taxes-for-de-warehouses); [Seeed: Customs, duties and taxes](https://support.seeed.cc/portal/en/kb/articles/customs-duties-and-taxes)
- JLCPCB har en egen hjelpeartikkel om VOEC-regler for Norge (innholdet kunne ikke hentes). — [JLCPCB: Norway VAT on E-commerce (VOEC)](https://jlcpcb.com/help/article/norway-vat-on-e-commerce-voec-rules)
- Generelt: Etter at en VOEC-selger har krevd inn 25 % mva. i kassen, betaler kunden ikke noe mer ved levering. — [PostNord: Shipping to Norway](https://www.postnord.com/services/logistics/shipping-to-the-nordics/shipping-to-norway/)

### Inferences
- Siden grensen gjelder per vareenhet, kan selv en stor ordre (for eksempel 100 forsterkere à 50 kr) gå gjennom VOEC, så lenge ingen enkeltvare koster over 3000 kr og selgeren er registrert. Det gjør småserier mulig uten fortolling, så lenge kjøpet er privat.
- Kjøper man som bedrift (for eksempel for å selge klokkene), gjelder ikke VOEC (B2B). Da må det deklareres ordinært, men mva. kan trekkes fra hvis bedriften er mva.-registrert.
- Fra en selger som ikke er VOEC-registrert (sannsynligvis Waveshare, kanskje Seeed og Elecrow) bør man regne med 25 % mva. pluss et fortollingsgebyr på cirka 46–278 kr (Posten) eller minst 229 kr (DHL). På små ordrer kan gebyret bli større enn varene.
- Toll på elektronikkdeler er normalt 0 % i Norge (generell kunnskap, ikke bekreftet i økta). Kostnaden ved import er derfor i praksis mva. pluss gebyr.

### Gaps
- Jeg kunne ikke bekrefte VOEC-status direkte i Skatteetatens register for AliExpress, The Pi Hut, Pimoroni, Mouser, DigiKey, Seeed, Elecrow, Waveshare, LCSC, JLCPCB eller PCBWay (siden var sperret).
- Jeg fant ingen offisiell prisliste for Postens og Brings fortollingsgebyr i 2026. Tallet 278 kr kommer fra bytt.no, og trinnene mellom 46 og 278 kr er ukjente.
- Ingen publiserte gebyrer for UPS og FedEx for private mottakere i Norge.
- Jeg kunne ikke bekrefte om frakt teller med i verdigrensen. Kildene er uenige eller uklare.

## 5. Frakt og leveringstid til Trondheim

### Takeaway
Det er lite kildebelagt informasjon per butikk. Mouser har fri frakt over 850 kr. PostNord oppgir 4–6 virkedager fra Storbritannia til Norge, med høysesongtillegg fra november til januar. Electrokit sender lagervarer innen én virkedag. Jeg fant ingen bekreftede leveringstider fra AliExpress, Seeed, Elecrow eller Waveshare.

### Cited Findings
- Mouser (norsk nettsted): fri frakt på de fleste ordrer over 850 kr. — [Mouser Norge](https://no.mouser.com/melfoster)
- Storbritannia til Norge med PostNord: vanlig transporttid 4–6 virkedager. Faktaarket sier 4 virkedager til lokalt marked + 2–3 dager for siste ledd, og nevner høysesongtillegg fra november til januar. — [PostNord: Shipping from the UK to Norway](https://www.postnord.com/services/logistics/shipping-to-the-nordics/shipping-from-the-uk-to-norway/); [PostNord-faktaark UK→Norge (PDF)](https://www.postnord.com/siteassets/pdfs/fact-sheets/shipping_from_uk_norway.pdf)
- USA til Norge med PostNord: eget faktaark (detaljene står ikke i utdraget). — [PostNord-faktaark USA→Norge (PDF)](https://www.postnord.com/siteassets/pdfs/fact-sheets/shipping_from_usa_norway.pdf)
- Pakker som ikke går gjennom VOEC kan bruke et par uker ekstra (anekdotisk, forum). — [Aisler-forum](https://community.aisler.net/t/add-support-for-voec-for-shipments-to-norway/3591)
- Electrokit sender lagervarer normalt innen én virkedag. Bedriftsvilkårene oppgir «frakt fra 35 kr» uten å si om det gjelder Norge. Kunder i Norge betaler i SEK. — [Electrokit FAQ](https://www.electrokit.com/faq/); [Electrokit: vilkår for bedrifter](https://www.electrokit.com/villkor-foretag/)
- Generelle tall for frakt fra Asia til Norge: ekspress 1–5 virkedager dør til dør, økonomi 6–12 dager. Én kurer hadde i snitt 12 virkedager fra Hongkong. Nord-Norge kan ta 1–3 dager ekstra. — [Easyship: Shipping to Norway](https://easyship.com/countries/shipping-to-norway)

### Inferences
- For Trondheim er Electrokit (Sverige, VOEC, rask utsending) og Mouser (fri frakt over 850 kr, DDP etter forumposter) de forutsigbare kildene for 1–10 stk. AliExpress er billigst, men leveringstiden er usikker (typisk 1–3 uker, ikke kildebelagt her).
- Bestillinger i november–januar kan bli forsinket og dyrere (PostNords høysesongtillegg).

### Gaps
- Ingen fraktpriser eller leveringstider til Norge for AliExpress (Choice/standard), Seeed, Elecrow, Waveshare, DigiKey, The Pi Hut eller Pimoroni.
- Electrokits fraktpris til Norge er ikke bekreftet.

## 6. Småserie (10 og 100 stk.) og eget bærekort (JLCPCB/PCBWay)

### Takeaway
Adafruit gir cirka 10 % rabatt ved 10 stk. og cirka 20 % ved 100 stk. KY-040 faller fra 4 til 1,50 USD ved 10+. Montering hos JLCPCB koster fra cirka 8 USD i oppstartsgebyr (økonomi), eller 25,56/51,12 USD (standard, en- eller tosidig), pluss cirka 3 USD per unik «extended»-komponent. Et prototypeparti på 5 kort anslås til 25–40 USD totalt (tredjepartskilde).

### Cited Findings
- Kvantumspriser hos Adafruit: MAX98357A 5,95 → 5,36 (10–99) → 4,76 USD (100+). Ring med 12 RGBW 9,50 → 8,55 → 7,60 USD. — [Adafruit 3006](https://www.adafruit.com/products/3006); [Adafruit 2851](https://www.adafruit.com/products/2851)
- Core Electronics MAX98357A: 9,39 AUD (10+) og 9,20 AUD (50+) eks. GST. — [Core Electronics](https://core-electronics.com.au/adafruit-i2s-3w-class-d-amplifier-breakout-max.html.plain.md)
- KY-040: 4,03 USD (1–2 stk.) → 1,50 USD (10+). — [Tindie KY-040](https://www.tindie.com/products/mmm999/5v-ky-040-rotary-encoder-module-avr-pic/)
- Mean Well GST25E05-P1J: cirka 11,77 EUR fra 10 stk. hos EVE Electronics. Det er høyere enn Welectrons enkeltpris på 10,00 EUR eks. mva., så EVE-prisen er trolig inkl. mva. (uavklart). — [EVE Electronics](https://www.eve-electronics.com/mean-well-plug-in-switching-power-supply-series-gst25e-20-w-5-v-4-a-erp-2-gst25e05-p1j-1.html)
- PUI-høyttaler AS04004PR-R: 59,77 CNY → 52,92 CNY ved 10+. — [element14 AS04004PR-R](https://www.element14.cn/en-CN/pui-audio/as04004pr-r/speaker-100hz-20khz-4ohm-86dba/dp/4412328)
- JLCPCB-montering: oppstartsgebyr 8,18 USD for økonomi-PCBA, og 25,56 USD (enkeltsidig) eller 51,12 USD (tosidig) for standard-PCBA. En eldre offisiell FAQ oppga 8,00 USD. Ved standard-PCBA må alle komponenter (basic og extended) lastes i matere, mot et ekstra arbeidsgebyr (hjelpesiden er sist oppdatert 22. okt. 2026). — [JLCPCB: PCB assembly price](https://jlcpcb.com/help/article/pcb-assembly-price); [JLCPCB: PCB assembly FAQ](https://jlcpcb.com/help/article/98-pcb-assembly-faqs)
- Extended-komponenter koster cirka 3 USD per unike del (matergebyr). «Preferred extended» og «basic» er fritatt for matergebyr ved økonomi-PCBA. — [Hack Club: JLC cost optimizing](https://highway.hackclub.com/guides/JLC-cost-optimizing); [techoverflow (2024)](https://techoverflow.net/2024/04/09/jlcpcb-pcba-assembly-price-overview/)
- Et prototypeparti på 5 monterte kort anslås til cirka 25–40 USD totalt (tredjepartsguide fra 2026 som ikke siterer JLCPCB). — [pamfinds: Best PCB assembly services 2026](https://pamfinds.pages.dev/guides/best-pcb-assembly-services/)
- Sammenligning av JLCPCB, PCBWay og NextPCB for 2026 (innholdet er ikke lest). — [NextPCB-blogg](https://www.nextpcb.com/blog/jlcpcb-vs-pcbway-vs-nextpcb-comparison-2026)

### Inferences
- Et enkelt bærekort for et ESP32-S3-modulkort, med JST-XH-kontakter til LED, høyttaler og knapper og uten SMD-montering, er et rent kretskort. Med økonomi-PCBA og bare «basic»-deler (motstander, kondensatorer, JST-kontakter fra LCSC) blir oppstartsgebyret cirka 8 USD (≈ 76 kr) per ordre, pluss komponenter og frakt. Hver unike extended-del legger til cirka 3 USD (≈ 28 kr).
- Ved 10 stk. fordeles oppstartsgebyret (≈ 7,6 kr/kort). Ved 100 stk. blir det ubetydelig, og prisen bestemmes av komponentene og frakten.
- Et bærekort erstatter Dupont-kabler og gjør monteringen raskere og mer pålitelig i serie. For 1 stk. er det neppe verdt det, men fra cirka 10 stk. er det sannsynligvis lønnsomt.
- Ved 100 stk. vil AliExpress- og LCSC-priser trolig være 2–5 ganger lavere enn Adafruit-prisene for forsterker, encoder og høyttaler (vanlig mønster, ikke bekreftet i denne økta).

### Gaps
- Jeg fant ingen bekreftet pris for et rent kretskort fra JLCPCB eller PCBWay (den ofte nevnte kampanjeprisen på cirka 2 USD for 5 kort på inntil 100 × 100 mm er ikke bekreftet her), og heller ingen pris for frakt til Norge fra JLCPCB eller PCBWay.
- Ingen priser fra PCBWay for montering.
- Ingen LCSC-priser for MAX98357A-brikken, EC11-encoder eller JST-XH-kontakter i kvantum.
- Ingen AliExpress-priser for 10 eller 100 stk.

## 7. Grovt anslag for kostnad per klokke (felles deler)

### Takeaway
Med de prisene som er kildebelagt (originaldeler fra Adafruit/Mean Well, inkl. 25 % mva., uten frakt, uten ESP32-S3-kort og skjerm) koster de felles delene cirka **430–580 kr per klokke ved 1 stk.**, cirka **390–460 kr ved 10 stk.** og cirka **375–440 kr ved 100 stk.** Knapper, mikrobryter, piezo, kobbertape, kabler og skruer kommer i tillegg, og prisene for disse er ikke funnet.

### Cited Findings
- Grunnlagsprisene er sitert i avsnitt 2 og 3: forsterker ([Adafruit 3006](https://www.adafruit.com/products/3006)), RGBW-ring ([Adafruit 2851](https://www.adafruit.com/products/2851)), SK6812-stripe ([Superlighting](https://www.superlightingled.com/product_spec.php?products_id=2396)), høyttaler ([DigiKey 3968](https://www.digikey.cn/en/products/detail/adafruit-industries-llc/3968/9745251)), encoder ([Tindie KY-040](https://www.tindie.com/products/mmm999/5v-ky-040-rotary-encoder-module-avr-pic/)), strømforsyning ([Welectron](https://welectron.com/Meanwell-GST25E05-P1J-Wall-Power-Supply-5V-4A); [RS Norge](https://no.rs-online.com/web/p/ac-dc-adapters/1176175)), filament ([Prisjakt](https://www.prisjakt.no/s/filament-1kg/)) og innpressingsmuttere ([Prusa](https://www.prusa3d.com/product/heat-set-inserts-m3-standard-100-pcs/)).
- Kurser: 1 USD = 9,2978 NOK og 1 EUR = 10,413 NOK (2. nov. 2026). — [CurrencyBeacon](https://currencybeacon.com/rates/USD/NOK); [Currencylive](https://currencylive.com/exchange-rate/20-eur-to-nok-exchange-rate-today/)

### Inferences
Utregning (NOK inkl. 25 % norsk mva., uten frakt):

| Del | 1 stk. | 10 stk. (per klokke) | 100 stk. (per klokke) |
|---|---|---|---|
| LED (Adafruit-ring med 12 RGBW, eller 1 m SK6812-stripe ≈ 102 kr) | 102–110 | 99 | 88 |
| MAX98357A (Adafruit) | 69 | 62 | 55 |
| Høyttaler 40 mm 4 Ω 3 W (Adafruit 3968) | 58 | 58 (ingen kvantumspris funnet) | 58 (ingen kvantumspris funnet) |
| KY-040 | 47 | 17 | 17 |
| Mean Well GST25E05-P1J | 130 (tysk forhandler) – 199 (RS Norge) | 130 | 130 (ingen kvantumspris for 100 funnet) |
| Filament 150–350 g | 25–85 | 25–85 | 25–85 |
| M3-innpressingsmuttere, 4–8 stk. | 1–10 | 1–10 | 1–10 |
| **Sum av funne priser** | **≈ 430–580** | **≈ 390–460** | **≈ 375–440** |

- Kommer i tillegg (ikke funnet): stor trykknapp, mikrobryter, piezo, kobbertape, JST-kabler og Dupont, M3-skruer, eventuelt bærekort (≈ 8 USD oppstart hos JLCPCB per ordre + kort + frakt), eventuelt USB-C PD-trigger (≈ 13 kr) og frakt.
- Frakt og gebyr: Med VOEC-selgere er mva. allerede med i tabellen. Utenfor VOEC kommer 46–278 kr (Posten) eller ≥ 229 kr (DHL) per sending, i tillegg til frakten.
- Byttes Adafruit-delene ut med AliExpress-kloner (for eksempel en ferdig loddet MAX98357A ≈ 30 kr eks. mva.), synker summen trolig betydelig, særlig ved 100 stk. Jeg har ikke bekreftet AliExpress-priser.
- Bedriftskjøp med mva.-fradrag: trekk fra 20 % av bruttosummen (tilsvarer å fjerne 25 % mva.).

### Gaps
- Tabellen mangler priser for flere smådeler og frakt per butikk. Kvantumspriser fra AliExpress og LCSC, som ville gitt et mer realistisk tall for 100 stk., er ikke funnet.
