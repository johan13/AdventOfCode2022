import assert from "node:assert";
import { part1, part2 } from "./day21";

describe("Day 21", () => {
    describe("Part 1", () => {
        it("Example should return 152", () => {
            assert.strictEqual(part1("day21/example.txt"), 152);
        });
        it("Input should return 159591692827554", () => {
            assert.strictEqual(part1("day21/input.txt"), 159591692827554);
        });
    });
    describe("Part 2", () => {
        it("Example should return 301", () => {
            assert.strictEqual(part2("day21/example.txt"), 301);
        });
        it("Input should return 3509819803065", () => {
            assert.strictEqual(part2("day21/input.txt"), 3509819803065);
        });
    });
});
