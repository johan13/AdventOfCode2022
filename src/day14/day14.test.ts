import assert from "node:assert";
import { part1, part2 } from "./day14";

describe("Day 14", () => {
    describe("Part 1", () => {
        it("Example should return 24", () => {
            assert.strictEqual(part1("day14/example.txt"), 24);
        });
        it("Input should return 692", () => {
            assert.strictEqual(part1("day14/input.txt"), 692);
        });
    });
    describe("Part 2", () => {
        it("Example should return 93", () => {
            assert.strictEqual(part2("day14/example.txt"), 93);
        });
        it("Input should return 31706", () => {
            assert.strictEqual(part2("day14/input.txt"), 31706);
        });
    });
});
