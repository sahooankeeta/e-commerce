import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };
  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };
  const deleteItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  return (
    <Grid
      container
      lg={6}
      className="cart-item"
      style={{ border: "2px solid grey", padding: "20px", margin: "0 auto" }}
    >
      <Grid item lg={3} className="left-block">
        <img alt="" src={product.image} style={styles.image} />
      </Grid>
      <Grid item className="right-block">
        <div>{product.company}</div>
        <div>{product.title}</div>
        <div>Rs {product.price}</div>
        <div
          className="cart-items-actions"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          qty :
          <Button
            variant="contained"
            style={{ margin: "0 10px" }}
            onClick={() => increaseQuantity(product.id)}
          >
            +
          </Button>
          <div> {product.qty}</div>
          <Button
            variant="contained"
            style={{ margin: "0 10px" }}
            onClick={() => decreaseQuantity(product.id)}
          >
            -
          </Button>
        </div>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => deleteItem(product.id)}
        >
          del
        </Button>
      </Grid>
    </Grid>
  );
};
const styles = {
  image: {
    height: 150,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};
export default CartItem;
