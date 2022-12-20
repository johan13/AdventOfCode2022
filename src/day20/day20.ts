import R from "ramda";
import { fileParser } from "../common";

export const part1 = R.pipe(fileParser(Number), decrypt(1, 1), getAnswer);
export const part2 = R.pipe(fileParser(Number), decrypt(811589153, 10), getAnswer);

type Node = { value: number; prev: Node; next: Node };

function decrypt(multiplier: number, rounds: number) {
    return (input: number[]) => {
        // Build a doubly linked list. We'll keep nodes in original order in the nodes array.
        const nodes = input.map(v => ({ value: v * multiplier } as Node));
        nodes.forEach((node, i) => {
            node.prev = nodes[(i - 1 + nodes.length) % nodes.length];
            node.next = nodes[(i + 1) % nodes.length];
        });

        for (let i = 0; i < rounds; i++) {
            for (const node of nodes) moveNode(node, nodes.length);
        }

        return nodes.find(x => x.value === 0)!;
    };
}

function moveNode(node: Node, totalNodes: number) {
    // Remove node
    node.prev.next = node.next;
    node.next.prev = node.prev;

    // Find insertion point
    let steps = node.value % (totalNodes - 1);
    if (steps < 0) steps += totalNodes - 1;
    let insertAfter = node.prev;
    while (steps--) insertAfter = insertAfter.next;

    // Insert node
    node.next = insertAfter.next;
    node.prev = insertAfter;
    insertAfter.next.prev = node;
    insertAfter.next = node;
}

function getAnswer(zeroNode: Node) {
    let sum = 0;
    for (let i = 1, node = zeroNode.next; i <= 3000; i++, node = node.next) {
        if (i % 1000 === 0) sum += node.value;
    }
    return sum;
}
