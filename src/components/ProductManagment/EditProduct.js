import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditProduct = () => {

    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [selectedImageName, setSelectedImageName] = useState('');

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        const inputStateMap = {
            name: setName,
            price: setPrice,
            stock: setStock,
            description: setDescription
        };

        const stateUpdater = inputStateMap[name];
        if (stateUpdater) {
            stateUpdater(value);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setSelectedImageName(file.name);
    };

    useEffect (() => {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setImage(product.imageURL);
        setLoading(false);
    }, [product.name, product.price, product.stock, product.description, product.imageURL])

    const handleSaveChanges = async (productId) => {
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append('_id', productId);
          formData.append('name', name);
          formData.append('price', price);
          formData.append('stock', stock);
          formData.append('description', description)
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
            window.location.reload();
          }, 1500);
        }
    };

    return (
        <div>
          <div>
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
            <div className='flex flex-row space-x-1 mt-3 ml-20'>
                <Link to="/UserProfile" className="no-underline text-black">
                <p className="text-xs">User Profile</p>
                </Link>
                <p className='text-xs'>/</p>
                <Link to="/ManageProducts" className="no-underline text-black">
                <p className="text-xs">Manage Products</p>
                </Link>
            </div>
            <h1 className='ml-20 pt-3'>Edit Product</h1>
          </div>
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
              <p className="text-white text-xl">Loading...</p>
            </div>
          )}
          <div className='flex flex-row justify-start items-center mt-4 ml-20'>
            <div className="flex flex-col justify-center items-start bg-slate-50 rounded-sm p-3 w-3/6 space-y-5">
              <div className="flex flex-row justify-start w-full">
                <div className="relative">
                    <img src={product.imageURL} alt={`${product.name}`} className="h-40 w-56" />
                </div>
                <div className="ml-10 relative">
                    <label htmlFor="image" className="cursor-pointer bg-slate-500 hover:bg-slate-400 transition-colors duration-100 ease-in-out text-white px-1 py-1 mt-2 rounded">
                        Select Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                    />
                  <div className='mt-3'>
                    {selectedImageName && (
                      <p className="absolute bg-white text-xs py-1 px-2 rounded-b w-full text-center">{selectedImageName}</p>
                    )}
                  </div>
                </div>
              </div>
                <div className='mt-3 w-4/6'>
                    <label htmlFor='name' className='mr-5'>Name</label>
                    <input
                    value={name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full mt-2 px-2 py-1 rounded border"
                    />
                </div>
                <div className='mt-3 w-1/6'>
                    <label htmlFor='price' className='mr-5'>Price</label>
                    <input
                    value={price}
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full mt-2 px-2 py-1 rounded border"
                    />
                </div>
                <div className='mt-3 w-1/6'>
                    <label htmlFor='stock' className='mr-5'>Stock</label>
                    <input
                    value={stock}
                    name="stock"
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full mt-2 px-2 py-1 rounded border"
                    />
                </div>
                <div className='mt-3 w-4/6'>
                  <label htmlFor='description' className='mr-5'>Description</label>
                  <textarea
                    required
                    id='description'
                    placeholder='Enter product description'
                    name='description'
                    value={description}
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full mt-2 px-2 py-1 rounded border'
                  />
                </div>
                <div className="flex flex-row justify-end mt-3">
                  <button
                      className="bg-slate-200 hover:cursor-pointer hover:bg-slate-300 mt-3 p-1 rounded-md transition-colors duration-100 ease-in-out"
                      onClick={() => handleSaveChanges(product._id)}
                  >
                      Save Changes
                  </button>
                  <Link to="/ManageProducts" className="no-underline text-black ml-2 mt-3">
                      <button className="bg-red-200 hover:cursor-pointer hover:bg-red-300 p-1 rounded-md transition-colors duration-100 ease-in-out">
                      Cancel
                      </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      );      
}

export default EditProduct;