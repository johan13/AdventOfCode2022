import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), buildMap, getCoolingArea("A", "O"));
export const part2 = R.pipe(fileParser(parseLine), buildMap, getCoolingArea("O"));

type Point = { x: number; y: number; z: number };
type Cell = "A" | "D" | "O"; // Air pocket / Droplet / Outside
type Map = Cell[][][];

function parseLine(line: string) {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
}

function buildMap(droplets: Point[]) {
    const size = Math.max(...droplets.flatMap(d => [d.x, d.y, d.z])) + 1;
    const map: Map = R.times(() => R.times(() => R.repeat("A", size), size), size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            map[0][i][j] = "O";
            map[size - 1][i][j] = "O";
            map[i][0][j] = "O";
            map[0][size - 1][j] = "O";
            map[i][j][0] = "O";
            map[i][j][size - 1] = "O";
        }
    }

    for (const { x, y, z } of droplets) map[x][y][z] = "D";

    let didChange;
    do {
        didChange = false;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    if (map[x][y][z] === "A" && neighbors(map, { x, y, z }).includes("O")) {
                        map[x][y][z] = "O";
                        didChange = true;
                    }
                }
            }
        }
    } while (didChange);

    return { droplets, map };
}

function getCoolingArea(...coolingTypes: Cell[]) {
    return ({ droplets, map }: { droplets: Point[]; map: Map }) =>
        droplets.reduce(
            (sum, d) => sum + R.count(c => coolingTypes.includes(c), neighbors(map, d)),
            0,
        );
}

function neighbors(map: Map, { x, y, z }: Point) {
    return [
        map[x - 1]?.[y][z] ?? "O",
        map[x + 1]?.[y][z] ?? "O",
        map[x][y - 1]?.[z] ?? "O",
        map[x][y + 1]?.[z] ?? "O",
        map[x][y][z - 1] ?? "O",
        map[x][y][z + 1] ?? "O",
    ];
}
