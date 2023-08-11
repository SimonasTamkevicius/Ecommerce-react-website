import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartState } from '../../context/Context';
import { IoCheckmarkSharp } from "react-icons/io5"

const SingleProductPage = () => {
  const location = useLocation();
  const { prod } = location.state;

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [numToAdd, setNumToAdd] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const existingCartItem = cart.find((item) => item.name === prod.name);

  const handleChange = (e) => {
    setNumToAdd(parseInt(e.target.value));
  }

  const handleAddClick = () => {
    if (numToAdd === '') {
      setNumToAdd(1);
    } else if (numToAdd < prod.stock) {
      setNumToAdd(numToAdd + 1);
    }
    console.log(numToAdd);
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    const quantityToAdd = numToAdd;
    
    setTimeout(() => {
      setIsAdding(false)
      if (existingCartItem) {
        dispatch({
          type: "CHANGE_CART_QTY",
          payload: {
            name: prod.name,
            qty: existingCartItem.qty + quantityToAdd,
          },
        });
      } else if (quantityToAdd > 1) {
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...prod, qty: 1 },
        });
        dispatch({
          type: "CHANGE_CART_QTY",
          payload: {
            name: prod.name,
            qty: quantityToAdd,
          },
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...prod, qty: 1 },
        });
      }
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    }, 1500)
    
  }  

  return (
    <div className="lg:grid lg:grid-cols-12 mx-20 mt-20">
      <div className="flex flex-col col-span-4 p-2">
        <img src={prod.imageURL} alt={prod.name} className='object-cover w-96 h-72' />
      </div>
      <div className="flex flex-col col-span-5 p-4">
        <h2 className="text-4xl font-semibold mb-2">{prod.name}</h2>
        <p className='mt-3'>{prod.description}</p>
      </div>
      <div className="flex flex-col col-span-3 lg:px-10 rounded-sm items-center">
        <div className='w-full border-1 p-8'>
          <div className='flex flex-row justify-between'>
            <h2 className="text-xl font-bold mb-2">${prod.price}</h2>
            <h2 className='text-lg font-semibold mb-2'>
              {prod.stock >= 10 ? <span className='text-sm mb-2'>10+ Available</span> : prod.stock}
            </h2>
          </div>
          <div className='w-full flex flex-col'>
            <p className='text-xs mb-0'>Quantity</p>
            <div className='flex flex-row items-center'>
              <button className='border-1 mr-2 px-2' onClick={() => {numToAdd > 1 && setNumToAdd(numToAdd - 1)}}>-</button>
              <input className='border-1 text-center w-full' type='number' min="1" value={numToAdd} onChange={handleChange}></input>
              <button className='border-1 ml-2 px-2' onClick={handleAddClick}>+</button>
            </div>
            <div className='flex justify-end mt-4'>
              <button
                disabled={!prod.stock}
                onClick={!isAdding && !added ? handleAddToCart : null}
                href="#"
                className={`inline-flex items-center px-2 py-2 text-xs sm:text-sm font-medium text-center text-white rounded-md ${
                  !prod.stock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black focus:outline-none"
                }`}
              >
                {isAdding ? (
                  <div className="flex flex-row">
                    <div class="lds-ring-prod"><div></div><div></div><div></div><div></div></div>
                    <p
                      style={{ verticalAlign: "middle", margin: 0 }}
                    >
                      Adding...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    {added ? (
                      <div className="flex flex-row">
                        <IoCheckmarkSharp className="text-xl" />
                        <p
                          style={{verticalAlign: "middle", marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 7}}
                        >
                          Added
                        </p>
                      </div>
                      ) : (
                        !prod.stock ? "Out of Stock" : "Add to Cart")
                    }
                  </div>
                  
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
