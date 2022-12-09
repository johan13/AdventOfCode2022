import assert from "node:assert";
import { part1, part2 } from "./day09";

describe("Day 9", () => {
    describe("Part 1", () => {
        it("Example should return 13", () => {
            assert.strictEqual(part1("day09/example1.txt"), 13);
        });
        it("Input should return 6376", () => {
            assert.strictEqual(part1("day09/input.txt"), 6376);
        });
    });
    describe("Part 2", () => {
        it("Example 1 should return 1", () => {
            assert.strictEqual(part2("day09/example1.txt"), 1);
        });
        it("Example 2 should return 36", () => {
            assert.strictEqual(part2("day09/example2.txt"), 36);
        });
        it("Input should return 2607", () => {
            assert.strictEqual(part2("day09/input.txt"), 2607);
        });
    });
});
