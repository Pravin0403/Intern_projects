/*
 * Host reader (C, cross-platform) for IoT Environmental Monitor
 *
 * - Opens a serial port (Windows COMx or Linux /dev/tty*)
 * - Reads lines like: "TEMP=27,HUM=55,GAS=231"
 * - Prints to console and optionally logs to CSV
 * - Optional ThingSpeak upload if compiled with -DHAVE_CURL and linked with libcurl
 *
 * Build (Windows, MSVC):
 *   cl /EHsc /DWIN32 host_c_serial.c /link ws2_32.lib
 *
 * Build (Windows, MSVC) with libcurl (adjust path as needed):
 *   cl /EHsc /DWIN32 /DHAVE_CURL host_c_serial.c /I"path\to\curl\include" /link /LIBPATH:"path\to\curl\lib" libcurl.lib ws2_32.lib wldap32.lib winmm.lib
 *
 * Build (Linux):
 *   gcc host_c_serial.c -o host_serial
 *
 * Build (Linux) with libcurl:
 *   gcc host_c_serial.c -o host_serial -DHAVE_CURL -lcurl
 *
 * Usage:
 *   Windows: host_serial.exe COM5 9600 log.csv YOUR_THINGSPEAK_KEY
 *   Linux:   ./host_serial /dev/ttyUSB0 9600 log.csv YOUR_THINGSPEAK_KEY
 *
 *   Positional args:
 *     1) serial port (e.g., COM5 or /dev/ttyUSB0)
 *     2) baud (e.g., 9600)
 *     3) CSV filename or '-' to disable
 *     4) ThingSpeak WRITE API key or '-' to disable
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <time.h>

#ifdef _WIN32
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#else
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#endif

#ifdef HAVE_CURL
#include <curl/curl.h>
#endif

#define LINE_MAX_LEN 256

static int parse_line(const char *line, int *temp, int *hum, int *gas) {
    // Expect: TEMP=27,HUM=55,GAS=231
    int t=-1,h=-1,g=-1;
    if (sscanf(line, "TEMP=%d,HUM=%d,GAS=%d", &t, &h, &g) == 3) {
        *temp = t; *hum = h; *gas = g;
        return 1;
    }
    return 0;
}

#ifdef _WIN32

static HANDLE open_serial_win(const char *port, int baud) {
    char dev[64];
    // Need the special prefix for COM ports >= 10
    snprintf(dev, sizeof(dev), "\\\\.\\%s", port);

    HANDLE h = CreateFileA(dev, GENERIC_READ | GENERIC_WRITE, 0, NULL, OPEN_EXISTING, 0, NULL);
    if (h == INVALID_HANDLE_VALUE) {
        fprintf(stderr, "[ERR] Cannot open %s (err=%lu)\n", dev, GetLastError());
        return INVALID_HANDLE_VALUE;
    }

    DCB dcb = {0};
    dcb.DCBlength = sizeof(DCB);
    if (!GetCommState(h, &dcb)) {
        fprintf(stderr, "[ERR] GetCommState failed\n");
        CloseHandle(h);
        return INVALID_HANDLE_VALUE;
    }

    dcb.BaudRate = baud;
    dcb.ByteSize = 8;
    dcb.StopBits = ONESTOPBIT;
    dcb.Parity   = NOPARITY;
    dcb.fDtrControl = DTR_CONTROL_ENABLE;
    dcb.fRtsControl = RTS_CONTROL_ENABLE;

    if (!SetCommState(h, &dcb)) {
        fprintf(stderr, "[ERR] SetCommState failed\n");
        CloseHandle(h);
        return INVALID_HANDLE_VALUE;
    }

    COMMTIMEOUTS to = {0};
    to.ReadIntervalTimeout         = 50;
    to.ReadTotalTimeoutConstant    = 50;
    to.ReadTotalTimeoutMultiplier  = 10;
    to.WriteTotalTimeoutConstant   = 50;
    to.WriteTotalTimeoutMultiplier = 10;
    SetCommTimeouts(h, &to);

    return h;
}

static int read_line_win(HANDLE h, char *buf, int maxlen) {
    static char accum[LINE_MAX_LEN];
    static int acc_len = 0;
    DWORD n = 0;
    char ch;

    while (1) {
        if (!ReadFile(h, &ch, 1, &n, NULL) || n == 0) {
            // no byte available right now
            return 0;
        }
        if (ch == '\n' || ch == '\r') {
            if (acc_len > 0) {
                accum[acc_len] = '\0';
                strncpy(buf, accum, maxlen-1);
                buf[maxlen-1] = '\0';
                acc_len = 0;
                return 1;
            }
        } else if (acc_len < (int)sizeof(accum)-1) {
            accum[acc_len++] = ch;
        } else {
            // overflow, reset
            acc_len = 0;
        }
    }
}

#else // POSIX

static int open_serial_posix(const char *port, int baud) {
    int fd = open(port, O_RDWR | O_NOCTTY | O_SYNC);
    if (fd < 0) {
        perror("[ERR] open");
        return -1;
    }

    struct termios tty;
    memset(&tty, 0, sizeof tty);
    if (tcgetattr(fd, &tty) != 0) {
        perror("[ERR] tcgetattr");
        close(fd);
        return -1;
    }

    speed_t speed = B9600;
    switch (baud) {
        case 9600:  speed = B9600; break;
        case 19200: speed = B19200; break;
        case 38400: speed = B38400; break;
        case 57600: speed = B57600; break;
        case 115200:speed = B115200; break;
        default:    speed = B9600; break;
    }

    cfsetospeed(&tty, speed);
    cfsetispeed(&tty, speed);

    tty.c_cflag = (tty.c_cflag & ~CSIZE) | CS8;     // 8-bit chars
    tty.c_iflag &= ~IGNBRK;         // disable break processing
    tty.c_lflag = 0;                // no signaling chars, no echo, no canonical processing
    tty.c_oflag = 0;                // no remapping, no delays
    tty.c_cc[VMIN]  = 0;            // nonblocking read
    tty.c_cc[VTIME] = 5;            // 0.5 seconds read timeout

    tty.c_iflag &= ~(IXON | IXOFF | IXANY); // shut off xon/xoff ctrl
    tty.c_cflag |= (CLOCAL | CREAD);
    tty.c_cflag &= ~(PARENB | PARODD);      // no parity
    tty.c_cflag &= ~CSTOPB;                 // 1 stop bit
    tty.c_cflag &= ~CRTSCTS;                // no flow control

    if (tcsetattr(fd, TCSANOW, &tty) != 0) {
        perror("[ERR] tcsetattr");
        close(fd);
        return -1;
    }

    return fd;
}

static int read_line_posix(int fd, char *buf, int maxlen) {
    static char accum[LINE_MAX_LEN];
    static int acc_len = 0;
    char ch;
    int n = read(fd, &ch, 1);
    if (n <= 0) {
        return 0;
    }
    if (ch == '\n' || ch == '\r') {
        if (acc_len > 0) {
            accum[acc_len] = '\0';
            strncpy(buf, accum, maxlen-1);
            buf[maxlen-1] = '\0';
            acc_len = 0;
            return 1;
        }
    } else if (acc_len < (int)sizeof(accum)-1) {
        accum[acc_len++] = ch;
    } else {
        acc_len = 0;
    }
    return 0;
}

#endif

#ifdef HAVE_CURL
static void upload_thingspeak(const char *api_key, int temp, int hum, int gas) {
    CURL *curl = curl_easy_init();
    if (!curl) return;

    char url[256];
    snprintf(url, sizeof(url),
             "https://api.thingspeak.com/update?api_key=%s&field1=%d&field2=%d&field3=%d",
             api_key, temp, hum, gas);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 10L);
    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
        fprintf(stderr, "[WARN] ThingSpeak upload failed: %s\n", curl_easy_strerror(res));
    }
    curl_easy_cleanup(curl);
}
#endif

int main(int argc, char **argv) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <serial_port> <baud> [csv_path|-] [thingspeak_key|-]\n", argv[0]);
        return 1;
    }
    const char *port = argv[1];
    int baud = atoi(argv[2]);
    const char *csv_path = (argc >= 4) ? argv[3] : "-";
    const char *ts_key   = (argc >= 5) ? argv[4] : "-";

    FILE *csv = NULL;
    if (csv_path && strcmp(csv_path, "-") != 0) {
        csv = fopen(csv_path, "a");
        if (!csv) {
            perror("[ERR] fopen CSV");
            return 1;
        }
        fprintf(csv, "timestamp,temp,hum,gas\n");
        fflush(csv);
    }

#ifdef _WIN32
    HANDLE h = open_serial_win(port, baud);
    if (h == INVALID_HANDLE_VALUE) return 1;
#else
    int fd = open_serial_posix(port, baud);
    if (fd < 0) return 1;
#endif

#ifdef HAVE_CURL
    curl_global_init(CURL_GLOBAL_DEFAULT);
#endif

    char line[LINE_MAX_LEN];
    while (1) {
#ifdef _WIN32
        if (!read_line_win(h, line, sizeof(line))) {
            Sleep(10);
            continue;
        }
#else
        if (!read_line_posix(fd, line, sizeof(line))) {
            usleep(10000);
            continue;
        }
#endif
        int temp, hum, gas;
        if (!parse_line(line, &temp, &hum, &gas)) {
            // skip non-matching lines
            continue;
        }

        // timestamp
        time_t now = time(NULL);
        struct tm *tm_now = localtime(&now);
        char ts[64];
        strftime(ts, sizeof(ts), "%Y-%m-%d %H:%M:%S", tm_now);

        printf("%s | TEMP=%dC HUM=%d%% GAS=%dppm\n", ts, temp, hum, gas);
        fflush(stdout);

        if (csv) {
            fprintf(csv, "%s,%d,%d,%d\n", ts, temp, hum, gas);
            fflush(csv);
        }

#ifdef HAVE_CURL
        if (ts_key && strcmp(ts_key, "-") != 0) {
            upload_thingspeak(ts_key, temp, hum, gas);
        }
#endif
    }

#ifdef HAVE_CURL
    curl_global_cleanup();
#endif

#ifdef _WIN32
    CloseHandle(h);
#else
    close(fd);
#endif

    if (csv) fclose(csv);
    return 0;
}
