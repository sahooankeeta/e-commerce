import React from "react";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NumberFormat from "react-number-format";
import * as actionType from "./../../../helpers/constants";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //UPDATE SIZE OF PRODUCT IN CART
  const updateSize = (productId, productSize) => {
    dispatch({
      type: actionType.UPDATE_CART,
      payload: { id: productId, size: productSize },
    });
  };
  //INCREASE ITEM QUANTITY
  const increaseQuantity = (id) => {
    dispatch({ type: actionType.INCREASE_QUANTITY, payload: id });
  };
  //DECREASE ITEM QUANTITY
  const decreaseQuantity = (id) => {
    dispatch({ type: actionType.DECREASE_QUANTITY, payload: id });
  };
  //REMOVE ITEM FROM CART
  const deleteItem = (id) => {
    dispatch({ type: actionType.REMOVE_FROM_CART, payload: id });
  };
  return (
    <Paper>
      <div className={classes.cartItem}>
        <div className={classes.leftBlock}>
          <img alt="" src={product.image} className={classes.cartImage} />
        </div>
        <div className={classes.rightBlock}>
          <h5>{product.company}</h5>
          <h6>{product.title}</h6>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", fontWeight: "500" }}>
              Size:
            </span>
            <FormControl
              sx={{ m: 1, minWidth: 80 }}
              style={{ margin: "0", marginRight: "10px" }}
            >
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.size}
                label="Size"
                onChange={(e) => updateSize(product.id, e.target.value)}
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
          </div>
          <h5 style={{ fontWeight: "500", margin: "5px 0" }}>
            <span>Rs. </span>
            <NumberFormat
              value={product.price}
              displayType="text"
              thousandSeparator={true}
            />
          </h5>
          <div className={classes.cartItemActions}>
            Qty :
            <Button
              variant="contained"
              style={{ margin: "0 10px" }}
              onClick={() => decreaseQuantity(product.id)}
            >
              -
            </Button>
            <div> {product.qty}</div>
            <Button
              variant="contained"
              style={{ margin: "0 10px" }}
              onClick={() => increaseQuantity(product.id)}
            >
              +
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              style={{ marginRight: "15px" }}
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => history.push(`/product/${product.id}`)}
            >
              view
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => deleteItem(product.id)}
            >
              del
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CartItem;
