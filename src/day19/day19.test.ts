import assert from "node:assert";
import { part1, part2 } from "./day19";

describe.only("Day 19", () => {
    describe("Part 1", () => {
        it("Example should return 33", () => {
            assert.strictEqual(part1("day19/example.txt"), 33);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part1("day19/input.txt"), 0);
        });
    });
    describe("Part 2", () => {
        it.skip("Example should return ?", () => {
            assert.strictEqual(part2("day19/example.txt"), 0);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part2("day19/input.txt"), 0);
        });
    });
});
