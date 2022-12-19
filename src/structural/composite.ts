/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

abstract class ProductAbstract {
  abstract getPrice(): number;

  add(product: ProductAbstract): void {}

  remove(product: ProductAbstract): void {}
}

export class ProductLeaf extends ProductAbstract {
  constructor(public name: string, private price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }
}

/* --- COMPOSITE --- */
export class ProductComposite extends ProductAbstract {
  private children: ProductAbstract[] = [];

  add(...products: ProductAbstract[]): void {
    products.forEach((product) => this.children.push(product));
  }

  remove(product: ProductAbstract): void {
    const index = this.children.indexOf(product);
    if (index !== -1) this.children.splice(index, 1);
  }

  getPrice(): number {
    return this.children.reduce((ac, product) => ac + product.getPrice(), 0);
  }
}

/* --- CLIENT CODE --- */
const doll = new ProductLeaf('Doll', 12);
const car = new ProductLeaf('Car', 25);

const productBox = new ProductComposite();
productBox.add(doll, car);

console.log(productBox);
console.log(productBox.getPrice());
