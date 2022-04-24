import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate as useHistory } from "react-router-dom";
import {
  Button,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`, { state: { id: id, qty: qty } });
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem as="h3">{product.name}</ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroupItem>
              <ListGroupItem>{product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroupItem>{product.price}</ListGroupItem>
              <ListGroupItem>
                {product.countInStock === 0 ? "Out of Stock" : "In stock"}
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Col>Qty</Col>
                  <Col>
                    <FormControl
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  className="btn btn-dark"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
