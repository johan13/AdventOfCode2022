import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseInputLine), solution(2));
export const part2 = R.pipe(fileParser(parseInputLine), solution(10));

function parseInputLine(line: string) {
    const [, direction, steps] = /^([UDLR]) (\d+)$/.exec(line)!;
    return { direction: direction as "U" | "D" | "L" | "R", steps: Number(steps) };
}

function solution(numKnots: number) {
    return (moves: Array<ReturnType<typeof parseInputLine>>) => {
        const visited = new Set<string>();
        const knots = R.times(() => ({ x: 0, y: 0 }), numKnots);
        for (const move of moves.flatMap(({ direction, steps }) => R.repeat(direction, steps))) {
            knots[0].x += move === "R" ? 1 : move === "L" ? -1 : 0;
            knots[0].y += move === "U" ? 1 : move === "D" ? -1 : 0;
            for (const [nextFwd, current] of R.aperture(2, knots)) {
                const dx = nextFwd.x - current.x;
                const dy = nextFwd.y - current.y;
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) break;
                current.x += Math.sign(dx);
                current.y += Math.sign(dy);
            }
            visited.add(`${knots.at(-1)!.x},${knots.at(-1)!.y}`);
        }
        return visited.size;
    };
}
