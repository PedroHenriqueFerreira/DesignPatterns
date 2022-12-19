export interface ItemProtocol {
  name: string;
  price: number;
}

export interface BoxProtocol {
  items: ItemProtocol[];
  addItem(item: ItemProtocol): this;
}

export class Box implements BoxProtocol {
  items: ItemProtocol[] = [];

  addItem(item: ItemProtocol): this {
    this.items.push(item);

    return this;
  }
}

/* --- BUILDER --- */

export interface BuilderProtocol {
  makeBox(): this;
  getBox(): Box;
}

export class FoodBoxBuilder implements BuilderProtocol {
  private _box: BoxProtocol = new Box();

  makeBox(): this {
    this._box
      .addItem({ name: 'Hamburger', price: 20 })
      .addItem({ name: 'Pizza', price: 35 });

    return this;
  }

  getBox() {
    return this._box;
  }
}

export class ToyBoxBuilder implements BuilderProtocol {
  private _box: BoxProtocol = new Box();

  makeBox(): this {
    this._box
      .addItem({ name: 'Car', price: 25 })
      .addItem({ name: 'Doll', price: 12 });

    return this;
  }

  getBox() {
    return this._box;
  }
}

if (require.main === module) {
  /* --- CLIENT CODE --- */

  const toyBoxBuilder = new ToyBoxBuilder();

  toyBoxBuilder.makeBox();
  console.log(toyBoxBuilder.getBox());

  const foodBoxBuilder = new FoodBoxBuilder();

  foodBoxBuilder.makeBox();
  console.log(foodBoxBuilder.getBox());
}
