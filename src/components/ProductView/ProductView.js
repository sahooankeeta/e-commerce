import * as React from "react";
import * as actionType from "./../../helpers/constants";
import axios from "axios";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import useStyles from "./styles.js";
import { getProduct } from "./../../actions";
const ProductView = () => {
  const history = useHistory();
  const { isLoading, product, products, cart } = useSelector((state) => state);

  const [inBag, setInBag] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    //console.log("in");
    if (id) {
      dispatch(getProduct(id));
      if (cart.some((item) => item.id === id)) setInBag(true);
      else setInBag(false);
    }
  }, [dispatch, id]);

  const [index, setIndex] = React.useState(0);
  const [size, setSize] = React.useState("");
  //console.log("bag", inBag);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const toggleCart = () => {
    if (inBag) {
      dispatch({ type: actionType.REMOVE_FROM_CART, payload: id });

      setInBag(false);
    } else {
      dispatch({
        type: actionType.ADD_TO_CART,
        payload: {
          id: product.id,
          company: product.company,
          title: product.title,
          price: +product.price,
          qty: 1,
          size: size,
          image: product.images[0],
        },
      });

      setInBag(true);
    }
  };

  let recommendedProducts = products?.filter((item) => item.id !== id);
  recommendedProducts = recommendedProducts.slice(0, 4);
  //console.log(recommendedProducts);
  //console.log(products);
  if (!product) return null;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  //console.log(product);
  return (
    <main>
      <Grid container alignItems="stretch" spacing={5}>
        <Grid item sm={12}>
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
                  <Typography>{product["description"]}</Typography>
                </Grid>
                <Grid item lg={12} sm={12} md={12}>
                  <Typography variant="h4">
                    Rs.
                    <NumberFormat
                      displayType="text"
                      value={product.price}
                      thousandSeparator={true}
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={12}
                  sm={12}
                  md={12}
                  style={{ display: "flex", alignItems: "column" }}
                >
                  {!inBag && (
                    <FormControl
                      sx={{ m: 1, minWidth: 150 }}
                      style={{ margin: "0", marginRight: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Size
                      </InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Size"
                        onChange={(e) => setSize(e.target.value)}
                      >
                        <MenuItem value="XS">XS</MenuItem>
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  <Button
                    variant="contained"
                    disabled={inBag || size ? false : true}
                    onClick={toggleCart}
                  >
                    {inBag ? "remove from bag" : "add to bag"}
                  </Button>
                </Grid>
                <Grid item>
                  <Grid container rowSpacing={1} columnSpacing={2}>
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <Grid item md={6} xs={12} lg={6}>
                          <Typography variant="h6">{key}</Typography>
                          <Divider />
                          <Typography>{value}</Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h3" gutterBottom>
            Recommended Products
          </Typography>
          <Grid container alignItems="stretch" spacing={3}>
            {recommendedProducts.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Card
                  className={classes.card}
                  onClick={() => history.push(`/product/${item.id}`)}
                >
                  <div className={classes.cardAction}>
                    <CardMedia
                      className={classes.media}
                      alt=""
                      component="img"
                      image={item.images[0]}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom style={{ fontWeight: "600" }}>
                        {item.company}
                      </Typography>
                      <Typography gutterBottom style={{ flex: "1" }}>
                        {item.title}
                      </Typography>
                      <Typography style={{ fontWeight: "600" }}>
                        Rs . {item.price}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};
export default ProductView;
