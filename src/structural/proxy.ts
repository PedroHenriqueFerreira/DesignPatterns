export type AddressProtocol = { street: string; number: number };

export interface UserProtocol {
  firstName: string;
  lastName: string;

  getAddresses(): Promise<AddressProtocol[]>;
}

export class User implements UserProtocol {
  constructor(public firstName: string, public lastName: string) {}

  async getAddresses(): Promise<AddressProtocol[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { street: 'Av Brasil', number: 20 },
          { street: 'Av Santos Dumont', number: 30 },
        ]);
      }, 2000);
    });
  }
}

export class UserProxy implements UserProtocol {
  private realUser: UserProtocol | null = null;
  private realUserAddresses: AddressProtocol[] | null = null;

  constructor(public firstName: string, public lastName: string) {}

  private getUser(): UserProtocol {
    if (this.realUser === null) {
      this.realUser = new User(this.firstName, this.lastName);
    }

    return this.realUser;
  }

  async getAddresses(): Promise<AddressProtocol[]> {
    this.realUser = this.getUser();

    if (this.realUserAddresses === null) {
      this.realUserAddresses = await this.realUser.getAddresses();
    }

    return this.realUserAddresses;
  }
}

const clientCode = async () => {
  /* --- CLIENT CODE --- */
  const user = new UserProxy('Pedro', 'Ferreira');
  console.log('Wainting for user data...');
  console.log(await user.getAddresses());

  console.log('These is on cache:');
  for (let i = 0; i < 5; i++) {
    console.log(await user.getAddresses());
  }
};

clientCode();
