import { Header, Home, ProductView, Form, Cart } from "./components";
import * as React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Header
          items={useSelector((state) => {
            localStorage.setItem("cart", JSON.stringify(state.cart));
            return state.cart.length;
          })}
        />
        <ToastContainer />

        <Switch>
          <Route path="/" exact component={() => <Redirect to="/products" />} />
          <Route path="/products/" strict component={Home} />
          <Route path="/products" exact component={Home} />

          <Route path="/product/:id" exact component={ProductView} />
          <Route path="/myBag" exact component={Cart} />
          <Route path="/form" exact component={Form} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default App;
