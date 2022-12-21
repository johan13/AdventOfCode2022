import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import R from "ramda";

export const readLines = fileParser(R.identity);
export const readChars = R.pipe(readLines, R.join(""), R.split(""));

export function fileParser<T>(
    parser: (s: string, i: number) => T,
    separator: string | RegExp = "\n",
) {
    return (filePath: string) =>
        readFileSync(resolve(__dirname, "..", filePath), "utf8")
            .trimEnd()
            .split(separator)
            .map(parser);
}
