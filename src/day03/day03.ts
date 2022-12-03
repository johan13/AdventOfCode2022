import R from "ramda";
import { fileParser } from "../common";

const solution = (makeGroups: (rucksacks: string[]) => string[][]) =>
    R.pipe(fileParser(R.identity), makeGroups, R.map(findCommonItem), R.map(getPriority), R.sum);

export const part1 = solution(R.map(rucksack => R.splitAt(rucksack.length / 2, rucksack)));
export const part2 = solution(R.splitEvery(3));

function findCommonItem(groups: string[]) {
    return groups.map(R.split("")).reduce(R.intersection)[0];
}

function getPriority(item: string) {
    const ch = item.charCodeAt(0);
    return ch > 96 ? ch - 96 : ch - 38;
}
