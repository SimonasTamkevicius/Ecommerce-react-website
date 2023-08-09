import React, { useEffect, useState } from "react";
import { CartState } from "../../context/Context";
import SingleProduct from "./SingleProduct";
import Filters from "../Filters";
import axios from "../../api/axios";

const ItemsComponent = () => {
  const {
    state: { products: initialProducts },
    productState: { sort, byStock, bySearch },
  } = CartState();

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/products")
      .then(function (response) {
        setLoading(false);
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, [products]);

  const reorderProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.stock);
    }

    if (bySearch) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.includes(bySearch)
      );
    }

    if (sortedProducts.length === 0) {
      sortedProducts = [{ name: "Nothing matched your search" }];
    }

    return sortedProducts;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row pt-10 px-6 md:pr-14 md:pl-20 lg:px-12">
      <div className="w-full justify-center lg:w-1/6 bg-gray-200 p-4 md:mt-6 lg:ml-8 h-60 rounded-md">
        <Filters />
      </div>
      <div className="w-full lg:w-4/5 pt-4 md:pr-4 md:pl-4 md:pb-4 ml-0 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-16 justify-center">
            {reorderProducts().map((prod, i) => (
              <SingleProduct
                prod={prod}
                key={i}
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default ItemsComponent;
