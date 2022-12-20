/* eslint-disable @typescript-eslint/no-empty-function */
export type CustomerData = { name: string; age: string; cpf: string };

export abstract class CustomerDataParser {
  public customerData: CustomerData[] = [];

  constructor(protected data: string) {}

  readonly fixCustomerData = () => {
    this.customerData = this.parseData();
    this.hook();
    this.customerData = this.fixCpf();
  };

  private fixCpf(): CustomerData[] {
    return this.customerData.map((customer) => ({
      ...customer,
      cpf: customer.cpf.replace(/\D/g, ''),
    }));
  }

  protected hook(): void {}

  protected abstract parseData(): CustomerData[];
}

export class CustomerDataParserJson extends CustomerDataParser {
  protected parseData(): CustomerData[] {
    const data = JSON.parse(this.data);

    const customerData: CustomerData[] = [];

    for (const customer of data) {
      const { name, age, cpf } = customer;
      customerData.push({ name, age, cpf });
    }

    return customerData;
  }

  hook(): void {
    console.log('O hook foi executado.');
  }
}

export class CustomerDataParserTxt extends CustomerDataParser {
  protected parseData(): CustomerData[] {
    const lines = this.data.split('\n');

    const customerData: CustomerData[] = [];

    for (const line of lines) {
      const [name, age, cpf] = line.split('\t');
      customerData.push({ name, age, cpf });
    }

    return customerData;
  }
}

/* --- CLIENT CODE --- */
const txtData = `Luiz Otávio	30	606.351.450-30
Maria Helena	52	991.406.250-44
Rosana	18	450.218.290-76`;

const customerDataParserTxt = new CustomerDataParserTxt(txtData);
customerDataParserTxt.fixCustomerData();
console.log(customerDataParserTxt.customerData);

console.log();

const jsonData = `[
  {
    "name": "Luiz Otávio",
    "age": "30",
    "cpf": "606.351.450-30"
  },
  {
    "name": "Maria Helena",
    "age": "52",
    "cpf": "991.406.250-44"
  },
  {
    "name": "Rosana",
    "age": "18",
    "cpf": "450.218.290-76"
  }
]`;

const customerDataParserJson = new CustomerDataParserJson(jsonData);
customerDataParserJson.fixCustomerData();
console.log(customerDataParserJson.customerData);
