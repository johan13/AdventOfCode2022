import assert from "node:assert";
import { part1, part2 } from "./day18";

describe("Day 18", () => {
    describe("Part 1", () => {
        it("Example should return 64", () => {
            assert.strictEqual(part1("day18/example.txt"), 64);
        });
        it("Input should return 3494", () => {
            assert.strictEqual(part1("day18/input.txt"), 3494);
        });
    });
    describe("Part 2", () => {
        it("Example should return 58", () => {
            assert.strictEqual(part2("day18/example.txt"), 58);
        });
        it("Input should return 2062", () => {
            assert.strictEqual(part2("day18/input.txt"), 2062);
        });
    });
});
