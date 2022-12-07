import R from "ramda";
import { readLines } from "../common";

export function part1(filePath: string) {
    const input = readLines(filePath)[0];
    return /(.)((?!\1).)((?!\1|\2).)(?!\1|\2|\3)./.exec(input)!.index + 4;
}

const solution = (length: number) =>
    R.pipe(
        readLines,
        x => x[0].split(""),
        R.aperture(length),
        R.findIndex<string[]>(x => R.uniq(x).length === x.length),
        R.add(length),
    );

// export const part1 = solution(4);
export const part2 = solution(14);
