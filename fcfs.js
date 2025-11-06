const processes = [
    { pid: 1, arrivalTime: 0, burstTime: 5 },
    { pid: 2, arrivalTime: 1, burstTime: 3 },
    { pid: 3, arrivalTime: 2, burstTime: 8 },
    { pid: 4, arrivalTime: 3, burstTime: 6 }
];

function fcfs(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    console.log("PID\tArrival\tBurst\tWaiting\tTurnaround");

    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];

        process.waitingTime = Math.max(currentTime - process.arrivalTime, 0);

        process.turnaroundTime = process.waitingTime + process.burstTime;

        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;

        currentTime = Math.max(currentTime, process.arrivalTime) + process.burstTime;

        console.log(
            `${process.pid}\t${process.arrivalTime}\t${process.burstTime}\t${process.waitingTime}\t${process.turnaroundTime}`
        );
    }

    console.log(`\nAverage Waiting Time: ${(totalWaitingTime / processes.length).toFixed(2)}`);
    console.log(`Average Turnaround Time: ${(totalTurnaroundTime / processes.length).toFixed(2)}`);
}

fcfs(processes);
