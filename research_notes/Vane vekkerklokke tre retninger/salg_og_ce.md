# Salg og CE-merking av en hjemmebygd Wi-Fi-vekkerklokke (LED-lampe + høyttaler) i Norge og EU

Avgrensning: små serier (10–100 stk.) laget av en privatperson eller et enkeltpersonforetak. Status per november 2026.

Om kildene: denne økta kunne ikke hente sider direkte fra espressif.com, miljodirektoratet.no eller esp32zx.substack.com, fordi nettverket blokkerte dem. Funnene derfra bygger på søkeresultater og utdrag, ikke på hele dokumentet. Påstander som bare bygger på bakgrunnskunnskap og ikke på en kilde fra denne økta, står under «Slutninger» og er merket *(bakgrunnskunnskap, ikke kontrollert her)*.

---

## 1. Hvilke EU-regler gjelder gjennom EØS i Norge, og hva endrer seg i 2026–2027?

### Hovedpoeng
Klokka er radioutstyr, så **RED (2014/53/EU)** er hovedregelverket. RED tar også med sikkerhet og EMC, uansett spenning (art. 3.1a og 3.1b). Den har cyberkrav etter forordning 2022/30 og EN 18031, og de har gjeldt i Norge siden 1. august 2025. RoHS, REACH, WEEE og økodesign for standby kommer i tillegg. Batteriforordningen gjelder bare hvis klokka har et batteri, og en knappcelle teller. LVD gjelder bare hvis strømforsyningen fra nettet er bygd inn.
To ting endrer seg i 2026–2027. Det ene er batteriforordningens krav: merking i 2026 og et batteri brukeren kan bytte selv fra 18.2.2027. Det andre er Cyber Resilience Act (CRA): meldeplikt i EU fra 11.9.2026 og fullt gjeldende fra 11.12.2027. Verken batteriforordningen eller CRA var tatt inn i norsk rett da kildene ble skrevet.

### Funn med kilder

**RED og cybersikkerhet (art. 3.3 d/e/f, forordning 2022/30)**
- CEN-CENELEC publiserte standardene EN 18031-1, -2 og -3 den 14. august 2024. Kommisjonen listet dem i EU-tidende i januar 2025 med begrensninger, og delegert forordning 2022/30 gjelder fra 1. august 2025. — [Intertek](https://intertek.se/kunskapsbank/blogg/new-series-of-cyber-security-standards-now-harmonised-with-red-article-33); [SGS](https://www.sgs.com/en/news/2025/02/safeguards-02625-eu-harmonizes-en-18031-standards)
- Den rettslige forankringen er Kommisjonens gjennomføringsbeslutning (EU) 2025/138 av 28. januar 2025. Kildene er uenige om listedatoen: 28. eller 30. januar 2025. — [EUR-Lex OJ L 2025/138](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500138); [GlobalNorm](https://compliance.globalnorm.de/en/product-compliance-news/detail/cybersecurity-standards-en-18031-series-for-red-listed-in-the-eu-official-journal/)
- Begrensningene gjelder bestemte punkter. Punkt 6.2.5.1 og 6.2.5.2 om standardpassord gir ingen formodning om samsvar hvis produktet lar brukeren slippe å sette eller bruke passord. EN 18031-2 har en begrensning om foreldrekontroll, og EN 18031-3 har en om sikre oppdateringer (6.3.2.4). — [GlobalNorm](https://compliance.globalnorm.de/en/product-compliance-news/detail/cybersecurity-standards-en-18031-series-for-red-listed-in-the-eu-official-journal/); [Intertek](https://intertek.se/kunskapsbank/blogg/new-series-of-cyber-security-standards-now-harmonised-with-red-article-33)
- Den spanske veiledningen sier at egenerklæring bare er lov når de harmoniserte EN 18031-standardene er brukt og produktet ikke rammes av begrensningene. Ellers trengs et teknisk kontrollorgan. — [Spansk departements veiledning om EN 18031](https://digital.gob.es/content/dam/portal-mtdfp/avance-digital/telecomunicacion-e-infraestructuras-digitales/areas_interes/equipos-telecomunicacion/documents/Guia-aplicacion-EN-18031.pdf); [CEN-CENELEC-rapport til EK, juni 2025](https://www.ibf-solutions.com/fileadmin/Dateidownloads/cen-cenelec-report-to-ec-june-2025.pdf)
- Ifølge Nemko ble EN 18031 i praksis obligatorisk 1.8.2025, og serien kan brukes til egenerklæring. — [Nemko (norsk)](https://www.nemko.com/no/services/cybersecurity/internet-of-things); [Nemko-blogg](https://www.nemko.com/blog/cybersecurity-in-europe-en-18031-is-now-a-harmonized-standard)
- I Norge gjelder kravene fra 1. august 2025 for utstyr produsert fra den datoen, og varer som var på lager før datoen kan fortsatt selges. Eksempler er smartklokker, robotstøvsugere, trådløse høyttalere og smarthjemsystemer. Nkom fører tilsyn med kravene, som står i forskrift om EØS-krav til radioutstyr. — [Regjeringen](https://www.regjeringen.no/no/aktuelt/arbeiderpartiregjeringa-innforer-strengare-krav-til-sikkerheit-for-radioutstyr-som-er-kopla-til-internett/id3114859/); [TU](https://www.tu.no/nyhetsstudio/75139)
- Jeg fant ingen kilde som viser en endring A1 eller at passordbegrensningene er opphevet i 2026. — søk i EUR-Lex og hos leverandører, se mangel nedenfor

**RED art. 3.1(a): sikkerhet uten nedre spenningsgrense, og når LVD gjelder**
- Etter RED art. 3.1(a) skal radioutstyr oppfylle sikkerhetsmålene i LVD uten nedre spenningsgrense. Produkter som drives med batteri eller ekstern strømforsyning, og som ellers ville falt utenfor LVD, er dermed likevel omfattet gjennom RED. — [Element: Kommisjonens LVD-veiledning](https://www.element.com/resources/articles/the-european-commissions-guide-to-the-low-voltage-directive); [GAMBICA](https://www.gambica.org.uk/static/uploaded/14d7e520-7495-44bf-85406390a05bb06d.pdf)
- Kommisjonens LVD-veiledning sier at medfølgende batteriladere og utstyr med innebygd strømforsyning innenfor LVD-spenningene er omfattet av LVD. — [Kommisjonens LVD-veiledning (via søk)](https://ec.europa.eu/docsroom/documents/33162/attachments/1/translations/en/renditions/pdf)
- I Norge gjennomføres LVD ved forskrift 10. oktober 2017 nr. 1598 om elektrisk utstyr, med DSB som tilsynsmyndighet. — [Regjeringen, produktkontaktpunkt](https://www.regjeringen.no/en/topics/business-and-industry/product-contact-point/general-rules/electrical-equipment/id2830912)

**Felles lader (USB-C)**
- Nkom har hatt på høring endringer i radioutstyrsforskriften om både cybersikkerhet og felles ladegrensesnitt. — [Nkom-høring om cybersikkerhet og felles lader](https://nkom.no/hoeringer/horing-av-krav-til-cybersikkerhet-og-felles-lader/_/attachment/download/1c85ad67-7b5a-4a16-abb9-b7574c224119:7afabeced5071cf24da8c26b3bf8f2ba4365ac53/1902123-73%20H%C3%B8ring%20om%20endringer%20i%20forskrift%20om%20E%C3%98S-krav%20til%20radioutstyr%203499057_1_1.PDF)

**Batteriforordningen (EU) 2023/1542 (bare med batteri)**
- Fra 18. februar 2027 skal bærbare batterier i produkter kunne tas ut og byttes av sluttbrukeren med vanlig verktøy uten å skade produktet, med visse unntak. — [Intertek](https://w3inte.intertek.co.th/blog/2025/06-27-2027-reqs-for-removability-and-replaceability-of-batteries-in-electrical-products/); [CMS](https://cms.law/en/svk/legal-updates/eu-sustainable-batteries-regulation-where-are-we-now)
- De utvidede merkekravene (art. 13, blant annet kapasitet og kjemi) gjelder fra 18. august 2026 eller 18 måneder etter gjennomføringsakten etter art. 13(10), alt etter hva som kommer sist. Den akten var fortsatt et utkast, og kildene er uenige om 2026 er den datoen som faktisk gjelder. Kravet om CE-merking av batterier gjelder fra 18.8.2024, og symbolet med søppeldunk med kryss over fra 18.8.2025. — [CMS](https://cms.law/en/svk/legal-updates/eu-sustainable-batteries-regulation-where-are-we-now); [Element](https://www.element.com/resources/articles/eu-battery-regulation-compliance-deadlines); [ComplianceGate tidslinje](https://www.compliancegate.com/eu-batteries-regulation-timeline-and-dates/); [Pryor](https://www.pryormarking.com/?p=23818)
- I Norge skal forordningen gjennomføres med en ny batteriforskrift som viser til EU-forordningen. Forslaget var på høring i mai 2024. Høringen i juni 2025 sa at innlemmelse i EØS var ventet «snart», og en fagmelding fra Miljødirektoratet i oktober 2026 omtaler fortsatt mulig framtidig gjennomføring. Forskriften er altså trolig ikke vedtatt ennå. — [Miljødirektoratet, anbefaling 2023](https://www.miljodirektoratet.no/aktuelt/fagmeldinger/2023/desember-2023/miljodirektoratet-anbefaler-ny-batteriforskrift/); [høring mai 2024](https://www.miljodirektoratet.no/hoeringer/2024/mai-2024/horing-av-forslag-til-en-ny-batteriforskrift-/); [høring juni 2025](https://www.miljodirektoratet.no/hoeringer/2025/juni-2025/nasjonal-horing---endring-av-batteriforordningen-og-endring-av-foreslatt-batteriforskrift---behorig-aktsomhet-due-diligence/); [fagmelding oktober 2026](https://www.miljodirektoratet.no/aktuelt/fagmeldinger/2026/oktober-2026/eu-horing-om-minimumskrav-til-industribatterier/)

**GPSR (EU) 2023/988**
- GPSR har gjeldt i EU siden desember 2024. I Norge er den vurdert som EØS-relevant og akseptabel, men ikke innlemmet i EØS-avtalen. Spesialutvalget for indre marked behandlet den sist i mai 2026. Den skal gjennomføres blant annet ved endringer i produktkontrolloven av 11. juni 1976. — [EØS-notatbasen](https://www.regjeringen.no/no/sub/eos-notatbasen/notatene/2025/jan/fastsettelse-av-indikatorene-for-output-som-er-relevante-for-forordning-eu-2023988/id3167621/)
- DSB er Norges kontaktpunkt for Safety Gate, EUs system for hurtigvarsling. — [EØS-notatbasen, Safety Gate](https://www.regjeringen.no/no/sub/eos-notatbasen/notatene/2024/nov/roller-og-oppgaver-til-de-felles-nasjonale-kontaktpunktene-i-safety-gate-systemet-for-hurtigvarsling/id3163326/)
- Art. 19 krever at et nettilbud viser følgende før kjøpet: produsentens navn eller varemerke med post- og e-postadresse, en ansvarlig person i EU hvis produsenten er utenfor EU, informasjon som identifiserer produktet, og advarsler. Kravet gjelder alle som selger på avstand. — [VIMM](https://www.vimm.be/en/blog/gpsr-article-19-product-information-webshop); [Fieldfisher](https://www.fieldfisher.com/en/insights/new-obligations-under-the-eu-general-product-safety-regulation)
- Tyskland tilpasset sin produktsikkerhetslov (ProdSG) til GPSR med virkning fra 19. februar 2026. — [Baker McKenzie](https://www.bakermckenzie.com/en/insight/publications/2026/03/germany-aligns-product-safety-law-with-eu-gpsr)

**Cyber Resilience Act (EU) 2024/2847: endring i 2026–2027**
- Meldeplikten etter art. 14 gjelder i EU fra 11. september 2026, og CRA gjelder fullt fra 11. desember 2027. — [McCann FitzGerald](https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/cyber-resilience-act-reporting-obligations-apply-from-11-september-2026); [EU-kommisjonen](https://digital-strategy.ec.europa.eu/en/factpages/cyber-resilience-act-implementation)
- Meldeplikten omfatter også produkter som ble satt på EU-markedet før 11.12.2027. Meldinger sendes gjennom ENISAs Single Reporting Platform, som åpnet 11.9.2026. — [SRD Rechtsanwälte](https://www.srd-rechtsanwaelte.de/en/blog/cra-reporting-obligations); [cyberresilienceact.eu](https://www.cyberresilienceact.eu/reporting.html)
- CRA gjelder i Norge først når den er tatt inn i EØS-avtalen og norsk rett. En sekundærkilde fra 25.10.2026 sier at det ikke finnes noen beslutning i EØS-komiteen ennå. — [Schjødt](https://schjodt.com/news/the-cyber-resilience-act-enters-into-force-in-the-eu-key-takeaways-for-manufacturers-and-retailers-of-connected-products); [safeguard.sh (sekundær)](https://safeguard.sh/resources/blog/norway-software-supply-chain-and-ai-security-rules-regulators-deadlines-and-a-90-day-plan)

**Økodesign**
- Forordning 2023/826 om av-modus, standby og nettverksstandby for elektrisk husholdnings- og kontorutstyr gjelder fra 9. mai 2025. Den erstattet 1275/2008 og 107/2009. — [EUR-Lex 2023/826 (konsolidert)](https://eur-lex.europa.eu/eli/reg/2023/826/2025-07-01/eng); [ProductIP](https://productip.com/kb/productipedia/compliance-resources/ecodesign-household-and-office)
- Forordning 2019/2020 setter økodesignkrav til lyskilder og separate driverenheter, og definisjonene omfatter LED-moduler. — [Forordning 2019/2020](https://www.legislation.gov.uk/eur/2019/2020/pdfs/eur_20192020_adopted_en.pdf)

### Slutninger
- **Liste over regelverk og standarder for denne klokka** *(sammensatt av kildene over og bakgrunnskunnskap)*:
  - RED art. 3.2 (radio): EN 300 328 for 2,4 GHz Wi-Fi/BLE.
  - RED art. 3.1(b) (EMC): EN 301 489-1/-17 og EN 55032/EN 55035.
  - RED art. 3.1(a) (sikkerhet): EN 62368-1. Fotobiologisk sikkerhet for lampa etter EN 62471 / IEC TR 62778. RF-eksponering etter EN 62479 eller EN 62311.
  - RED art. 3.3(d) (nettverk): EN 18031-1.
  - RED art. 3.3(e) (personvern): EN 18031-2, fordi klokka lagrer Wi-Fi-passord og brukerens iCal-adresse, som er personopplysninger.
  - RED art. 3.3(f) (betaling) gjelder ikke.
  - Ellers: RoHS 2011/65/EU, REACH art. 33 (SVHC), WEEE, økodesign 2023/826, og kanskje 2019/2020 hvis lampa regnes som lyskilde.
- **Spenning og LVD** *(bakgrunnskunnskap, ikke kontrollert her)*: LVD dekker 50–1000 V AC og 75–1500 V DC. Med en CE-merket USB-C-adapter utenfor boksen er klokka selv et 5 V-produkt. Da går sikkerheten gjennom RED, og vurderingen etter EN 62368-1 blir mye enklere (ES1/PS1, ingen nettspenning i kabinettet).
- **Passordbegrensningen er et konstruksjonsvalg.** Lar klokka brukeren hoppe over passord, for eksempel med et åpent oppsettsgrensesnitt, gir EN 18031 ingen formodning om samsvar. Da trengs et teknisk kontrollorgan. Har hver klokke et unikt passord eller en unik oppsettsnøkkel og et oppsettsgrensesnitt som ikke kan åpnes, er egenerklæring mulig.
- **Felles lader (bakgrunnskunnskap):** direktiv (EU) 2022/2380 gjelder bare bestemte kategorier som lades med kabel, blant dem «bærbare høyttalere». Uten batteri er klokka trolig utenfor. Med oppladbart batteri og høyttaler kan den regnes som bærbar høyttaler, og da trengs USB-C-ladeinngang og regler for salg uten lader. USB-C-inngang er uansett det trygge valget.
- **Ekstern adapter (bakgrunnskunnskap):** følger det med en adapter, må den oppfylle økodesignforordningen for eksterne strømforsyninger (2019/1782) og LVD. Kjøp en ferdig CE-merket adapter med dokumentasjon fra en kjent leverandør.
- **Knappcelle (bakgrunnskunnskap):** også en CR2032 for sanntidsklokka er et «bærbart batteri» etter batteriforordningen og gir produsentansvar for batterier. En superkondensator er ikke et batteri. Klokka kan dessuten hente tiden fra NTP.
- **CRA:** så lenge salget skjer bare i Norge, er CRA ikke gjeldende her ennå. Selger du til EU nå, gjelder meldeplikten for aktivt utnyttede sårbarheter allerede fra 11.9.2026. Fra 11.12.2027 må nye enheter som selges i EU oppfylle CRA: sårbarhetshåndtering, sikkerhetsoppdateringer i en støtteperiode og SBOM. Det er trolig den største løpende byrden for en enmannsprodusent av en nettilkoblet enhet.

### Mangler
- Om forordning 2022/30 eller EN 18031 oppheves eller endres når CRA gjelder fullt i 2027: ingen kilde funnet.
- Om endringen i radioutstyrsforskriften om felles lader er vedtatt i Norge, og om en vekkerklokke med batteri er en «bærbar høyttaler»: ikke avklart.
- Om en LED-lampe i en vekkerklokke er en «lyskilde» eller et «produkt som inneholder lyskilde» etter 2019/2020, og hvilke grenser for nettverksstandby i 2023/826 som gjelder for en klokke som alltid er på: ingen kilde avklarte dette.
- Status for innlemmelse av GPSR, batteriforordningen og CRA i EØS etter mai/oktober 2026: må sjekkes i EØS-notatbasen eller EEA-Lex.

---

## 2. Hvordan CE-merking fungerer for en liten produsent: dokumentasjon, tester, kostnader og hva en forhåndssertifisert modul hjelper

### Hovedpoeng
CE er produsentens egenerklæring (modul A: intern produksjonskontroll). Det krever en teknisk fil, en risikovurdering, testrapporter og en EU-samsvarserklæring. Ingen godkjenning trengs hvis harmoniserte standarder brukes fullt ut og begrensningene i EN 18031 unngås.
En forhåndssertifisert ESP32-S3-WROOM-1 brukt slik Espressif beskriver, med antennen urørt, reduserer radiotestingen. Den fjerner den ikke: hele produktet må fortsatt testes for EMC og utilsiktet utstråling.
Kildene tyder på et realistisk budsjett for lab og dokumentasjon på omtrent 2 500–8 000 euro i kontanter med modul, mer med egen antenne.

### Funn med kilder
- CE-merking er ikke en godkjenning fra tredjepart. Det er produsentens egenerklæring (modul A). — [Promise Legal](https://blog.promise.legal/fcc-certification-ce-marking-connected-devices-hardware-startups/); [Wikipedia: CE marking](https://en.wikipedia.org/wiki/CE_marking)
- Produsenten har alene ansvaret for CE-merkingen. Sluttbrukeren er ikke en «økonomisk aktør». — [Bitkom, «Nine steps to CE marking»](https://bitkom.de/sites/main/files/2023-03/WhitepaperNinestepstoCEmarkingEN.pdf)
- Den som bygger en radiomodul inn i produktet sitt, må sørge for at hele produktet oppfyller RED. Utviklingskort får ingen samsvarserklæring, selv om de i praksis oppfyller de samme standardene som modulen. — [Radiocrafts WP009](https://radiocrafts.com/uploads/WP009_RED_Directive_Implementation.pdf)
- Espressif publiserer et CE-dokument for ESP32-S3-WROOM-1, datert 18.12.2025 og gjeldende maskinvareversjon V1.3. Det dekker Wi-Fi- og Bluetooth-modulen. Søket fant ikke ut om det er et typeprøvingssertifikat fra et teknisk kontrollorgan eller en testrapport. Til sammenligning er det et RED-typeprøvingssertifikat for ESP32-WROVER-E/IE. — [Espressif CE-dokument for ESP32-S3-WROOM-1](https://www.espressif.com/sites/default/files/ESP32-S3-WROOM-1%20CE%20Certification.pdf); [Espressif sertifikatside](https://www.espressif.com/en/support/documents/certificates)
- Et testfirma skriver at enheter med ESP32-modul fortsatt må lab-testes for RED før produktet kan CE-merkes. — [compliancetesting.com](https://compliancetesting.com/ce-certification-for-espressif-esp32-devices/)
- En småprodusent med ESP32-modul skriver at de bruker en forhåndssertifisert Wi-Fi-modul, så de «i teorien» burde bestå lett. De brukte et kinesisk lab for EMC/ESD og kalte RED-sertifiseringen «den mest komplekse (og dyre!)». — [esp32zx Substack «Certifiably great» (via søkeutdrag)](https://esp32zx.substack.com/p/certifiably-great)
- SparkFun oppga 2 800 dollar for en CE RED-post (EN 300 328 og EMC-standardene) for Artemis-modulen. Kilden er rundt 7 år gammel, og SparkFun sier at prisen varierer mye mellom testhus. — [SparkFun](https://www.sparkfun.com/news/3124)
- Labtesting av radioutstyr for forbrukere etter RED: 1 500–3 000 dollar eller mer, uten egen ingeniørtid og dokumentasjonsarbeid. FCC og CE til sammen: 4 500–11 000 dollar. — [Promise Legal](https://blog.promise.legal/fcc-certification-ce-marking-connected-devices-hardware-startups/)
- CE for et ESP32-produkt: 2 000–6 000 (valuta ikke oppgitt). Bare én region: rundt 5 000–15 000. — [LST-IoT](https://www.lst-iot.com/esp32-development-cost/)
- Forbrukerelektronikk med egenerklæring: 3 000–8 000 dollar totalt, der testingen alene koster 500–5 000 dollar for EMC og sikkerhet. — [Certification Support](https://certification.support/ce-certification-cost/)
- Labtid i USA og EU: rundt 2 000–3 000 dollar per dag. Store globale lab tar 2 500–3 500 dollar, regionale 1 500–2 500, og asiatiske lab 300–1 000 dollar. — [MarkReady: velge EMC-lab](https://markready.io/learn/how-to-choose-emc-test-lab)
- Priser i euro fra konsulentguider:
  - EN 300 328 + EN 301 489: 2 500–8 000 euro.
  - RED 3.2 BLE på 2,4 GHz: 5 000–10 000 euro.
  - EMC-test i Sverige: 5 000–10 000 euro (eldre tall), mot 2 000–5 000 euro i Kina.
  - Fortesting med ekstern hjelp: 2 000–5 000 euro for omtrent en uke.
  - Leie av fortestbenk: 500–2 000 dollar per dag.
  
  Søket oppga ikke hvilken guide hvert tall kommer fra. — [Spilma](https://www.spilma.com/en/guides/certification-costs); [EcoComply](https://ecocomply.ai/blog/what-does-ce-marking-cost-for-your-product); [CertifyComply](https://certifycomply.com/blog/what-does-ce-marking-really-cost/); [MarkReady EMC-guide](https://markready.io/guides/emc-testing)
- Pakker med flere sertifiseringer fra for eksempel TÜV Rheinland kan spare 30–40 % mot separate sertifiseringer. — [LST-IoT](https://www.lst-iot.com/esp32-development-cost/)
- Nemko (Norge) tilbyr radiotesting, RED-sertifisering og EN 18031/IoT-cybersikkerhet, men har ingen offentlige priser. — [Nemko radiotesting](https://www.nemko.com/no/services/product-testing/radio-wireless-testing); [Nemko RED](https://www.nemko.com/no/services/product-certification/radio-equipment-directive-red)
- Nkom oppgir disse kravene: bruksanvisningen skal følge med utstyret og inneholde tiltenkt bruk, sikkerhetsinformasjon og bruksbegrensninger. Samsvarserklæringen skal følge produktet, enten fullstendig eller forenklet med lenke til den fullstendige på nett. — [Nkom: Krav til merking og dokumentasjon av radioutstyr](https://www.nkom.no/frekvenser-og-elektronisk-utstyr/import/produksjon-import-og-salg-av-utstyr/_/attachment/download/b6dbf58e-21a6-497b-9def-04f3cc95c27b:0c338bf66d9934db4d8524a8cd830f026dea0f25/Krav%20til%20merking%20og%20dokumentasjon%20av%20radioutstyr.pdf)

### Slutninger
- **Trinn i CE-prosessen for denne klokka** *(bakgrunnskunnskap, ikke kontrollert her)*:
  1. Finn ut hvilke regler og standarder som gjelder (se 1).
  2. Gjør en risikovurdering.
  3. Lag konstruksjonsdokumentasjon: skjema, stykkliste, kretskortutlegg, bilder, kabinettmateriale, programvareversjon.
  4. Skaff testrapporter.
  5. Gjennomfør og dokumenter vurderingen etter EN 18031-1/-2.
  6. Samle samsvarserklæringer for RoHS og REACH fra leverandørene.
  7. Skriv bruksanvisning og sikkerhetsinformasjon på norsk.
  8. Skriv og signer EU-samsvarserklæringen.
  9. Merk produktet med CE-merke, type/serienummer, navn og postadresse og WEEE-symbol.
  10. Ta vare på den tekniske filen i 10 år.
- **Hva modulen gjør:** RED har ikke en egen «modulgodkjenning» slik FCC har. Labene kan likevel gjenbruke modulens testrapporter for EN 300 328, så produkttesten ofte bare trenger utstrålte uønskede utslipp, EMC (EN 301 489-1/-17, EN 55032/35) og en sjekk av RF-eksponering. Betingelsen er at modulen og PCB-antennen er urørt, at du følger Espressifs råd om utlegg (fri sone rundt antennen) og at modulen ikke får nye radioinnstillinger. *(Bakgrunnskunnskap; samsvarer med Radiocrafts og compliancetesting.com over.)*
- **Egen antenne eller egen RF-krets** (for eksempel ESP32-S3-chip eller modul med U.FL og ekstern antenne): gir full test etter EN 300 328 med ledet måling (krever testport eller testprogramvare) og eventuelt ny eksponeringsvurdering. Ut fra prisene over koster det trolig 3 000–8 000 euro ekstra, og risikoen for å måtte teste på nytt øker.
- **Fortesting:** en selvlaget nærfeltsonde og en billig spektrumanalysator, eller en leid dag i et fortestkammer, kan gjøre det mindre sannsynlig å stryke i den formelle testen. Kildene gir ikke et pålitelig tall for hvor mye det sparer.
- **Sikkerhet ved 5 V:** med ekstern CE-merket adapter (ES1/PS2), varmeberegning, LED-data og batteri utenfor kan mange vurdere EN 62368-1 selv og dokumentere det. Noen lab tar likevel med en sikkerhetsrapport i pakken.
- **EN 62471 for lampa:** varmhvite LED-er med lav effekt kan vanligvis plasseres i risikogruppe 0 eller 1 ut fra datablad og IEC TR 62778, uten måling. Lysdioder med kraftig blått lys eller en konsentrert «soloppgangslampe» kan kreve måling. *(Bakgrunnskunnskap.)*
- **EN 18031 i egen regi** er hovedsakelig dokumentasjon: kartlegging av eiendeler og grensesnitt, avgjørelsestrær og begrunnelser. Med enkel fastvare uten skytjeneste og med unik oppsettsnøkkel per enhet er det trolig 20–60 timer eget arbeid. Ingen kilde i denne økta oppgir pris for en lab eller konsulent.
- **Valuta:** med omtrent 11,5–12 kroner per euro *(antatt kurs, ikke kontrollert)* tilsvarer 2 500–8 000 euro omtrent 30 000–95 000 kroner.

### Mangler
- Hvilket dokument Espressif har for ESP32-S3-WROOM-1 (typeprøvingssertifikat fra teknisk kontrollorgan eller testrapporter), og hvilke vilkår for innbygging det setter: PDF-en kunne ikke hentes.
- Offentlige priser fra Nemko, DNV, RISE eller nettbaserte testhus: ikke funnet. Be om tilbud fra minst tre lab.
- Pris for vurdering av EN 18031 hos lab eller konsulent: ikke funnet.
- Førstehåndsberetninger med faktiske beløp fra småprodusenter som har solgt ESP32-enheter i EU: bare ett utdrag (esp32zx) og SparkFun-tallet.

---

## 3. Norske forhold: DSB og Nkom, WEEE, batterier, merking og salg som enkeltpersonforetak (MVA)

### Hovedpoeng
I Norge fører Nkom tilsyn med radiodelen og cyberkravene, og DSB med elektrisk sikkerhet og generell produktsikkerhet.
En norsk produsent av EE-produkter må være medlem av et godkjent produsentansvarsselskap, for eksempel ERP Norway, Norsirk eller Elretur, og betale vederlag. Med batteri kreves også medlemskap i en batteriordning. Ingen kilde i denne økta oppga priser for småprodusenter.
Grensen for MVA-registrering er 50 000 kroner i omsetning uten MVA i en vilkårlig 12-månedersperiode.

### Funn med kilder
- **Nkom og radioutstyrsforskriften:** RED gjennomføres ved forskrift 15. april 2016 nr. 377 om EØS-krav til radioutstyr. Ifølge Nkom skal bruksanvisningen inneholde tiltenkt bruk, sikkerhetsinformasjon og bruksbegrensninger, og samsvarserklæringen skal følge produktet. Importører og distributører har egne plikter etter §§ 14 og 15. — [Nkom: Krav til merking og dokumentasjon](https://www.nkom.no/frekvenser-og-elektronisk-utstyr/import/produksjon-import-og-salg-av-utstyr/_/attachment/download/b6dbf58e-21a6-497b-9def-04f3cc95c27b:0c338bf66d9934db4d8524a8cd830f026dea0f25/Krav%20til%20merking%20og%20dokumentasjon%20av%20radioutstyr.pdf)
- **DSB:** forskrift om elektrisk utstyr (2017 nr. 1598) fastsetter sikkerhetsmålene elektrisk utstyr skal oppfylle når det gjøres tilgjengelig på markedet. — [Regjeringen, produktkontaktpunkt](https://www.regjeringen.no/en/topics/business-and-industry/product-contact-point/general-rules/electrical-equipment/id2830912)
- **Alle EE-produsenter er omfattet:** alle som importerer, produserer eller leverer elektriske produkter til det norske markedet, har produsentansvar og må melde seg inn i et godkjent produsentansvarsselskap. — [ERP Norway](https://erp-recycling.org/no-no/vare-tjenester/avfallsstrommer/ee-produkter/); [Miljødirektoratet, EE-avfall](https://www.miljodirektoratet.no/ansvarsomrader/avfall/Returordninger-avfall/Elektronisk-og-elektrisk-avfall/)
- I utgangspunktet er alle EE-produkter med i ordningen. Kostnadene dekkes av et vederlag som varierer mellom ordninger og produkttyper. — [Miljødirektoratet, EE-avfall](https://www.miljodirektoratet.no/ansvarsomrader/avfall/Returordninger-avfall/Elektronisk-og-elektrisk-avfall/)
- «Returselskap» heter nå «produsentansvarsselskap» (endret 2024–2025), og prislistene ligger på selskapenes egne nettsider. — [Miljødirektoratet](https://www.miljodirektoratet.no/ansvarsomrader/avfall/Returordninger-avfall/emballasje/produsentanvarsselskap/)
- ERP Norway regner ut et estimat for årskostnaden fra et skjema med forventede mengder for 12 måneder. Medlemmer betaler et tjenestegebyr som faktureres månedlig. — [ERP Norway: kostnadsestimat](https://erp-recycling.org/en-no/get-cost-estimate/); [ERP Norway: bli medlem](https://erp-recycling.org/en-no/become-a-member/)
- Norsirk er godkjent av Miljødirektoratet som kollektivt finansiert returselskap og eies blant annet av bransjen. — [Elektronikkbransjen](https://en.elektronikkbransjen.no/ethics-society-and-environment/272752); [Norsirk miljøsertifikat batteri 2023](https://butikk.felleskjopet.no/globalassets/media/dokumenter/hms/norsirk-miljoesertifikat-batteri-2023.pdf)
- Fra juli 2024 kom det nye gebyrtyper i ordningene for produsentansvar i avfallsforskriften kap. 1 (EE), blant dem gebyr for datasystemer og et årsgebyr for kontroll av årsrapporteringen. Gebyrene ser ut til å være rettet mot produsentansvarsselskapene. — [Miljødirektoratet, endringer i gebyrbestemmelser](https://www.miljodirektoratet.no/aktuelt/fagmeldinger/2024/juli-2024/endringer-i-gebyrbestemmelser-i-avfallsforskriften)
- **Batterier:** ERP Norway skriver at små aktører kan sette små mengder batterier på markedet, men trenger en partner for å oppfylle pliktene sine. — [ERP Norway, batterier](https://erp-recycling.org/no-no/what-we-cover/batteries/)
- **MVA:** registreringsgrensen er 50 000 kroner uten MVA. Grensen gjelder en vilkårlig 12-månedersperiode, ikke kalenderåret, og hver avgiftspliktig har én grense. Fakturaen som tar omsetningen over grensen, utløser plikten. — [Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/slik-fungerer-mva/ma-jeg-registrere-meg-i-merverdiavgiftsregistret/); [Merverdiavgiftshåndboken M-2-1.3](https://www.skatteetaten.no/rettskilder/type/handboker/merverdiavgiftshandboken/2020/M-2/M-2-1/M-2-1.3/)
- Registrering kan skje straks hvis det ved oppstart er klart at omsetningen snart vil passere grensen. — [Merverdiavgiftshåndboken M-2-1.3](https://www.skatteetaten.no/rettskilder/type/handboker/merverdiavgiftshandboken/2020/M-2/M-2-1/M-2-1.3/)

### Slutninger
- **Språk:** RED art. 10(8) gir medlemslandene rett til å bestemme språket for bruksanvisning og sikkerhetsinformasjon. Norske produktforskrifter krever som regel norsk *(bakgrunnskunnskap; utkastet til maskinforskrift krever norsk, men ingen kilde bekreftet ordlyden i radioutstyrsforskriften eller forskriften om elektrisk utstyr)*. Vane skriver uansett all tekst på bokmål, så kravet er i praksis oppfylt.
- **Merking på produkt og emballasje** *(bakgrunnskunnskap)*:
  - CE-merke.
  - Type, parti eller serienummer.
  - Produsentens navn, registrerte varemerke og postadresse. Et enkeltpersonforetak må oppgi sin forretningsadresse, som ofte er hjemmeadressen.
  - WEEE-symbolet (søppeldunk med kryss over).
  - Eventuelle bruksbegrensninger. For 2,4 GHz Wi-Fi gjelder ingen i EØS.
  - Bruksanvisning og sikkerhetsinformasjon på norsk.
  - Forenklet samsvarserklæring med URL.
- **WEEE-kostnad ved små volum:** 10–100 klokker à rundt 0,3–0,6 kg gir 3–60 kg EE i året. Vederlaget per kg blir lite. Det som teller, er en eventuell minstepris eller fast medlemsavgift hos selskapet. Den fant jeg ikke, så det må hentes tilbud.
- **Uten batteri slipper du batteriordningen helt.** Med batteri, også en knappcelle, trengs medlemskap i en batteriordning. Ifølge kilden over gjelder kapittel 3 i avfallsforskriften fram til den nye batteriforskriften er på plass. Når den kommer, gjelder batteriforordningens merking, krav om utskiftbarhet og CE.
- **Salg til EU fra Norge** *(bakgrunnskunnskap, ikke kontrollert her)*: ved direkte salg til forbrukere i andre EØS-land blir selgeren «produsent» etter WEEE i hvert land, og ofte etter emballasjeregler. Mange land, som Tyskland (stiftung ear), krever en autorisert representant for utenlandske produsenter. Det gir en løpende kostnad per land. Selg derfor bare i Norge først, eller gjennom en forhandler i EU som tar produsentrollen.
- **GPSR og en norsk produsent:** så lenge GPSR ikke er tatt inn i EØS, er det uklart om en norsk produsent regnes som «utenfor EU». I så fall må salg til EU-forbrukere ha en ansvarlig person i EU (GPSR art. 16 og markedstilsynsforordningen 2019/1020 art. 4). Det bør avklares før salg til EU.
- **Enkeltpersonforetak** *(bakgrunnskunnskap)*: registrering i Enhetsregisteret er gratis. Innehaveren hefter personlig og ubegrenset, også for produktansvar. Produktansvarsloven gir objektivt ansvar for personskade fra produktfeil. En produktansvarsforsikring bør vurderes, særlig med batteri eller nettspenning.
- **MVA i praksis:** 100 klokker à 1 500 kroner gir 150 000 kroner, over grensen, og da må salgsprisen inkludere 25 % MVA. 10–30 stykker med lav pris holder seg trolig under. Etter registrering kan du trekke fra inngående MVA på komponenter og labtester.

### Mangler
- Priser fra Elretur, Norsirk, RENAS og ERP Norway for EE og batterier for småprodusenter, og om noen har en egen lavere sats for små produsenter: ikke funnet, fordi Miljødirektoratets nettsted ikke kunne hentes og ingen prisliste dukket opp i søk.
- Om produsenter må registrere seg direkte hos Miljødirektoratet og betale gebyr dit, i tillegg til medlemskapet: ikke avklart.
- Nøyaktig norsk ordlyd om språkkrav i FOR-2016-04-15-377 og FOR-2017-10-10-1598: ikke bekreftet. Sjekk Lovdata.
- Om SCIP-databasen og REACH art. 33 krever registrering for norske produsenter: ikke undersøkt.

---

## 4. Praktiske veier: byggesett eller ferdig produkt, og eksempler på småprodusenter

### Hovedpoeng
Det å selge et elektronisk **byggesett** til forbrukere fjerner ikke CE-plikten. RED unntar bare byggesett for radioamatører, og produsenten av settet har ansvaret for at det ferdig bygde produktet oppfyller kravene.
De lovlige snarveiene er å ikke sette et elektronisk produkt på markedet i det hele tatt: åpne tegninger og fastvare, eventuelt med umonterte kretskort eller 3D-filer, som brukeren bygger selv. Ellers må du gjøre det skikkelig med forhåndssertifisert modul, ekstern adapter og ikke noe batteri.
Det finnes lite førstehåndsdokumentasjon fra småprodusenter med konkrete beløp.

### Funn med kilder
- RED har et unntak for radiobyggesett som radioamatører bygger og bruker. Det er et særskilt unntak, ikke en generell regel for byggesett. — [RED vedlegg I (legislation.gov.uk)](https://www.legislation.gov.uk/eudr/2014/53/annexes/data.htm)
- Produsenten har alene ansvaret for CE-merkingen, og sluttbrukeren er ikke en økonomisk aktør. — [Bitkom](https://bitkom.de/sites/main/files/2023-03/WhitepaperNinestepstoCEmarkingEN.pdf)
- GAMBICA omtaler produkter som kombineres og monteres av en kompetent bruker, for eksempel en elektriker, etter produsentens anvisning. Det gjelder kombinerte produkter, ikke byggesett for forbrukere. — [GAMBICA: RED-anvendelse, august 2020](https://www.gambica.org.uk/static/71f2e8a6-6723-462f-b49369af0ba22137/Applicability-of-the-Radio-Equipment-Directive-August-2020.pdf)
- Utviklingskort med radiomodul får ingen samsvarserklæring fra modulprodusenten. — [Radiocrafts WP009](https://radiocrafts.com/uploads/WP009_RED_Directive_Implementation.pdf)
- RED-veiledningen ble tilpasset Blue Guide (2022-utgaven). — [IBF Solutions](https://www.ibf-solutions.com/en/news-and-knowledge/technical-papers-and-news-on-ce-marking/new-edition-of-the-red-guide-available)
- **Eksempler på småprodusenter:**
  - esp32zx brukte en forhåndssertifisert modul og et kinesisk lab for EMC/ESD, og kalte RED det dyreste trinnet. — [esp32zx Substack (søkeutdrag)](https://esp32zx.substack.com/p/certifiably-great)
  - SparkFun betalte 2 800 dollar for CE RED for en modul (eldre tall). — [SparkFun](https://www.sparkfun.com/news/3124)
  - Kjøpere spør Seeed om XIAO ESP32-kortene er CE-merket. Svarene er korte, og et modulsertifikat dekker ikke automatisk et ferdig produkt. — [Seeed-forum](https://forum.seeedstudio.com/t/ce-compliance-seeed-xiao-esp32-and-some-doubts/271700)

### Slutninger
- **Fem veier**, ordnet fra minst til mest byrde *(slutninger ut fra kildene over pluss bakgrunnskunnskap om Blue Guide)*:
  1. **Åpen kildekode, ikke noe salg av elektronikk.** Publiser fastvare, kretsskjema, stykkliste og 3D-filer. Brukeren kjøper deler og bygger selv. Ingen produkter settes på markedet, så det blir ingen CE-, WEEE- eller GPSR-plikt. Kostnad: 0 kroner. Passer for «tre retninger»-prosjektet som publisering.
  2. **Selg umonterte kretskort og/eller kabinett.** Et umontert kretskort er ikke elektrisk utstyr eller radioutstyr. Et 3D-printet kabinett alene er en vanlig forbrukervare under generell produktsikkerhet. Lav byrde, men ikke helt avklart. Unngå å legge ved ESP32-modul og strømforsyning, for da nærmer settet seg et radioprodukt.
  3. **Selg et komplett byggesett** med modul, LED, forsterker og kabinett. Juridisk er dette radioutstyr som produsenten av settet må CE-merke, med samme testbehov som et ferdig produkt og i tillegg risikoen for at brukeren bygger feil. Ingen fordel i forhold til vei 4.
  4. **Selg et ferdig produkt bare i Norge.** Full CE med egenerklæring, norsk WEEE-medlemskap, ingen EU-registrering per land, og CRA og GPSR er ikke innført i Norge ennå. Dette er den mest realistiske kommersielle veien for 10–100 stykker.
  5. **Selg et ferdig produkt i Norge og EU.** I tillegg kommer WEEE og emballasje per land med autorisert representant, GPSR art. 19 i nettbutikken, kanskje en ansvarlig person i EU, CRA-meldeplikt fra 11.9.2026 og full CRA fra 11.12.2027. Det er neppe lønnsomt under rundt 100 stykker.
- **Gaver og enkeltbygg:** reglene gjelder fra første gang et produkt gjøres tilgjengelig på markedet som ledd i næringsvirksomhet, enten det er mot betaling eller gratis. Det finnes ingen nedre grense for antall. En privatperson som gir bort to klokker til familien uten å drive næring, er neppe omfattet. Et enkeltpersonforetak som selger 10 stykker, er det *(bakgrunnskunnskap om Blue Guide, ikke kontrollert her)*.

### Mangler
- Ordlyden i Blue Guide 2022 om byggesett og om «å gjøre tilgjengelig på markedet» uten nedre grense: ikke hentet. Den bør siteres direkte.
- Navngitte nordiske eller europeiske småprodusenter av ESP32-enheter (for eksempel QuinLED, Athom eller Tindie-/Lectronz-selgere) og hvordan de har dokumentert CE: ikke funnet i denne økta.

---

## 5. Grovt totalbudsjett fra prototype til en salgbar serie på 10–100 stykker, og hvordan konstruksjonsvalgene påvirker byrden

### Hovedpoeng
Med det enkleste oppsettet regnes kontantkostnaden for samsvar til omtrent **30 000–100 000 kroner**, pluss **100–250 timer** eget arbeid med dokumentasjon. Oppsettet er en urørt ESP32-S3-WROOM-1, en ekstern CE-merket USB-C-adapter, ingen batteri og et flammehemmende 3D-printet kabinett. Med 10 stykker blir det 3 000–10 000 kroner per klokke, med 100 stykker 300–1 000 kroner per klokke.
Hvert av disse valgene legger til betydelig kostnad og risiko: egen antenne, nettspenning i boksen, litiumbatteri og salg i EU.
Tallene er **slutninger** fra prisspennene i del 2. Ingen kilde har en totalsum for akkurat dette produktet.

### Funn med kilder
- Labtesting av radioutstyr for forbrukere etter RED: 1 500–3 000 dollar eller mer, uten egen tid. — [Promise Legal](https://blog.promise.legal/fcc-certification-ce-marking-connected-devices-hardware-startups/)
- EN 300 328 + EN 301 489: 2 500–8 000 euro netto. Fortesting med hjelp: 2 000–5 000 euro. — [Spilma](https://www.spilma.com/en/guides/certification-costs); [EcoComply](https://ecocomply.ai/blog/what-does-ce-marking-cost-for-your-product); [CertifyComply](https://certifycomply.com/blog/what-does-ce-marking-really-cost/) (søket oppga ikke hvilken guide hvert tall kommer fra)
- Forbrukerelektronikk med egenerklæring: 3 000–8 000 dollar totalt. — [Certification Support](https://certification.support/ce-certification-cost/)
- CE for et ESP32-produkt: 2 000–6 000. — [LST-IoT](https://www.lst-iot.com/esp32-development-cost/)
- Labtid i USA og EU: 2 000–3 000 dollar per dag. Asiatiske lab: 300–1 000 dollar per dag. — [MarkReady](https://markready.io/learn/how-to-choose-emc-test-lab)
- Cyberkravene etter EN 18031 har gjeldt siden 1.8.2025 og kan gi kostnader utover radiotestingen. — [CertifyComply](https://certifycomply.com/blog/what-does-ce-marking-really-cost/); [Nemko](https://www.nemko.com/blog/cybersecurity-in-europe-en-18031-is-now-a-harmonized-standard)
- Batterier som brukeren kan bytte (fra 18.2.2027) og de nye merkekravene (2026 eller senere) kommer i tillegg hvis klokka har batteri. — [Intertek](https://w3inte.intertek.co.th/blog/2025/06-27-2027-reqs-for-removability-and-replaceability-of-batteries-in-electrical-products/); [CMS](https://cms.law/en/svk/legal-updates/eu-sustainable-batteries-regulation-where-are-we-now)

### Slutninger

**Grunnoppsett A: lavest byrde, salg bare i Norge.** Ikke kontrollerte overslag ut fra spennene over.

| Krav | Hva det innebærer | Kontanter (ca.) | Eget arbeid |
|---|---|---|---|
| Fortesting (valgfritt) | Nærfeltsonde og billig spektrumanalysator, eller 1 dag i leid kammer | 0–25 000 kr | 10–30 t |
| Labtest RED/EMC | Utstråling og uønskede utslipp med modul, EN 301 489-1/-17, EN 55032/35, ESD | 25 000–80 000 kr | 10–20 t (forberede prøver og testfastvare) |
| Sikkerhet EN 62368-1 + EN 62471 + EN 62479 | Egenvurdering med datablad og beregninger, eller fra lab | 0–25 000 kr | 15–40 t |
| Cyber EN 18031-1/-2 | Egenvurdering, unik oppsettsnøkkel per enhet, OTA med signatur | 0 kr (konsulent: ukjent) | 20–60 t |
| RoHS/REACH | Samsvarserklæringer fra leverandører, blyfritt loddetinn | 0 kr | 5–15 t |
| Teknisk fil, samsvarserklæring, norsk bruksanvisning, merking | Mal, etiketter og trykking | 1 000–5 000 kr | 20–50 t |
| WEEE-medlemskap | Medlem i et produsentansvarsselskap, årlig rapportering | ukjent, be om tilbud | 2–5 t/år |
| Enkeltpersonforetak og MVA | Enhetsregisteret er gratis. MVA først over 50 000 kr / 12 mnd | 0 kr | 2–5 t |
| Produktansvarsforsikring (anbefalt) | — | ukjent | — |
| **Sum** | | **ca. 30 000–100 000 kr** + WEEE og forsikring | **ca. 100–250 t** |

**Hva hvert konstruksjonsvalg endrer**

| Valg | Lav byrde | Høy byrde | Hvorfor |
|---|---|---|---|
| Radio | ESP32-S3-WROOM-1 med PCB-antenne, urørt, med fri sone etter Espressifs utlegg | Egen antenne, chip-down eller U.FL med ekstern antenne | Uten modul må hele EN 300 328 testes med ledet måling. Trolig +35 000–95 000 kr og mer risiko for ny test |
| Strøm | Ekstern CE-merket 5 V USB-C-adapter, eller ingen adapter i esken | 230 V inn i kabinettet med innebygd strømforsyning | Gir full LVD: isolasjonsavstander, spenningsprøve, brannkabinett, ledede utslipp, surge og EFT, og DSB som tilsyn. Trolig +25 000–70 000 kr i test, mer konstruksjonsarbeid og personlig ansvar for brannrisiko. **Frarådes.** |
| Batteri | Ingen batteri. Tid fra NTP, eventuelt superkondensator | Litiumcelle eller CR2032 | Gir batteriordning, batteriforordningens merking (2026 eller senere), krav om utskiftbart batteri (18.2.2027), EN 62133-2 og UN 38.3 fra celleleverandøren, mulig felles lader-krav og brannkrav til kabinettet |
| Kabinett | 3D-print i flammehemmet materiale (V-0/V-1) eller kabinett som bare holder 5 V / PS1 | Vanlig PLA rundt nettspenning eller litiumbatteri | EN 62368-1 krever brannkabinett rundt mulige tennkilder. Ved 5 V med begrenset effekt og uten batteri blir kravet trolig lite. *(Bakgrunnskunnskap)* |
| Lampe | Varmhvite LED-er med lav effekt, risikogruppe 0/1 dokumentert fra datablad | Kraftig «soloppgangslampe» med høy luminans eller blått lys | Kan kreve måling etter EN 62471 og kanskje lyskildeforordningen 2019/2020 |
| Programvare | Ingen sky, ingen standardpassord, unik nøkkel per enhet, signert OTA | Åpent oppsettsgrensesnitt uten passord | Med begrensningene i EN 18031 kan et åpent grensesnitt kreve teknisk kontrollorgan. Uten OTA blir CRA-kravene om oppdatering vanskelige i 2027 |
| Marked | Bare Norge | Norge og EU | EU gir WEEE og emballasje per land, kanskje autorisert representant og ansvarlig person, GPSR art. 19 og CRA-meldeplikt fra 11.9.2026 |

**Tidslinje å planlegge rundt:**
- 1.8.2025: krav etter EN 18031 og forordning 2022/30 gjelder allerede.
- 18.8.2026: utvidet batterimerking (eller senere).
- 11.9.2026: CRA-meldeplikt i EU.
- 18.2.2027: batterier brukeren kan bytte selv.
- 11.12.2027: CRA gjelder fullt i EU.
- Ukjent dato: GPSR, batteriforordningen og CRA innføres i Norge.

**Anbefaling for Vane-klokka:**
- Lag fastvaren slik at klokka varsler og faller tilbake til ringelyd ved strømbrudd, uten å trenge et batteri. Det passer med prinsippet «aldri feile stille»: alarmen fungerer så lenge det er strøm. En egen batteribackup krever både et utskiftbart batteri og batteriordningen.
- Begynn med vei 1, å publisere åpent. Gå videre til vei 4, ferdig produkt bare i Norge, når prototypen er stabil.

### Mangler
- Ingen kilde har et totalbudsjett for akkurat dette produktet. Alle beløp i tabellene er slutninger fra generelle prisspenn med usikker opprinnelse, og noen av dem er gamle.
- Faktiske tilbud fra Nemko (Norge), RISE (Sverige), DNV eller nettbaserte testhus, avgifter for WEEE og batteriordning, og pris på produktansvarsforsikring for et enkeltpersonforetak: ikke funnet. Det bør hentes inn før beslutningen tas.
- Brannkrav i EN 62368-1 til 3D-printede kabinetter og hvilke filamenter som er klassifisert V-0: ikke kontrollert i denne økta.
