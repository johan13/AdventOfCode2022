import assert from "node:assert";
import { part1, part2 } from "./day05";

describe("Day 5", () => {
    describe("Part 1", () => {
        it("Example should return CMZ", () => {
            assert.strictEqual(part1("day05/example.txt"), "CMZ");
        });
        it("Input should return FZCMJCRHZ", () => {
            assert.strictEqual(part1("day05/input.txt"), "FZCMJCRHZ");
        });
    });
    describe("Part 2", () => {
        it("Example should return MCD", () => {
            assert.strictEqual(part2("day05/example.txt"), "MCD");
        });
        it("Input should return JSDHQMZGF", () => {
            assert.strictEqual(part2("day05/input.txt"), "JSDHQMZGF");
        });
    });
});
