import R from "ramda";
import { fileParser } from "../common";

const readInput = fileParser(line => line.split("").map(Number));
export const part1 = R.pipe(readInput, flatMapWithDirections(visibility), R.count(R.identity));
export const part2 = R.pipe(readInput, flatMapWithDirections(scenicScore), R.reduce(R.max, 0));

function flatMapWithDirections<T>(callback: (height: number, directions: number[][]) => T) {
    return (trees: number[][]) =>
        trees.flatMap((row, y0) =>
            row.map((height, x0) =>
                callback(height, [
                    R.range(x0 + 1, trees[0].length).map(x => trees[y0][x]), // Right
                    R.range(y0 + 1, trees.length).map(y => trees[y][x0]), // Down
                    R.reverse(R.range(0, x0)).map(x => trees[y0][x]), // Left
                    R.reverse(R.range(0, y0)).map(y => trees[y][x0]), // Up
                ]),
            ),
        );
}

function visibility(height: number, directions: number[][]) {
    return directions.some(R.all(x => x < height));
}

function scenicScore(height: number, directions: number[][]) {
    return directions.reduce((score, direction) => {
        const i = direction.findIndex(x => x >= height);
        return score * (i !== -1 ? i + 1 : direction.length);
    }, 1);
}
