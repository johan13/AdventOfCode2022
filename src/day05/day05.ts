import R from "ramda";
import { readLines } from "../common";

export const part1 = R.pipe(readLines, parseInput, makeMoves(true));
export const part2 = R.pipe(readLines, parseInput, makeMoves(false));

type State = ReturnType<typeof parseInput>;
function parseInput(lines: string[]) {
    const emptyIndex = lines.findIndex(x => x === "");
    const moves = lines.slice(emptyIndex + 1).map(line => {
        const [, count, from, to] = /^move (\d+) from (\d) to (\d)$/.exec(line)!.map(Number);
        return { count, from, to };
    });

    const stacks: string[][] = R.times(() => [], 9);
    for (const line of R.reverse(lines.slice(0, emptyIndex - 1))) {
        const re = /\[(.)\]/dg;
        for (let m = re.exec(line); m !== null; m = re.exec(line)) stacks[m.index / 4].push(m[1]);
    }

    return { stacks, moves };
}

function makeMoves(oneByOne: boolean) {
    return ({ stacks, moves }: State) => {
        for (const { count, from, to } of moves) {
            const crates = stacks[from - 1].splice(-count);
            if (oneByOne) crates.reverse();
            stacks[to - 1].push(...crates);
        }

        return stacks.map(R.last).join("");
    };
}
