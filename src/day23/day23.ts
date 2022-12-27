import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(R.split("")), toList, doPart1);
export const part2 = R.pipe(fileParser(R.split("")), toList, doPart2);

type Point = { x: number; y: number };
type Elves = Array<{ pos: Point; next?: Point }>;

function toList(map: string[][]): Elves {
    return map.flatMap((row, y) =>
        row.flatMap((cell, x) => (cell === "#" ? { pos: { x, y } } : [])),
    );
}
function doPart1(elves: Elves): number {
    for (let i = 0; i < 10; i++) doOneRound(elves, i % 4);

    const minx = elves.reduce((min, { pos }) => Math.min(min, pos.x), Infinity);
    const maxx = elves.reduce((max, { pos }) => Math.max(max, pos.x), -Infinity);
    const miny = elves.reduce((min, { pos }) => Math.min(min, pos.y), Infinity);
    const maxy = elves.reduce((max, { pos }) => Math.max(max, pos.y), -Infinity);
    return (maxx - minx + 1) * (maxy - miny + 1) - elves.length;
}

function doPart2(elves: Elves): number {
    for (let i = 0; ; i++) {
        if (!doOneRound(elves, i % 4)) return i + 1;
    }
}

function doOneRound(elves: Elves, prio: number) {
    const order = "NSWENSWE".slice(prio, prio + 4);
    for (const elf of elves) {
        if (
            !elves.some(
                e =>
                    e !== elf &&
                    e.pos.x >= elf.pos.x - 1 &&
                    e.pos.x <= elf.pos.x + 1 &&
                    e.pos.y >= elf.pos.y - 1 &&
                    e.pos.y <= elf.pos.y + 1,
            )
        ) {
            continue;
        }

        for (const dir of order) {
            switch (dir) {
                case "N":
                    if (
                        !elves.some(
                            e =>
                                e.pos.y === elf.pos.y - 1 &&
                                e.pos.x >= elf.pos.x - 1 &&
                                e.pos.x <= elf.pos.x + 1,
                        )
                    ) {
                        elf.next = { x: elf.pos.x, y: elf.pos.y - 1 };
                    }
                    break;
                case "S":
                    if (
                        !elves.some(
                            e =>
                                e.pos.y === elf.pos.y + 1 &&
                                e.pos.x >= elf.pos.x - 1 &&
                                e.pos.x <= elf.pos.x + 1,
                        )
                    ) {
                        elf.next = { x: elf.pos.x, y: elf.pos.y + 1 };
                    }
                    break;
                case "W":
                    if (
                        !elves.some(
                            e =>
                                e.pos.x === elf.pos.x - 1 &&
                                e.pos.y >= elf.pos.y - 1 &&
                                e.pos.y <= elf.pos.y + 1,
                        )
                    ) {
                        elf.next = { x: elf.pos.x - 1, y: elf.pos.y };
                    }
                    break;
                default: // East
                    if (
                        !elves.some(
                            e =>
                                e.pos.x === elf.pos.x + 1 &&
                                e.pos.y >= elf.pos.y - 1 &&
                                e.pos.y <= elf.pos.y + 1,
                        )
                    ) {
                        elf.next = { x: elf.pos.x + 1, y: elf.pos.y };
                    }
                    break;
            }
            if (elf.next) break;
        }
    }
    let anyDidMove = false;
    for (const elf of elves) {
        if (
            elf.next !== undefined &&
            elves.every(e => e === elf || e.next?.x !== elf.next!.x || e.next?.y !== elf.next!.y)
        ) {
            elf.pos = elf.next;
            anyDidMove = true;
        }
    }
    for (const elf of elves) elf.next = undefined;
    return anyDidMove;
}
