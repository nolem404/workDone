let flag = [false, false];
let turn = 0;
let sharedCounter = 0;

function process(id, iterations) {
    for (let i = 0; i < iterations; i++) {
        flag[id] = true;
        turn = 1 - id;
        while (flag[1 - id] && turn === 1 - id) {}

        sharedCounter++;
        console.log(`Process ${id} is in critical section. Counter: ${sharedCounter}`);

        flag[id] = false;
        console.log(`Process ${id} is in remainder section.`);
    }
}

async function simulate() {
    const p0 = new Promise(resolve => {
        process(0, 5);
        resolve();  
    });
    const p1 = new Promise(resolve => {
        process(1, 5);
        resolve();
    });

    await Promise.all([p0, p1]);
    console.log("Final Counter Value:", sharedCounter);
}

simulate();
