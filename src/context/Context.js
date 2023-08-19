import React, { useState, useEffect, useReducer, createContext, useContext } from "react";
import { cartReducer, productReducer } from "./Reducers";
import axiosInstance from "../api/axiosInstance";

const Cart = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: JSON.parse(sessionStorage.getItem("cart")) || [], // Load cart from session storage
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    bySearch: "",
    bySearchInBar: ""
  });

  const clearSession = () => {
    sessionStorage.removeItem("cart");
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    // Save the cart to session storage whenever it changes
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch, clearSession }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
