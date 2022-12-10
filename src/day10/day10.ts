import R from "ramda";
import { readLines } from "../common";

export const part1 = solution((acc, x, i) => {
    const cycle = i + 1;
    return acc + (cycle % 40 === 20 ? cycle * x : 0);
}, 0);

export const part2 = solution((acc, x, i) => {
    const column = i % 40;
    return acc + (Math.abs(x - column) < 2 ? "#" : ".") + (column === 39 ? "\n" : "");
}, "");

function solution<T>(reducer: (acc: T, x: number, i: number) => T, initial: T) {
    return R.pipe(readLines, program => [...execute(program)].reduce(reducer, initial));
}

function* execute(program: Iterable<string>) {
    let x = 1;
    for (const instruction of program) {
        yield x;
        if (instruction !== "noop") {
            yield x;
            x += Number(instruction.slice(5));
        }
    }
}
