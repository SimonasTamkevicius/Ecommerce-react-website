import React from 'react';
import { CartState } from '../context/Context';

const Filters = () => {
  const {
    productDispatch,
    productState: { byStock, sort },
  } = CartState();

  return (
    <div className="flex flex-col">
      <span className="text-lg font-bold mb-3">Filter Products</span>
      <div className="flex items-center mb-3">
        <input
          type="radio"
          name="sort"
          id="lowToHigh"
          value="lowToHigh"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
          className="mr-2"
        />
        <label htmlFor="lowToHigh" className="text-md md:text-sm">
          Ascending
        </label>
      </div>
      <div className="flex items-center mb-3">
        <input
          type="radio"
          name="sort"
          id="highToLow"
          value="highToLow"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
          className="mr-2"
        />
        <label htmlFor="highToLow" className="text-md md:text-sm">
          Descending
        </label>
      </div>
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="includeOutOfStock"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
          className="mr-2"
        />
        <label htmlFor="includeOutOfStock" className="text-md md:text-sm">
          Include Out of Stock
        </label>
      </div>
      <div className='md:pt-3 relative'>
        <button
            className="px-4 py-2 text-md md:text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-400 transition-colors ease-in-out duration-200"
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTERS",
              })
            }
        >
            Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
