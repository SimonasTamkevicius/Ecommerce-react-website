import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSquareArrowLeft, TbSquareArrowRight } from "react-icons/tb";
import { CartState } from "../context/Context";

const HomePage = () => {
  const { productDispatch } = CartState();

  const categories = [
    {
      image: "/beadBracelet.jpg.webp",
      title: "BRACELETS",
      link: "/bracelets",
    },
    {
      image: "/beadNecklace.jpg",
      title: "NECKLACES",
      link: "/necklaces",
    },
    {
      image: "/beadRing.jpg.webp",
      title: "RINGS",
      link: "/rings",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const handlePrevious = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );
  };

  const handleClick = (title) => (e) => {
    e.preventDefault();
    const strippedTitle = title.slice(0, -1);
    const inputValue = strippedTitle.toLowerCase();
    const capitalizedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    productDispatch({
      type: "FILTER_BY_SEARCH",
      payload: capitalizedInputValue,
    });
    navigate("/ShopPage");
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl flex justify-center pt-10">
        Shop by Category
      </h1>
      {/* mobile gallery */}
      <div className="flex justify-center pt-10 lg:hidden">
        <div className="flex justify-between">
          <button
            className={`category ${
              activeIndex === 0 ? "text-gray-500 pl-4" : "pl-4"
            }`}
            onClick={handlePrevious}
            disabled={activeIndex === 0}
          >
            <TbSquareArrowLeft className="w-10 h-10" />
          </button>
          <div className="flex gallery justify-center">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category ${
                  index === activeIndex ? "active block" : "hidden"
                }`}
              >
                <Link
                  className="block py-2 px-4 underline text-center text-gray-800 hover:text-gray-500"
                  to={category.link}
                  onClick={handleClick(category.title)}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="mb-2 w-full h-full"
                    />
                  )}
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
          <button
            className={`category ${
              activeIndex === categories.length - 1
                ? "text-gray-500 pr-4"
                : "pr-4"
            }`}
            onClick={handleNext}
            disabled={activeIndex === categories.length - 1}
          >
            <TbSquareArrowRight className="w-10 h-10" />
          </button>
        </div>
      </div>
      {/* desktop gallery */}
      <div className="justify-between px-10 pt-20 hidden lg:block">
        <div className="flex justify-center">
          <div className="flex gallery">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center w-1/3">
                <Link
                  className="block py-2 px-10 underline text-center text-gray-800 hover:text-gray-500"
                  to={category.link}
                  onClick={handleClick(category.title)}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="mb-2 w-full h-full"
                    />
                  )}
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
