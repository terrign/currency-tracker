class Observer {
  constructor() {
    // @ts-expect-error no types
    this.observers = [];
  }
  // @ts-expect-error no types
  subscribe(func) {
    // @ts-expect-error no types
    this.observers.push(func);
  }
  // @ts-expect-error no types
  unsubscribe(inputFunc) {
    // @ts-expect-error no types
    this.observers = this.observers.filter((func) => func !== inputFunc);
  }
  // @ts-expect-error no types
  notify(data) {
    // @ts-expect-error no types
    this.observers.forEach((func) => func(data));
  }
}

const timeLineDataObserver = new Observer();

const notificationObserver = new Observer();

export { notificationObserver, Observer, timeLineDataObserver };
