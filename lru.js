function lruPageReplacement(pages, capacity) {
    const frames = [];
    const recent = new Map();
    let hits = 0;
    let misses = 0;

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        if (frames.includes(page)) {
            hits++;
            console.log(`Page ${page} HIT`);
        } else {
            misses++;
            if (frames.length < capacity) {
                frames.push(page);
            } else {
                let lruPage = frames[0];
                let oldestIndex = recent.get(lruPage);

                for (const f of frames) {
                    if (recent.get(f) < oldestIndex) {
                        oldestIndex = recent.get(f);
                        lruPage = f;
                    }
                }

                const idx = frames.indexOf(lruPage);
                frames[idx] = page;
            }
            console.log(`Page ${page} MISS`);
        }

        recent.set(page, i);

        console.log(`Frames: [${frames.join(", ")}]`);
    }

    console.log(`\nTotal Hits: ${hits}`);
    console.log(`Total Misses: ${misses}`);
    console.log(`Hit Ratio: ${(hits / pages.length).toFixed(2)}`);
    console.log(`Miss Ratio: ${(misses / pages.length).toFixed(2)}`);
}

const pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3];
const capacity = 3;

lruPageReplacement(pages, capacity);
