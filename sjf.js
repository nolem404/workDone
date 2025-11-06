const processes = [
    { pid: 1, arrivalTime: 0, burstTime: 7 },
    { pid: 2, arrivalTime: 2, burstTime: 4 },
    { pid: 3, arrivalTime: 4, burstTime: 1 },
    { pid: 4, arrivalTime: 5, burstTime: 4 }
];

function sjf(processes) {
    const n = processes.length;
    let completed = 0;
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let isCompleted = Array(n).fill(false);

    console.log("PID\tArrival\tBurst\tWaiting\tTurnaround");

    while (completed !== n) {
        let idx = -1;
        let minBurst = Infinity;
        for (let i = 0; i < n; i++) {
            if (
                processes[i].arrivalTime <= currentTime &&
                !isCompleted[i] &&
                processes[i].burstTime < minBurst
            ) {
                minBurst = processes[i].burstTime;
                idx = i;
            }
        }

        if (idx !== -1) {
            const process = processes[idx];

            process.waitingTime = currentTime - process.arrivalTime;
            process.turnaroundTime = process.waitingTime + process.burstTime;

            totalWaitingTime += process.waitingTime;
            totalTurnaroundTime += process.turnaroundTime;

            currentTime += process.burstTime;

            isCompleted[idx] = true;
            completed++;

            console.log(
                `${process.pid}\t${process.arrivalTime}\t${process.burstTime}\t${process.waitingTime}\t${process.turnaroundTime}`
            );
        } else {
            currentTime++;
        }
    }

    console.log(`\nAverage Waiting Time: ${(totalWaitingTime / n).toFixed(2)}`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / n).toFixed(2)}`);
}

sjf(processes);
