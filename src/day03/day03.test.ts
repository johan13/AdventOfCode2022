import assert from "node:assert";
import { part1, part2 } from "./day03";

describe("Day 3", () => {
    describe("Part 1", () => {
        it("Example should return 157", () => {
            assert.strictEqual(part1("day03/example.txt"), 157);
        });
        it("Input should return 7831", () => {
            assert.strictEqual(part1("day03/input.txt"), 7831);
        });
    });
    describe("Part 2", () => {
        it("Example should return 70", () => {
            assert.strictEqual(part2("day03/example.txt"), 70);
        });
        it("Input should return 2683", () => {
            assert.strictEqual(part2("day03/input.txt"), 2683);
        });
    });
});
