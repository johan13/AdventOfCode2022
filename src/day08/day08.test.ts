import assert from "node:assert";
import { part1, part2 } from "./day08";

describe("Day 8", () => {
    describe("Part 1", () => {
        it("Example should return 21", () => {
            assert.strictEqual(part1("day08/example.txt"), 21);
        });
        it("Input should return 1794", () => {
            assert.strictEqual(part1("day08/input.txt"), 1794);
        });
    });
    describe("Part 2", () => {
        it("Example should return 8", () => {
            assert.strictEqual(part2("day08/example.txt"), 8);
        });
        it("Input should return 199272", () => {
            assert.strictEqual(part2("day08/input.txt"), 199272);
        });
    });
});
