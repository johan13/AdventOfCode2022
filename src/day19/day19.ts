import R from "ramda";
import { fileParser, Heap } from "../common";

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
            type: m2[1] as "ore" | "clay" | "obsidian" | "geode",
            costs: m2[2].split(" and ").map(s => {
                const m3 = /^(\d+) (ore|clay|obsidian)$/.exec(s)!;
                return { quantity: Number(m3[1]), resource: m3[2] as "ore" | "clay" | "obsidian" };
            }),
        });
    }

    return { id, robots };
}

type Counts = Record<"ore" | "clay" | "obsidian" | "geode", number>;
type State = {
    resources: Counts;
    robots: Counts;
    roundsLeft: number;
    maxAdditionalGeodes: number;
};

function getMaxGeodes(blueprint: Robot[]): number {
    const queue = new Heap<State>((a, b) => b.roundsLeft - a.roundsLeft);

    queue.push({
        resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
        robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
        roundsLeft: 24,
        maxAdditionalGeodes: Infinity,
    });

    for (;;) {
        let { resources, robots, roundsLeft } = queue.pop()!;
        if (roundsLeft === 0) return resources.geode;

        resources = {
            ore: resources.ore + robots.ore,
            clay: resources.clay + robots.clay,
            obsidian: resources.obsidian + robots.obsidian,
            geode: resources.geode + robots.geode,
        };
        roundsLeft--;

        const possibleRobots = blueprint.filter(({ costs }) =>
            costs.every(({ resource, quantity }) => resources[resource] >= quantity),
        );
        if (possibleRobots.length < blueprint.length) {
            // Consider not building a robot this round.
            const newState = {
                resources,
                robots,
                roundsLeft,
                maxAdditionalGeodes: maxAdditional(robots, roundsLeft),
            };
            if (!queue.array.some(eq(newState))) queue.push(newState);
        }
        for (const { type, costs } of possibleRobots) {
            const newRobots = { ...robots, [type]: robots[type] + 1 };
            const newResources = {
                ore: resources.ore - (costs.find(x => x.resource === "ore")?.quantity ?? 0),
                clay: resources.clay - (costs.find(x => x.resource === "clay")?.quantity ?? 0),
                obsidian:
                    resources.obsidian -
                    (costs.find(x => x.resource === "obsidian")?.quantity ?? 0),
                geode: resources.geode,
            };
            const newState = {
                resources: newResources,
                robots: newRobots,
                roundsLeft,
                maxAdditionalGeodes: maxAdditional(robots, roundsLeft),
            };
            if (!queue.array.some(eq(newState))) queue.push(newState);
        }
    }
}

function maxAdditional(robots: Counts, roundsLeft: number) {
    let geodes = 0;
    let geodeRobots = robots.geode;
    while (roundsLeft) {
        geodes += geodeRobots;
        geodeRobots++;
        roundsLeft--;
    }
    return geodes;
}

const eq = (x: State) => (y: State) =>
    x.roundsLeft === y.roundsLeft &&
    x.resources.clay === y.resources.clay &&
    x.resources.geode === y.resources.geode &&
    x.resources.obsidian === y.resources.obsidian &&
    x.resources.ore === y.resources.ore &&
    x.robots.clay === y.robots.clay &&
    x.robots.geode === y.robots.geode &&
    x.robots.obsidian === y.robots.obsidian &&
    x.robots.ore === y.robots.ore;
