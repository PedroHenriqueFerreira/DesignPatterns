/* --- MEMENTO --- */
export interface MementoProtocol {
  getName(): string;
  getDate(): Date;
}

export class ConcreteMemento implements MementoProtocol {
  constructor(
    private name: string,
    private date: Date,
    private fileName: string,
  ) {}

  getName() {
    return this.name;
  }

  getDate() {
    return this.date;
  }

  getFileName() {
    return this.fileName;
  }
}

export class ImageEditor {
  constructor(private fileName: string) {}

  save(): Readonly<MementoProtocol> {
    const date = new Date();
    return new ConcreteMemento(date.toISOString(), date, this.fileName);
  }

  restore(m: MementoProtocol) {
    const cm = m as ConcreteMemento;
    this.fileName = cm.getFileName();
  }

  setFilename(fileName: string) {
    this.fileName = fileName;
  }
}

export class CareTaker {
  private mementos: MementoProtocol[] = [];

  constructor(private imageEditor: ImageEditor) {}

  backup() {
    console.log('BACKUP');
    this.mementos.push(this.imageEditor.save());
  }

  restore() {
    const memento = this.mementos.pop();

    if (!memento) {
      console.log('NO RESTORE');
      return;
    }

    console.log('RESTORE');
    this.imageEditor.restore(memento);
  }
}

/* --- CLIENT CODE --- */
const imageEditor = new ImageEditor('file_1.txt');

const careTaker = new CareTaker(imageEditor);

careTaker.backup();

imageEditor.setFilename('file_2.txt');
careTaker.backup();

imageEditor.setFilename('file_3.txt');
careTaker.backup();

for (let i = 0; i < 4; i++) {
  careTaker.restore();

  console.log(imageEditor);
}
