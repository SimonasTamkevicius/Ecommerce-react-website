import React, { useReducer, createContext, useContext } from 'react';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();

const Context = ({ children }) => {
  const products = [
    {
      id: '1',
      name: 'Amethyst Elegance Necklace',
      price: 59.99,
      image: '/amethyst_necklace.jpg',
      inStock: 10,
    },
    {
      id: '2',
      name: 'Moonstone Serenity Bracelet',
      price: 29.99,
      image: '/moonstone_bracelet.webp',
      inStock: 5,
    },
    {
      id: '3',
      name: 'Rose Quartz Harmony Ring',
      price: 39.99,
      image: '/rose_quartz_ring.jpeg',
      inStock: 3,
    },
    {
      id: '4',
      name: 'Opal Enchantment Necklace',
      price: 79.99,
      image: '/opal_necklace.webp',
      inStock: 0,
    },
    {
      id: '5',
      name: 'Garnet Fire Ring',
      price: 49.99,
      image: '/garnet_ring.avif',
      inStock: 8,
    },
    {
      id: '6',
      name: 'Jade Serenade Bracelet',
      price: 34.99,
      image: '/jade_bracelet.jpg',
      inStock: 8,
    },
    {
      id: '7',
      name: 'Pearl Elegance Necklace',
      price: 69.99,
      image: '/pearl_necklace.webp',
      inStock: 8,
    },
    {
      id: '8',
      name: 'Sapphire Splendor Bracelet',
      price: 59.99,
      image: '/sapphire_bracelet.avif',
      inStock: 8,
    },
    {
      id: '9',
      name: 'Citrine Glow Necklace',
      price: 44.99,
      image: '/citrine_necklace.webp',
      inStock: 8,
    },
    {
      id: '10',
      name: 'Emerald Enchantment Bracelet',
      price: 79.99,
      image: '/emerald_bracelet.jpg',
      inStock: 8,
    },
    {
      id: '11',
      name: 'Aquamarine Serenity Ring',
      price: 54.99,
      image: '/aquamarine_ring.webp',
      inStock: 8,
    },
    {
      id: '12',
      name: 'Topaz Radiance Necklace',
      price: 49.99,
      image: '/topaz_necklace.jpg',
      inStock: 8,
    },
    {
      id: '13',
      name: 'Ruby Passion Bracelet',
      price: 39.99,
      image: '/ruby_bracelet.webp',
      inStock: 8,
    },
    {
      id: '14',
      name: 'Amber Glow Ring',
      price: 29.99,
      image: '/amber_ring.webp',
      inStock: 8,
    },
    {
      id: '15',
      name: 'Onyx Mystique Necklace',
      price: 64.99,
      image: '/onyx_necklace.jpg',
      inStock: 8,
    },
    {
      id: '16',
      name: 'Peridot Serenade Bracelet',
      price: 34.99,
      image: '/peridot_bracelet.avif',
      inStock: 0,
    },
    {
      id: '17',
      name: 'Tourmaline Harmony Ring',
      price: 44.99,
      image: '/tourmaline_ring.jpeg',
      inStock: 8,
    },
    {
      id: '18',
      name: 'Coral Elegance Necklace',
      price: 54.99,
      image: '/coral_necklace.jpg',
      inStock: 8,
    },
    {
      id: '19',
      name: 'Turquoise Splendor Bracelet',
      price: 39.99,
      image: '/turquoise_bracelet.jpg',
      inStock: 8,
    },
    {
      id: '20',
      name: 'Lapis Lazuli Serenity Ring',
      price: 59.99,
      image: '/lapis_lazuli_ring.webp',
      inStock: 0,
    },
  ];

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    bySearch: '',
  });

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
