import { CartState } from "../../context/Context";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

function ManageProducts() {
  const { state: { products: initialProducts } } = CartState();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axiosInstance
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

  const handleDeleteClick = (productName, imageName) => {
    console.log(productName);
    axiosInstance
      .delete('/products', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          name: productName,
          imageName: imageName
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
      {successMessage.length > 0 && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <p className="text-white text-xl">{successMessage}</p>
        </div>
      )}
      {errorMessage.length > 0 && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <p className="text-white text-xl">{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-row justify-between mx-20 my-2">
        <Link to="/UserProfile" className="no-underline text-black mt-4">
          <p className="text-sm">User Profile</p>
        </Link>
        <div className="lg:ml-auto mt-3">
          <Link to="/AddProduct" className="no-underline text-black">
            <button className="bg-slate-100 p-1 rounded-sm hover:bg-slate-200">Add Product</button>
          </Link>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center bg-gray-500 bg-opacity-80">
            <p className="text-white text-xl">Loading...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 mt-4">
            {products.map((product, i) => (
              <div key={i} className="mb-4 hover:shadow-sm">
                <div className="flex flex-col items-center justify-center bg-slate-50 rounded-sm p-3">
                  <img src={product.imageURL} alt={product.name} className="h-20 w-20 mb-2" />
                  <p className="text-lg md:text-md text-center">{product.name}</p>
                  <p className="text-lg md:text-sm">${product.price}</p>
                  <p className="text-lg md:text-sm">{product.stock} in stock</p>
                  <div className="mt-2 flex">
                    <Link to="/EditProduct" state={{ product: product }} className="no-underline text-black">
                      <button className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm">
                        <FaRegEdit className="text-3xl md:text-2xl" />
                      </button>
                    </Link>
                    <button
                      className="hover:cursor-pointer hover:bg-slate-100 p-1 ml-2 rounded-sm"
                      onClick={() => handleDeleteClick(product.name, product.imageName)}
                    >
                      <AiFillDelete className="text-3xl md:text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
