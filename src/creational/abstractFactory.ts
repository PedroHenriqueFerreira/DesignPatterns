interface ButtonProtocol {
  text: string;
}

class WindowsButton implements ButtonProtocol {
  public text: string;

  constructor(text: string) {
    this.text = `${text} WINDOWS`;
  }
}

class LinuxButton implements ButtonProtocol {
  public text: string;

  constructor(text: string) {
    this.text = `${text} LINUX`;
  }
}

interface InputProtocol {
  label: string;
}

class WindowsInput implements InputProtocol {
  label: string;
  constructor(label: string) {
    this.label = `${label} WINDOWS`;
  }
}

class LinuxInput implements InputProtocol {
  label: string;
  constructor(label: string) {
    this.label = `${label} LINUX`;
  }
}

/* --- ABSTRACT FACTORY --- */

interface UIFactoryProtocol {
  createButton(text: string): ButtonProtocol;
  createInput(label: string): InputProtocol;
}

class WindowsFactory implements UIFactoryProtocol {
  createButton(text: string): ButtonProtocol {
    return new WindowsButton(text);
  }
  createInput(label: string): InputProtocol {
    return new WindowsInput(label);
  }
}

class LinuxFactory implements UIFactoryProtocol {
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
