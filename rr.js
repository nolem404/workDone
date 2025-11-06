function roundRobin(processes, burstTime, quantum) {
    const n = processes.length;
    const remaining = [...burstTime];
    const waitingTime = Array(n).fill(0);
    const turnaroundTime = Array(n).fill(0);
    let time = 0;

    console.log("Round Robin Execution Order:");
    let done = false;

    while (!done) {
        done = true;
        for (let i = 0; i < n; i++) {
            if (remaining[i] > 0) {
                done = false;
                const exec = Math.min(remaining[i], quantum);
                console.log(`Process ${processes[i]} executes for ${exec} units (time ${time} → ${time + exec})`);
                time += exec;
                remaining[i] -= exec;
            }
        }
    }

    const completionTime = Array(n).fill(0);
    const rem = [...burstTime];
    time = 0;
    let queue = [...processes.keys()];

    while (queue.length > 0) {
        const i = queue.shift();
        if (rem[i] > 0) {
            const exec = Math.min(rem[i], quantum);
            time += exec;
            rem[i] -= exec;
            if (rem[i] > 0) queue.push(i);
            else completionTime[i] = time;
        }
    }

    for (let i = 0; i < n; i++) {
        turnaroundTime[i] = completionTime[i];
        waitingTime[i] = turnaroundTime[i] - burstTime[i];
    }

    console.log("\nProcess\tBurst\tWaiting\tTurnaround");
    for (let i = 0; i < n; i++) {
        console.log(`${processes[i]}\t${burstTime[i]}\t${waitingTime[i]}\t${turnaroundTime[i]}`);
    }

    const avgWaiting = waitingTime.reduce((a, b) => a + b, 0) / n;
    const avgTurnaround = turnaroundTime.reduce((a, b) => a + b, 0) / n;

    console.log(`\nAverage Waiting Time: ${avgWaiting.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${avgTurnaround.toFixed(2)}`);
}

const processes = ["P1", "P2", "P3", "P4"];
const burstTime = [10, 5, 8, 6];
const quantum = 3;

roundRobin(processes, burstTime, quantum);
