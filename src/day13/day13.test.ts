import assert from "node:assert";
import { part1, part2 } from "./day13";

describe("Day 13", () => {
    describe("Part 1", () => {
        it("Example should return 13", () => {
            assert.strictEqual(part1("day13/example.txt"), 13);
        });
        it("Input should return 5196", () => {
            assert.strictEqual(part1("day13/input.txt"), 5196);
        });
    });
    describe("Part 2", () => {
        it("Example should return 140", () => {
            assert.strictEqual(part2("day13/example.txt"), 140);
        });
        it("Input should return 22134", () => {
            assert.strictEqual(part2("day13/input.txt"), 22134);
        });
    });
});
