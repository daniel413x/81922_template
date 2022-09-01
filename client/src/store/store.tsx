import NotificationStore from './NotificationStore';
import UserStore from './UserStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
};

export default store;
