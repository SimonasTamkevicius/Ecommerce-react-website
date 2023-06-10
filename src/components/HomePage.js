import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { TbSquareArrowLeft, TbSquareArrowRight } from 'react-icons/tb';

const HomePage = () => {
  const categories = [
    {
      image: '/beadBracelet.jpg.webp',
      title: 'BACELETS',
      link: '/bracelets',
    },
    {
      image: '/beadNecklace.jpg',
      title: 'NECKLACES',
      link: '/necklaces',
    },
    {
      image: '/beadRing.jpg.webp',
      title: 'RINGS',
      link: '/rings',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  return (
    <>
      <h1 className='text-4xl md:text-5xl flex justify-center pt-20'>Shop by Category</h1>
      {/* mobile gallery */}
      <div className='flex justify-center pt-10 lg:hidden'>
        <div className='flex justify-between'>
          <button
            className={`category ${activeIndex === 0 ? 'text-gray-500 pl-4' : 'pl-4'}`}
            onClick={handlePrevious}
            disabled={activeIndex === 0}
          >
            <TbSquareArrowLeft className='w-10 h-10'/>
          </button>
            <div className='flex gallery justify-center'>
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`category ${index === activeIndex ? 'active block' : 'hidden'}`}
                >
                  <Link className='block py-2 px-4 underline text-center text-gray-800 hover:text-gray-500' to={category.link}>
                    {category.image && <img src={category.image} alt={category.title} className='mb-2 w-full h-full' />}
                    {category.title}
                  </Link>
                </div>
              ))}
            </div>
          <button
            className={`category ${activeIndex === categories.length - 1 ? 'text-gray-500 pr-4' : 'pr-4'}`}
            onClick={handleNext}
            disabled={activeIndex === categories.length - 1}
          >
            <TbSquareArrowRight className='w-10 h-10'/>
          </button>
        </div>
      </div>
      {/* desktop gallery */}
      <div className='justify-between px-10 pt-20 hidden lg:block'>
        <div className='flex justify-center'>
          <div className='flex gallery'>
            {categories.map((category, index) => (
              <div key={index} className='flex flex-col items-center w-1/3'>
                <Link
                  className='block py-2 px-10 underline text-center text-gray-800 hover:text-gray-500'
                  to={category.link}
                >
                    {category.image && <img src={category.image} alt={category.title} className='mb-2 w-full h-full' />}
                    {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
