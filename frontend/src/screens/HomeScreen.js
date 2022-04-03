import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Products";
import { productList } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  const products = [];

  return (
    <>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
