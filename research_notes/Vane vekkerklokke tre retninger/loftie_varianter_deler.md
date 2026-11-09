# Loftie-style variants (Kuppelen, Kapselen, Radioen): parts, prices and feasibility

Research date: 2026-11-09. Buyer: Trondheim, Norway.

**How the prices were gathered (read first).** This session's network allowed only GitHub. Retailer and vendor sites could not be opened directly: docs.m5stack.com, waveshare.com, thepihut.com, digitalimport.no, kjell.com, elfadistrelec.no, electrokit.com, mouser, digikey, aliexpress, lilygo.cc and others were all blocked. Prices therefore come from search-engine snapshots of retailer pages, and most are undated ("undated snapshot" below). Pin maps come from source code and docs on GitHub (M5Unified, ESPHome device docs, CircuitPython board definitions, LilyGO repos), which I read directly. No search turned up a Norwegian-krone (NOK) listing for any of these parts.

**Exchange rates used.** All NOK figures below use these rates. "ex" means excluding VAT; "inkl." means including Norway's 25% VAT (MVA), which I add on top.
- 1 USD = 9.28 NOK ([Pluang, mid-market, 4 Nov 2026](https://pluang.com/en/tools/currency-converter/usd-nok)). Other sources gave about 9.46 ([XE](https://www.xe.com/en-us/currencyconverter/convert/?Amount=1&From=USD&To=NOK), undated), so USD figures may be up to about 2% low.
- 1 EUR = 10.53 NOK (Norges Bank/ECB reference rate 10.526 on 6 Nov 2026, via [valuta-kurser.no](https://www.valuta-kurser.no/en/eur-to-nok) and [currency-converter.org.uk](https://www.currency-converter.org.uk/currency-rates/historical/table/EUR-NOK.html)).
- 1 GBP = 12.54 NOK ([FXFeed, 5 Nov 2026](https://fxfeed.io/currencies/pairs/gbp-nok)). [WorldForexRates](https://www.worldforexrates.com/gbp/nok/1-exchange-rate/) gave 12.63 on 7 Nov 2026.

---

## 1. M5Stack Dial v1.1 (K130-V11): price in Norway, free GPIOs, I2S + LED, backlight, known issues

### Takeaway
The Dial v1.1 lists at USD 34.90 ex VAT at both M5Stack and DigiKey. That is about **405 NOK inkl. 25% MVA before shipping**. The cheapest EU option is Botland at EUR 29.41 net, about 387 NOK inkl. MVA before shipping. No Norwegian or Nordic retailer price was found. The Dial has exactly **four free GPIOs**: G13 and G15 on Port A, G1 and G2 on Port B. That is just enough for I2S audio (3 pins) plus one LED data pin, with nothing left over. The backlight is PWM on G9 and can be set to 0, which turns it off.

### Cited Findings
**Prices.** Undated snapshots unless a date is given. NOK uses the rates above.

| Seller | Listed price | VAT status | ≈ NOK ex | ≈ NOK inkl. 25% MVA |
|---|---|---|---|---|
| M5Stack official store | USD 34.90 "regular price" ([shop.m5stack.com](https://shop.m5stack.com/products/m5stack-dial-v1-1)) | ex VAT (US store), shipping extra | 324 | **405** |
| DigiKey | USD 34.90 at qty 1; 363 in stock; manufacturer lead time 9 weeks ([DigiKey K130-V11](https://www.digikey.com/en/products/detail/m5stack-technology-co-ltd/K130-V11/26267933)) | ex VAT | 324 | **405** |
| Botland (PL) | EUR 35.00 gross / **EUR 29.41 net** ([Botland](https://botland.store/m5stack-controllers/24056-m5dial-esp32-s3-smart-rotary-knob-with-128-touch-screen-m5stack-k130-v11-6972934175786.html)) | net = ex VAT | 310 | **387** |
| OpenELAB (EU) | EUR 36.59 sale (regular EUR 41.95) ([openelab.io](https://openelab.io/products/m5stack-dial-v1-1)) | incl. EU VAT; Norway treatment unknown | ≈385 as listed | — |
| Eckstein (DE) | EUR 55.75 incl. 19% VAT + shipping ([eckstein-shop.de](https://eckstein-shop.de/m5stack-dial-v1-1-esp32-s3-wireless-mcu-module-k130-v11)) | DE VAT | 493 (net EUR 46.85) | 617 |
| The Pi Hut (UK) | £31.30 in one snapshot, £33.60 in another, "VAT shown separately" ([thepihut.com](https://thepihut.com/products/m5stack-dial-v1-1)) | likely ex UK VAT for export | 393–421 | 491–527 |
| Adafruit (US) | USD 49.95 (page notes the product was updated to V1.1 from April 2025) ([Adafruit 5966](https://www.adafruit.com/product/5966)) | ex VAT | 464 | 579 |
| Switch Science (JP) | ¥6,611 incl. tax, sold out ([switch-science.com](https://www.switch-science.com/collections/all/products/10302)) | — | — | — |
| AliExpress (M5Stack official store) | listing exists; price not retrieved ([AliExpress item](https://www.aliexpress.us/item/3256808425203711.html)) | — | — | — |

- Elecena, which tracks The Pi Hut, recorded a **25% price increase in November 2025, from £26.88 to £33.60** ([elecena](https://elecena.pl/product/28934712/m5stack-dial-v1-1)).
- The original K130 Dial is marked **obsolete** at DigiKey, with the K130-V11 as its replacement ([DigiKey K130](https://www.digikey.com/en/products/detail/m5stack-technology-co-ltd/K130/21702607)). The M5Stack shop lists the v1.0 as "[EOL]" ([shop.m5stack.com EOL page](https://shop.m5stack.com/products/m5stack-dial-esp32-s3-smart-rotary-knob-w-1-28-round-touch-screen)).
- Elfa Distrelec carries M5Stack products, but the search did not return a Dial listing. The page says new user registration on the Elfa Distrelec site is no longer possible ([elfa.se M5Stack](https://www.elfa.se/en/development-boards-kits/m5stack/c/cat-L2-3D_2415985)). Electrokit's M5Stack category came up only with other M5Stack products ([electrokit](https://electrokit.com/en/product-category/embedded-en/m5stack-en)). Nothing was found for Kjell or Digitalimport.no.
- Volume pricing: DigiKey shows only the quantity-1 price, USD 34.90 ([DigiKey](https://www.digikey.com/en/products/detail/m5stack-technology-co-ltd/K130-V11/26267933)). No 10- or 100-unit price breaks were found anywhere.

**Pin map.** Read directly from the M5Unified source tables and the ESPHome device page:

| Function | GPIO | Source |
|---|---|---|
| Port A (external I2C bus "EX") | **SCL G15, SDA G13** | [M5Unified.inl `_pin_table_i2c_ex_in`](https://github.com/m5stack/M5Unified/blob/master/src/M5Unified.inl); [ESPHome M5Stack-Dial](https://github.com/esphome/esphome-devices/blob/main/src/docs/devices/M5Stack-Dial/index.md) |
| Port B | **G1 (input), G2 (output)**. Port C does not exist on the Dial (255 in the table). | [M5Unified.inl `_pin_table_port_bc`](https://github.com/m5stack/M5Unified/blob/master/src/M5Unified.inl); [ESPHome](https://github.com/esphome/esphome-devices/blob/main/src/docs/devices/M5Stack-Dial/index.md) |
| Internal I2C (RTC PCF8563-compatible, touch, RFID) | SCL G12, SDA G11 | M5Unified table; ESPHome `i2c: sda GPIO11, scl GPIO12` |
| Buzzer | G3 (M5Unified drives it as a buzzer) | [M5Unified.inl speaker config](https://github.com/m5stack/M5Unified/blob/master/src/M5Unified.inl) |
| Backlight | **G9, LEDC PWM output** | [ESPHome](https://github.com/esphome/esphome-devices/blob/main/src/docs/devices/M5Stack-Dial/index.md) |
| Display (GC9A01, SPI, 240×240) | MOSI G5, CLK G6, CS G7, RST G8, DC G4 | ESPHome |
| Touch interrupt | G14 (commented out in the ESPHome config) | ESPHome |
| Rotary encoder | G40 / G41 | ESPHome |
| Front button (press the screen) | G42; BOOT button G0 on the StampS3A | ESPHome; M5Unified button code |
| Power hold | **G46** | M5Unified `_pin_table_other1`; ESPHome |
| RGB LED (on the StampS3 module, inside the case) | G21 | M5Unified `_pin_table_other0` |

- One secondary source gives Port A as G14 SCL / G13 SDA ([Luis Llamas](https://www.luisllamas.es/en/m5dial/)). That conflicts with both the M5Unified source and ESPHome, which say **G15 SCL**.

**v1.1 versus v1.0.** M5Stack's comparison table lists the core as StampS3A (v1.1) versus StampS3 (v1.0). It also says v1.1 adds a reserved lithium-battery interface with a charging circuit and an optimized antenna ([docs.m5stack.com Dial v1.1](https://docs.m5stack.com/en/core/Dial_v1.1)). OpenELAB's comparison blog adds larger keys and 6–36 V DC input; that blog is a secondary source ([OpenELAB](https://openelab.io/blogs/learn/difference-between-m5stack-dial-and-m5stack-dial-v1-1)). To enter download mode on v1.1, hold G0 on the StampS3A while powering on (same docs page).

**Power and sleep.**
- The official M5Dial wakeup example uses `M5Dial.Power.timerSleep(...)`, which wakes the board from the RTC. `powerOff()` exists as an alternative ([M5 docs, M5Dial wakeup](https://docs.m5stack.com/en/arduino/m5dial/wakeup)). Per the M5Unified power-class docs, `timerSleep` takes only hours and minutes; seconds are ignored ([M5Unified power class](https://docs.m5stack.com/ja/arduino/m5unified/power_class)).
- After a wake, firmware must drive G46 (hold) high during init, or the device powers down again ([OpenELAB wiki](https://wiki.openelab.io/m5stack/m5stack-dial-esp32-s3-smart-rotary-knob)).
- The M5Unified docs say that on some PMIC-less devices power-off only works on battery. They do not say whether this applies to the Dial ([M5Unified power class](https://docs.m5stack.com/ja/arduino/m5unified/power_class)).

### Inferences
- **I2S plus one LED pin fits exactly.** For example: G1 = I2S BCLK, G2 = I2S LRCLK, G13 = I2S DOUT, G15 = SK6812 data. The ESP32-S3's GPIO matrix can route I2S and RMT to any of these pins, and none of the four is a strapping pin (G0, G3, G45 and G46 are). The costs:
  - The Port A Grove I2C bus is lost, so no I2C sensor (such as a light sensor) can be added unless the I2C bus is bit-banged on the same pins.
  - Port A probably has I2C pull-up resistors, which is harmless for push-pull I2S or LED data outputs. Not verified from the schematic.
- **The Dial is a reasonable fit for an alarm that must never fail silently.** The built-in buzzer on G3 gives a third alarm path that needs no external amplifier. The RTC can wake the board from sleep.
- **"Helt mørk" (fully dark at night) looks achievable.** PWM duty 0 on G9 turns the backlight off. Whether the PCB has an always-on power or charge LED is unknown (see Gaps).
- **Power wiring:** the 6–36 V input would let a single 12 V supply in the base feed the Dial, with a separate 5 V buck converter for the LEDs and amplifier. A 5 V USB-C supply also works.
- **10 and 100 units:** with no published price breaks, plan on about **390–405 NOK inkl. MVA per unit at 10 pcs**, the same as one unit. At 100 pcs, a bulk quote from M5Stack sales might give perhaps 10–15% off. That figure is speculative.

### Gaps
- No NOK, SEK or DKK price from Digitalimport.no, Elfa Distrelec, Kjell or Electrokit, because their sites were unreachable. Shipping costs to Norway from M5Stack, DigiKey, Botland or The Pi Hut were not found. Whether these shops are VOEC-registered (VAT collected at checkout) was not verified.
- Display brightness in nits: not found in any source.
- Whether the Dial PCB has an always-on power or charge LED: not found.
- Known v1.1 defects (forums, GitHub issues): none found within the search budget.
- The AliExpress price for the official M5Stack store listing was not retrieved.

---

## 2. Waveshare ESP32-S3-Touch-LCD-2.1 and other round boards with a ring larger than 1.28"

### Takeaway
The Waveshare 2.1" board (480×480, ST7701, no ring) costs about £31.70, roughly 500 NOK inkl. MVA. It is **very short of free pins**: in practice only UART pins 43 and 44 plus the shared I2C bus (GPIO7/15) are broken out. That is not enough for I2S + LED + a home-made encoder ring without workarounds. **Ready-made round boards with a built-in rotary ring and a screen larger than 1.28" do exist:**
- **Elecrow CrowPanel 2.1" Rotary**: 480×480, USD 35.70 direct from Elecrow, about 414 NOK inkl. MVA.
- **Makerfabs MaTouch 2.1" Rotary**: 480×480, ST7701, about USD 44–75 depending on quantity.
- **Waveshare ESP32-S3-Knob-Touch-LCD-1.8**: 360×360, built-in audio DAC, USD 46.99.

### Cited Findings
**Waveshare ESP32-S3-Touch-LCD-2.1 prices** (undated snapshots):
- The Pi Hut: £31.70 sale price, "8 left" ([The Pi Hut](https://thepihut.com/products/esp32-s3-development-board-with-2-1-capacitive-touch-lcd-display-480-x-480)). That is about 398 NOK ex, **≈497 NOK inkl.**
- Abra Electronics: US$58.92 ([Abra WAVE-30697](https://abra-electronics.com/opto-illumination/lcds-and-displays/lcd-oled-displays/0.9-2.3/wave-30697-esp32-s3-2-1inch-capacitive-touch-round-display-development-board-480480-2-5d-curved-touch-panel.html)), about 684 NOK inkl.
- Little Bird (AU): AUD 56.00 ([Little Bird](https://littlebirdelectronics.com.au/products/esp32-s3-round-display-dev-board-2-1-capacitive-touch-480x480-ips-wi-fi-bluetooth-ws-30697.md)).
- Hubtronics (IN): ₹2,715.25 + 18% GST ([Hubtronics](https://hubtronics.in/esp32-s3-touch-lcd-2.1inch)).
- Waveshare's own store price and the AliExpress price were not retrieved.

**Waveshare 2.1 pin map**, from the CircuitPython board definition (read directly: [pins.c](https://github.com/adafruit/circuitpython/blob/main/ports/espressif/boards/waveshare_esp32_s3_touch_lcd_2_1/pins.c), [board.c](https://github.com/adafruit/circuitpython/blob/main/ports/espressif/boards/waveshare_esp32_s3_touch_lcd_2_1/board.c)):
- RGB display bus:
  - R: GPIO 5, 45, 48, 47, 21
  - G: GPIO 14, 13, 12, 11, 10, 9
  - B: GPIO 46, 3, 8, 18, 17
  - DE 40, VSYNC 39, HSYNC 38, PCLK 41
- **Backlight: GPIO6** (`LCD_BACKLIGHT`; the board.c `BACKLIGHT_PIN`).
- I2C: SCL GPIO7, SDA GPIO15. The bus is shared with the TCA9554 expander at 0x20.
- Touch interrupt GPIO16; battery ADC GPIO4; BOOT GPIO0.
- SD card: CLK GPIO2, MOSI GPIO1, MISO GPIO42. GPIO1 and GPIO2 are also bit-banged as the LCD's 3-wire SPI during the display init sequence.
- UART: TX GPIO43, RX GPIO44.
- TCA9554 expander outputs (EXIO): 0 LCD reset, 1 touch reset, 2 LCD CS, 3 SD CS, 4 and 5 IMU INT2/INT1, 6 RTC INT, **7 BUZZER**.
- Waveshare's docs say the TCA9554PWR expander has "all pins used, not brought out". Waveshare's comparison table lists the external connector as "I2C, UART, SH1.0 12PIN" ([Waveshare docs](https://docs.waveshare.com/ESP32-S3-Touch-LCD-2.1)). CircuitPython describes the backlight as PWM ([circuitpython.org](https://circuitpython.org/board/waveshare_esp32_s3_touch_lcd_2_1/)).

**Elecrow CrowPanel 2.1" HMI ESP32 Rotary Display:**
- Specs: ESP32-S3R8, 16 MB flash, 480×480 round IPS touch screen, knob that turns both ways and presses, 79×79×30 mm.
- Prices: **USD 35.70** in the Elecrow store and USD 43.99 on AliExpress. The 1.28" version is USD 29.00 ([CNX Software, 19 Sep 2025](https://www.cnx-software.com/2025/09/19/elecrow-esp32-s3-rotary-displays-combine-round-ips-touchscreen-knob-and-press-input/); [Elecrow product page](https://www.elecrow.com/crowpanel-2-1inch-hmi-esp32-rotary-display-480-480-ips-round-touch-knob-screen.html)). In NOK inkl.: about 414 direct and 510 via AliExpress.
- Backlight: PWM on GPIO6 ([Elecrow ESPHome lesson 2](https://www.elecrow.com/wiki/2.1-ESPHOME-Lesson02-Light-Up-the-Screen.html); [Elecrow Arduino LVGL rotary guide](https://www.elecrow.com/wiki/2.1_Arduino_LVGL_Rotary_Guide.html)).
- Pins, per one secondary pinout page: encoder GPIO42/GPIO4, I2C SDA 38 / SCL 39. A 12-pin FPC connector exposes UART, I2C, USB and "2× GPIO (IO4, IO12)". A PCF8574 expander controls touch reset/interrupt, LCD power and LCD reset ([espboards.dev](https://www.espboards.dev/esp32/elecrow-crowpanel-rotary-2-1/)). This source conflicts with itself: IO4 appears both as an encoder channel and as a free GPIO.
- No buzzer was found. GPIO43 drives an indicator light ([Elecrow Arduino guide](https://www.elecrow.com/wiki/2.1_Arduino_LVGL_Rotary_Guide.html)).

**Makerfabs MaTouch ESP32-S3 Rotary IPS Display 2.1" (ST7701, 480×480):**
- Tindie volume pricing: USD 74.97 for 1–2, 50.00 for 3–4, 48.00 for 5–9, **46.00 for 10+** ([Tindie](https://tindie.com/products/makerfabs/matouch-esp32-s3-rotary-ips-display-with-touch-21)).
- Robotshop UK: £41.35 incl. tax ([Robotshop UK](https://uk.robotshop.com/products/makerfabs-matouch-esp32-s3-21-inch-rotary-ips-display-st7701)).
- Gotronic (FR): EUR 47.42 ex VAT / 56.90 incl. ([Gotronic](https://gotronic.fr/download-product-page/38332)).
- A review gives USD 44 on the manufacturer's site, undated ([Luis Llamas](https://www.luisllamas.es/en/makerfabs-matouch-esp32-s3-rotatory/)). CNX reviewed the board in Oct 2023 ([CNX review](https://www.cnx-software.com/2023/10/22/review-matouch-esp32-s3-rotary-ips-display-2-1-inch-round-touchscreen-display/)).
- In NOK inkl.: about 870 for one unit and about 534 at 10+ (Tindie).

**Waveshare ESP32-S3-Knob-Touch-LCD-1.8:**
- Display: 1.8" 360×360, ST77916 driver, CST816 touch.
- Two MCUs: ESP32-S3R8 plus ESP32-U4WDH, each with its own rotary encoder.
- Audio and other hardware: PCM5100A audio DAC with a 3.5 mm jack (no built-in speaker), DRV2605 vibration motor, SD slot, 66 mm diameter × 22 mm.
- Price: USD 46.99 at Waveshare, 48.75 on AliExpress, 52.99 on Amazon ([Electronics-Lab](https://www.electronics-lab.com/waveshare-esp32-s3-1-8-inch-knob-display-features-esp32-s3-and-esp32-soc/); [CNX, 25 Jun 2025](https://www.cnx-software.com/2025/06/25/battery-powered-knob-display-board-pairs-esp32-s3-and-esp32-wireless-socs-features-audio-dac-for-audio-visualization/)). About 545 NOK inkl.
- CNX notes that both the ESP32 and the ESP32-S3 have signals wired to the audio DAC ([CNX](https://www.cnx-software.com/2025/06/25/battery-powered-knob-display-board-pairs-esp32-s3-and-esp32-wireless-socs-features-audio-dac-for-audio-visualization/)).
- Abra lists it at US$81.85 ([Abra WAVE-31623](https://abra-electronics.com/opto-illumination/lcds-and-displays/lcd-oled-displays/0.9-2.3/wave-31623-esp32-s3-1-8inch-knob-display-development-board-multi-functional-capacitive-touch-2-4ghz-wi-fi-bluetooth.html)).

### Inferences
- **Waveshare 2.1 pin budget.** Free and broken out are GPIO43/44 (UART0, which also carries the boot log) and the shared I2C bus on 7/15. I2S needs 3 pins, the LED 1 and an encoder 2–3, so it does not fit. Workarounds:
  - Leave the SD card unused and solder to GPIO1/2/42 at the SD slot. GPIO1/2 are only used for LCD SPI during init, so they can probably be reused after init. This is not verified.
  - Put the encoder on I2C, for example via a small seesaw or encoder breakout.
  - The buzzer sits on the expander (EXIO7), so it is on/off only, with no PWM tone control. It can still serve as a fallback alarm.
- **The CrowPanel 2.1 Rotary is the most direct "bigger Dial".** It has a ring, a press action, a 480×480 screen, roughly the same price as the M5Dial, and a 79 mm footprint. Its free I/O for I2S + LED is unclear, possibly only IO12 plus UART/I2C, so it may hit the same pin problem as the Waveshare 2.1.
- **The Knob-1.8 has audio built in** through a DAC and line-out jack. It would need an external amplifier and speaker rather than a MAX98357A.
- **Home-made ring for the Waveshare 2.1:** a ring around a 2.1" screen needs a hollow ring that drives a side-mounted EC11 through gears or friction, or a magnetic/optical sensor. No price was researched (see Gaps).

### Gaps
- Waveshare 2.1: the exact 12-pin SH1.0 header pinout, the store price, the AliExpress price, and whether a charge or power LED is always on.
- The CrowPanel 2.1 official pin table: the only source was secondary and contradicts itself.
- MaTouch 2.1: free pins not researched.
- Parts and price for a hollow-ring encoder mechanism: not researched.
- Panel brightness in nits: not published in any source found, for any of these boards.

---

## 3. LilyGO T-Display-S3 (and the AMOLED variants): price, free pins, backlight off

### Takeaway
The **T-Display-S3** has a 1.9" 170×320 ST7789 screen on an 8-bit parallel bus, with the **backlight on GPIO38**. Driving GPIO38 low turns it off. About 13 GPIOs are left free on the headers, plenty for I2S, an encoder and a button. Retail runs about USD 25–40 (≈ 300–500 NOK inkl.), and LilyGO's own store lists "from USD 9.04". The **T-Display-S3 AMOLED** (1.91" 240×536, 350 nits, about USD 31–34) has no backlight: black pixels emit no light. Caveat for the "helt mørk" rule: the T-Display-S3 has a **green 3V power indicator LED**, which must be removed or covered.

### Cited Findings
- **T-Display-S3 pins** (from LilyGO's factory `pin_config.h`, read directly; [pin_config.h](https://github.com/Xinyuan-LilyGO/T-Display-S3/blob/main/examples/factory/pin_config.h)):
  - LCD: BL 38; D0–D7 = 39, 40, 41, 42, 45, 46, 47, 48; RES 5, CS 6, DC 7, WR 8, RD 9; panel 320×170.
  - POWER_ON 15.
  - Buttons: GPIO0 and GPIO14. Battery voltage on GPIO4.
  - I2C: SCL 17, SDA 18. Touch: INT 16, RES 21.
- From the LilyGO README ([T-Display-S3 GitHub](https://github.com/Xinyuan-LilyGO/T-Display-S3)):
  - GPIO15 must be high, or the LCD and other peripherals don't work on battery or 5 V header power.
  - Charge current defaults to 500 mA. **The charge LED is red; the 3V indicator is green.**
  - Battery input is 3.7–4.2 V on a JST 1.25 mm connector. The 3V header load should stay under 100 mA.
  - Known issues: Arduino-ESP32 core versions above 2.0.14 may break TFT_eSPI. With USB CDC enabled, the board may wait for USB at boot on external power; disabling CDC fixes it.
- **Free pins:** one retailer says 13 GPIOs are brought out on the headers ([Protosupplies](https://protosupplies.com/product/lilygo-t-display-s3/)). On the Touch variant, GPIO 16, 17, 18 and 21 go to the touch controller, leaving 12 ([Protosupplies touch](https://protosupplies.com/product/lilygo-t-display-s3-touch/)). Sources conflict over the default I2C pins (43/44 versus 17/18) ([espboards.dev](https://www.espboards.dev/esp32/lilygo-t-display-s3/)).
- **T-Display-S3 prices** (undated):
  - LilyGO store: "From USD 9.04" for the bare board ([lilygo.cc](https://lilygo.cc/en-bg/collections/basic-module?page=1)), ≈ 105 NOK inkl. + shipping. This may be a promotional or base-variant price.
  - Abra: US$35.17 with pins soldered ([Abra](https://abra-electronics.com/robotics-embedded-electronics/lilygo-ttgo/lilygo-esp32-s3-1-9-inch-st7789-lcd-display-development-board.html)), ≈ 408 NOK inkl.
  - Protosupplies: touch version USD 36.95–38.95 ([Protosupplies touch](https://protosupplies.com/product/lilygo-t-display-s3-touch/)).
  - AliExpress: no price retrieved ([AliExpress search](https://www.aliexpress.com/w/wholesale-LILYGO-T-Display-S3.html)).
- **T-Display-S3 AMOLED** (from the LilyGO AMOLED-Series README, read directly: [LilyGo-AMOLED-Series](https://github.com/Xinyuan-LilyGO/LilyGo-AMOLED-Series)):
  - Specs: ESP32-S3R8, 16 MB flash, 8 MB OPI PSRAM, **240×536, 1.91", 350 nits**, RM67162 driver over QSPI. The T4-S3 sibling is 2.41", 450×600, 550 nits.
  - Current: 90–230+ mA with Wi-Fi on; **sleep about 230 µA** with GPIO0 wake. The AMOLED Plus sleeps at about 230–700 µA.
  - Pins: QSPI 18/7/48/5, SCLK 47, CS 6, RST 17, TE 9. GPIO38 is **display power enable (active high) on V2.0**; on V1.0 it is a **green LED**.
  - Touch version: SDA 3, SCL 2, IRQ 21 (CST816). BOOT 0, battery ADC 4. Default external-SD pins 11–14 (no onboard slot). UART 43/44.
- **AMOLED prices:**
  - LilyGO store: USD 33.98 for touch and no-touch, sold out at snapshot time; a US-only listing at USD 31.44, also sold out ([lilygo.cc AMOLED US](https://www.lilygo.cc/products/t-display-s3-amoled-us)).
  - Reach.dog: USD 33.98, with a price history of USD 28–30.94 ([reach.dog](https://reach.dog/shop/lilygo/products/t-display-s3-amoled)).
  - Hubtronics: touch version (H705) ₹3,692 ([Hubtronics](https://hubtronics.in/lilygo-t-display-s3-amoled-touch-h705?tag=LILYGO)).
  - Electronics-Lab headline: "Upgraded T-Display-S3 AMOLED for $25.68" (undated) ([Electronics-Lab](https://electronics-lab.com/lilygos-upgraded-t-display-s3-amoled-for-25-68-usd)).
  - In NOK inkl.: about 365–394.

### Inferences
- **Kapselen (T-Display-S3) pin budget.** Free on the non-touch board: roughly GPIO 1, 2, 3, 10, 11, 12, 13, 16, 21, 43 and 44, plus 17/18 if the I2C connector is unused. This is consistent with the "13 GPIO" claim. Kapselen needs:
  - an encoder: 3 pins (A, B, push);
  - the whole-top button: 1 pin;
  - I2S to a MAX98357A: 3 pins, if audio is used;
  - an SK6812 lamp: 1 pin.

  That is 8 pins total, so it fits. Avoid GPIO3 (strapping) and 43/44 (UART0 log) where possible.
- **Backlight off:** GPIO38 = 0 cuts the backlight. GPIO15 = 0 removes LCD power entirely, which is useful at night. Whether GPIO38 drives a simple PWM transistor or a pulse-dimming LED driver chip is unconfirmed (see Gaps). In either case, low means off.
- **Night darkness:** the always-on green 3V LED and the red charge LED conflict with "Ingen ting skal lyse om natta" (nothing may light up at night). Plan to desolder them or cover them inside the housing.
- **AMOLED caveat:** OLED panels risk burn-in with static clock digits shown for many hours (a general OLED property, not sourced here). Shifting pixels and blanking at night would mitigate it. The AMOLED's 240×536 aspect ratio suits a narrow horizontal window.
- **Kapselen alternative (ESP32-S3 devkit + separate ST7789):** this costs roughly the same in parts (see section 5 for the devkit) but needs wiring. The T-Display-S3 is the simpler prototype.

### Gaps
- An official header pin list for the T-Display-S3 (sources conflict).
- The T-Display-S3 LCD's brightness in nits.
- Whether the T-Display-S3 backlight uses a pulse-dimming LED driver chip (searched, not confirmed).
- AliExpress prices for the T-Display-S3 and AMOLED.
- Price for a standalone 1.9–2" ST7789 IPS module: not researched within the budget.

---

## 4. WS2812B 8×32 flexible LED matrix: price for 1, 10 and 100

### Takeaway
A single panel costs about **USD 14.50 (BTF-Lighting 2-pack on Amazon)** to **EUR 23 / USD 24**, which is **≈ 170–280 NOK inkl. MVA**. No 10- or 100-unit price breaks were found. **Key feasibility fact:** the panel is **32 cm × 8 cm** (10 mm pixel pitch). That forces Radioen to be at least about 33 cm wide, which is hardly a "small" table radio.

### Cited Findings
- BTF-Lighting WS2812B-8x32: **2-pack USD 28.99 on Amazon (≈ USD 14.50 per panel)**, SpecPicks snapshot dated 2026-05-24. Panel is 256 pixels, **32 cm long × 8 cm wide** ([SpecPicks B09XWR1Y5K](https://specpicks.com/product/B09XWR1Y5K); [SpecPicks B01DC0IPVU](https://specpicks.com/product/B01DC0IPVU); [Newegg BTF 8x32](https://www.newegg.com/btf-lighting-ws2812b-8x32ecox2/p/35B-00G3-00012)). I could not tell which of the two SpecPicks pages carries the 2-pack price. NOK: ≈ 135 ex / **168 inkl.**
- Tinkerforge (DE), SKU 6187: **EUR 22.99 incl. 19% VAT**, in stock ([Tinkerforge](https://shop.tinkerforge.com/en/rgb-led-matrix-8x32.html)). Net EUR 19.32, ≈ 203 NOK ex / **254 inkl.**
- Superlighting LED: USD 23.99 "special price" ([superlightingled.com](https://superlightingled.com/8-x-32-5050-rgb-flexible-addressable-led-pixel-screen-dc5v-ws2812b-dot-matrix-display-p-3700.html)). ≈ **278 NOK inkl.**
- Super Color LEDs: USD 89.95 ([supercolorleds](https://www.supercolorleds.com/flexible-led-matrix-ws2812b-8x32-pixel-p-856.htm)). DFRobot Gravity 8×32 (SK6812/WS2812): USD 45 ([DFRobot](https://www.dfrobot.com/search-ws2812b%20led%20matrix%208x32.html)). Both are outliers.
- Specs from retailer listings: 5 V, 256 LEDs, chainable through 3-pin JST connectors. Maximum power is given as 51 W in one listing and 75 W in another, which conflict ([Core Electronics](https://core-electronics.com.au/flexible-led-matrix-ws2812b-8x32-pixel.html)).

### Inferences
- **10 units:** buying 5× BTF 2-packs gives about 168 NOK inkl. per panel; no extra discount was found. **100 units:** direct factory or AliExpress pricing would likely be lower, but no source was found.
- Power: the panel is never used at full white for a clock. Ten-odd segments at low brightness need well under 1 A, but the 5 V supply must still be fused or limited, and the firmware should cap brightness. WS2812B LEDs also draw a small idle current even when "off" (a datasheet property, not sourced here). Check this for night-time consumption and heat inside the radio.
- 3.3 V data from the ESP32-S3 into a 5 V WS2812B usually works, but a 74AHCT125-type level shifter makes it robust. This is an inference; the part is not priced.
- Fabric diffusion works well at 10 mm pitch. For a smaller radio, a fine-pitch 8×32 panel (WS2812B-2020 or similar) would be needed; none was researched.

### Gaps
- An AliExpress price for 1/10/100 pcs (search returned nothing usable).
- A smaller-pitch 8×32 panel and its dimensions.

---

## 5. ESP32-S3 devkit (ESP32-S3-DevKitC-1 N16R8 or similar): price for 1, 10 and 100

### Takeaway
The official Espressif devkit costs about **EUR 11.5 ex VAT at DigiKey** for the N16 variant (≈ 151 NOK inkl.). Clone N16R8 boards cost about **USD 12–13** in retail. The bare ESP32-S3-WROOM-1-N16R8 module is **USD 6.38 at LCSC for one**, which is the relevant price at 100 units with a custom PCB. No clean N16R8 devkit price breaks were found.

### Cited Findings
- DigiKey Austria: ESP32-S3-DEVKITC-1-N16 (16 MB flash, no PSRAM) **EUR 11.49 before VAT** ([DigiKey AT](https://www.digikey.at/en/products/detail/espressif-systems/ESP32-S3-DEVKITC-1-N16/22320677)). NOK ≈ 121 ex / **151 inkl.**. The US page showed 0 in stock. DigiKey also lists the N8R8 variant ([DigiKey FI N8R8](https://www.digikey.fi/en/products/detail/espressif-systems/ESP32-S3-DEVKITC-1-N8R8/15295894)); its price was not captured.
- Mouser India: ESP32-S3-DevKitC-1-N16R8 ₹1,264.95 at qty 1 ([mouser.in](https://www.mouser.in/c/?marcom=177331180)).
- Walmart: third-party N16R8 boards at about USD 12–13 ([Walmart](https://www.walmart.com/c/kp/esp32-s3-devkitc-1)), ≈ 140–150 NOK inkl. Newegg lists a 10-pack of N16R8 "DevKit" clones with dual USB-C; the price could not be parsed ([Newegg](https://www.newegg.com/global/ph-en/p/3C6-05VP-020A3)).
- LCSC: ESP32-S3-WROOM-1-N16R8 module (C2913202) from **USD 6.3832** at qty 1 ([LCSC](https://www.lcsc.com/product-detail/C2913202.html)), ≈ 74 NOK inkl.

### Inferences
- **Radioen pin budget on a DevKitC-1:**
  - I2S: 3 pins, shared by both MAX98357A amplifiers.
  - LED matrix data: 1 pin.
  - Two encoders: 2 × 3 pins (A, B, push).
  - Snooze microswitch: 1 pin.

  That is 11 GPIO in total, comfortably available. On R8 (octal PSRAM) modules, GPIO35–37 are taken by PSRAM (Espressif module fact, not sourced in this session), so avoid them.
- **MAX98357A count for Radioen: 2**, one per speaker. Each is set to the left or right channel and both share BCLK, LRCLK and DIN.
- The DevKitC-1 has a red power LED and an RGB LED that must be covered or removed for a dark night. This is an inference; the board revision decides whether the RGB LED is on GPIO38 or GPIO48.
- **Per-unit cost:**
  - 10 units: about 140–150 NOK inkl. per clone, or about 151 NOK for the official N16.
  - 100 units: a custom PCB with a WROOM-1-N16R8 module at about 60–75 NOK plus USB-C and LDO parts is cheaper and fits the housing better. A devkit still works for building it.

### Gaps
- Official N16R8 devkit price breaks at 10 and 100.
- AliExpress clone prices.
- Mouser EU/NO price.

---

## 6. Rotary encoders (KY-040 / EC11), microswitches and speaker cloth: rough prices

### Takeaway
These are cheap parts:
- KY-040 encoder modules: about EUR 1.8–5 each, ≈ 25–55 NOK inkl.
- Omron V-156 roller-lever microswitches: about USD 3.6 at 20 pcs, falling to USD 2.1 at 1000 pcs, ≈ 25–42 NOK inkl.
- Acoustically transparent grille cloth: about USD 10–30 per metre. A metre makes dozens of radio fronts, so the per-unit cost is negligible.

### Cited Findings
- KY-040 module: EUR 1.84 per piece, shipping extra ([elecena](https://elecena.pl/product/17814283/ky-040-rotary-encoder-rotary-encoder-module)), ≈ 24 NOK inkl. AZ-Delivery (DE): EUR 4.99 for one ([AZ-Delivery](https://www.az-delivery.de/en/products/drehimpulsgeber-modul)). Multipacks seen at about USD 4–8 each in US marketplaces (same search; low reliability).
- Omron V-156-1A5 roller-lever microswitch at TME: **USD 3.58 at 20 pcs down to USD 2.12 at 1000 pcs, net** ([TME V-156-1A5](https://www.tme.com/us/en-us/details/v-156-1a5/microswitches-snap-action/omron-electronic-components/)).
- Omron V-156-1C5 at TME: **USD 3.07 from 5 pcs, USD 2.00 at 500 pcs, net** ([TME V-156-1C5](https://www.tme.com/us/en-us/details/v-156-1c5/microswitches-snap-action/omron/)).
- RS Australia: AUD 9.10 per unit ([RS AU](https://au.rs-online.com/web/p/micro-switches/6867622)).
- Grille cloth:
  - Falcon Acoustics (UK): black acoustically transparent polyester, 1.85 m wide, **£15.58/£18.70 per metre** (ex/inc VAT presumably) ([Falcon](https://www.falconacoustics.co.uk/loudspeaker-grille-cloth-acoustic-transparent-black.html)), ≈ 195 NOK/m ex.
  - Parts Express: 70" wide, "virtually 100% acoustically transparent", **USD 9.98 per yard**, not flame retardant ([Parts Express](https://www.parts-express.com/Speaker-Grill-Cloth-White-Yard-70-Wide-260-334)).
  - Midwest Speaker Repair: stretch cloth USD 27.95 per linear yard, 32" wide, flame resistant ([Midwest](https://midwestspeakerrepair.com/product-category/speaker-cloth-foam/grille-cloth/stretch-cloth)).
  - Jaycar (AU): 1 m × 1.5 m, AUD 19.95, or AUD 15.95 at 10+ ([Jaycar](https://jaycar.com.au/black-speaker-grille-cloth-1m-x-1-5m/p/CF2752)).

### Inferences
- A bare EC11 encoder (no breakout board) is typically cheaper than a KY-040 and better for a custom panel; no price was sourced. For Kapselen's rotating end cap, a hollow-shaft or side-driven EC11 is likely needed.
- For the snooze bar, a small lever microswitch is enough; the 15 A Omron V-156 is oversized. Cheap clone microswitches (KW11 type) were not priced.
- Cloth per Radioen front (about 35 × 12 cm): a few NOK at any of these prices. For the fabric to let the matrix light through, a thin, open weave (like the Parts Express cloth) is better than stretch cloth. That needs a test, not a source.

### Gaps
- EC11 bare-part prices; KW11 microswitch prices; Norwegian stock (Kjell, Elfa) for any of these. All retailer sites were blocked.

---

## 7. Totals: one prototype per variant, and estimates at 10 and 100 units (variant-specific parts only)

### Takeaway
Variant-specific parts for one prototype cost about **390–550 NOK inkl. MVA per variant**, before shipping and before the shared parts researched separately (SK6812 strip, MAX98357A, speakers, power supply, filament):
- Kuppelen with M5Dial ≈ 390–405 NOK
- Kapselen with T-Display-S3 ≈ 470 NOK
- Radioen ≈ 400–530 NOK

Volume discounts were only documented for MaTouch (Tindie), Omron switches (TME) and grille cloth (Jaycar). Everything else at 10 and 100 units is an estimate.

### Cited Findings
- **VOEC:** Norway's VOEC scheme covers goods under NOK 3,000 **per item**; VAT is collected at checkout by VOEC-registered shops ([Toll.no VOEC](https://www.toll.no/no/netthandel/VOEC)). One consumer article says shipping is excluded from the 3,000 NOK test but included in the VAT base ([Bytt.no 2026](https://www.bytt.no/artikler/forbruker/a-lpkm/tollgebyr-pa-netthandel-i-2026-slik-unngar-du-postens-ekstraregning)).
- **Posten's customs fees** are cited as NOK 46 (value 0–500), 78 (500–3,000) and 278 (over 3,000) ([Posten](https://www.posten.no/en/customs/receiving-from-abroad); [Bytt.no](https://www.bytt.no/artikler/forbruker/a-lpkm/tollgebyr-pa-netthandel-i-2026-slik-unngar-du-postens-ekstraregning)). Bytt.no's claim that these apply even to VOEC purchases conflicts with how VOEC normally works; check before relying on it.
- All unit prices in the table below come from sections 1–6 and are cited there.

**Per-unit table, NOK inkl. 25% MVA, ex shipping, ex shared parts**

| Variant | Parts | 1 pc | 10 pcs (per unit) | 100 pcs (per unit) |
|---|---|---|---|---|
| **Kuppelen A**: M5Dial v1.1 | M5Dial (387 Botland net / 405 M5Stack and DigiKey) | **≈ 390–405** | ≈ 390–405 (no breaks found) | unknown; bulk quote needed (est. 340–370) |
| Kuppelen B: Waveshare 2.1 + own ring | board ≈ 497 (Pi Hut) + EC11/KY-040 ≈ 24–55 + ring mechanics (not priced) | **≈ 520–550+** | similar | unknown |
| Kuppelen C: CrowPanel 2.1 Rotary (ready ring) | ≈ 414 (Elecrow direct) / 510 (AliExpress) | **≈ 414–510** | similar | unknown |
| Kuppelen D: MaTouch 2.1 Rotary | ≈ 870 (1–2 pcs) / 534 (10+ pcs, Tindie) | ≈ 870 | **≈ 534** | ≤ 534 |
| Kuppelen E: Waveshare Knob 1.8 (DAC, 360×360) | ≈ 545 | ≈ 545 | similar | unknown |
| **Kapselen**: T-Display-S3 + encoder + top-button microswitch | 408 (Abra) + 24 (KY-040) + 36–42 (Omron V-156) | **≈ 470** | ≈ 430–470 | est. 200–300 if LilyGO direct pricing (from USD 9.04) holds; unverified |
| Kapselen (AMOLED 1.91") | 365–394 + 24 + 36–42 | **≈ 425–460** | similar | unknown |
| **Radioen**: devkit + 8×32 matrix + 2 encoders + snooze switch + cloth | devkit 140–151 + matrix 168–278 + 2 × KY-040 ≈ 48 + switch 36–42 + cloth ≈ 3–10 | **≈ 395–530** | ≈ 380–450 (cheapest panel; TME switch break) | est. 300–350 with custom PCB (WROOM ≈ 74), switch ≈ 23–25, cloth ≈ 3 |
| Radioen, extras researched elsewhere | **2 × MAX98357A**, 2 speakers, 5 V power supply | — | — | — |

### Inferences
- At 100 units, the Kuppelen and Kapselen boards could be swapped for custom PCBs (ESP32-S3 module about 74 NOK plus a bare round or bar display). This only pays off with real volume; for 1–10 units, ready-made boards win on development time.
- For a single prototype, shipping will be a large share of the cost: several foreign shops at about 50–150 NOK each, which is unsourced. Buying the M5Dial, KY-040 and matrix from one EU shop that handles Norwegian VAT, or from the M5Stack/AliExpress store if it is VOEC-registered, keeps fees down.
- Most electronic components likely carry 0% Norwegian customs duty, so 25% VAT is the main import cost. This is not verified in this session.

### Gaps
- Shipping costs to Norway from each shop.
- Whether M5Stack, The Pi Hut, Botland, LilyGO and Elecrow are VOEC-registered.
- Any Norwegian retail stock. Digitalimport, Kjell, Elfa Distrelec and Electrokit were unreachable, and no search result showed a NOK price.
- Real 100-unit quotes for any of the boards.
