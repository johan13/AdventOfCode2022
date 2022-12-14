import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), solution(false));
export const part2 = R.pipe(fileParser(parseLine), solution(true));

type Point = { x: number; y: number };
function parseLine(line: string) {
    return line.split(" -> ").map<Point>(xy => {
        const [, x, y] = /^(\d+),(\d+)$/.exec(xy)!.map(Number);
        return { x, y };
    });
}

function solution(hasFloor: boolean) {
    return (lines: Point[][]) => {
        const maxy = Math.max(...lines.flatMap(l => l.map(p => p.y)));
        const map = R.range(0, maxy + 1).map(() => R.repeat(" ", 1000));
        for (const line of lines) drawLine(map, line);
        if (hasFloor) map.push(R.repeat(" ", 1000), R.repeat("#", 1000));

        for (let count = 0; ; count++) {
            if (!trickleDown(map, { x: 500, y: 0 })) return count;
        }
    };
}

function drawLine(map: string[][], line: Point[]) {
    for (const [start, end] of R.aperture(2, line)) {
        for (let { x, y } = start; ; ) {
            map[y][x] = "#";
            if (x === end.x && y === end.y) break;
            x += Math.sign(end.x - x);
            y += Math.sign(end.y - y);
        }
    }
}

function trickleDown(map: string[][], { x, y }: Point): boolean {
    if (y + 1 >= map.length || map[y][x] !== " ") return false;
    if (map[y + 1][x] === " ") return trickleDown(map, { x, y: y + 1 });
    if (map[y + 1][x - 1] === " ") return trickleDown(map, { x: x - 1, y: y + 1 });
    if (map[y + 1][x + 1] === " ") return trickleDown(map, { x: x + 1, y: y + 1 });
    map[y][x] = "o";
    return true;
}
