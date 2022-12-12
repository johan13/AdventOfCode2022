import assert from "node:assert";
import { part1, part2 } from "./dayXX";

describe.only("Day XX", () => {
    describe("Part 1", () => {
        it("Example should return ?", () => {
            assert.strictEqual(part1("dayXX/example.txt"), 0);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part1("dayXX/input.txt"), 0);
        });
    });
    describe("Part 2", () => {
        it.skip("Example should return ?", () => {
            assert.strictEqual(part2("dayXX/example.txt"), 0);
        });
        it.skip("Input should return ?", () => {
            assert.strictEqual(part2("dayXX/input.txt"), 0);
        });
    });
});
