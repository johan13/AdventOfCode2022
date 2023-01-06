import assert from "node:assert";
import { part1, part2 } from "./day25";

describe("Day 25", () => {
    describe("Part 1", () => {
        it("Example should return 2=-1=0", () => {
            assert.strictEqual(part1("day25/example.txt"), "2=-1=0");
        });
        it("Input should return 2-00=12=21-0=01--000", () => {
            assert.strictEqual(part1("day25/input.txt"), "2-00=12=21-0=01--000");
        });
    });
    describe("Part 2", () => {
        it.skip("Example should return ?", () => {
            assert.strictEqual(part2("day25/example.txt"), 0);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part2("day25/input.txt"), 0);
        });
    });
});
