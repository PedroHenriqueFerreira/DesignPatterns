export type DeliveryData = {
  readonly street: string;
  readonly city: string;
};

export type ExtrinsicState = {
  readonly name: string;
  readonly number: string;
};

export interface DeliveryFlyweightProtocol {
  deliver(extrinsicState: ExtrinsicState): void;
}

/* --- FLYWEIGHT --- */
export class DeliveryFlyweight implements DeliveryFlyweightProtocol {
  constructor(private readonly intrinsicState: DeliveryData) {}

  deliver(extrinsicState: ExtrinsicState): void {
    console.log('Deviver to:', extrinsicState.name);
    console.log('In:', this.intrinsicState.street, this.intrinsicState.city);
    console.log('Number:', extrinsicState.number);
    console.log('-----------------');
  }
}

export type DeliveryFlyweightDictionary = { [k: string]: DeliveryFlyweight };

export class DeliveryFlyweightFactory {
  private locations: DeliveryFlyweightDictionary = {};

  private createKey(data: DeliveryData): string {
    return Object.values(data)
      .map((item) => item.split(' ').join('-').toLocaleLowerCase())
      .join('_');
  }

  getDeliveryFlyweight(intrinsicState: DeliveryData): DeliveryFlyweight {
    const key = this.createKey(intrinsicState);
    if (key in this.locations) return this.locations[key];
    this.locations[key] = new DeliveryFlyweight(intrinsicState);
    return this.locations[key];
  }

  getLocations(): DeliveryFlyweightDictionary {
    return this.locations;
  }
}

export const deliveryContext = function (
  factory: DeliveryFlyweightFactory,
  name: string,
  number: string,
  street: string,
  city: string,
): void {
  const location = factory.getDeliveryFlyweight({ street, city });
  location.deliver({ name, number });
};

/* --- CLIENT CODE --- */
const factory = new DeliveryFlyweightFactory();
deliveryContext(factory, 'Pedro', '20', 'Av Brasil', 'São Paulo');
deliveryContext(factory, 'Joao', '135B', 'Av Brasil', 'São Paulo');
deliveryContext(factory, 'Carlos', '502', 'Av Santos Dumont', 'Fortaleza');

console.log(factory.getLocations());
