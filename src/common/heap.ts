const parent = (i: number) => (i - 1) >> 1;
const leftChild = (i: number) => (i << 1) + 1;

export class Heap<T> {
    private array: T[] = [];

    public constructor(private readonly comparer: (a: T, b: T) => number) {}

    public get size(): number {
        return this.array.length;
    }

    public push(value: T): this {
        this.array.push(value);
        this.siftUp(this.array.length - 1);
        return this;
    }

    public pushMany(values: T[]): this {
        const oldSize = this.array.length;
        // When adding few items, push is faster than concat.
        if (values.length < 20 + oldSize / 5) {
            for (const v of values) this.array.push(v);
        } else {
            this.array = this.array.concat(values);
        }
        // When adding fewer items than already in the heap, then sift the new items up.
        // When adding more items, then Floyd's algorithm is faster.
        if (values.length < oldSize) {
            for (let i = this.array.length - 1; i >= oldSize; --i) this.siftUp(i);
        } else {
            for (let i = parent(this.array.length - 1); i >= 0; --i) this.siftDown(i);
        }
        return this;
    }

    public peek(): T | undefined {
        return this.array[0];
    }

    public pop(): T | undefined {
        const val = this.array[0];
        this.swap(0, this.array.length - 1);
        this.array.pop();
        this.siftDown(0);
        return val;
    }

    public remove(value: T): boolean {
        const i = this.array.indexOf(value);
        if (i === -1) return false;
        this.removeIndex(i);
        return true;
    }

    public removeIf(predicate: (value: T) => boolean): T | undefined {
        const i = this.array.findIndex(predicate);
        if (i === -1) return undefined;
        const value = this.array[i];
        this.removeIndex(i);
        return value;
    }

    public update(value: T): this {
        const i = this.array.indexOf(value);
        if (i !== -1) {
            this.siftUp(i);
            this.siftDown(i);
        }
        return this;
    }

    public [Symbol.iterator]() {
        return this.array[Symbol.iterator]();
    }

    private removeIndex(i: number) {
        if (i === this.array.length - 1) {
            this.array.pop();
        } else {
            this.array[i] = this.array.pop()!;
            this.siftUp(i);
            this.siftDown(i);
        }
    }

    private siftUp(i: number) {
        let p = parent(i);
        while (i > 0 && this.comparer(this.array[i]!, this.array[p]!) < 0) {
            this.swap(i, p);
            i = p;
            p = parent(p);
        }
    }

    private siftDown(i: number) {
        const val: T = this.array[i]!;
        for (;;) {
            const l = leftChild(i);
            const r = l + 1;
            const lVal = this.array[l];
            const rVal = this.array[r];
            let min = i;
            let minVal = val;
            if (lVal !== undefined && this.comparer(lVal, minVal) < 0) {
                min = l;
                minVal = lVal;
            }
            if (rVal !== undefined && this.comparer(rVal, minVal) < 0) {
                min = r;
                minVal = rVal;
            }
            if (min === i) return;
            this.swap(min, i);
            i = min;
        }
    }

    private swap(i: number, j: number) {
        const tmp = this.array[i]!;
        this.array[i] = this.array[j]!;
        this.array[j] = tmp;
    }
}
