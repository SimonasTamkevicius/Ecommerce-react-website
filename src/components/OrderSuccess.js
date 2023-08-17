import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
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
