import { makeAutoObservable } from 'mobx';
import { INotification } from '../types/types';
import { green } from '../utils/consts';

export default class NotificationStore {
  notifications: INotification[];

  constructor() {
    this.notifications = [];
    makeAutoObservable(this);
  }

  set newNotifications(notifications: INotification[]) {
    this.notifications = notifications;
  }

  message(
    message = 'notification...',
    color = green,
    timeout = 3000,
    image = '',
  ) {
    const notification = {
      id: Date.now(),
      message,
      color,
      timeout,
      image,
    };
    this.notifications = [notification, ...this.notifications];
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  clearNotifications() {
    this.notifications = [];
  }

  get all() {
    return this.notifications;
  }
}
