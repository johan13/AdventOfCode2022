import assert from "node:assert";
import { part1, part2 } from "./day06";

describe("Day 6", () => {
    describe("Part 1", () => {
        it("Example should return 7", () => {
            assert.strictEqual(part1("day06/example.txt"), 7);
        });
        it("Input should return 1531", () => {
            assert.strictEqual(part1("day06/input.txt"), 1531);
        });
    });
    describe("Part 2", () => {
        it("Example should return 19", () => {
            assert.strictEqual(part2("day06/example.txt"), 19);
        });
        it("Input should return 2518", () => {
            assert.strictEqual(part2("day06/input.txt"), 2518);
        });
    });
});
