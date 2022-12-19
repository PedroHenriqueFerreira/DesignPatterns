export interface ProductProtocol {
  name: string;
  price: number;
}

/* --- STRATEGY --- */
export class DiscountStrategy {
  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    return cart.getTotal();
  }
}

export class ShoppingCart {
  private products: ProductProtocol[] = [];
  private _discountStrategy: DiscountStrategy = new DiscountStrategy();

  addProduct(...products: ProductProtocol[]): void {
    products.forEach((product) => this.products.push(product));
  }

  getProducts(): ProductProtocol[] {
    return this.products;
  }

  getTotal(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }

  getTotalWithDiscount(): number {
    return this._discountStrategy.getDiscount(this);
  }

  set discount(discount: DiscountStrategy) {
    this._discountStrategy = discount;
  }
}

export class NewDiscount extends DiscountStrategy {
  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    const total = cart.getTotal();

    if (total >= 150) {
      this.discount = 5;
    }

    return total - total * (this.discount / 100);
  }
}

export class DefaultDiscount extends DiscountStrategy {
  protected discount = 0;

  getDiscount(cart: ShoppingCart): number {
    const total = cart.getTotal();

    if (total >= 100 && total < 200) {
      this.discount = 10;
    } else if (total >= 200 && total < 300) {
      this.discount = 20;
    } else if (total >= 300) {
      this.discount = 30;
    }

    return total - total * (this.discount / 100);
  }
}

/* --- CLIENT CODE --- */
const shoppingCart = new ShoppingCart();
shoppingCart.discount = new DefaultDiscount();
shoppingCart.discount = new NewDiscount();
shoppingCart.addProduct({ name: 'Produto 1', price: 50 });
shoppingCart.addProduct({ name: 'Produto 2', price: 50 });
shoppingCart.addProduct({ name: 'Produto 2', price: 50 });
console.log(shoppingCart.getTotal());
console.log(shoppingCart.getTotalWithDiscount());
