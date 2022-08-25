import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
