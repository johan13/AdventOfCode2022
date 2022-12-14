import R from "ramda";
import { fileParser } from "../common";

const separators = [[[2]], [[6]]];

export const part1 = R.pipe(
    fileParser(s => s.split("\n").map(R.pipe(lexer, parser)) as [Packet, Packet], "\n\n"),
    l => l.flatMap(([l, r], i) => (compare(l, r) < 0 ? i + 1 : [])),
    R.sum,
);

export const part2 = R.pipe(
    fileParser(s => s.split("\n").map(R.pipe(lexer, parser)) as [Packet, Packet], "\n\n"),
    pairs => [...pairs.flatMap(p => p), ...separators],
    R.sort(compare),
    l => l.flatMap((pkt, i) => (separators.some(s => R.equals(pkt, s)) ? i + 1 : [])),
    R.product,
);

function lexer(text: string) {
    const list: Array<number | "[" | "]"> = [];
    const re = /\[|\]|,|\d+/y;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)))
        m[0] !== "," && list.push(/\d/.test(m[0]) ? Number(m[0]) : (m[0] as "[" | "]"));
    return list;
}

type Packet = number | Packet[];
function parser(tokens: Array<number | "[" | "]">): Packet {
    const token = tokens.shift();
    if (typeof token === "number") return token;
    const list: Packet = [];
    while (tokens[0] !== "]") list.push(parser(tokens));
    tokens.shift();
    return list;
}

function compare(left: Packet, right: Packet): number {
    return typeof left === "number" && typeof right === "number"
        ? left - right
        : Array.isArray(left) && Array.isArray(right)
        ? R.zip(left, right)
              .map(R.apply(compare))
              .find(x => x !== 0) ?? compare(left.length, right.length)
        : typeof left === "number"
        ? compare([left], right)
        : compare(left, [right]);
}
