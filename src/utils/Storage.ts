export class NblocksStorage {
  static readonly KEY_PREFIX = "NB_";
  static setItem(key: string, value: string): void {
    localStorage.setItem(this.KEY_PREFIX + key, value);
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(this.KEY_PREFIX + key);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(this.KEY_PREFIX + key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
