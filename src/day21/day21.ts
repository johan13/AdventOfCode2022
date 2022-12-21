import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(parseLine), buildTree, evaluateNode);
export const part2 = R.pipe(fileParser(parseLine), buildTree, determineHumnValue);

type Op = "+" | "-" | "*" | "/";
type Input = { name: string; value: number } | { name: string; lhs: string; op: Op; rhs: string };
type Node = { name: string; value: number } | { name: string; lhs: Node; op: Op; rhs: Node };

function parseLine(line: string): Input {
    const match = /^(\S+): (\d+)$|^(\S+): (\S+) ([+*/-]) (\S+)$/.exec(line)!;
    return match[1]
        ? { name: match[1], value: Number(match[2]) }
        : { name: match[3], lhs: match[4], op: match[5] as Op, rhs: match[6] };
}

function buildTree(input: Input[]) {
    const buildNode = (name: string): Node => {
        const i = input.find(x => x.name === name)!;
        return "value" in i
            ? { name: i.name, value: i.value }
            : { name: i.name, lhs: buildNode(i.lhs), op: i.op, rhs: buildNode(i.rhs) };
    };
    return buildNode("root");
}

function evaluateNode(node: Node): number {
    if ("value" in node) return node.value;
    switch (node.op) {
        case "+":
            return evaluateNode(node.lhs) + evaluateNode(node.rhs);
        case "-":
            return evaluateNode(node.lhs) - evaluateNode(node.rhs);
        case "*":
            return evaluateNode(node.lhs) * evaluateNode(node.rhs);
        case "/":
            return evaluateNode(node.lhs) / evaluateNode(node.rhs);
    }
}

function determineHumnValue(root: Node) {
    // Replace humn's value with NaN and replace root's operator with "-". Then try to make root's
    // value equal to zero by recursively walking down the tree towards the NaN node.
    const humn = findNode(root, "humn");
    if (!humn || !("value" in humn) || "value" in root) throw new Error();
    humn.value = NaN;
    root.op = "-";
    return determineNaNValue(root, 0);
}

function findNode(node: Node, name: string): Node | undefined {
    if (node.name === name) return node;
    if ("value" in node) return undefined;
    return findNode(node.lhs, name) ?? findNode(node.rhs, name);
}

function determineNaNValue(node: Node, expected: number): number {
    if ("value" in node) return expected;
    const lhs = evaluateNode(node.lhs);
    const rhs = evaluateNode(node.rhs);
    switch (node.op) {
        case "+":
            return Number.isNaN(lhs)
                ? determineNaNValue(node.lhs, expected - rhs)
                : determineNaNValue(node.rhs, expected - lhs);
        case "-":
            return Number.isNaN(lhs)
                ? determineNaNValue(node.lhs, expected + rhs)
                : determineNaNValue(node.rhs, lhs - expected);
        case "*":
            return Number.isNaN(lhs)
                ? determineNaNValue(node.lhs, expected / rhs)
                : determineNaNValue(node.rhs, expected / lhs);
        case "/":
            return Number.isNaN(lhs)
                ? determineNaNValue(node.lhs, expected * rhs)
                : determineNaNValue(node.rhs, lhs / expected);
    }
}
