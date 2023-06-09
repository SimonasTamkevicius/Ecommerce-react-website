import React, { useState } from 'react';

const NavBarV1 = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <button className="hamburger-menu" onClick={handleMenuToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
        </svg>
      </button>
      <ul className="flex flex-row justify-between items-center">
        <li>
          <img width={150} src="/websiteLogo.png" alt="Website Logo" />
        </li>
        <li>
            <h1 className="text-xl">Bracelets</h1>
        </li>
        <li>
            <h1 className="text-xl">Necklaces</h1>
        </li>
        <li>
            <h1 className="text-xl">Rings</h1>
        </li>
        <li className="hide-on-small-screen">
          <form>
            <input type="text" placeholder="Find your inspiration" />
            <button>SEARCH</button>
          </form>
        </li>
        <li className="hide-on-small-screen shopping-cart">
          <div>
            <img width={50} src="/shoppingCartIcon.png" alt="Shopping Cart Icon" />
            <div className="circle-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle cx="10" cy="9" r="8" fill="red" />
                <text x="10" y="12" textAnchor="middle" fill="white" fontSize="10">
                  5
                </text>
              </svg>
            </div>
          </div>
        </li>
        <li className="hide-on-small-screen">
          <img width={50} src="/userIcon.png" alt="User Icon" />
        </li>
      </ul>
      {showMenu && (
        <ul className="menu-items">
          <li>
            <h1 className="text-xl">Bracelets</h1>
          </li>
          <li>
            <h1 className="text-xl">Necklaces</h1>
          </li>
          <li>
            <h1 className="text-xl">Rings</h1>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBarV1;
