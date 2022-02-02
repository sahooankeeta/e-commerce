import * as React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Products from "./../Products/Products";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "./../Pagination";
import { getProducts } from "./../../actions";
import useStyles from "./styles";
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const t = useLocation().pathname.substring(1);
  console.log(useLocation());
  const [sort, setSort] = React.useState();
  // React.useEffect(() => {
  //   dispatch(getProducts(t, 1, null));
  // }, [dispatch, t]);

  const formOpen = () => {
    history.push("/form");
  };
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page") || 1;
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Paper>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Button variant="contained" onClick={formOpen}>
                    add
                  </Button>
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      sort by price
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <FormControlLabel
                        value="asc"
                        control={<Radio />}
                        label="low-to-high"
                      />
                      <FormControlLabel
                        value="desc"
                        control={<Radio />}
                        label="high-to-low"
                      />
                    </RadioGroup>
                    <Button
                      variant="contained"
                      disabled={sort ? false : true}
                      onClick={() => {
                        console.log(sort);
                        dispatch(getProducts(t, sort));
                      }}
                    >
                      sort
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Pagination page={page} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Products />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
