class AppState {
  constructor() {
    this.state = {
      sidebarOpen: false,
      offline: !navigator.onLine,
      updateAvailable: false,
      currentRoute: null,
      content: null,
      preferences: null,
    };
    this.listeners = new Map();
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    this.notify(key, value);
  }

  subscribe(key, fn) {
    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key).add(fn);
    return () => this.listeners.get(key).delete(fn);
  }

  notify(key, value) {
    const subs = this.listeners.get(key);
    if (subs) subs.forEach((fn) => fn(value));
  }
}

export const appState = new AppState();
