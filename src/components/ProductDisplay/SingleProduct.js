import { CartState } from "../../context/Context";
import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="max-w-sm sm:max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-200 flex flex-col justify-between">
      <div className="w-full h-40 md:w-full md:h-60 lg:w-full lg:h-80">
        <Link
          to="/SingleProductPage"
          className="no-underline text-black"
          state={{ prod: prod }}
        >
          <img
            src={prod.imageURL}
            alt={prod.name}
            className="object-cover w-full h-full hover:cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between p-3 sm:p-5">
        <Link
          to="/SingleProductPage"
          className="no-underline text-black"
          state={{ prod: prod }}
        >
          <div className="mb-3">
            <h5 className="text-sm sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
              {prod.name}
            </h5>
            <p className="text-lg sm:text-base font-semibold text-black">
              ${prod.price}
            </p>
            <p
              className={
                prod.stock
                  ? "text-sm sm:text-base my-2 font-normal text-green-600"
                  : "text-sm sm:text-base my-2 font-normal text-red-600"
              }
            >
              {prod.stock} In Stock
            </p>
          </div>
        </Link>
        <div
          id="inStock-addToCart"
          className="flex items-center justify-between"
        >
          {cart.some((p) => p.name === prod.name) ? (
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
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
              disabled={!prod.stock}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              href="#"
              className={`inline-flex items-center px-2 py-2 text-xs sm:text-sm font-medium text-center text-white rounded-md ${
                !prod.stock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            >
              {!prod.stock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;