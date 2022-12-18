import R from "ramda";
import { fileParser } from "../common";

export function part1(filePath: string, y: number) {
    const sensors = fileParser(parseSensor)(filePath);
    const emptyRanges = sensors.flatMap(s => getEmptyRange(y, s, true));
    const simplified = simplifyRanges(emptyRanges);
    return simplified.reduce((sum, range) => sum + range.to - range.from + 1, 0);
}

export function part2(filePath: string, size: number) {
    const sensors = fileParser(parseSensor)(filePath);
    for (let y = size; y >= 0; y--) {
        const emptyRanges = sensors.flatMap(s => getEmptyRange(y, s, false));
        const clippedRanges = clipRanges(emptyRanges, 0, size);
        const simplified = simplifyRanges(clippedRanges);
        if (simplified.length === 2) return y + 4000000 * (simplified[0].to + 1);
    }
    throw new Error("Not found");
}

type Sensor = ReturnType<typeof parseSensor>;
function parseSensor(line: string) {
    const re = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;
    const [, sx, sy, bx, by] = re.exec(line)!.map(Number);
    return {
        pos: { x: sx, y: sy },
        beacon: { x: bx, y: by },
    };
}

type Range = { from: number; to: number };
function getEmptyRange(y: number, { pos, beacon }: Sensor, excludeBeacon: boolean): Range[] {
    const d = distance(pos, beacon) - Math.abs(pos.y - y);
    if (d < 0) return [];
    const range = {
        from: pos.x - d,
        to: pos.x + d,
    };
    if (excludeBeacon && y === beacon.y) {
        if (beacon.x === range.from) {
            range.from++;
        } else {
            range.to--;
        }
    }
    return [range];
}

function distance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function simplifyRanges(ranges: Range[]): Range[] {
    ranges = R.sortBy(r => r.from, ranges);
    for (let i = 1; i < ranges.length; ) {
        const a = ranges[i - 1];
        const b = ranges[i];
        if (b.to <= a.to) {
            ranges.splice(i, 1);
        } else if (b.from <= a.to + 1) {
            a.to = b.to;
            ranges.splice(i, 1);
        } else {
            i++;
        }
    }
    return ranges;
}

function clipRanges(ranges: Range[], min: number, max: number): Range[] {
    return ranges
        .filter(r => r.to >= min && r.from <= max)
        .map(r => ({
            from: Math.max(r.from, min),
            to: Math.min(r.to, max),
        }));
}
