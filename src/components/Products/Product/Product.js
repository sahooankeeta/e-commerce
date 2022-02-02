import * as React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "./../../../actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import useStyles from "./styles";

import { Button, CardActions } from "@mui/material";
const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const viewProduct = () => history.push(`/product/${product.id}`);
  const editProduct = () => {
    history.push(`/form?id=${product.id}`);
  };
  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <Card className={classes.card}>
      <div onClick={viewProduct} className={classes.cardAction}>
        <CardMedia
          className={classes.media}
          alt=""
          component="img"
          image={product.images[0]}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom style={{ fontWeight: "600" }}>
            {product.company}
          </Typography>
          <Typography gutterBottom style={{ flex: "1" }}>
            {product.title}
          </Typography>
          <Typography style={{ fontWeight: "600" }}>
            Rs . {product.price}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button onClick={() => editProduct()}>edit</Button>
        <Button onClick={() => removeProduct(product.id)}>delete</Button>
      </CardActions>
    </Card>
  );
};
export default Product;
