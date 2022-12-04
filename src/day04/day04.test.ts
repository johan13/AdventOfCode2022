import assert from "node:assert";
import { part1, part2 } from "./day04";

describe("Day 4", () => {
    describe("Part 1", () => {
        it("Example should return 2", () => {
            assert.strictEqual(part1("day04/example.txt"), 2);
        });
        it("Input should return 515", () => {
            assert.strictEqual(part1("day04/input.txt"), 515);
        });
    });
    describe("Part 2", () => {
        it("Example should return 4", () => {
            assert.strictEqual(part2("day04/example.txt"), 4);
        });
        it("Input should return 883", () => {
            assert.strictEqual(part2("day04/input.txt"), 883);
        });
    });
});
