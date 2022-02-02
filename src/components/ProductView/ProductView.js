import * as React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useStyles from "./styles.js";
import { getProduct } from "./../../actions";
const ProductView = () => {
  const { isLoading, product } = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    console.log("in");
    if (id) dispatch(getProduct(id));
  }, [dispatch, id]);

  //console.log(isLoading, product);
  const [inBag, setInBag] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const toggleCart = () => {
    if (inBag) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });

      setInBag(false);
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: product.id,
          company: product.company,
          title: product.title,
          price: product.price,
          qty: 1,
          image: product.images[0],
        },
      });

      setInBag(true);
    }
  };
  if (!product) return null;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  return (
    <main>
      <Grid container>
        <Grid item sm={12} lg={6} position="realtive">
          <Carousel
            interval={null}
            activeIndex={index}
            onSelect={handleSelect}
            className={classes.carousel}
          >
            {product.images.map((image, i) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.title}-i`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
        <Grid item sm={12} lg={4} padding="0 15px">
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12}>
              <Typography variant="h4" component="div">
                {product.company}
              </Typography>
            </Grid>
            <Grid item lg={12} sm={12} md={12}>
              <Stack
                spacing={2}
                direction="row"
                component="div"
                display="flex"
                alignItems="center"
              >
                <Typography variant="h4">{product.rating}</Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.1}
                  readOnly
                />
              </Stack>
            </Grid>
            <Grid item lg={12} sm={12} md={12}>
              <Typography variant="h5" component="div" gutterBottom>
                {product.title}
              </Typography>
              <Divider />
            </Grid>

            <Grid item lg={12} sm={12} md={12}>
              <Typography>{product["product description"]}</Typography>
            </Grid>
            <Grid item lg={12} sm={12} md={12}>
              <Typography variant="h4">Rs. {product.price}</Typography>
            </Grid>
            <Grid item lg={12} sm={12} md={12}>
              <Button variant="contained" onClick={toggleCart}>
                {inBag ? "remove from bag" : "add to bag"}
              </Button>
            </Grid>
            <Grid item>
              <Grid container rowSpacing={1} columnSpacing={2}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item md={6} xs={12} lg={6}>
                    <Typography variant="h6">{key}</Typography>
                    <Divider />
                    <Typography>{value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>recommendations</Grid>
      </Grid>
    </main>
  );
};
export default ProductView;
