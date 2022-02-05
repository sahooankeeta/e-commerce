import * as React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./../../actions";
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

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const t = useLocation().pathname.substring(1);
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page") || 1;
  const [sort, setSort] = React.useState("");

  const formOpen = () => {
    history.push("/form");
  };

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
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Button variant="contained" onClick={formOpen}>
                  add new product
                </Button>
              </Grid>
              <Grid item sm={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    sort by price
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      setSort(e.target.value);
                      return dispatch(getProducts(t, page, e.target.value));
                    }}
                    //onChange={(e) => setSort(e.target.value)}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="none"
                    />
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
                </FormControl>
              </Grid>
              <Grid item>
                <Pagination page={page} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Products sort={sort} t={t} page={page} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
