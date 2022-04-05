import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Products";
import { listProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  // const products = [];
  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
