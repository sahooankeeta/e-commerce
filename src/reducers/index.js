const initialState = {
  products: [],
  cart: [],
  isLoading: false,
  error: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload.product,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "ADD_TO_CART":
      return { ...state, cart: [action.payload, ...state.cart] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.qty > 0
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export default reducer;
