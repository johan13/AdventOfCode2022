import assert from "node:assert";
import { part1, part2 } from "./day17";

describe("Day 17", () => {
    describe("Part 1", () => {
        it("Example should return 3068", () => {
            assert.strictEqual(part1("day17/example.txt"), 3068);
        });
        it("Input should return 3239", () => {
            assert.strictEqual(part1("day17/input.txt"), 3239);
        });
    });
    describe("Part 2", () => {
        it("Example should return 1514285714288", () => {
            assert.strictEqual(part2("day17/example.txt"), 1514285714288);
        });
        it("Input should return 1594842406882", () => {
            assert.strictEqual(part2("day17/input.txt"), 1594842406882);
        });
    });
});
