import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Overview } from "./Overview/Overview";
import { Checkout } from "./Checkout/Checkout";
import { Details } from "./Details";
import { OrderCompleted } from "./OrderCompleted/OrderCompleted";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border-bottom: 1px solid #d0d1d3;
`;

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shopping-cart">ShoppingCart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/order-completed">Order Completed</Link>
            </li>
            <li>
              <Link to="/pokemon/1">Detail page 1</Link>
            </li>
          </ul>
        </nav>
        <Title>Pokemon ecommerce</Title>
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/order-completed">
            <OrderCompleted />
          </Route>
          <Route path="/pokemon/:id">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
