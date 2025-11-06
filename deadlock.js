const processes = ["P0", "P1", "P2"];
const available = [3, 3, 2];
const max = [
    [7, 5, 3],  
    [3, 2, 2],  
    [9, 0, 2],  
];
const allocated = [
    [0, 1, 0], 
    [2, 0, 0], 
    [3, 0, 2], 
];

const need = max.map((row, i) => row.map((val, j) => val - allocated[i][j]));

console.log("Processes:", processes);
console.log("Available Resources:", available);
console.log("Allocated Matrix:");
console.table(allocated);
console.log("Max Matrix:");
console.table(max);
console.log("Need Matrix:");
console.table(need);

const work = [...available];
const finish = Array(processes.length).fill(false);
const safeSequence = [];

while (true) {
    let found = false;

    for (let i = 0; i < processes.length; i++) {
        if (!finish[i] && need[i].every((n, j) => n <= work[j])) {
            // This process can execute
            for (let j = 0; j < work.length; j++) {
                work[j] += allocated[i][j];
            }
            safeSequence.push(processes[i]);
            finish[i] = true;
            found = true;
        }
    }

    if (!found) break;
}

if (finish.every(f => f)) {
    console.log("System is in a SAFE state!");
    console.log("Safe sequence:", safeSequence.join(" -> "));
} else {
    console.log("System is in an UNSAFE state! Deadlock may occur.");
}
