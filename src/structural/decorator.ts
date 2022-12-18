export interface ProductProtocol {
  getPrice(): number;
  getName(): string;
}

export class Shirt implements ProductProtocol {
  private price = 100;
  private name = 'Shirt';

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

/* --- DECORATOR --- */
export class ProductDecorator implements ProductProtocol {
  constructor(protected product: ProductProtocol) {}

  getPrice(): number {
    return this.product.getPrice();
  }

  getName(): string {
    return this.product.getName();
  }
}

export class ProductDecoratorWithDiscount10 extends ProductDecorator {
  getPrice(): number {
    return this.product.getPrice() * 0.9;
  }

  getName(): string {
    return this.product.getName() + ' with 10% discount';
  }
}

export class ProductDecoratorWithDiscount20 extends ProductDecorator {
  getPrice(): number {
    return this.product.getPrice() * 0.8;
  }

  getName(): string {
    return this.product.getName() + ' with 20% discount';
  }
}

/* --- CLIENT CODE --- */
const productWithDiscount10 = new ProductDecoratorWithDiscount10(new Shirt());
console.log(productWithDiscount10.getName());
console.log(productWithDiscount10.getPrice());

const productWithDiscount20 = new ProductDecoratorWithDiscount20(new Shirt());
console.log(productWithDiscount20.getName());
console.log(productWithDiscount20.getPrice());
