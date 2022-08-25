import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant={"danger"}>Invalid email/password</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" varian="primary">
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
