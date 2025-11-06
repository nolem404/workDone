function fcfs(requests, head) {
  let total = 0;
  console.log("\nFCFS Scheduling:");
  for (let req of requests) {
    console.log(`Move from ${head} to ${req}`);
    total += Math.abs(head - req);
    head = req;
  }
  console.log("Total Head Movement =", total);
}

function scan(requests, head, diskSize, direction) {
  let total = 0;
  const sorted = [...requests].sort((a, b) => a - b);
  let pos = sorted.findIndex(r => r > head);
  if (pos === -1) pos = sorted.length;

  console.log("\nSCAN Scheduling:");
  if (direction === 1) {
    for (let i = pos; i < sorted.length; i++) {
      console.log(`Move from ${head} → ${sorted[i]}`);
      total += Math.abs(head - sorted[i]);
      head = sorted[i];
    }
    total += Math.abs((diskSize - 1) - head);
    head = diskSize - 1;
    for (let i = pos - 1; i >= 0; i--) {
      console.log(`Move from ${head} → ${sorted[i]}`);
      total += Math.abs(head - sorted[i]);
      head = sorted[i];
    }
  } else {
    for (let i = pos - 1; i >= 0; i--) {
      console.log(`Move from ${head} → ${sorted[i]}`);
      total += Math.abs(head - sorted[i]);
      head = sorted[i];
    }
    total += head;
    head = 0;
    for (let i = pos; i < sorted.length; i++) {
      console.log(`Move from ${head} → ${sorted[i]}`);
      total += Math.abs(head - sorted[i]);
      head = sorted[i];
    }
  }
  console.log("Total Head Movement =", total);
}

function cscan(requests, head, diskSize) {
  let total = 0;
  const sorted = [...requests].sort((a, b) => a - b);
  let pos = sorted.findIndex(r => r > head);
  if (pos === -1) pos = sorted.length;

  console.log("\nC-SCAN Scheduling:");
  for (let i = pos; i < sorted.length; i++) {
    console.log(`Move from ${head} → ${sorted[i]}`);
    total += Math.abs(head - sorted[i]);
    head = sorted[i];
  }
  total += Math.abs((diskSize - 1) - head);
  total += diskSize - 1;
  head = 0;
  for (let i = 0; i < pos; i++) {
    console.log(`Move from ${head} → ${sorted[i]}`);
    total += Math.abs(head - sorted[i]);
    head = sorted[i];
  }
  console.log("Total Head Movement =", total);
}

const requests = [176, 79, 34, 60, 92, 11, 41, 114];
const head = 50;
const diskSize = 200;
const direction = 1; 

fcfs(requests, head);
scan(requests, head, diskSize, direction);
cscan(requests, head, diskSize);