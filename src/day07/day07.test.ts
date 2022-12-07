import assert from "node:assert";
import { part1, part2 } from "./day07";

describe("Day 7", () => {
    describe("Part 1", () => {
        it("Example should return 95437", () => {
            assert.strictEqual(part1("day07/example.txt"), 95437);
        });
        it("Input should return 1367870", () => {
            assert.strictEqual(part1("day07/input.txt"), 1367870);
        });
    });
    describe("Part 2", () => {
        it("Example should return 24933642", () => {
            assert.strictEqual(part2("day07/example.txt"), 24933642);
        });
        it("Input should return 549173", () => {
            assert.strictEqual(part2("day07/input.txt"), 549173);
        });
    });
});
