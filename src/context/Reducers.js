export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.name !== action.payload.name),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.name === action.payload.name ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_SEARCH":
      return { ...state, bySearch: action.payload };
    case "FILTER_BY_SEARCH_BAR":
      return { ...state, bySearchInBar: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        bySearch: "",
        bySearchInBar: ""
      };
    default:
      return state;
  }
};
