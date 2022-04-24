import React, { useEffect } from "react";
import {
  Col,
  Image,
  ListGroupItem,
  Row,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const qty = state ? state.qty : 1;
  const prodid = state && state.id;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (prodid) {
      dispatch(addToCart(prodid, qty));
    }
  }, [dispatch, prodid, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          cartItems.map((item) => (
            <ListGroup>
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      rounded
                      fluid
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{`$${item.price}`}</Col>
                  <Col md={3}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button variant="light">
                      <i
                        className="fas fa-trash"
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      ></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          ))
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroupItem>
            <h3>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </h3>
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
          </ListGroupItem>
          <ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
