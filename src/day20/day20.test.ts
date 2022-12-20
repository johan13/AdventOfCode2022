import assert from "node:assert";
import { part1, part2 } from "./day20";

describe("Day 20", () => {
    describe("Part 1", () => {
        it("Example should return 3", () => {
            assert.strictEqual(part1("day20/example.txt"), 3);
        });
        it("Input should return 9687", () => {
            assert.strictEqual(part1("day20/input.txt"), 9687);
        });
    });
    describe("Part 2", () => {
        it("Example should return 1623178306", () => {
            assert.strictEqual(part2("day20/example.txt"), 1623178306);
        });
        it("Input should return 1338310513297", () => {
            assert.strictEqual(part2("day20/input.txt"), 1338310513297);
        });
    });
});
