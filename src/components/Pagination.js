import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions";

const Paginate = ({ page }) => {
  const history = useHistory();
  const path = useLocation().pathname;
  const numberOfPages = useSelector((state) => state.totalPages);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (page) dispatch(getProducts(path.substring(1), page, null));
  }, [dispatch, page]);
  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          onClick={() => history.push(`${path}?page=${item.page}`)}
        />
      )}
    />
  );
};
export default Paginate;
