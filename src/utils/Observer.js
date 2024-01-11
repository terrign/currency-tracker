class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(inputFunc) {
    this.observers = this.observers.filter((func) => func !== inputFunc);
  }

  notify(data) {
    this.observers.forEach((func) => func(data));
  }
}

const dayData = new Observer();

const notification = new Observer();

export { dayData, notification, Observer };
