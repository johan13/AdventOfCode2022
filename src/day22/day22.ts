import R from "ramda";
import { readLines } from "../common";

export const part1 = R.pipe(readLines, parseInput, makeMoves(stepFlat), getAnswer);
export const part2 = R.pipe(readLines, parseInput, makeMoves(stepCube), getAnswer);

type Map = string[][];
type Input = { map: Map; path: Array<"L" | "R" | number> };
type State = { x: number; y: number; dir: number };

function parseInput(lines: string[]) {
    const emptyIndex = lines.indexOf("");
    const map = lines.slice(0, emptyIndex).map(R.split(""));
    const path = lines[emptyIndex + 1]
        .split(/(?<=[LR])|(?=[LR])/)
        .map(x => (x === "L" || x === "R" ? x : Number(x)));
    return { map, path };
}

function makeMoves(singleStep: (map: Map, state: State) => State) {
    return ({ map, path }: Input) => {
        let state: State = { x: map[0].indexOf("."), y: 0, dir: 0 };
        for (let step of path) {
            switch (step) {
                case "L":
                    state.dir = (state.dir + 3) % 4;
                    break;
                case "R":
                    state.dir = (state.dir + 1) % 4;
                    break;
                default:
                    while (step--) {
                        const next = singleStep(map, state);
                        if (map[next.y][next.x] === "#") break;
                        state = next;
                    }
                    break;
            }
        }
        return state;
    };
}

function stepFlat(map: Map, { x, y, dir }: State) {
    const dx = dir === 0 ? 1 : dir === 2 ? -1 : 0;
    const dy = dir === 1 ? 1 : dir === 3 ? -1 : 0;
    do {
        x = (x + dx + map[0].length) % map[0].length;
        y = (y + dy + map.length) % map.length;
    } while (map[y][x] === " " || map[y][x] === undefined);
    return { x, y, dir };
}

function stepCube(map: Map, { x, y, dir }: State) {
    // This is not elegant.
    if (map.length === 12) {
        if (x === 11 && y <= 3 && dir === 0) return { x: 15, y: 11 - y, dir: 2 };
        if (x === 11 && y >= 4 && y <= 7 && dir === 0) return { x: 19 - y, y: 8, dir: 1 };
        if (y === 8 && x >= 12 && dir === 3) return { x: 11, y: 19 - x, dir: 2 };
        if (x === 15 && y >= 8 && dir === 0) return { x: 11, y: 11 - y, dir: 2 };
        if (y === 11 && x >= 11 && dir === 1) return { x: 0, y: 19 - x, dir: 0 };
        if (y === 11 && x >= 8 && x <= 11 && dir === 1) return { x: 11 - x, y: 7, dir: 3 };
        if (x === 8 && y >= 8 && dir === 2) return { x: 15 - y, y: 7, dir: 3 };
        if (y === 7 && x >= 4 && x <= 7 && dir === 1) return { x: 8, y: 15 - x, dir: 0 };
        if (y === 7 && x >= 3 && dir === 1) return { x: 11 - x, y: 11, dir: 3 };
        if (x === 0 && y >= 4 && y <= 7 && dir === 2) return { x: 19 - y, y: 11, dir: 3 };
        if (y === 4 && x <= 3 && dir === 3) return { x: 11 - x, y: 0, dir: 1 };
        if (y === 4 && x >= 4 && x <= 7 && dir === 3) return { x: 8, y: x - 4, dir: 0 };
        if (x === 8 && y <= 3 && dir === 2) return { x: y + 4, y: 4, dir: 1 };
        if (y === 0 && x >= 8 && x <= 11 && dir === 3) return { x: 11 - x, y: 4, dir: 1 };
    } else {
        if (x === 149 && y <= 49 && dir === 0) return { x: 99, y: 149 - y, dir: 2 };
        if (y === 49 && x >= 100 && dir === 1) return { x: 99, y: x - 50, dir: 2 };
        if (x === 99 && y >= 50 && y <= 99 && dir === 0) return { x: y + 50, y: 49, dir: 3 };
        if (x === 99 && y >= 100 && y <= 149 && dir === 0) return { x: 149, y: 149 - y, dir: 2 };
        if (y === 149 && x >= 50 && x <= 99 && dir === 1) return { x: 49, y: x + 100, dir: 2 };
        if (x === 49 && y >= 150 && dir === 0) return { x: y - 100, y: 149, dir: 3 };
        if (y === 199 && x <= 49 && dir === 1) return { x: x + 100, y: 0, dir: 1 };
        if (x === 0 && y >= 150 && dir === 2) return { x: y - 100, y: 0, dir: 1 };
        if (x === 0 && y >= 100 && y <= 149 && dir === 2) return { x: 50, y: 149 - y, dir: 0 };
        if (y === 100 && x <= 49 && dir === 3) return { x: 50, y: x + 50, dir: 0 };
        if (x === 50 && y >= 50 && y <= 99 && dir === 2) return { x: y - 50, y: 100, dir: 1 };
        if (x === 50 && y <= 49 && dir === 2) return { x: 0, y: 149 - y, dir: 0 };
        if (y === 0 && x >= 50 && x <= 99 && dir === 3) return { x: 0, y: x + 100, dir: 0 };
        if (y === 0 && x >= 100 && dir === 3) return { x: x - 100, y: 199, dir: 3 };
    }
    return {
        x: x + (dir === 0 ? 1 : dir === 2 ? -1 : 0),
        y: y + (dir === 1 ? 1 : dir === 3 ? -1 : 0),
        dir,
    };
}

function getAnswer({ x, y, dir }: State) {
    return 1000 * (y + 1) + 4 * (x + 1) + dir;
}
