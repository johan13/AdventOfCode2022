import assert from "node:assert";
import { part1, part2 } from "./day11";

describe("Day 11", () => {
    describe("Part 1", () => {
        it("Example should return 10605", () => {
            assert.strictEqual(part1("day11/example.txt"), 10605);
        });
        it("Input should return 101436", () => {
            assert.strictEqual(part1("day11/input.txt"), 101436);
        });
    });
    describe("Part 2", () => {
        it("Example should return 2713310158", () => {
            assert.strictEqual(part2("day11/example.txt"), 2713310158);
        });
        it("Input should return 19754471646", () => {
            assert.strictEqual(part2("day11/input.txt"), 19754471646);
        });
    });
});
