import { CartState } from "../context/Context";
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axiosInstance from "../api/axiosInstance";

const NavBar = () => {
  const {
    state: { cart, products: initialProducts },
    productState: bySearchInBar,
    productDispatch
  } = CartState();  

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const mobileFormRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [sortedProducts, setSortedProds] = useState([]);
  const [focus, setFocus] = useState(false);

  const { user, logoutUser } = useAuth();

  let sortProds = [];
  console.log(sortProds);

  const navlinks = [
    {
      title: "HOME",
      link: "/home",
    },
    {
      title: "SHOP ALL",
      link: "/ShopPage",
    },
    {
      title: "BRACELETS",
      link: "/bracelets",
    },
    {
      title: "NECKLACES",
      link: "/necklaces",
    },
    {
      title: "RINGS",
      link: "/rings",
    },
    {
      title: "ABOUT",
      link: "/About",
    },
  ];

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (formRef.current &&
          !formRef.current.contains(event.target)) ||
          (mobileFormRef.current && !mobileFormRef.current.contains(event.target))
      ) {
        handleBlur();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handClickInside = (event) => {
      if (
        (formRef.current &&
        formRef.current.contains(event.target)) ||
        (mobileFormRef.current && mobileFormRef.current.contains(event.target))
      ) {
        handleFocus();
      }
    };

    document.addEventListener("click", handClickInside);

    return () => {
      document.removeEventListener("click", handClickInside);
    };
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const inputValue = e.target.value.toLowerCase();
    const capitalizedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH_BAR",
      payload: capitalizedInputValue,
    });

    if (bySearchInBar) {
      const sortProds = products.filter((prod) =>
        prod.name.includes(capitalizedInputValue) || prod.name.includes(inputValue.toLowerCase())
      );
      setSortedProds(sortProds);
    }
    console.log(sortProds);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFocus(false);
    const inputValue = searchValue.toLowerCase();
    const capitalizedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: capitalizedInputValue,
    });
    navigate("/ShopPage");
    formRef.current.reset();
    setSearchValue('');
  };

  const handleMobileFormSubmit = (e) => {
    e.preventDefault();
    setFocus(false);
    const inputValue = searchValue.toLowerCase();
    const capitalizedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: capitalizedInputValue,
    });
    navigate("/ShopPage");
    mobileFormRef.current.reset();
    setSearchValue('');
  };

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (link.title === "SHOP ALL") {
      productDispatch({
        type: "CLEAR_FILTERS",
      });
      navigate("/ShopPage");
    } else if (
      link.title === "BRACELETS" ||
      link.title === "NECKLACES" ||
      link.title === "RINGS"
    ) {
      const strippedTitle = link.title.slice(0, -1);
      const inputValue = strippedTitle.toLowerCase();
      const capitalizedInputValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      productDispatch({
        type: "FILTER_BY_SEARCH",
        payload: capitalizedInputValue,
      });
      navigate("/ShopPage");
    } else if (link.title === "HOME") {
      navigate("/");
    } else if (link.title === "ABOUT") {
      navigate("/About");
    }
  };

  const handleFocus = () => {
    setFocus(true);
  };
  
  const handleBlur = () => {
    setFocus(false);
  };

  const handleLogoutClick = () => {
    logoutUser();
  }

  const totalQty = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:px-4 md:pt-10">
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
            <Link to="/">
              <img
                className="w-40 md:w-80"
                src="/websiteLogoV2.png"
                alt="The Bead Boutique"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <form
                ref={formRef}
                className="hidden lg:block"
                onSubmit={handleFormSubmit}
              >
                <input
                  className="border-2 p-2 border-black w-96 focus:outline-none"
                  type="text"
                  placeholder="Find your inspiration"
                  name="searchInput"
                  value={searchValue}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="bg-black text-white border-2 border-black p-2 mr-20"
                >
                  SEARCH
                </button>
                {focus && 
                  <div className="z-40 position absolute bg-gray-100 w-96 rounded-sm">
                    {sortedProducts.map((prod, i) => (
                      <Link
                        to="/SingleProductPage"
                        className="no-underline text-black"
                        state={{ prod: prod }}
                        key={i}
                        onClick={() => {setFocus(false)}}
                      >
                        <p className="mx-2 my-2 hover:bg-gray-200 hover:cursor-pointer p-2">{prod.name}</p>
                      </Link>
                    ))}
                  </div>
                }
              </form>
            </div>
            {/* Login and Register vs My Account and Logout  */}
            {user.loggedIn ? (
              <div className="flex flex-row space-x-3 mr-1 mt-3">
                <Link to="UserProfile" className="no-underline text-black">
                  <p className="hover:cursor-pointer">My account</p>
                </Link>
                <p className="border-l-2 px-3 border-gray-600 hover:cursor-pointer" onClick={handleLogoutClick}>Logout</p>
              </div>
              ) : (
                <div className="flex flex-row space-x-3 mr-1 mt-3">
                  <Link to="UserProfile" className="no-underline text-black">
                    <p className="hover:cursor-pointer">Login</p>
                  </Link>
                  <Link to="Register" className="no-underline text-black">
                    <p className="border-l-2 px-3 border-gray-600 hover:cursor-pointer">Register</p>
                  </Link>
                </div>
              )}
            <Link to="/cart">
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
                  <text
                    x="10"
                    y="12"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    {cart.prod}
                  </text>
                </svg>
              </div>
            ) : (
              <div className="circle-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <circle cx="10" cy="9" r="8" fill="red" />
                  <text
                    x="10"
                    y="12"
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                  >
                    {totalQty}
                  </text>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10">
          <form
            ref={mobileFormRef}
            className="lg:hidden block relative"
            onSubmit={handleMobileFormSubmit}
          >
          <div className="flex items-center">
            <input
              className="border-2 p-1 border-black w-full sm:w-80 rounded-none focus:outline-none"
              type="text"
              placeholder="Find your inspiration"
              name="mobileSearchInput"
              value={searchValue}
              onChange={handleChange}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-black text-white p-1 border-2 border-black"
            >
              SEARCH
            </button>
            {focus && 
              <div className="z-20 position absolute top-9 bg-gray-100 w-full md:w-80 rounded-sm">
                {sortedProducts.map((prod, i) => (
                  <Link
                    to="/SingleProductPage"
                    className="no-underline text-black"
                    state={{ prod: prod }}
                    key={i}
                    onClick={() => {setFocus(false)}}
                  >
                    <p className="mx-2 my-2 hover:bg-gray-200 hover:cursor-pointer p-2">{prod.name}</p>
                  </Link>
                ))}
              </div>
            }
          </div>
        </form>
      </div>
      {/* mobile menu */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
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
                    style={{ textDecoration: "none" }}
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
      <div className="">
        {/* navlinks */}
        <div className="hidden lg:block bg-gray-200 pb-2 pt-4">
          <div className="justify-between flex items-baseline">
            {navlinks.map((link, index) => (
              <Link
                to={link.link}
                onClick={(event) => handleLinkClick(event, link)}
                className="text"
                key={index}
                style={{ textDecoration: "none" }}
              >
                <p className="lg:px-10 text-gray-900 text-sm hover:text-slate-500">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
