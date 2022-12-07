import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const readLines = fileParser(x => x);

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
