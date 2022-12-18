import R from "ramda";
import { fileParser, Heap } from "../common";

export const part1 = R.pipe(fileParser(parseLine), doPart1);
export const part2 = R.pipe(fileParser(parseLine), doPart2);
// export const part2 = (filePath: string) => 0;

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
    pos: Valve[];
    openValves: string[];
    remainingTime: number;
    flow: number;
    maxAdditional: number;
};

function doPart1(valves: Valve[]): number {
    const start = valves.find(v => v.id === "AA")!;
    const heap = new Heap<State>((a, b) => b.flow + b.maxAdditional - a.flow - a.maxAdditional);
    heap.push({
        pos: [start],
        openValves: [],
        remainingTime: 30,
        flow: 0,
        maxAdditional: Infinity,
    });

    for (;;) {
        const state = heap.pop()!;
        if (state.remainingTime === 0) return state.flow;
        for (const next of getNextStates(valves, state)) heap.push(next);
    }
}

function* getNextStates(valves: Valve[], state: State): Iterable<State> {
    let {
        pos: [pos],
        openValves,
        remainingTime,
        flow,
    } = state;

    const actions = [
        ...(pos.flow === 0 || openValves.includes(pos.id) ? [] : ["open"]),
        ...pos.destinations,
    ];

    remainingTime--;

    const maxAdditional = valves
        .filter(v => v.flow !== 0 && !openValves.includes(v.id))
        .map(x => x.flow)
        .sort((a, b) => b - a)
        .reduce((sum, f, i) => sum + f * Math.max(0, remainingTime - i * 2 - 1), 0);

    for (const action of actions) {
        let newPos = pos;
        let newFlow = flow;
        let newOpenValves = openValves;
        if (action === "open") {
            newFlow += remainingTime * pos.flow;
            newOpenValves = [...openValves, pos.id];
        } else {
            newPos = valves.find(v => v.id === action)!;
        }
        const obj = {
            pos: [newPos],
            openValves: newOpenValves,
            remainingTime,
            flow: newFlow,
            maxAdditional,
        };
        yield obj;
    }
}

function doPart2(valves: Valve[]): number {
    const start = valves.find(v => v.id === "AA")!;
    const heap = new Heap<State>((a, b) => b.flow + b.maxAdditional - a.flow - a.maxAdditional);
    heap.push({
        pos: [start, start],
        openValves: [],
        remainingTime: 26,
        flow: 0,
        maxAdditional: Infinity,
    });

    for (;;) {
        const state = heap.pop()!;
        if (state.remainingTime === 0) return state.flow;
        for (const next of getNextStates2(valves, state)) heap.push(next);
    }
}

function* getNextStates2(valves: Valve[], state: State): Iterable<State> {
    let {
        pos: [pos1, pos2],
        openValves,
        remainingTime,
        flow,
    } = state;

    const actions1 = [
        ...(pos1.flow === 0 || openValves.includes(pos1.id) ? [] : ["open"]),
        ...pos1.destinations,
    ];
    const actions2 = [
        ...(pos2.flow === 0 || openValves.includes(pos2.id) ? [] : ["open"]),
        ...pos2.destinations,
    ];

    remainingTime--;

    const sortedClosed = valves
        .filter(v => v.flow !== 0 && !openValves.includes(v.id))
        .map(x => x.flow)
        .sort((a, b) => b - a);
    const maxAdditional = R.splitEvery(2, sortedClosed)
        .map(([a, b]) => a + (b ?? 0))
        .reduce((sum, f, i) => sum + f * Math.max(0, remainingTime - i * 2), 0);

    for (const action1 of actions1) {
        for (const action2 of actions2) {
            let newPos1 = pos1;
            let newPos2 = pos2;
            let newFlow = flow;
            let newOpenValves = openValves;

            if (action1 === "open") {
                newFlow += remainingTime * pos1.flow;
                newOpenValves = [...newOpenValves, pos1.id];
            } else {
                newPos1 = valves.find(v => v.id === action1)!;
            }
            if (action2 === "open") {
                newFlow += remainingTime * pos2.flow;
                newOpenValves = [...newOpenValves, pos2.id];
            } else {
                newPos2 = valves.find(v => v.id === action2)!;
            }

            const obj = {
                pos: [newPos1, newPos2],
                openValves: newOpenValves,
                remainingTime,
                flow: newFlow,
                maxAdditional,
            };
            yield obj;
        }
    }
}
