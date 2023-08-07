import React, { useEffect, useState } from 'react'
import { CartState } from "../../context/Context";
import axios from '../../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditProduct = (props) => {

    const {
        state: { products: initialProducts },
    } = CartState();

    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [editedProduct, setEditedProduct] = useState({});

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

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

    useEffect (() => {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setImage(product.imageURL)
        setLoading(false);
    }, [product.name, product.price, product.stock, product.imageURL])

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
            navigate("/ManageProducts")
          }, 1500);
        } catch (error) {
          setLoading(false);
          console.error('Error:', error);
          setErrorMessage("Failed to update product.");
          setTimeout(() => {
            setErrorMessage("");
            navigate("/ManageProducts")
          }, 1500);
        }
    };

  return (
    <div>
        <div className="ml-20">
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
        </div>
        {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
            <p className="text-white text-xl">Loading...</p>
        </div>
        ) : (null)}
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
                <Link to="/ManageProducts" className='no-underline text-black'>
                    <button
                    className="hover:cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
                    >
                    Cancel
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default EditProduct