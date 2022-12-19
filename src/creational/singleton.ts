export class Connection {
  private static _instance: Connection | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static get instance(): Connection {
    if (Connection._instance === null) Connection._instance = new Connection();
    return Connection._instance;
  }
}

/* --- CLIENT CODE --- */
const connection = Connection.instance;
console.log(connection == Connection.instance);
