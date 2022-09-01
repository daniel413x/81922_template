import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
});

export default Context;
