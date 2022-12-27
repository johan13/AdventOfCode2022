import assert from "node:assert";
import { part1, part2 } from "./day23";

describe("Day 23", () => {
    describe("Part 1", () => {
        it("Example should return 110", () => {
            assert.strictEqual(part1("day23/example.txt"), 110);
        });
        it("Input should return 3815", () => {
            assert.strictEqual(part1("day23/input.txt"), 3815);
        });
    });
    describe("Part 2", () => {
        it("Example should return 20", () => {
            assert.strictEqual(part2("day23/example.txt"), 20);
        });
        it("Input should return 893", () => {
            assert.strictEqual(part2("day23/input.txt"), 893);
        });
    });
});
