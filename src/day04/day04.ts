import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), R.count(fullyContains));
export const part2 = R.pipe(fileParser(parseLine), R.count(overlapAtAll));

type Pair = ReturnType<typeof parseLine>;
function parseLine(line: string) {
    const [, f1, t1, f2, t2] = /^(\d+)-(\d+),(\d+)-(\d+)$/.exec(line)!.map(Number);
    return [
        { from: f1, to: t1 },
        { from: f2, to: t2 },
    ] as const;
}

function fullyContains([a, b]: Pair) {
    return (a.from >= b.from && a.to <= b.to) || (b.from >= a.from && b.to <= a.to);
}

function overlapAtAll([a, b]: Pair) {
    return a.from <= b.to && a.to >= b.from;
}
