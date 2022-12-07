import R from "ramda";
import { readLines } from "../common";

export const part1 = R.pipe(readLines, getDirSizes, R.filter(R.gte(1e5)), R.sum);
export const part2 = R.pipe(readLines, getDirSizes, x => x.filter(R.lte(x[0] - 4e7)).reduce(R.min));

function getDirSizes(input: string[]) {
    const sizes = [0]; // Index 0 is this dir's size. The rest will be subdirs' sizes.
    for (;;) {
        const line = input.shift();
        if (line === undefined || line === "$ cd ..") return sizes;
        if (line.startsWith("$ cd")) {
            const subdirSizes = getDirSizes(input);
            sizes.push(...subdirSizes);
            sizes[0] += subdirSizes[0]; // A dir's size includes the size of subdirs.
        } else if (/^\d/.test(line)) {
            sizes[0] += parseInt(line, 10);
        }
    }
}
