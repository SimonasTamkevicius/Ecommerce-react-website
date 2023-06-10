import { CartState } from '../context/Context';
import React, { useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const mobileFormRef = useRef(null);

  const {
    state: { cart },
    productDispatch,
  } = CartState();

  const navlinks = [
    {
      title: 'HOME',
      link: '/home'
    },
    {
      title: 'SHOP ALL',
      link: '/ShopPage'
    },
    {
      title: 'BRACELETS',
      link: '/bracelets',
    },
    {
      title: 'NECKLACES',
      link: '/necklaces',
    },
    {
      title: 'RINGS',
      link: '/rings',
    },
    {
      title: 'ABOUT',
      link: '/about',
    },
  ];

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchInput.value.toLowerCase();
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: capitalizedInputValue,
    });
    navigate('/ShopPage');
    formRef.current.reset();
  };
  
  const handleMobileFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.mobileSearchInput.value.toLowerCase();
    const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: capitalizedInputValue,
    });
    navigate('/ShopPage');
    mobileFormRef.current.reset();
  };  

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (link.title === 'SHOP ALL') {
      productDispatch({
        type: "CLEAR_FILTERS"
      });
      navigate('/ShopPage');
    } else if (link.title === 'BRACELETS' || link.title === 'NECKLACES' || link.title === 'RINGS') {
      const strippedTitle = link.title.slice(0, -1);
      const inputValue = strippedTitle.toLowerCase();
      const capitalizedInputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      productDispatch({
        type: "FILTER_BY_SEARCH",
        payload: capitalizedInputValue,
      });
      navigate('/ShopPage');
    } else if (link.title === 'HOME') {
      navigate('/');
    }
  };  

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pt-10 md:px-14 md:pt-14">
          {/* hamburger button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md z-50"
            >
              <span className="sr-only">Open Menu</span>
              {open ? (
                <FaTimes className="w-8 h-8" />
              ) : (
                <FaBars className="w-8 h-8" />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <Link to='/'>
              <img
                className="w-40 md:w-80"
                src="/websiteLogoV2.png"
                alt="The Bead Boutique"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <form ref={formRef} className="hidden lg:block" onSubmit={handleFormSubmit}>
              <input
                className="border-2 p-1 border-black w-80 focus:outline-none"
                type="text"
                placeholder="Find your inspiration"
                name="searchInput"
              />
              <button type="submit" className="bg-black text-white border-2 border-black p-1 mr-20">
                SEARCH
              </button>
            </form>
            <Link to='/cart'>
              <button>
                <img
                  width="40"
                  src="/shoppingCartIcon.png"
                  alt="Shopping Cart Icon"
                />
              </button>
            </Link>
            {cart.length === 0 ? (
              <div className="opacity-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <circle cx="10" cy="9" r="8" fill="white" />
                  <text x="10" y="12" textAnchor="middle" fill="white" fontSize="10">
                    {cart.length}
                  </text>
                </svg>
              </div>
            ) : 
            <div className="circle-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle cx="10" cy="9" r="8" fill="red" />
                <text x="10" y="12" textAnchor="middle" fill="white" fontSize="10">
                  {cart.length}
                </text>
              </svg>
            </div>
            }
            <Link to='UserProfile'>
              <img width={40} src="/userIcon.png" alt="User Icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10">
        <form ref={mobileFormRef} className="lg:hidden block" onSubmit={handleMobileFormSubmit}>
          <div className="flex items-center">
              <input
                className="border-2 p-1 border-black w-full sm:w-80 rounded-none focus:outline-none"
                type="text"
                placeholder="Find your inspiration"
                name="mobileSearchInput"
              />
              <button type="submit" className="bg-black text-white p-1 border-2 border-black">
                SEARCH
              </button>
            </div>
        </form>
      </div>
      {/* mobile menu */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {open && (
          <div className="fixed inset-0 flex z-40 lg:hidden">
            <div className="-flex-1 bg-white shadow-xl h-100 w-60">
              <div className="p-4 mt-20">
                {/* Menu contents */}
                {navlinks.map((link, index) => (
                  <Link
                    to={link.link}
                    className="text"
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={(event) => handleLinkClick(event, link)}
                  >
                    <p
                      className="block py-3 px-4 text-gray-800 hover:bg-gray-200"
                      onClick={() => {
                        handleMenu();
                      }}
                    >
                      {link.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-gray-800 opacity-75"></div>
          </div>
        )}
      </div>
      <div className="mx-auto lg:px-20">
        {/* navlinks */}
        <div className="hidden lg:block bg-slate-200 pb-2 pt-4">
          <div className="justify-center flex items-baseline space-x-20">
          {navlinks.map((link, index) => (
            <Link to={link.link} onClick={(event) => handleLinkClick(event, link)} className="text" key={index} style={{ textDecoration: 'none' }}>
              <p className="px-10 text-gray-900 text-sm hover:text-slate-500">
                {link.title}
              </p>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
