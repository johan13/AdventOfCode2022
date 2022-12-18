import assert from "node:assert";
import { part1, part2 } from "./day15";

describe("Day 15", () => {
    describe("Part 1", () => {
        it("Example should return 26", () => {
            assert.strictEqual(part1("day15/example.txt", 10), 26);
        });
        it("Input should return 6124805", () => {
            assert.strictEqual(part1("day15/input.txt", 2000000), 6124805);
        });
    });
    describe("Part 2", () => {
        it("Example should return 56000011", () => {
            assert.strictEqual(part2("day15/example.txt", 20), 56000011);
        });
        it("Input should return 12555527364986", () => {
            assert.strictEqual(part2("day15/input.txt", 4000000), 12555527364986);
        });
    });
});
