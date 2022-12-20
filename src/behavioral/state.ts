/* --- STATE --- */
export interface OrderState {
  getName(): string;
  wait(): void;
  approve(): void;
  refuse(): void;
}

export class WaitState implements OrderState {
  private name = 'Wait State';

  constructor(private state: ShoppingOrder) {}

  getName() {
    return this.name;
  }

  wait() {
    console.log('Already waiting');
  }

  approve() {
    this.state.setState(new ApproveState(this.state));
  }

  refuse() {
    this.state.setState(new RefuseState(this.state));
  }
}

export class ApproveState implements OrderState {
  private name = 'Approve State';

  constructor(private state: ShoppingOrder) {}

  getName() {
    return this.name;
  }

  wait() {
    this.state.setState(new WaitState(this.state));
  }

  approve() {
    console.log('Already approved');
  }

  refuse() {
    this.state.setState(new RefuseState(this.state));
  }
}

export class RefuseState implements OrderState {
  private name = 'Refuse State';

  constructor(private state: ShoppingOrder) {}

  getName() {
    return this.name;
  }

  wait() {
    console.log("Can't wait refused order");
  }

  approve() {
    console.log("Can't approve refused order");
  }

  refuse() {
    console.log('Already refused');
  }
}

/* --- CONTEXT --- */
export class ShoppingOrder {
  private state: OrderState = new WaitState(this);

  getName(): string {
    return this.state.getName();
  }

  setState(state: OrderState) {
    this.state = state;
    console.log('Current state is', state.getName());
  }

  wait() {
    this.state.wait();
  }

  approve() {
    this.state.approve();
  }

  refuse() {
    this.state.refuse();
  }
}

/* --- CLIENT CODE --- */
const order = new ShoppingOrder(); // Pendente
order.approve(); // Aprovado
order.wait(); // Pendente
order.refuse(); // Daqui não altera mais o estado
order.approve(); // n
order.wait(); // n
order.approve(); // n
