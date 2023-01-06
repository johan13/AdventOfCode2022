import R from "ramda";
import { readChars } from "../common";

export const part1 = R.pipe(readChars, getHeight(2022));
export const part2 = R.pipe(readChars, getHeight(1_000_000_000_000));

const rockTypes: ("." | "#")[][][] = [
    [["#", "#", "#", "#"]],
    [
        [".", "#", "."],
        ["#", "#", "#"],
        [".", "#", "."],
    ],
    [
        [".", ".", "#"],
        [".", ".", "#"],
        ["#", "#", "#"],
    ],
    [["#"], ["#"], ["#"], ["#"]],
    [
        ["#", "#"],
        ["#", "#"],
    ],
];

function getHeight(numRocks: number) {
    return (input: string[]) => {
        const chamber: ("." | "#")[][] = [];
        let windIndex = -1;
        const history: Array<{ rock: number; wind: number; x: number; y: number }> = [];
        let extraHeight = 0;
        let cycleLength: number | undefined;

        for (let rockIndex = 0; rockIndex < numRocks; rockIndex++) {
            let x = 2;
            let y = 0;
            const rock = rockTypes[rockIndex % rockTypes.length];
            for (let i = 0; i < 3 + rock.length; i++) chamber.unshift(R.repeat(".", 7));

            for (;;) {
                const wind = input[++windIndex % input.length];
                const x2 = x + (wind === "<" ? -1 : 1);
                if (
                    rock.every((row, i) =>
                        row.every((c, j) => c === "." || chamber[y + i][x2 + j] === "."),
                    )
                ) {
                    x = x2;
                }

                if (
                    !rock.every((row, i) =>
                        row.every((c, j) => c === "." || chamber[y + i + 1]?.[x + j] === "."),
                    )
                ) {
                    break;
                }

                y++;
            }

            for (let i = 0; i < rock.length; i++) {
                for (let j = 0; j < rock[0].length; j++) {
                    if (rock[i][j] === "#") chamber[y + i][x + j] = "#";
                }
            }

            while (chamber[0].every(x => x === ".")) chamber.shift();

            if (cycleLength === undefined) {
                history.push({
                    rock: rockIndex % rockTypes.length,
                    wind: windIndex % input.length,
                    x,
                    y: chamber.length - y,
                });
                cycleLength = findCycle(history);
                if (cycleLength) {
                    const num = Math.floor((numRocks - rockIndex) / cycleLength);
                    rockIndex += num * cycleLength;
                    extraHeight += num * (history.at(-1)!.y - history.at(-1 - cycleLength)!.y);
                }
            }
        }

        return chamber.length + extraHeight;
    };
}

function findCycle(history: Array<{ rock: number; wind: number; x: number; y: number }>) {
    const seqLen = 10;
    for (let cycleLength = 1; cycleLength < history.length - seqLen; cycleLength++) {
        if (
            R.range(0, seqLen).every(i => {
                const h1 = history.at(-1 - i)!;
                const h2 = history.at(-1 - i - cycleLength)!;
                return h1.wind === h2.wind && h1.rock === h2.rock && h1.x === h2.x;
            })
        ) {
            return cycleLength;
        }
    }
    return undefined;
}
