export interface ProductProtocol {
  name: string;
  price: number;
}

export class Product implements ProductProtocol {
  constructor(public name: string, public price: number) {}
}

/* --- FACTORY --- */

export interface ProductFactoryProtocol {
  getProduct(name: string, price: number): ProductProtocol;
}

export class ProductFactory implements ProductFactoryProtocol {
  getProduct(name: string, price: number): ProductProtocol {
    return new Product(name, price);
  }
}

/* --- CLIENT CODE --- */

const productFactory = new ProductFactory();
const product = productFactory.getProduct('Carrinho', 20);
console.log(product);
