import React,  { useState, useEffect } from 'react';
import { CartState } from '../context/Context';
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom'
import  { Form } from 'react-bootstrap';

const CartData = () => {

    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [subtotal, setSubtotal] = useState();
    const [totalTax, setTotalTax] = useState();
    const [total, setTotal] = useState();
    const [totalQuantity, setTotalQuantity] = useState();

    useEffect (() => {
        setSubtotal (
            cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
        );
        setTotalTax (
            cart.reduce((acc, curr) => acc + (Number(curr.price) * curr.qty) * .13, 0)
        );
        setTotal (
            cart.reduce((acc, curr) => acc + (Number(curr.price) * curr.qty) * 1.13, 0)  
        );
    }, [cart]);

    useEffect (() => {
        setTotalQuantity (
            cart.reduce((acc, curr) => acc + Number(curr.qty), 0)
        );
    }, [cart, dispatch]);

  return (
    <div className='flex p-10 px-20'>
        <div className="flex w-2/3 mr-2 p-4 bg-white border border-gray-800 rounded-lg shadow sm:p-8">
            <div className="flex w-full flex-col pt-10">
                {/* Cart Title */}
                {cart.length === 0 ? (
                    <>
                        <h1 className="px-5 text-4xl">Shopping Cart</h1>
                        <p className='px-5 pt-3 text-xl'>Your shopping cart is empty.</p>
                        <Link to='/ShopPage'>
                            <p className='px-5 p-1 text-lg underline'>Continue Shopping</p>
                        </Link>
                    </>
                ) : (
                <>
                {cart.totalQuantity === 1 ? (
                <h1 className="px-5 text-4xl">Shopping Cart (1 item)</h1>
                ) : (
                <h1 className="px-5 text-4xl">Shopping Cart ({totalQuantity} items)</h1>
                )}
                {/* Cart Items */}
                <ul id="cart-items" className="w-full pt-10 px-5 divide-y divide-gray-300">
                    {cart.map((prod) => (
                        <li key={prod.id} className="flex py-5 w-full space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-20 h-20" src={prod.image} alt={prod.name} />
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-semibold text-black truncate">{prod.name}</p>
                                <p className="text-sm text-gray-700 truncate">{prod.inStock} left in stock</p>
                            </div>
                            <div className='flex items-center pr-5'>
                            <Form.Control
                                as="select"
                                value={prod.qty}
                                onChange={(e) =>
                                dispatch({
                                    type: "CHANGE_CART_QTY",
                                    payload: {
                                    id: prod.id,
                                    qty: e.target.value,
                                    },
                                })
                                }
                            >
                                {[...Array(prod.inStock).keys()].map((x) => (
                                <option key={x + 1}>{x + 1}</option>
                                ))}
                            </Form.Control>
                            </div>
                            <div className="flex pt-3 pr-3 items-center">
                                <p className='text-base font-semibold text-black'>${prod.price}</p>
                            </div>
                            <div className='flex'>
                                <button
                                    onClick={() => {
                                        dispatch({
                                            type: 'REMOVE_FROM_CART',
                                            payload: prod,
                                        })
                                    }}
                                >
                                <AiFillDelete className='text-4xl pl-4' />
                                </button>
                            </div>
                        </li>
                    ))}
                    <p className='font-semibold text-lg pt-5 text-right'>Subtotal: {subtotal !== undefined ? `$${subtotal.toFixed(2)}` : ''}</p>
                </ul>
                </>
                )}
            </div>
        </div>
        <div className="flex w-1/3 ml-20 p-4 bg-white border border-gray-800 rounded-lg shadow sm:p-8" style={{ maxHeight: '300px' }}>
            <div>
                <p className='flex font-semibold text-md pt-3'>Subtotal: {subtotal !== undefined ? `$${subtotal.toFixed(2)}` : ''}</p>
                <p className='font-semibold text-md'>Shipping: Free</p>
                <p className='font-semibold text-md'>Tax: {totalTax !== undefined ? `$${totalTax.toFixed(2)}` : ''}</p>
                <p className='font-semibold text-2xl'>Total: {total !== undefined ? `$${total.toFixed(2)}` : ''}</p>
                <div className='pt-3'>
                    <button className='p-2 font-semibold bg-black text-white rounded-md'>
                    Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartData