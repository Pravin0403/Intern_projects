
#include <msp430.h>
#include "FreeRTOS.h"
#include "task.h"
#include "queue.h"

typedef struct {
    int temperature;
    char motion[4];
} SensorData;

SensorData sensorData = {0, "OFF"};

void vTemperatureTask(void *pvParameters);
void vMotionTask(void *pvParameters);
void vCommunicationTask(void *pvParameters);
void uart_init_9600(void);
void uart_send_string(const char *s);
void uart_send_char(char c);

int main(void)
{
    WDTCTL = WDTPW | WDTHOLD;
    BCSCTL1 = CALBC1_1MHZ;
    DCOCTL = CALDCO_1MHZ;
    uart_init_9600();

    uart_send_string("RTOS Multi-Sensor Simulation Start\r\n");

    xTaskCreate(vTemperatureTask, "TempTask", 100, NULL, 2, NULL);
    xTaskCreate(vMotionTask, "MotionTask", 100, NULL, 2, NULL);
    xTaskCreate(vCommunicationTask, "CommTask", 150, NULL, 1, NULL);

    vTaskStartScheduler();
    while (1) { }
}

void vTemperatureTask(void *pvParameters)
{
    (void) pvParameters;
    while (1)
    {
        sensorData.temperature = 25 + (rand() % 6);
        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

void vMotionTask(void *pvParameters)
{
    (void) pvParameters;
    while (1)
    {
        if ((rand() % 2) == 0)
            strcpy(sensorData.motion, "ON");
        else
            strcpy(sensorData.motion, "OFF");
        vTaskDelay(pdMS_TO_TICKS(3000));
    }
}

void vCommunicationTask(void *pvParameters)
{
    (void) pvParameters;
    char line[64];
    while (1)
    {
        sprintf(line, "TEMP=%dC,MOTION=%s\r\n", sensorData.temperature, sensorData.motion);
        uart_send_string(line);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

void uart_init_9600(void)
{
    P1SEL  |= BIT1 | BIT2;
    P1SEL2 |= BIT1 | BIT2;
    UCA0CTL1 |= UCSWRST;
    UCA0CTL1 |= UCSSEL_2;
    UCA0BR0 = 104;
    UCA0BR1 = 0;
    UCA0MCTL = UCBRS0;
    UCA0CTL1 &= ~UCSWRST;
}

void uart_send_char(char c)
{
    while (!(IFG2 & UCA0TXIFG));
    UCA0TXBUF = (uint8_t)c;
}

void uart_send_string(const char *s)
{
    while (*s) uart_send_char(*s++);
}
