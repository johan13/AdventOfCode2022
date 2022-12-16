import assert from "node:assert";
import { part1, part2 } from "./day16";

describe.only("Day 16", () => {
    describe("Part 1", () => {
        it("Example should return 1651", () => {
            assert.strictEqual(part1("day16/example.txt"), 1651);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part1("day16/input.txt"), 0);
        });
    });
    describe("Part 2", () => {
        it.skip("Example should return ?", () => {
            assert.strictEqual(part2("day16/example.txt"), 0);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part2("day16/input.txt"), 0);
        });
    });
});
