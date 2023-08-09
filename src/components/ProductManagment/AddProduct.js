import React, { useState } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

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

    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('image', image);
    
      axios
        .post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          setLoading(false);
          console.log(response.data);
          setSuccessMessage("Product Added Successfully!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/ManageProducts");
          }, 1500);
        })
        .catch(function (error) {
          setLoading(false);
          setErrorMessage({error})
          setTimeout(() => {
            setErrorMessage("");
            navigate("/ManageProducts");
          }, 1500);
        });    
  };

  return (
    <div className='flex flex-col'>
      {loading && (
        // Show "loading..." message if loading state is true
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <p className="text-white text-xl">Loading...</p>
        </div>
      )}
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
      <div className='flex flex-row space-x-1 mt-3 ml-20'>
        <Link to="/UserProfile" className="no-underline text-black">
          <p className="text-xs">User Profile</p>
        </Link>
        <p className='text-xs'>/</p>
        <Link to="/ManageProducts" className="no-underline text-black">
          <p className="text-xs">Manage Products</p>
        </Link>
      </div>
      <div className='flex flex-col mx-20'>
        <h1>Add Product</h1>
        {/* Form */}
        <form className='pt-10 w-50 bg-slate-100 p-4' onSubmit={handleSubmit}>
          <label className='text-lg md:text-xl font-medium pb-2'>
            Product Name
          </label>
          <input
            required
            type='text'
            id='name'
            placeholder='Enter product name'
            name='name'
            value={name}
            onChange={handleChange}
            className='w-full px-4 py-2 mb-4 border-2 border-black'
          />
          <label className='text-lg md:text-xl font-medium pb-2'>
            Price
          </label>
          <input
            required
            type='number'
            id='price'
            placeholder='Enter price'
            name='price'
            value={price}
            onChange={handleChange}
            className='w-full px-4 py-2 mb-4 border-2 border-black'
          />
          <label className='text-lg md:text-xl font-medium pb-2'>
            Stock
          </label>
          <input
            required
            type='number'
            id='stock'
            placeholder='Enter total stock'
            name='stock'
            value={stock}
            onChange={handleChange}
            className='w-full px-4 py-2 mb-4 border-2 border-black'
          />
          <div className="mt-2">
              <label htmlFor="image" className="cursor-pointer text-black bg-slate-200 hover:bg-slate-300 transition-colors duration-100 ease-in-out px-1 py-1 mt-2 rounded">
              Select Image
              </label>
              <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              />
          </div>
          <div className='flex justify-end'>
            <button
              className='bg-black text-white text-lg px-8 py-2 hover:bg-gray-600'
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct