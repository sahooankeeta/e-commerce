import { notify } from "../helpers";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
export const getProducts = (path, page, sort) => (dispatch) => {
  const temp = path.split("/");
  const link = sort
    ? `http://localhost:5000/${
        temp[0]
      }?_page=${page}&_sort=price&_order=${sort}${
        temp[1] ? `&gender=${temp[1]}` : ""
      }${temp[2] ? `&category=${temp[2]}` : ""}`
    : `http://localhost:5000/${temp[0]}?_page=${page}${
        temp[1] ? `&gender=${temp[1]}` : ""
      }${temp[2] ? `&category=${temp[2]}` : ""}`;
  dispatch({ type: SET_LOADING, payload: true });
  fetch(link)
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: GET_PRODUCTS, payload: { products: data } });
        dispatch({ type: SET_LOADING, payload: false });
      },
      (error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_LOADING, payload: false });
      }
    );
};
// export const getSortedProducts = (path, sort) => (dispatch) => {
//   const temp = path.split("/");

//   dispatch({ type: SET_LOADING, payload: true });
//   fetch(

//   )
//     .then((res) => res.json())
//     .then(
//       (data) => {
//         console.log(data);
//         dispatch({ type: GET_PRODUCTS, payload: data });
//         dispatch({ type: SET_LOADING, payload: false });
//       },
//       (error) => {
//         dispatch({ type: SET_ERROR, payload: error.message });
//         dispatch({ type: SET_LOADING, payload: false });
//       }
//     );
// };
export const getProduct = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  fetch(`http://localhost:5000/products/${id}`)
    .then((res) => res.json())
    .then(
      (data) => {
        //console.log(id, data);
        dispatch({ type: GET_PRODUCT, payload: { product: data } });

        dispatch({ type: SET_LOADING, payload: false });
      },
      (error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_LOADING, payload: false });
      }
    );
};
export const addProduct = (product) => (dispatch) => {
  notify("info", "please wait :)");
  dispatch({ type: SET_LOADING, payload: true });
  fetch("http://localhost:5000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: "CREATE_PRODUCT", payload: data });
        dispatch({ type: SET_LOADING, payload: false });
        notify("success", "product added :)");
      },
      (error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_LOADING, payload: false });
        notify("error", "sorry error occured retry :(");
      }
    );
};
export const deleteProduct = (id) => (dispatch) => {
  notify("info", "please wait for deletion");
  fetch(`http://localhost:5000/products/${id}`, {
    method: "DELETE",
  });
  dispatch({ type: "DELETE_PRODUCT", payload: id });

  notify("success", "product deleted :)");
};
export const updateProduct = (product) => (dispatch) => {
  notify("info", "please wait for update");
  fetch(`http://localhost:5000/products/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        dispatch({ type: "UPDATE_PRODUCT", payload: data });

        notify("success", "product updated :)");
      },
      (error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error.message });

        notify("error", "sorry error occured retry :(");
      }
    );
};
