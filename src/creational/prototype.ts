interface PrototypeProtocol {
  clone(): PrototypeProtocol;
}

class PersonDeepCopy implements PrototypeProtocol {
  constructor(public name: string, public age: number) {}

  clone(): PrototypeProtocol {
    return new PersonDeepCopy(this.name, this.age);
  }
}

class PersonShallowCopy implements PrototypeProtocol {
  constructor(public name: string, public age: number) {}

  clone(): this {
    return Object.create(this);
  }
}

/* --- CLIENT CODE --- */
const personShallowCopy = new PersonShallowCopy('Pedro', 18);
console.log(personShallowCopy.clone());

const personDeepCopy = new PersonDeepCopy('Pedro', 18);
console.log(personDeepCopy.clone());
