import * as React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import Grid from "@mui/material/Grid";
const Cart = () => {
  const products = useSelector((state) => state.cart);
  const total = () => {
    let cartcount = 0;
    products.forEach((el) => (cartcount += el.price * el.qty));
    return cartcount;
  };
  return (
    <Grid container className="cart" spacing={2}>
      <Grid item lg={12}>
        {products.length > 0 ? (
          products.map((product) => {
            return <CartItem product={product} key={product.id} />;
          })
        ) : (
          <div>your bag empty</div>
        )}
      </Grid>
      <Grid item lg={12} style={{ margin: "0 auto" }}>
        <div>bag total :{total()}</div>
      </Grid>
    </Grid>
  );
};

export default Cart;
