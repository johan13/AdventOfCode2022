import R from "ramda";
import { fileParser } from "../common";

const readInput = fileParser(R.split(""));
export const part1 = R.pipe(readInput, preprocess, findShortestPath(false));
export const part2 = R.pipe(readInput, preprocess, findShortestPath(true));

function preprocess(map: string[][]) {
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    const numericMap = map.map((row, y) =>
        row.map((c, x) => {
            if (c === "S") {
                start = { x, y };
                return 0;
            } else if (c === "E") {
                end = { x, y };
                return 25;
            }
            return c.charCodeAt(0) - 97;
        }),
    );
    return { map: numericMap, start, end };
}

function findShortestPath(anyStart: boolean) {
    return ({ map, start, end }: ReturnType<typeof preprocess>) => {
        const visited = map.map(row => row.map(() => false));
        let toVisit = [end];
        for (let step = 0; ; step++) {
            for (const { x, y } of toVisit) {
                if ((x === start.x && y === start.y) || (anyStart && map[y][x] === 0)) return step;
                visited[y][x] = true;
            }
            toVisit = toVisit.flatMap(({ x, y }) =>
                [
                    { x: x - 1, y },
                    { x: x + 1, y },
                    { x, y: y - 1 },
                    { x, y: y + 1 },
                ].filter(p => false === visited[p.y]?.[p.x] && map[p.y][p.x] >= map[y][x] - 1),
            );
            toVisit = R.uniqWith((a, b) => a.x === b.x && a.y === b.y, toVisit);
        }
    };
}
