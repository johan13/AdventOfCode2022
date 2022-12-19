import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(
    fileParser(parseBlueprint, "\n"),
    R.map(bp => bp.id * getMaxGeodes(bp.robots)),
    R.sum,
);
export const part2 = (filePath: string) => 0;

type Robot = ReturnType<typeof parseBlueprint>["robots"][0];
function parseBlueprint(line: string) {
    const m1 = /^Blueprint (\d+): /.exec(line)!;
    line = line.slice(m1[0].length);
    const id = Number(m1[1]);

    const robots = [];
    while (line) {
        const m2 = /^Each (ore|clay|obsidian|geode) robot costs ([^.]+)\. ?/.exec(line)!;
        line = line.slice(m2[0].length);
        robots.push({
            output: m2[1] as "ore" | "clay" | "obsidian" | "geode",
            costs: m2[2].split(" and ").map(s => {
                const m3 = /^(\d+) (ore|clay|obsidian)$/.exec(s)!;
                return { quantity: Number(m3[1]), resource: m3[2] as "ore" | "clay" | "obsidian" };
            }),
        });
    }

    return { id, robots };
}

function getMaxGeodes(blueprint: Robot[]): number {
    return recurse(
        blueprint,
        { ore: 0, clay: 0, obsidian: 0, geode: 0 },
        { ore: 1, clay: 0, obsidian: 0, geode: 0 },
        24,
    );
}

// TODO: Brute force recursion is too slow.
function recurse(
    blueprint: Robot[],
    resources: Record<"ore" | "clay" | "obsidian" | "geode", number>,
    robots: Record<"ore" | "clay" | "obsidian" | "geode", number>,
    roundsLeft: number,
): number {
    if (roundsLeft === 0) return resources.geode;

    for (const t of ["ore", "clay", "obsidian", "geode"] as const) resources[t] += robots[t];

    const xx = [];
    for (const bp of blueprint) {
        if (bp.costs.every(({ quantity, resource }) => resources[resource] >= quantity)) {
            const res = { ...resources };
            bp.costs.forEach(({ quantity, resource }) => (res[resource] -= quantity));
            const rob = { ...robots };
            rob[bp.output]++;
            xx.push(recurse(blueprint, res, rob, roundsLeft - 1));
        }
    }
    xx.push(recurse(blueprint, resources, robots, roundsLeft - 1));
    return xx.reduce(R.max);
}
