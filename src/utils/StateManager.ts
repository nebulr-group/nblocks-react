export class StateManager {
  // Generic state management functions
  static saveState(newState: any, stateKey: string): void {    
      localStorage.setItem(stateKey, JSON.stringify(newState));    
  }

  static getState(stateKey: string): any | null {
    if (stateKey) {
      const saved = localStorage.getItem(stateKey);      
      if (saved) {
        return JSON.parse(saved);
      }
    }    
    return null;
  }

  static clearState(stateKey: string): void {
    if (stateKey) {      
      localStorage.removeItem(stateKey);
    }
  }

  // Table specific functions using the generic ones
  static saveTableState(newState: any, uniqueKey: string): void {
    this.saveState(newState, `table-state-${uniqueKey}`);
  }

  static getTableState(uniqueKey: string): any | null {
    return this.getState(`table-state-${uniqueKey}`);
  }

  static clearTableState(uniqueKey: string): void {
    this.clearState(`table-state-${uniqueKey}`);
  }
} 