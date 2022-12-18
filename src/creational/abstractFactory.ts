export interface ButtonProtocol {
  text: string;
}

export class WindowsButton implements ButtonProtocol {
  public text: string;

  constructor(text: string) {
    this.text = `${text} WINDOWS`;
  }
}

export class LinuxButton implements ButtonProtocol {
  public text: string;

  constructor(text: string) {
    this.text = `${text} LINUX`;
  }
}

export interface InputProtocol {
  label: string;
}

export class WindowsInput implements InputProtocol {
  label: string;
  constructor(label: string) {
    this.label = `${label} WINDOWS`;
  }
}

export class LinuxInput implements InputProtocol {
  label: string;
  constructor(label: string) {
    this.label = `${label} LINUX`;
  }
}

/* --- ABSTRACT FACTORY --- */
export interface UIFactoryProtocol {
  createButton(text: string): ButtonProtocol;
  createInput(label: string): InputProtocol;
}

export class WindowsFactory implements UIFactoryProtocol {
  createButton(text: string): ButtonProtocol {
    return new WindowsButton(text);
  }
  createInput(label: string): InputProtocol {
    return new WindowsInput(label);
  }
}

export class LinuxFactory implements UIFactoryProtocol {
  createButton(text: string): ButtonProtocol {
    return new LinuxButton(text);
  }
  createInput(label: string): InputProtocol {
    return new LinuxInput(label);
  }
}

/* --- CLIENT CODE --- */
const windowsFactory = new WindowsFactory();
const linuxFactory = new LinuxFactory();

console.log(windowsFactory.createInput('Nome'));
console.log(windowsFactory.createButton('Entrar'));

console.log(linuxFactory.createInput('Nome'));
console.log(linuxFactory.createButton('Entrar'));
