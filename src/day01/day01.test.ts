import assert from "node:assert";
import { part1, part2 } from "./day01";

describe("Day 1", () => {
    describe("Part 1", () => {
        it("Example should return 24000", () => {
            assert.strictEqual(part1("day01/example.txt"), 24000);
        });
        it("Input should return 75622", () => {
            assert.strictEqual(part1("day01/input.txt"), 75622);
        });
    });
    describe("Part 2", () => {
        it("Example should return 45000", () => {
            assert.strictEqual(part2("day01/example.txt"), 45000);
        });
        it("Input should return 213159", () => {
            assert.strictEqual(part2("day01/input.txt"), 213159);
        });
    });
});
