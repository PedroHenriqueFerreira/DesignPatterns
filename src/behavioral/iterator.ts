/* --- ITERATOR --- */
export interface IteratorProtocol<T> extends Iterator<T> {
  reset(): void;
}

export class MyIterator implements IteratorProtocol<string> {
  constructor(private dataStructure: DataStructure) {}

  private index = 0;

  reset(): void {
    this.index = 0;
  }

  next(): IteratorResult<string> {
    const returnValue = {
      value: this.dataStructure.items[this.index],
      done: this.index >= this.dataStructure.items.length,
    };

    this.index++;

    return returnValue;
  }
}

export class DataStructure {
  private iterator: IteratorProtocol<string> = new MyIterator(this);

  constructor(private _items: string[]) {}

  get items() {
    return this._items;
  }

  [Symbol.iterator](): IteratorProtocol<string> {
    return this.iterator;
  }

  resetIterator() {
    this.iterator.reset();
  }
}

/* --- CLIENT CODE --- */
const dataStructure = new DataStructure(['a', 'b', 'c', 'd', 'e', 'f']);

console.log(dataStructure);

const [a, b] = dataStructure;

console.log(a, b);

dataStructure.resetIterator();

const [c, d] = dataStructure;

console.log(c, d);

const [e, f] = dataStructure;

console.log(e, f);

dataStructure.resetIterator();

console.log();

for (const item of dataStructure) console.log(item);
