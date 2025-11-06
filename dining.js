class Chopstick {
    constructor(id) {
        this.id = id;
        this.locked = false;
    }

    async pick() {
        while (this.locked) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        this.locked = true;
    }

    put() {
        this.locked = false;
    }
}

async function philosopher(id, left, right, times) {
    for (let i = 0; i < times; i++) {
        console.log(`Philosopher ${id} is thinking`);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

        if (id % 2 === 0) {
            await left.pick();
            await right.pick();
        } else {
            await right.pick();
            await left.pick();
        }

        console.log(`Philosopher ${id} is eating`);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

        left.put();
        right.put();
        console.log(`Philosopher ${id} finished eating`);
    }
}

const N = 5;
const chopsticks = Array.from({ length: N }, (_, i) => new Chopstick(i));
const timesToEat = 3;

for (let i = 0; i < N; i++) {
    philosopher(i, chopsticks[i], chopsticks[(i + 1) % N], timesToEat);
}
