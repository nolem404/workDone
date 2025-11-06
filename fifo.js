function fifoPageReplacement(pages, framesize) {
    const frames = [];
    let hits = 0;
    let misses = 0;
    let pointer = 0;

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        if (frames.includes(page)) {
            hits++;
            console.log(`Page ${page} HIT`);
        } else {
            misses++;
            if (frames.length < framesize) {
                frames.push(page);
            } else {
                frames[pointer] = page;
                pointer = (pointer + 1) % framesize;
            }
            console.log(`Page ${page} MISS`);
        }

        console.log(`Frames: [${frames.join(", ")}]`);
    }

    console.log(`\nTotal Hits: ${hits}`);
    console.log(`Total Misses: ${misses}`);
    console.log(`Hit Ratio: ${(hits / pages.length).toFixed(2)}`);
    console.log(`Miss Ratio: ${(misses / pages.length).toFixed(2)}`);
}

const pages = [1, 2, 3, 2, 4, 1, 5];
const framesize = 3;

fifoPageReplacement(pages, framesize);
