import * as React from "react";
import Grid from "@mui/material/Grid";
import { useHistory, useParams, useLocation } from "react-router-dom";

import Product from "./Product/Product";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";
import { getProducts } from "./../../actions";
const Products = ({ t, page, sort }) => {
  const classes = useStyles();
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  React.useEffect(() => {
    dispatch(getProducts(t, page, sort));
  }, [dispatch, t, page]);

  if (error) return <div>{error}</div>;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  localStorage.setItem("products", JSON.stringify(products));
  return (
    <main className={classes.content}>
      <Grid container alignItems="stretch" spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Grid>
          ))
        ) : (
          <div>no items</div>
        )}
      </Grid>
    </main>
  );
};
export default Products;
