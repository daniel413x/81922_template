import React from 'react';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  adminRoutes,
  NESTED_ADMIN_ROUTE,
  ADMIN_ROUTE,
  USERS_ROUTE,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';

function Admin() {
  return (
    <Container id="admin">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={ADMIN_ROUTE}>
            Index
          </NavLink>
          <NavLink className="btn btn-primary" to={NESTED_ADMIN_ROUTE}>
            NESTED_ADMIN_ROUTE
          </NavLink>
          <NavLink className="btn btn-primary" to={USERS_ROUTE}>
            USERS_ROUTE
          </NavLink>
        </Col>
        <Col className="right-col">
          <AppRouter
            authedRoutes={adminRoutes}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
