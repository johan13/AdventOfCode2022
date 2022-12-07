import R from "ramda";
import { readLines } from "../common";

const solution = (lookup: Record<string, number>) =>
    R.pipe(
        readLines,
        R.map(x => lookup[x]),
        R.sum,
    );

export const part1 = solution({
    "A X": 4, // Rock vs Rock => Draw         1+3
    "A Y": 8, // Rock vs Paper => Win         2+6
    "A Z": 3, // Rock vs Scissors => Lose     3+0
    "B X": 1, // Paper vs Rock => Lose        1+0
    "B Y": 5, // Paper vs Paper => Draw       2+3
    "B Z": 9, // Paper vs Scissors => Win     3+6
    "C X": 7, // Scissors vs Rock => Win      1+6
    "C Y": 2, // Scissors vs Paper => Lose    2+0
    "C Z": 6, // Scissors vs Scissors => Draw 3+3
});

export const part2 = solution({
    "A X": 3, // Lose against Rock => Scissors     3+0
    "A Y": 4, // Draw against Rock => Rock         1+3
    "A Z": 8, // Win against Rock => Paper         2+6
    "B X": 1, // Lose against Paper => Rock        1+0
    "B Y": 5, // Draw against Paper => Paper       2+3
    "B Z": 9, // Win against Paper => Scissors     3+6
    "C X": 2, // Lose against Scissors => Paper    2+0
    "C Y": 6, // Draw against Scissors => Scissors 3+3
    "C Z": 7, // Win against Scissors => Rock      1+6
});
