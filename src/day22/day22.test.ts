import assert from "node:assert";
import { part1, part2 } from "./day22";

describe("Day 22", () => {
    describe("Part 1", () => {
        it("Example should return 6032", () => {
            assert.strictEqual(part1("day22/example.txt"), 6032);
        });
        it("Input should return 75388", () => {
            assert.strictEqual(part1("day22/input.txt"), 75388);
        });
    });
    describe("Part 2", () => {
        it("Example should return 5031", () => {
            assert.strictEqual(part2("day22/example.txt"), 5031);
        });
        it("Input should return 182170", () => {
            assert.strictEqual(part2("day22/input.txt"), 182170);
        });
    });
});
