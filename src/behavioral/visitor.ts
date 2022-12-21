export abstract class Product {
  constructor(protected name: string, protected price: number) {}

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  abstract getPriceWithTaxes(visitor: TaxVisitorProtocol): number;
}

export class Beer extends Product {
  constructor(protected price: number) {
    super('Beer', price);
  }

  getPriceWithTaxes(visitor: TaxVisitorProtocol): number {
    return visitor.calculateTaxesForBeer(this);
  }
}

export class Food extends Product {
  constructor(protected price: number) {
    super('Food', price);
  }

  getPriceWithTaxes(visitor: TaxVisitorProtocol): number {
    return visitor.calculateTaxesForFood(this);
  }
}

export interface TaxVisitorProtocol {
  calculateTaxesForFood(food: Food): number;
  calculateTaxesForBeer(beer: Beer): number;
}

/* --- VISITOR --- */
export class BrazilTaxVisitor implements TaxVisitorProtocol {
  calculateTaxesForFood(food: Food): number {
    return food.getPrice() * 1.05;
  }

  calculateTaxesForBeer(beer: Beer): number {
    return beer.getPrice() * 1.5;
  }
}

export class USTaxVisitor implements TaxVisitorProtocol {
  calculateTaxesForFood(food: Food): number {
    return food.getPrice() * 1.15;
  }

  calculateTaxesForBeer(beer: Beer): number {
    return beer.getPrice() * 2;
  }
}

/* --- CLIENT CODE --- */
const food = new Food(10);
const beer = new Beer(5);

const brazilTaxVisitor = new BrazilTaxVisitor();
const usTaxVisitor = new USTaxVisitor();

const cart = [food, beer];
const total = cart.reduce((sum, item) => item.getPrice() + sum, 0);
const totalWithTaxesBrazil = cart.reduce(
  (sum, item) => item.getPriceWithTaxes(brazilTaxVisitor) + sum,
  0,
);
const totalWithTaxesUS = cart.reduce(
  (sum, item) => item.getPriceWithTaxes(usTaxVisitor) + sum,
  0,
);
console.log(total);
console.log(totalWithTaxesBrazil);
console.log(totalWithTaxesUS);
