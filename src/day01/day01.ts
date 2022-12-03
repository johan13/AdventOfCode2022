import R from "ramda";
import { fileParser } from "../common";

const solution = (numElves: number) =>
    R.pipe(
        fileParser(x => x.split("\n").map(Number), "\n\n"),
        R.map(R.sum),
        R.sortBy(R.negate),
        R.take(numElves),
        R.sum,
    );

export const part1 = solution(1);
export const part2 = solution(3);
