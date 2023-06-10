import { CartState } from '../context/Context';
import React from 'react';

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="max-w-sm sm:max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-200">
      <a href="/">
        <img src={prod.image} alt={prod.name} className="mb-2 w-full h-auto" />
      </a>
      <div className="p-3 sm:p-5">
        <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {prod.name}
        </h5>
        <p className="mb-3 text-lg sm:text-base font-semibold text-black">
          ${prod.price}
        </p>
        <p className="mb-3 text-sm sm:text-base font-normal text-gray-500">
            {prod.inStock} In Stock
        </p>
        {cart.some((p) => p.id === prod.id) ? (
          <button
            onClick={() =>
              dispatch({
                type: 'REMOVE_FROM_CART',
                payload: prod,
              })
            }
            href="#"
            className="inline-flex items-center px-2 py-2 text-xs sm:text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            disabled={!prod.inStock}
            onClick={() =>
              dispatch({
                type: 'ADD_TO_CART',
                payload: prod,
              })
            }
            href="#"
            className={`inline-flex items-center px-2 py-2 text-xs sm:text-sm font-medium text-center text-white rounded-md ${
              !prod.inStock
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            }`}
          >
            {!prod.inStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
