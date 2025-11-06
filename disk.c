#include <stdio.h>
#include <stdlib.h>

void fcfs(int requests[], int n, int head) {
    int total = 0;
    printf("\nFCFS Scheduling:\n");
    for (int i = 0; i < n; i++) {
        printf("Move from %d to %d\n", head, requests[i]);
        total += abs(head - requests[i]);
        head = requests[i];
    }
    printf("Total Head Movement = %d\n", total);
}

void scan(int requests[], int n, int head, int diskSize, int direction) {
    int total = 0;
    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = requests[i];

    // Sort requests
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (sorted[i] > sorted[j]) {
                int temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }

    int pos = n;
    for (int i = 0; i < n; i++) {
        if (sorted[i] > head) {
            pos = i;
            break;
        }
    }

    printf("\nSCAN Scheduling:\n");

    if (direction == 1) { // moving right
        for (int i = pos; i < n; i++) {
            printf("Move from %d → %d\n", head, sorted[i]);
            total += abs(head - sorted[i]);
            head = sorted[i];
        }
        total += abs((diskSize - 1) - head);
        head = diskSize - 1;
        for (int i = pos - 1; i >= 0; i--) {
            printf("Move from %d → %d\n", head, sorted[i]);
            total += abs(head - sorted[i]);
            head = sorted[i];
        }
    } else { // moving left
        for (int i = pos - 1; i >= 0; i--) {
            printf("Move from %d → %d\n", head, sorted[i]);
            total += abs(head - sorted[i]);
            head = sorted[i];
        }
        total += head;
        head = 0;
        for (int i = pos; i < n; i++) {
            printf("Move from %d → %d\n", head, sorted[i]);
            total += abs(head - sorted[i]);
            head = sorted[i];
        }
    }
    printf("Total Head Movement = %d\n", total);
}

void cscan(int requests[], int n, int head, int diskSize) {
    int total = 0;
    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = requests[i];

    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (sorted[i] > sorted[j]) {
                int temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }

    int pos = n;
    for (int i = 0; i < n; i++) {
        if (sorted[i] > head) {
            pos = i;
            break;
        }
    }

    printf("\nC-SCAN Scheduling:\n");
    for (int i = pos; i < n; i++) {
        printf("Move from %d → %d\n", head, sorted[i]);
        total += abs(head - sorted[i]);
        head = sorted[i];
    }
    total += abs((diskSize - 1) - head);
    total += diskSize - 1;
    head = 0;
    for (int i = 0; i < pos; i++) {
        printf("Move from %d → %d\n", head, sorted[i]);
        total += abs(head - sorted[i]);
        head = sorted[i];
    }
    printf("Total Head Movement = %d\n", total);
}

int main() {
    int requests[] = {176, 79, 34, 60, 92, 11, 41, 114};
    int n = sizeof(requests) / sizeof(requests[0]);
    int head = 50;
    int diskSize = 200;
    int direction = 1; // 1 = right, 0 = left

    fcfs(requests, n, head);
    scan(requests, n, head, diskSize, direction);
    cscan(requests, n, head, diskSize);

    return 0;
}
