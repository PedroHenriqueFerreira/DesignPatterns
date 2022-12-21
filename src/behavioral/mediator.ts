export type SellerProduct = { id: string; name: string; price: number };

/* --- COLLEAGUES --- */
export class Seller {
  private products: SellerProduct[] = [];
  private mediator?: Mediator;

  showProducts(): void {
    this.products.forEach((product) =>
      console.log(product.id, product.name, product.price),
    );
  }

  addProduct(...products: SellerProduct[]): void {
    products.forEach((product) => this.products.push(product));
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  sell(id: string): SellerProduct | void {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) return;
    const product = this.products.splice(productIndex, 1);
    return product[0];
  }

  // viewProducts(): void {
  //   if (!this.mediator) return;
  //   this.mediator.showProducts();
  // }

  // buy(id: string): void {
  //   if (!this.mediator) return;
  //   this.mediator.buy(id);
  // }
}

/* --- MEDIATOR --- */
export class Mediator {
  private sellers: Seller[] = [];

  addSeller(...sellers: Seller[]): void {
    sellers.forEach((seller) => {
      this.sellers.push(seller);
      seller.setMediator(this);
    });
  }

  buy(id: string): SellerProduct | void {
    let product;

    for (let i = 0; i < this.sellers.length; i++) {
      product = this.sellers[i].sell(id);

      if (product) {
        console.log('Here it is:', product.id, product.name, product.price);
        return;
      }
    }

    console.log("Can't find product ID:", id);
  }

  showProducts(): void {
    this.sellers.forEach((seller) => seller.showProducts());
  }
}

export class Buyer {
  constructor(private mediator: Mediator) {}

  viewProducts(): void {
    this.mediator.showProducts();
  }

  buy(id: string): void {
    this.mediator.buy(id);
  }
}

/* --- CLIENT CODE --- */
const mediator = new Mediator();

const seller1 = new Seller();
seller1.addProduct({ id: '1', name: 'Shirt', price: 49.9 });
seller1.addProduct({ id: '2', name: 'Pen', price: 9.9 });

const seller2 = new Seller();
seller2.addProduct({ id: '3', name: 'Car', price: 49_999.9 });
seller2.addProduct({ id: '4', name: 'Doll', price: 1.9 });

mediator.addSeller(seller1, seller2);

const buyer = new Buyer(mediator);
buyer.viewProducts();
buyer.buy('2');
buyer.buy('3');
buyer.viewProducts();
