/* --- CHAIN OF RESPONSIBILITY --- */
export abstract class Middleware {
  private next: Middleware | null = null;

  setNext(next: Middleware) {
    this.next = next;

    return next;
  }

  exec(price: number): number {
    if (this.next) return this.next.exec(price);

    return price;
  }
}

export class FirstMiddleware extends Middleware {
  exec(price: number): number {
    if (price < 1000) {
      console.log('First Middleware');

      return price;
    }

    return super.exec(price);
  }
}

export class SecondMiddleware extends Middleware {
  exec(price: number): number {
    if (price < 2000) {
      console.log('Second Middleware');

      return price;
    }

    return super.exec(price);
  }
}

export class ThirdMiddleware extends Middleware {
  exec(price: number): number {
    if (price < 5000) {
      console.log('Third Middleware');

      return price;
    }

    return super.exec(price);
  }
}

export class LastMiddleware extends Middleware {
  exec(price: number): number {
    console.log('Last Middleware');

    return price;
  }
}

/* --- CLIENT CODE --- */
const middleware = new FirstMiddleware();

middleware
  .setNext(new SecondMiddleware())
  .setNext(new ThirdMiddleware())
  .setNext(new LastMiddleware());

middleware.exec(4000);
