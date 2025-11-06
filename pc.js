class Buffer {
    constructor(size) {
        this.size = size;
        this.queue = [];
    }

    async produce(item) {
        while (this.queue.length >= this.size) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.queue.push(item);
        console.log(`Produced: ${item}`);
    }

    async consume() {
        while (this.queue.length === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const item = this.queue.shift();
        console.log(`Consumed: ${item}`);
        return item;
    }
}

const buffer = new Buffer(5);

async function producer() {
    let i = 1;
    while (i <= 10) {
        await buffer.produce(i++);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
    }
}

async function consumer() {
    for (let i = 0; i < 10; i++) {
        await buffer.consume();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    }
}

producer();
consumer();
