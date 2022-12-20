/* --- STATE --- */
export interface OrderState {
  getName(): string;
  wait(): void;
  approve(): void;
  refuse(): void;
  send(): void;
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

  send() {
    console.log("Can't send when waiting");
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

  send() {
    console.log('Sending...');
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

  send() {
    console.log("Can't send refused");
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

  send() {
    this.state.send();
  }
}

/* --- CLIENT CODE --- */
const order = new ShoppingOrder();
order.approve();
order.send();
order.wait();
order.send();
order.refuse();
order.send();
order.approve();
order.wait();
order.approve();
