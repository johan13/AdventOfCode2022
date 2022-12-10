import assert from "node:assert";
import { part1, part2 } from "./day10";

describe("Day 10", () => {
    describe("Part 1", () => {
        it("Example should return 13140", () => {
            assert.strictEqual(part1("day10/example.txt"), 13140);
        });
        it("Input should return 16020", () => {
            assert.strictEqual(part1("day10/input.txt"), 16020);
        });
    });
    describe("Part 2", () => {
        it("Example should return ?", () => {
            assert.strictEqual(
                part2("day10/example.txt"),
                "##..##..##..##..##..##..##..##..##..##..\n" +
                    "###...###...###...###...###...###...###.\n" +
                    "####....####....####....####....####....\n" +
                    "#####.....#####.....#####.....#####.....\n" +
                    "######......######......######......####\n" +
                    "#######.......#######.......#######.....\n",
            );
        });
        it("Input should return ECZUZALR", () => {
            assert.strictEqual(
                part2("day10/input.txt"),
                "####..##..####.#..#.####..##..#....###..\n" +
                    "#....#..#....#.#..#....#.#..#.#....#..#.\n" +
                    "###..#......#..#..#...#..#..#.#....#..#.\n" +
                    "#....#.....#...#..#..#...####.#....###..\n" +
                    "#....#..#.#....#..#.#....#..#.#....#.#..\n" +
                    "####..##..####..##..####.#..#.####.#..#.\n",
            );
        });
    });
});
