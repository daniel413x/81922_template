import React from 'react';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import {
  NavLink,
} from 'react-router-dom';
import {
  NESTED_ACCOUNT_ROUTE_ONE,
  accountRoutes,
  NESTED_ACCOUNT_ROUTE_TWO,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';

function Account() {
  return (
    <Container id="account">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={NESTED_ACCOUNT_ROUTE_ONE}>
            ROUTE_ONE
          </NavLink>
          <NavLink className="btn btn-primary" to={NESTED_ACCOUNT_ROUTE_TWO}>
            ROUTE_TWO
          </NavLink>
        </Col>
        <Col className="right-col">
          <AppRouter
            authedRoutes={accountRoutes}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
