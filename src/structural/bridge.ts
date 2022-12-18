export interface DeviceProtocol {
  setVolume(volume: number): void;
  getVolume(): number;
}

class Device implements DeviceProtocol {
  private _volume = 0;

  setVolume(volume: number): void {
    this._volume = volume;
  }

  getVolume(): number {
    return this._volume;
  }
}

/* --- BRIDGE --- */
class RemoteControl {
  constructor(private device: DeviceProtocol) {}

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

/* --- CLIENT CODE --- */
const remoteControl = new RemoteControl(new Device());
remoteControl.volumeUp();
