import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions";
//import useStyles from "./styles";
const Paginate = ({ page }) => {
  //const { numberOfPages } = useSelector((state) => state.numberOfPages);
  const numberOfPages = 5;
  // console.log("pages", numberOfPages);
  //const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (page) dispatch(getProducts("products", page, null));
  }, [dispatch, page]);
  return (
    <Pagination
      //className={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/products?page=${item.page}`}
        />
      )}
    />
  );
};
export default Paginate;
