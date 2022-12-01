import R from "ramda";
import { fileParser } from "../common";

const readInput = fileParser(x => x.split("\n").map(Number), "\n\n");
export const part1 = R.pipe(readInput, R.map(R.sum), R.reduce(R.max, 0));
export const part2 = R.pipe(readInput, R.map(R.sum), R.sortBy(R.negate), R.take(3), R.sum);
