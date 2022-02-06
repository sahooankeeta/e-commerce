import notify from "../helpers/notify";
import * as actionType from "./../helpers/constants";
const api = actionType.URL;
//FETCH PRODUCTS
export const getProducts = (path, page, sort) => (dispatch) => {
  const temp = path.split("/");

  const link = sort
    ? `${api}/${temp[0]}?_sort=price&_order=${sort}${
        temp[1] ? `&gender=${temp[1]}` : ""
      }${temp[2] ? `&category=${temp[2]}` : ""}&_page=${page}`
    : `${api}/${temp[0]}?${temp[1] ? `&gender=${temp[1]}` : ""}${
        temp[2] ? `&category=${temp[2]}` : ""
      }&_page=${page}`;
  dispatch({ type: actionType.SET_LOADING, payload: true });
  fetch(link)
    .then((res) => {
      dispatch({
        type: actionType.SET_TOTAL_PAGES,
        payload: Math.ceil(res.headers.get("x-total-count") / 10),
      });
      return res.json();
    })
    .then(
      (data) => {
        dispatch({
          type: actionType.GET_PRODUCTS,
          payload: { products: data },
        });
        dispatch({ type: actionType.SET_LOADING, payload: false });
      },
      (error) => {
        dispatch({ type: actionType.SET_ERROR, payload: error.message });
        dispatch({ type: actionType.SET_LOADING, payload: false });
      }
    );
};

//FETCH A SNGLE PRODUCTS
export const getProduct = (id) => (dispatch) => {
  dispatch({ type: actionType.SET_LOADING, payload: true });
  fetch(`${api}/products/${id}`)
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: actionType.GET_PRODUCT, payload: { product: data } });

        dispatch({ type: actionType.SET_LOADING, payload: false });
      },
      (error) => {
        dispatch({ type: actionType.SET_ERROR, payload: error.message });
        dispatch({ type: actionType.SET_LOADING, payload: false });
      }
    );
};

//ADD NEW PRODUCT
export const addProduct = (product) => (dispatch) => {
  notify("info", "please wait :)");
  dispatch({ type: actionType.SET_LOADING, payload: true });
  fetch(`${api}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: actionType.CREATE_PRODUCT, payload: data });
        dispatch({ type: actionType.SET_LOADING, payload: false });
        notify("success", "product added :)");
      },
      (error) => {
        dispatch({ type: actionType.SET_ERROR, payload: error.message });
        dispatch({ type: actionType.SET_LOADING, payload: false });
        notify("error", "sorry error occured retry :(");
      }
    );
};

//DELETE PRODUCT
export const deleteProduct = (id) => (dispatch) => {
  notify("info", "please wait for deletion");
  fetch(`${api}/products/${id}`, {
    method: "DELETE",
  });
  dispatch({ type: actionType.DELETE_PRODUCT, payload: id });

  notify("success", "product deleted :)");
};

//UPDATE PRODUCT
export const updateProduct = (product) => (dispatch) => {
  notify("info", "please wait for update");
  fetch(`${api}/products/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: actionType.UPDATE_PRODUCT, payload: data });

        notify("success", "product updated :)");
      },
      (error) => {
        console.log(error);
        dispatch({ type: actionType.SET_ERROR, payload: error.message });

        notify("error", "sorry error occured retry :(");
      }
    );
};
