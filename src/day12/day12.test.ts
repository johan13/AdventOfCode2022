import assert from "node:assert";
import { part1, part2 } from "./day12";

describe("Day 12", () => {
    describe("Part 1", () => {
        it("Example should return 31", () => {
            assert.strictEqual(part1("day12/example.txt"), 31);
        });
        it("Input should return 339", () => {
            assert.strictEqual(part1("day12/input.txt"), 339);
        });
    });
    describe("Part 2", () => {
        it("Example should return 29", () => {
            assert.strictEqual(part2("day12/example.txt"), 29);
        });
        it("Input should return 332", () => {
            assert.strictEqual(part2("day12/input.txt"), 332);
        });
    });
});
