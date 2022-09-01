import React from 'react';
import {
  Container,
  Col, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

function Menu() {
  return (
    <Container id="menu">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          {/* filter by ingredients: any ingredient added to the db such that you can make a checkbox filter list */}
          .left-col, List
        </Col>
        <Col className="right-col">
          right-col
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Menu);
