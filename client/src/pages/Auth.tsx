import React, {
  useState, useEffect, useContext,
} from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
  Container,
} from 'react-bootstrap';
import {
  FRONT_PAGE_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  shortNotification,
  green,
} from '../utils/consts';
import AuthBox from '../components/AuthBox';
import Context from '../context/context';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, user } = useContext(Context);
  const [forLogin, setShowLogin] = useState<boolean>(false);
  const onSuccess = () => {
    notifications.message(
      forLogin ? 'You logged in successfully' : 'Registration successful',
      green,
      shortNotification,
    );
    navigate(FRONT_PAGE_ROUTE);
  };
  useEffect(() => {
    if (user.isRegistered) {
      navigate(FRONT_PAGE_ROUTE);
    }
    if (location.pathname === `/${LOGIN_ROUTE}`) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, []);
  return (
    <Container id="auth">
      <h2>
        {forLogin ? 'Login' : 'Registration'}
      </h2>
      <AuthBox
        onSuccess={onSuccess}
        forLogin={forLogin}
      />
      <NavLink id="switch-link" to={`/${forLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}`}>
        {forLogin ? 'Register an account' : 'I\'m already registered'}
      </NavLink>
    </Container>
  );
}

export default Auth;
