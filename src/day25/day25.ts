import R from "ramda";
import { readLines } from "../common";

export const part1 = R.pipe(readLines, R.map(s2d), R.sum, d2s);
export const part2 = (filePath: string) => 0;

function s2d(snafu: string) {
    const lookup: Record<string, number> = { "=": -2, "-": -1, "0": 0, "1": 1, "2": 2 };
    return snafu.split("").reduce((sum, c) => sum * 5 + lookup[c], 0);
}

function d2s(decimal: number) {
    const lookup = ["=", "-", "0", "1", "2"];
    let snafu = "";
    while (decimal) {
        const d = (decimal + 2) % 5;
        snafu = lookup[d] + snafu;
        decimal = (decimal - d + 2) / 5;
    }
    return snafu;
}
