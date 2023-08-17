import { CartState } from "../../context/Context";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCheckmarkSharp } from "react-icons/io5"

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [numProducts, setNumProducts] = useState(0)
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const existingCartItem = cart.find((item) => item.name === prod.name);

  const handleAddClick = () => {
    setIsAdding(true);
    setNumProducts(numProducts + 1);

    setTimeout(() => {
      setIsAdding(false);

      if (existingCartItem) {
        dispatch({
          type: "CHANGE_CART_QTY",
          payload: {
            name: prod.name,
            qty: existingCartItem.qty + 1,
          },
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...prod, qty: 1 },
        });
      }

      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="max-w-sm sm:max-w-sm bg-white border border-gray-100 hover:shadow-md dark:bg-gray-200 flex flex-col justify-between">
      <div className="w-full h-40 md:w-full md:h-60 lg:w-full lg:h-60">
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
        <div id="inStock-addToCart" className="flex flex-row items-center justify-between">
          <button
            disabled={!prod.stock}
            onClick={!isAdding && !added ? handleAddClick : null}
            href="#"
            className={`inline-flex items-center px-2 py-2 text-xs sm:text-sm font-medium text-center text-white rounded-md ${
              !prod.stock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black focus:outline-none"
            }`}
          >
            {isAdding ? (
              <div className="flex flex-row">
                <div className="lds-ring-prod"><div></div><div></div><div></div><div></div></div>
                <p
                  style={{ verticalAlign: "middle", margin: 0 }}
                >
                  Adding...
                </p>
              </div>
            ) : (
              <div className="flex flex-row">
                {added ? (
                  <div className="flex flex-row">
                    <IoCheckmarkSharp className="text-xl" />
                    <p
                      style={{verticalAlign: "middle", marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 7}}
                    >
                      Added
                    </p>
                  </div>
                  ) : (
                    !prod.stock ? "Out of Stock" : "Add to Cart")
                }
              </div>
              
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
