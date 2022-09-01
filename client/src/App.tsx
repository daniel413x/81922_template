import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexAuthedRoutes,
  indexPublicRoutes,
  red,
  shortNotification,
} from './utils/consts';
import Context from './context/context';
import AppRouter from './routers/AppRouter';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { autoAuth, createGuestToken } from './http/userAPI';

function App() {
  const {
    user,
    notifications,
  } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const registeredToken = localStorage.getItem('registeredToken');
        const guestToken = localStorage.getItem('guestToken');
        if (registeredToken) {
          const stillAuthed = await autoAuth();
          user.set(stillAuthed);
        } else if (guestToken) {
          const guestId = localStorage.getItem('guestId');
          user.setId(guestId!);
        } else {
          const guest = await createGuestToken();
          user.setId(guest.id);
          localStorage.setItem('guestId', guest.id);
        }
      } catch (error: any) {
        notifications.message(
          error.response.data.message,
          red,
          shortNotification,
        );
        if (error.response.status === 401) {
          localStorage.removeItem('registeredToken');
          localStorage.removeItem('guestToken');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return loading ? null : (
    <Router>
      <Notifications />
      <Navigation />
      <div id="main-routes-content">
        <AppRouter
          publicRoutes={indexPublicRoutes}
          authedRoutes={indexAuthedRoutes}
        />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
