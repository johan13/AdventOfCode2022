import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), doPart1, getAnswer1);
export const part2 = (filePath: string) => 0;

function parseLine(line: string): number {
    return Number(line);
}

function doPart1(input: Array<ReturnType<typeof parseLine>>): number[] {
    return [];
}

function getAnswer1(intermediate: ReturnType<typeof doPart1>): number {
    return intermediate.length;
}
