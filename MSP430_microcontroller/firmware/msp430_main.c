//
// Project: IoT Environmental Monitor (Simulation) - All C Version
// MCU: MSP430G2553
// UART: 9600 baud -> Proteus Virtual Terminal or COMPIM
//
// Output format:
//   TEMP=27,HUM=55,GAS=231\r\n
//
#include <msp430.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>

static void clock_init_1mhz(void);
static void uart_init_9600(void);
static void uart_send_char(char c);
static void uart_send_string(const char *s);
static void delay_ms(uint16_t ms);
static void seed_prng(void);

static int mock_temperature_c(void) { return 25 + (rand() % 6); }
static int mock_humidity_pct(void)  { return 48 + (rand() % 15); }
static int mock_gas_ppm(void)       { return 180 + (rand() % 120); }

int main(void)
{
    WDTCTL = WDTPW | WDTHOLD;

    clock_init_1mhz();
    uart_init_9600();
    seed_prng();

    uart_send_string("IoT Environmental Monitor (MSP430, C) - Start\r\n");

    char line[64];
    while (1)
    {
        int t = mock_temperature_c();
        int h = mock_humidity_pct();
        int g = mock_gas_ppm();

        snprintf(line, sizeof(line), "TEMP=%d,HUM=%d,GAS=%d\r\n", t, h, g);
        uart_send_string(line);

        delay_ms(2000);
    }
}

static void clock_init_1mhz(void)
{
    if (CALBC1_1MHZ == 0xFF || CALDCO_1MHZ == 0xFF)
    {
        BCSCTL1 = XT2OFF | RSEL0;
        DCOCTL  = 0;
    }
    else
    {
        BCSCTL1 = CALBC1_1MHZ;
        DCOCTL  = CALDCO_1MHZ;
    }
}

static void uart_init_9600(void)
{
    P1SEL  |= BIT1 | BIT2;
    P1SEL2 |= BIT1 | BIT2;

    UCA0CTL1 |= UCSWRST;
    UCA0CTL1 |= UCSSEL_2;    // SMCLK
    UCA0BR0 = 104;           // 1MHz / 9600
    UCA0BR1 = 0;
    UCA0MCTL = UCBRS0;       // Modulation
    UCA0CTL1 &= ~UCSWRST;
}

static void uart_send_char(char c)
{
    while (!(IFG2 & UCA0TXIFG));
    UCA0TXBUF = (uint8_t)c;
}

static void uart_send_string(const char *s)
{
    while (*s)
    {
        uart_send_char(*s++);
    }
}

static void delay_ms(uint16_t ms)
{
    while (ms--)
        __delay_cycles(1000);
}

static void seed_prng(void)
{
    unsigned int seed = TAR;
    seed ^= (unsigned int)(&seed);
    seed ^= 0xA5A5u;
    srand(seed);
}
