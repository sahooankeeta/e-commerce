import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem/CartItem";
import Grid from "@mui/material/Grid";
const Cart = () => {
  const products = useSelector((state) => state.cart);
  localStorage.setItem("cart", JSON.stringify(products));
  //CALCULATE BAG TOTAL
  const total = () => {
    let cartcount = 0;
    products.forEach((el) => (cartcount += el.price * el.qty));
    return cartcount;
  };
  return (
    <Grid container className="cart" justifyContent="space-around">
      <Grid item sm={12} md={8} lg={5}>
        {products.length > 0 ? (
          products.map((product, i) => {
            return <CartItem product={product} key={`cartItem-${i}`} />;
          })
        ) : (
          <h3>Your bag empty.Start shopping now :)</h3>
        )}
      </Grid>
      <Grid item sm={12} md={3} lg={3}>
        <div style={{ margin: "0 auto" }}>
          <Typography variant="h3" style={{ textTransform: "capitalize" }}>
            bag total :
          </Typography>
          <Typography variant="h4">
            Rs .
            <NumberFormat
              value={total()}
              displayType="text"
              thousandSeparator={true}
            />
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Cart;
