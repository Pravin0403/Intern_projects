# Project 1 – IoT Environmental Monitor (Simulation) — **All C**

This package contains:
- **MSP430 firmware (C)** — generates mock sensor data and prints to UART at 9600 baud.
- **Host program (C)** — cross‑platform console app that reads the serial port, prints values, optionally logs to CSV, and (optionally) uploads to ThingSpeak if built with libcurl.

## Firmware (MSP430G2553)
- File: `firmware/msp430_main.c`
- IDE: TI Code Composer Studio (CCS)
- Output line every ~2 seconds:
  ```
  TEMP=27,HUM=55,GAS=231
  ```

### Build (CCS)
1. New CCS project for **MSP430G2553**.
2. Add `firmware/msp430_main.c`.
3. Build → produce `.out` / `.hex`.
4. Load `.hex` into Proteus.

## Host Program (C)
- File: `host_c/host_c_serial.c`
- Reads serial port and parses lines.
- Cross‑platform: Windows (Win32) and Linux (POSIX) code paths.
- Optional **ThingSpeak upload** if compiled with `-DHAVE_CURL` and linked with `libcurl`.

### Build on Windows (MSVC Developer Command Prompt)
```bat
cd host_c
cl /EHsc /DWIN32 host_c_serial.c
```
With ThingSpeak upload (adjust libcurl paths):
```bat
cl /EHsc /DWIN32 /DHAVE_CURL host_c_serial.c ^
  /I"path\to\curl\include" ^
  /link /LIBPATH:"path\to\curl\lib" libcurl.lib ws2_32.lib wldap32.lib winmm.lib
```

### Build on Linux
```bash
cd host_c
gcc host_c_serial.c -o host_serial
```
With ThingSpeak upload:
```bash
gcc host_c_serial.c -o host_serial -DHAVE_CURL -lcurl
```

### Usage
```
Windows: host_c_serial.exe COM5 9600 log.csv YOUR_THINGSPEAK_KEY
Linux:   ./host_serial /dev/ttyUSB0 9600 log.csv YOUR_THINGSPEAK_KEY
```
- Use `-` instead of `log.csv` to **disable CSV logging**.
- Use `-` instead of the API key to **disable ThingSpeak upload**.

## Proteus Wiring (Simulation)
1. Place **MSP430G2553** and a **Virtual Terminal**.
2. Cross‑connect TX/RX between MCU and Virtual Terminal.
3. Load compiled `.hex` to the MCU in Proteus.
4. Run — you should see lines printed.
5. (Optional) Use **COMPIM** to map Proteus UART to a **real COM port**, then run the host program on that port.

## Notes
- Everything is written in **C** — no Python required.
- To change value ranges, edit the `mock_*` functions in `msp430_main.c`.
- If you don't want ThingSpeak, just build without `-DHAVE_CURL`.
