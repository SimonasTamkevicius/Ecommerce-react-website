import { CartState } from "../../context/Context";
import React, { useState, useEffect } from "react";
import axios from '../../api/axios';
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

function ManageProducts() {
  const {
    state: { products: initialProducts },
  } = CartState();

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
  
  const handleDeleteClick = (productName) => {
    console.log(productName);
    axios
      .delete('/products', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          name: productName
        }
      })
      .then(function (response) {
        setLoading(false);
        console.log(response.data);
        setSuccessMessage("Product Deleted Successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload();
        }, 1500);
      })
      .catch(function (error) {
        setLoading(false);
        console.error('Error:', error);
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage("");
          window.location.reload();
        }, 1500);
      });  
  };

return (
  <div className="flex flex-col">
    {successMessage.length > 0 ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
        <p className="text-white text-xl">{successMessage}</p>
      </div>
    ) : null}
    {errorMessage.length > 0 ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
        <p className="text-white text-xl">{errorMessage}</p>
      </div>
    ) : null}
    <Link to="/UserProfile" className="no-underline text-black ml-20 mt-3">
      <p className="text-sm">User Profile</p>
    </Link>
    <div className="flex flex-row justify-between items-center pt-3">
      <h1 className="pl-20">Manage Products</h1>
      <Link to="/AddProduct" className="no-underline text-black pr-20">
          <button className="bg-slate-100 p-1 rounded-sm hover:bg-slate-200">Add Product</button>
      </Link>
    </div>
    {loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
        <p className="text-white text-xl">Loading...</p>
      </div>
    ) : (
      products.map((product, i) => {
        return (
          <div key={i} className="flex flex-row justify-start items-center mt-5 pl-20 space-x-2 w-2/3">
              <div className="flex flex-row justify-between items-center bg-slate-50 rounded-sm p-3 w-full">
                <img src={product.imageURL} alt={`${product.name}`} className="h-20 w-20" />
                <p>{product.name}</p>
                <p>${product.price}</p>
                <p>{product.stock} in stock</p>
                <div className="mb-3">
                <Link to="/EditProduct" state={{product: product}} className="no-underline text-black">
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                  >
                    <FaRegEdit className="text-2xl" />
                  </button>
                </Link>
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    onClick={() => handleDeleteClick(product.name)}
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </div>
              </div>
          </div>
        );
      })
    )}
  </div>
);
}

export default ManageProducts;