class Observer {
  private observers: ((data: unknown) => void)[];
  constructor() {
    this.observers = [];
  }

  subscribe(func: (data: unknown) => void) {
    this.observers.push(func);
  }

  unsubscribe(inputFunc: (data: unknown) => void) {
    this.observers = this.observers.filter((func) => func !== inputFunc);
  }

  notify(data: unknown) {
    this.observers.forEach((func) => {
      func(data);
    });
  }
}

const timeLineDataObserver = new Observer();

const notificationObserver = new Observer();

export { notificationObserver, Observer, timeLineDataObserver };
