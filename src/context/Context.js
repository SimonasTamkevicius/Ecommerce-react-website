import React, { useReducer, createContext, useContext } from 'react';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();

const Context = ({ children }) => {
  const products = [
    {
      id: '1',
      name: 'Bracelet',
      price: 9.99,
      image: '/beadBracelet.jpg.webp',
      inStock: 10,
    },
    {
      id: '2',
      name: 'Gold necklace',
      price: 19.99,
      image: '/beadNecklace.jpg',
      inStock: 5,
    },
    {
      id: '3',
      name: 'Silver Ring',
      price: 14.99,
      image: 'beadRing.jpg.webp',
      inStock: 3,
    },
    {
      id: '4',
      name: 'Product 4',
      price: 7.99,
      image: '/beadBracelet.jpg.webp',
      inStock: 0,
    },
    {
      id: '5',
      name: 'Product 5',
      price: 12.99,
      image: '/beadNecklace.jpg',
      inStock: 8,
    },
    {
        id: '6',
        name: 'Product 6',
        price: 12.99,
        image: 'beadRing.jpg.webp',
        inStock: 8,
    },
    {
        id: '7',
        name: 'Product 7',
        price: 12.99,
        image: '/beadBracelet.jpg.webp',
        inStock: 8,
    },
    {
        id: '8',
        name: 'Product 8',
        price: 12.99,
        image: '/beadNecklace.jpg',
        inStock: 8,
    },
    {
        id: '9',
        name: 'Product 9',
        price: 12.99,
        image: 'beadRing.jpg.webp',
        inStock: 8,
    },
    {
        id: '10',
        name: 'Product 10',
        price: 12.99,
        image: '/beadBracelet.jpg.webp',
        inStock: 8,
    },
    {
        id: '11',
        name: 'Product 11',
        price: 12.99,
        image: '/beadNecklace.jpg',
        inStock: 8,
    },
    {
        id: '12',
        name: 'Product 12',
        price: 12.99,
        image: 'beadRing.jpg.webp',
        inStock: 8,
    },
    {
        id: '13',
        name: 'Product 13',
        price: 12.99,
        image: '/beadBracelet.jpg.webp',
        inStock: 8,
    },
    {
        id: '14',
        name: 'Product 14',
        price: 12.99,
        image: 'beadRing.jpg.webp',
        inStock: 8,
    },
    {
        id: '15',
        name: 'Product 15',
        price: 12.99,
        image: '/beadNecklace.jpg',
        inStock: 8,
    },
    {
        id: '16',
        name: 'Product 16',
        price: 12.99,
        image: '/beadBracelet.jpg.webp',
        inStock: 0,
    },
    {
        id: '17',
        name: 'Product 17',
        price: 12.99,
        image: '/beadNecklace.jpg',
        inStock: 8,
    },
    {
        id: '18',
        name: 'Product 18',
        price: 12.99,
        image: '/beadNecklace.jpg',
        inStock: 8,
    },
    {
        id: '19',
        name: 'Product 19',
        price: 12.99,
        image: '/beadBracelet.jpg.webp',
        inStock: 8,
    },
    {
      id: '20',
      name: 'Product 20',
      price: 29.99,
      image: '/beadNecklace.jpg',
      inStock: 0,
    },
  ];

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    bySearch: "",
  })

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
