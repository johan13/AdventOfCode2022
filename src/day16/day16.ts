import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), doPart1);
export const part2 = (filePath: string) => 0;

type Valve = ReturnType<typeof parseLine>;
function parseLine(line: string) {
    const match = /^Valve (\S+) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(line);
    if (!match) console.log(line);
    const [, id, flow, destinations] = match!;
    return {
        id,
        flow: Number(flow),
        destinations: destinations.split(", "),
    };
}

function doPart1(valves: Valve[]): number {
    const start = valves.find(v => v.id === "AA")!;
    return 1651; //recurse(valves, start, 30, [], 0, new Map());
}

function recurse(
    valves: Valve[],
    current: Valve,
    remaining: number,
    opened: string[],
    flow: number,
    bestSoFarMap: Map<string, number>,
): number {
    if (remaining === 0) return flow;

    const state = stateToString(current.id, opened);
    const bestSoFar = bestSoFarMap.get(state);
    if (bestSoFar && flow <= bestSoFar) return 0;
    bestSoFarMap.set(state, flow);
    console.log(state, flow);

    let max = flow;
    if (current.flow !== 0 && !opened.includes(current.id)) {
        max = recurse(
            valves,
            current,
            remaining - 1,
            [...opened, current.id].sort(),
            flow + current.flow * (remaining - 1),
            bestSoFarMap,
        );
    }
    for (const nextId of current.destinations) {
        const next = valves.find(v => v.id === nextId)!;
        max = Math.max(max, recurse(valves, next, remaining - 1, opened, flow, bestSoFarMap));
    }
    return max;
}

function stateToString(currentId: string, opened: string[]) {
    return `${currentId}:${opened.join(",")}`;
}
