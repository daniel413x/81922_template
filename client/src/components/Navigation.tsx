import React, {
  useContext,
  useState,
  useEffect,
  MouseEvent,
  useRef,
} from 'react';
import {
  Container, Navbar, Nav, Image, NavDropdown, Button,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Logo from '../assets/logo2.png';
import {
  FRONT_PAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SOME_PAGE_ROUTE,
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
  green,
  shortNotification,
} from '../utils/consts';
import Context from '../context/context';
import useWindowSize from '../hooks/useWindowSize';
import useOnClickOutside from '../hooks/useOnOutsideClick';

function Navigation() {
  const {
    notifications,
    user,
  } = useContext(Context);
  const { md } = useWindowSize();
  const [expandIndex, setExpandIndex] = useState<boolean>(false);
  const [expandAccount, setExpandAccount] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const collapseMenu = () => {
    if (!md) {
      setExpandIndex(false);
      setTimeout(() => setExpandAccount(false), 250);
    }
  };
  useOnClickOutside(ref, collapseMenu);
  const openSubMenu = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).className === 'dropdown-toggle nav-link' && expandAccount) {
      setExpandAccount(false);
    } else if (!expandAccount) {
      setExpandAccount(true);
    }
  };
  const openIndex = () => {
    if (expandIndex) {
      setExpandIndex(false);
    } else {
      setExpandIndex(true);
    }
    if (expandAccount) {
      setTimeout(() => setExpandAccount(false), 250);
    }
  };
  const logout = () => {
    localStorage.removeItem('registeredToken');
    user.unset();
    notifications.message(
      'You were logged out',
      green,
      shortNotification,
    );
  };
  useEffect(() => {
    if (md) {
      setExpandIndex(false);
    }
  }, [md]);
  return (
    <Navbar id="navbar" expand="lg" expanded={expandIndex} ref={ref}>
      <Container>
        <Navbar.Brand href={FRONT_PAGE_ROUTE}>
          <Image src={Logo} alt="logo" title="Home" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={openIndex} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={FRONT_PAGE_ROUTE} title="Home" onClick={collapseMenu}>
              Home
            </NavLink>
            <NavLink className="nav-link" to={SOME_PAGE_ROUTE} title="Somepage" onClick={collapseMenu}>
              Somepage
            </NavLink>
            {user.isGuest && (
              <NavLink className="nav-link" to={LOGIN_ROUTE} title="Login" onClick={collapseMenu}>
                Login
              </NavLink>
            )}
            {user.isGuest && (
            <NavLink className="nav-link" to={REGISTRATION_ROUTE} title="Register" onClick={collapseMenu}>
              Register
            </NavLink>
            )}
            {user.isRegistered && (
              <NavDropdown title="Account" show={expandAccount} onClick={openSubMenu}>
                <NavLink tabIndex={0} role="button" className="nav-link" to={ACCOUNT_ROUTE} title="Account" onClick={collapseMenu}>
                  Main
                </NavLink>
                {user.isAdmin && (
                <NavLink tabIndex={0} role="button" className="nav-link" to={ADMIN_ROUTE} title="Admin" onClick={collapseMenu}>
                  Admin
                </NavLink>
                )}
                <Button tabIndex={0} role="button" className="nav-link" title="Logout" onClick={logout}>
                  Logout
                </Button>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <span className="phone-num" title="1800 789 123">
              (703) 313-5388
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default observer(Navigation);
