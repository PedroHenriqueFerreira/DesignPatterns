export interface ItemProtocol {
  name: string;
  price: number;
}

export interface BoxProtocol {
  items: ItemProtocol[];
  addItem(item: ItemProtocol): this;
}

class Box implements BoxProtocol {
  items: ItemProtocol[] = [];

  addItem(item: ItemProtocol): this {
    this.items.push(item);

    return this;
  }
}

/* --- BUILDER --- */

export interface BuilderProtocol {
  makeToyBox(): this;
  makeFoodBox(): this;
  reset(): void;
  getBox(): Box;
}

class BoxBuilder implements BuilderProtocol {
  private _box: BoxProtocol = new Box();

  makeToyBox(): this {
    this._box
      .addItem({ name: 'Car', price: 25 })
      .addItem({ name: 'Doll', price: 12 });

    return this;
  }

  makeFoodBox(): this {
    this._box
      .addItem({ name: 'Hamburger', price: 20 })
      .addItem({ name: 'Pizza', price: 35 });

    return this;
  }

  reset(): void {
    this._box = new Box();
  }

  getBox() {
    return this._box;
  }
}

/* --- CLIENT CODE --- */

const builder = new BoxBuilder();

builder.makeFoodBox();
console.log(builder.getBox());

builder.reset();

builder.makeToyBox();
console.log(builder.getBox());
