import React from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import Filters from './Filters';

const ItemsComponent = () => {
  const {
    state: { products },
    productState: { sort, byStock, bySearch}
  } = CartState();

  const reorderProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (bySearch) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.includes(bySearch)
      );
    }

    return sortedProducts;
  };

  return (
    <div className='flex flex-col lg:flex-row pt-10 pr-14 pl-20 lg:px-12'>
      <div className='w-full lg:w-1/6 bg-gray-300 p-4 mt-14 lg:mt-0 lg:ml-8 h-60'>
        <Filters />
      </div>
      <div className='w-full lg:w-4/5 md:pr-4 md:pl-4 md:pb-4 ml-0 mb-8'>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-16 justify-center'>
          {reorderProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsComponent;
