import { CartState } from "../../context/Context";
import React, { useState, useEffect } from "react";
import axios from '../../api/axios';
import { Link, useNavigate } from "react-router-dom";
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

  const [editClicked, setEditClicked] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    const inputStateMap = {
      name: setName,
      price: setPrice,
      stock: setStock,
    };

    const stateUpdater = inputStateMap[name];
    if (stateUpdater) {
      stateUpdater(value);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };  

  const handleEditClick = (product) => {
    setEditedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setImage(product.imageURL)
    setEditClicked(true);
  }

  const handleSaveChanges = async (productId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('_id', productId);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('image', image);
    axios
      .put("/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setLoading(false);
      setSuccessMessage("Product Updated Successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setErrorMessage("Failed to update product.");
      setTimeout(() => {
        setErrorMessage("");
        window.location.reload();
      }, 1500);
    }
  };  

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
            {editedProduct._id === product._id ? (
              // Show input fields when editing the product
              <div className="flex flex-col justify-between items-center bg-slate-50 rounded-sm p-3 w-full">
                <img src={product.imageURL} alt={`${product.name}`} className="h-20 w-20" />
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
                <input
                  value={name}
                  name="name"
                  onChange={handleChange}
                />
                <input
                  value={price}
                  name="price"
                  onChange={handleChange}
                />
                <input
                  value={stock}
                  name="stock"
                  onChange={handleChange}
                />
                <div className="mb-3">
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    onClick={() => handleSaveChanges(product._id)}
                  >
                    Save Changes
                  </button>
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    onClick={() => setEditedProduct({})}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Show product details when not editing the product
              <div className="flex flex-row justify-between items-center bg-slate-50 rounded-sm p-3 w-full">
                <img src={product.imageURL} alt={`${product.name}`} className="h-20 w-20" />
                <p>{product.name}</p>
                <p>${product.price}</p>
                <p>{product.stock} in stock</p>
                <div className="mb-3">
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaRegEdit className="text-2xl" />
                  </button>
                  <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    onClick={() => handleDeleteClick(product.name)}
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })
    )}
  </div>
);
}

export default ManageProducts;