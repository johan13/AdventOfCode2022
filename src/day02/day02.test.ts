import assert from "node:assert";
import { part1, part2 } from "./day02";

describe("Day 2", () => {
    describe("Part 1", () => {
        it("Example should return 15", () => {
            assert.strictEqual(part1("day02/example.txt"), 15);
        });
        it("Input should return 15632", () => {
            assert.strictEqual(part1("day02/input.txt"), 15632);
        });
    });
    describe("Part 2", () => {
        it("Example should return 12", () => {
            assert.strictEqual(part2("day02/example.txt"), 12);
        });
        it("Input should return 14416", () => {
            assert.strictEqual(part2("day02/input.txt"), 14416);
        });
    });
});
