import { NotificationData } from 'components/UI/Notification';
import { ChartDataType } from 'types';

interface ObserverType<T> {
  observers: ((data: T) => void)[];
  subscribe: (func: (data: T) => void) => void;
  unsubscribe: (inputFunc: (data: T) => void) => void;
  notify: (data: T) => void;
}

class Observer<T> implements ObserverType<T> {
  observers: ((data: T) => void)[];
  constructor() {
    this.observers = [];
  }
  subscribe(func: (data: T) => void) {
    this.observers.push(func);
  }

  unsubscribe(inputFunc: (data: T) => void) {
    this.observers = this.observers.filter((func) => func !== inputFunc);
  }

  notify(data: T) {
    this.observers.map((func) => {
      func(data);
    });
  }
}

const timeLineDataObserver = new Observer<ChartDataType>();

const notificationObserver = new Observer<NotificationData>();

export { notificationObserver, Observer, timeLineDataObserver };
