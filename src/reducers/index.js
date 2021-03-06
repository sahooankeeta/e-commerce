import * as actionType from "./../helpers/constants";

const initialState = {
  products: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS: //FETCH ALL PRODUCTS
      return {
        ...state,
        products: action.payload.products,
      };
    case actionType.SET_TOTAL_PAGES: //HANDLE TOTAL PAGES
      return {
        ...state,
        totalPages: action.payload,
      };

    case actionType.GET_PRODUCT: //FETCH A SINGLE PRODUCT
      return {
        ...state,
        product: action.payload.product,
      };
    case actionType.SET_LOADING: //HANDLE LOADING EVENT
      return { ...state, isLoading: action.payload };
    case actionType.SET_ERROR:
      return { ...state, error: action.payload };

    case actionType.ADD_TO_CART: //ADD PRODUCT TO CART
      return {
        ...state,
        cart: [action.payload, ...state.cart],
        product: { ...state.product, inCart: true },
      };
    case actionType.REMOVE_FROM_CART: //REMOVE PRODUCT FROM CART
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        product: { ...state.product, inCart: false },
      };
    case actionType.UPDATE_CART: //UPDATE PRODUCT IN CART
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, size: action.payload.size }
            : item
        ),
      };
    case actionType.INCREASE_QUANTITY: //INCREASE ITEM QUANTITY
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case actionType.DECREASE_QUANTITY: //DECREASE ITEM QUANTITY
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    case actionType.CREATE_PRODUCT: //CREATE A NEW PRODUCT
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case actionType.UPDATE_PRODUCT: //UPDATE AN EXISTING PRODUCT
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case actionType.DELETE_PRODUCT: //DELETE A PRODUCT
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export default reducer;
