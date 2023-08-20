import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { FaSquare } from 'react-icons/fa';
import { CartState } from '../../context/Context';
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const {state: { products: initialProducts }} = CartState();
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    axiosInstance
      .get("/orders", {
        params: {
          _id: user._id,
          role: user.role
        }
      })
      .then(function (response) {
        setOrders(response.data.map(order => ({ ...order, viewOrder: false })));
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [user._id, user.role]);

  const toggleOrderView = (orderIndex) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].viewOrder = !updatedOrders[orderIndex].viewOrder;
    setOrders(updatedOrders);
  };

  const findProductById = (productId) => {
    return products.find((product) => product._id === productId)
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <div className="lds-ring-general"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      {orders.map((order, i) => (
        <div key={i} className='mb-10'>
            <div className='grid grid-cols-3 shadow-md rounded-md mx-2 md:mx-4 w-80 md:w-full'>
                {/* Display order information */}
                <div className='col-span-3 flex flex-col md:flex-row flex-wrap justify-between items-center shadow-sm px-3 pt-3 rounded-b-md'>
                    <p className='text-md'><b>{order.date}</b></p>
                    <p className='text-md'>Order number: <b>{order.orderNumber}</b></p>
                    <p className='text-md'>Total Items: <b>{order.totalItems}</b></p>
                    <p
                      className='text-md hover:cursor-pointer bg-gray-200 p-1 hover:bg-gray-300 rounded-sm transition-colors duration-150 ease-in-out'
                      onClick={() => toggleOrderView(i)}
                    >
                      {order.viewOrder ? "Hide Order" : "View Order"}
                    </p>
                </div>
                {order.viewOrder &&
                    <div className='col-span-3 flex flex-row flex-wrap justify-center mx-auto md:p-2 w-80 space-x-2 md:w-full md:space-x-5'>
                        {order.items.map((item, j) => (
                            <div key={j} className='flex flex-col items-center mb-1'>
                                <div className='position relative pt-4'>
                                    <img src={item.imageURL} alt={item.name} className='w-20 h-20 shadow-md rounded-md' />
                                    <svg width="30" height="30" style={{ position: 'relative', left: '58px', bottom: '82px' }}>
                                    <FaSquare className='text-2xl rounded-md' fill="#C2E7E4" />
                                    <text
                                        x="12"
                                        y="16"
                                        textAnchor="middle"
                                        fill="black"
                                        fontSize="12"
                                    >
                                        {item.quantity}
                                    </text>
                                    </svg>
                                </div>
                                {(() => {
                                    const product = findProductById(item.itemID);
                                    if (product) {
                                        return (
                                        <Link
                                            to="/SingleProductPage"
                                            className="no-underline text-black"
                                            state={{ prod: product }}
                                            key={item.productId}
                                        >
                                            <p className='text-xs mb-1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '12ch' }}>{item.name}</p>
                                        </Link>
                                        );
                                    }
                                })()}
                            <p className='text-xs font-bold'>${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    
                }
                {user.loggedIn && user.role === "Admin" ? <p className='border-t-2 px-3 pt-3 col-span-3'>User ID: <b>{order.userID}</b></p> : ''}
                <div className='col-span-3 flex flex-row justify-between items-center px-3 bg-gray-300 rounded-sm'>
                    <p className='mt-3 text-sm'>Grand Total</p>
                    <p className='mt-3 text-sm'><b>${order.total.toFixed(2)}</b></p>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
