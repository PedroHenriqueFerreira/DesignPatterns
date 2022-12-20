export class SmartHouse {
  private isOn = false;
  private intensity = 50;

  constructor(public name: string) {}

  getPowerStatus(): string {
    return this.isOn ? 'ON' : 'OFF';
  }

  on(): boolean {
    this.isOn = true;
    console.log(`${this.name} is ${this.getPowerStatus()}`);
    return this.isOn;
  }

  off(): boolean {
    this.isOn = false;
    console.log(`${this.name} is ${this.getPowerStatus()}`);
    return this.isOn;
  }

  increaseIntensity(): number {
    if (this.intensity >= 100) return this.intensity;
    this.intensity += 1;
    return this.intensity;
  }

  decreaseIntensity(): number {
    if (this.intensity <= 0) return this.intensity;
    this.intensity -= 1;
    return this.intensity;
  }
}

/* --- COMMAND --- */
export interface CommandProtocol {
  execute(): void;
  undo(): void;
}

export class LightPowerCommand implements CommandProtocol {
  constructor(private readonly light: SmartHouse) {}

  execute(): void {
    this.light.on();
  }

  undo(): void {
    this.light.off();
  }
}

export class LightIntensityCommand implements CommandProtocol {
  constructor(private readonly light: SmartHouse) {}

  execute(): void {
    const intensity = this.light.increaseIntensity();
    console.log(`The light power of ${this.light.name} is ${intensity}`);
  }

  undo(): void {
    const intensity = this.light.decreaseIntensity();
    console.log(`The light power of ${this.light.name} is ${intensity}`);
  }
}

/* --- INVOKER --- */
export class SmartHouseApp {
  private commands: { [k: string]: CommandProtocol } = {};

  addCommand(key: string, command: CommandProtocol): void {
    this.commands[key] = command;
  }

  executeCommand(key: string): void {
    this.commands[key].execute();
  }

  undoCommand(key: string): void {
    this.commands[key].undo();
  }
}

/* --- CLIENT CODE --- */

// Receiver
const bedroomLight = new SmartHouse('Bedroom Light');
const bathroomLight = new SmartHouse('Bathroom Light');

// Invoker
const smartHouseApp = new SmartHouseApp();
smartHouseApp.addCommand('btn-1', new LightPowerCommand(bedroomLight));
smartHouseApp.addCommand('btn-2', new LightIntensityCommand(bathroomLight));

smartHouseApp.executeCommand('btn-1');
smartHouseApp.undoCommand('btn-1');

for (let i = 0; i < 5; i++) {
  smartHouseApp.executeCommand('btn-2');
}

for (let i = 0; i < 3; i++) {
  smartHouseApp.undoCommand('btn-2');
}
