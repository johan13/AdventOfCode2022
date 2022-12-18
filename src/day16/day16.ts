import R from "ramda";
import { fileParser, Heap } from "../common";

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

type State = {
    pos: Valve;
    openValves: string[];
    remainingTime: number;
    flow: number;
    maxAdditional: number;
};

function doPart1(valves: Valve[]): number {
    const start = valves.find(v => v.id === "AA")!;
    const heap = new Heap<State>((a, b) => b.flow + b.maxAdditional - a.flow - a.maxAdditional);
    heap.push({
        pos: start,
        openValves: [],
        remainingTime: 30,
        flow: 0,
        maxAdditional: 29 * valves.reduce((sum, v) => sum + v.flow, 0),
    });

    for (;;) {
        let { pos, openValves, remainingTime, flow } = heap.pop()!;

        if (remainingTime === 0) return flow;

        remainingTime--;
        const remainingValves = valves.filter(v => v.flow !== 0 && !openValves.includes(v.id));

        if (pos.flow !== 0 && !openValves.includes(pos.id)) {
            heap.push({
                pos,
                openValves: [...openValves, pos.id],
                remainingTime,
                flow: flow + remainingTime * pos.flow,
                maxAdditional: remainingValves
                    .filter(v => v.id !== pos.id)
                    .map(x => x.flow)
                    .sort((a, b) => b - a)
                    .reduce((sum, f, i) => sum + f * Math.max(0, remainingTime - i * 2 - 2), 0),
            });
        }

        const maxAdditional = remainingValves
            .map(x => x.flow)
            .sort((a, b) => b - a)
            .reduce((sum, f, i) => sum + f * Math.max(0, remainingTime - i * 2 - 1), 0);
        for (const next of pos.destinations) {
            heap.push({
                pos: valves.find(v => v.id === next)!,
                openValves,
                remainingTime,
                flow,
                maxAdditional,
            });
        }
    }
}
