import R from "ramda";
import { fileParser } from "../common";

const readInput = fileParser(parseMonkey, "\n\n");
export const part1 = R.pipe(readInput, playKeepAway(20, 3), calcMonkeyBusiness);
export const part2 = R.pipe(readInput, playKeepAway(10000, 1), calcMonkeyBusiness);

type Monkey = ReturnType<typeof parseMonkey>;
function parseMonkey(line: string) {
    const [, items] = /Starting items: (.*)/.exec(line)!;
    const [, operator, operand] = /Operation: new = old ([+*]) (\d+|old)/.exec(line)!;
    const [, denominator] = /Test: divisible by (\d+)/.exec(line)!;
    const [, ifTrue] = /If true: throw to monkey (\d+)/.exec(line)!;
    const [, ifFalse] = /If false: throw to monkey (\d+)/.exec(line)!;
    return {
        items: items.split(", ").map(Number),
        operator: operator as "+" | "*",
        operand: operand === "old" ? ("old" as const) : Number(operand),
        denominator: Number(denominator),
        ifTrue: Number(ifTrue),
        ifFalse: Number(ifFalse),
        inspections: 0,
    };
}

function playKeepAway(rounds: number, worryDivisor: number) {
    return (monkeys: Monkey[]) => {
        const modulo = R.product(R.uniq(monkeys.map(x => x.denominator)));
        for (let round = 0; round < rounds; round++) {
            for (const monkey of monkeys) {
                for (;;) {
                    let item = monkey.items.shift();
                    if (item === undefined) break;
                    const operand = monkey.operand === "old" ? item : monkey.operand;
                    item = monkey.operator === "+" ? item + operand : item * operand;
                    item = Math.floor((item % modulo) / worryDivisor);
                    const target = item % monkey.denominator === 0 ? monkey.ifTrue : monkey.ifFalse;
                    monkeys[target].items.push(item);
                    monkey.inspections++;
                }
            }
        }
        return monkeys;
    };
}

function calcMonkeyBusiness(monkeys: Monkey[]) {
    const inspections = monkeys.map(m => m.inspections).sort((a, b) => b - a);
    return inspections[0] * inspections[1];
}
