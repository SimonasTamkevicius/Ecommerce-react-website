import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import { CartState } from "../context/Context";
import { useAuth } from '../utils/AuthContext';

const OrderSuccess = () => {
  const { state: { cart }, clearSession } = CartState();
  const { user } = useAuth();
  const [orderProcessed, setOrderProcessed] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const guestUser = { _id: "Guest" };

    if (!orderProcessed) {
      if (user) {
        axiosInstance.post("/add-order", { cart, user })
          .then(function (response) {
            console.log(response);
            clearSession();
            setOrderProcessed(true);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axiosInstance.post("/add-order", { cart, user: guestUser })
          .then(function (response) {
            console.log(response);
            clearSession();
            setOrderProcessed(true);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }, []);

  return (
    <div className='flex flex-col ml-10 mt-10 space-y-5'>
      <h1>YOUR ORDER HAS BEEN RECEIVED.</h1>
      <p className='text-lg'>Thank you for your purchase!</p>
      <p>You will receive an order confirmation email with the details of your order.</p>
      <div className='flex flex-col items-center ml-5 mr-80 pt-10'>
        <Link to='/ShopPage' className='no-underline text-black'>
          <button className='w-40 border-2 border-black p-2 hover:text-gray-600 hover:border-gray-800 transition duration-300 ease-in-out'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
