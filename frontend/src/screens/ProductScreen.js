import React from "react";
import products from "../products";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
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
            <ListGroupItem>
              <Button
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
    </>
  );
};

export default ProductScreen;
