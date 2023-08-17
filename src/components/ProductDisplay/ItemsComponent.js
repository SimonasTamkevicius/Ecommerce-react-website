import React, { useEffect, useState } from "react";
import { CartState } from "../../context/Context";
import SingleProduct from "./SingleProduct";
import Filters from "../Filters";
import axios from "../../api/axios";
import { animateScroll as scroll } from "react-scroll";

const ItemsComponent = () => {
  const {
    state: { products: initialProducts },
    productState: { sort, byStock, bySearch },
  } = CartState();

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [numProducts, setNumProducts] = useState(0);
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

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
  }, []);

  useEffect(() => {
    const sortedProducts = reorderProducts();
    setNumProducts(sortedProducts.length);
    setCurrentPage(1);
  }, [sort, byStock, bySearch, products]);

  const reorderProducts = () => {
    let sortedProducts = [...products];

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
        prod.name.includes(bySearch) || prod.name.includes(bySearch.toLowerCase())
      );
    }

    if (sortedProducts.length === 0) {
      sortedProducts = [];
    }

    return sortedProducts;
  };

  const handlePageChange = (newPage) => {
    scroll.scrollToTop({
      duration: 0,
      smooth: "linear"
    });
    setCurrentPage(newPage);
  };

  const prods = reorderProducts();
  const totalPageCount = Math.ceil(prods.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, prods.length);
  const displayedProducts = prods.slice(startIndex, endIndex);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  return (
    <div className="flex flex-col lg:flex-row pt-10 px-6 md:pr-14 md:pl-20 lg:px-12">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <div className="lds-ring-general"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      <div className="w-full justify-center lg:w-1/6 bg-gray-200 p-4 md:mt-6 lg:ml-8 h-60 rounded-md">
        <Filters />
      </div>
      <div className="w-full lg:w-4/5 pt-4 md:pr-4 md:pl-4 md:pb-4 ml-0 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 justify-center">
          {displayedProducts.length === 0 ? <h3>No results found.</h3> : displayedProducts.map((prod, i) => (
            <SingleProduct prod={prod} key={i} />
          ))}
        </div>
        {totalPageCount > 1 && (
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-4">
              <button
                className={`${
                  isFirstPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-black"
                } px-2 py-1 rounded focus:outline-none`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {totalPageCount}
              </p>
              <button
                className={`${
                  isLastPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-black"
                } px-3 py-1 rounded focus:outline-none`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsComponent;
