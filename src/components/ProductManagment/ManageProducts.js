import { CartState } from "../../context/Context";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function ManageProducts() {
  const { state: { products: initialProducts } } = CartState();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addProductClick, setAddProductClick] = useState(false);
  const [editProductClick, setEditProductClick] = useState(false);
  const [editProductIndexes, setEditProductIndexes] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then(function (response) {
        console.log(response);
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

  const handleAddProductClick = () => {
    setAddProductClick(!addProductClick);
  }

  const handleEditProductClick = (productIndex) => {
    setEditProductIndexes(prevIndexes => {
      const updatedIndexes = [...prevIndexes];
      updatedIndexes[productIndex] = !updatedIndexes[productIndex];
      return updatedIndexes;
    });
    setEditProductClick(!editProductClick)
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
      {!editProductClick && (
        <div className="flex flex-row justify-between mx-10 md:mx-20 my-2">
          <div className="lg:ml-auto mt-3">
            <button className={`bg-slate-100 p-1 rounded-sm hover:bg-slate-200 ${addProductClick && 'px-3'}`} onClick={handleAddProductClick}>
              {!addProductClick ? "Add Product" : "Back"}
            </button>
          </div>
        </div>
      )}

      <div>
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
            <div className="lds-ring-general"><div></div><div></div><div></div><div></div></div>
          </div>
        )
        }
        {addProductClick ? (
          <AddProduct />
          ) : editProductIndexes.some(index => index) ? (
          products.map((product, i) => (
            editProductIndexes[i] && <EditProduct key={i} product={product} />
          ))
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 md:mx-20 mt-4">
            {products.map((product, i) => (
              <div key={i} className="mb-4 hover:shadow-sm bg-slate-50">
                <div className="flex flex-col items-center justify-between rounded-sm p-3">
                    <img src={product.imageURL} alt={product.name} className="h-20 w-20 mb-2" />
                    <p className="text-lg md:text-md text-center">{product.name}</p>
                    <p className="text-lg md:text-sm">${product.price}</p>
                    <p className="text-lg md:text-sm">{product.stock} in stock</p>
                  <div className="mt-2 flex">
                    <button className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm" onClick={() => handleEditProductClick(i)}>
                      <FaRegEdit className="text-3xl md:text-2xl" />
                    </button>
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
