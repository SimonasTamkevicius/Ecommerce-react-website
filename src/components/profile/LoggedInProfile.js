import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import ProfileInfo from './ProfileInfo';
import UserOrders from './UserOrders';
import ManageProducts from '../ProductManagment/ManageProducts';
import DisplayUsers from './DisplayUsers';

const LoggedInProfile = () => {
  const { user } = useAuth();
  const [myProfileClick, setMyProfileClick] = useState(true);
  const [myOrdersClick, setMyOrdersClick] = useState(false);
  const [usersClick, setUsersClick] = useState(false);
  const [manageProdsClick, setManageProdsClick] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [isHoveredManageProds, setIsHoveredManageProds] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const [isHoveredOrders, setIsHoveredOrders] = useState(false);
  const [isHoveredUsers, setIsHoveredUsers] = useState(false);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  let greetingMsg;

  const date = new Date();
  const time = date.getHours();

  if (time < 12) {
    greetingMsg = "Good Morning";
  } else if (time >= 12 && time < 18) {
    greetingMsg = "Good Afternoon";
  } else {
    greetingMsg = "Good Evening";
  }

  const handleMyProfileClick = () => {
    setMyProfileClick(true);
    setMyOrdersClick(false);
    setUsersClick(false);
    setManageProdsClick(false);
  };

  const handleOrdersClick = () => {
    setMyOrdersClick(true);
    setMyProfileClick(false);
    setUsersClick(false);
    setManageProdsClick(false);
  };

  const handleUsersClick = () => {
    setUsersClick(true);
    setMyProfileClick(false);
    setMyOrdersClick(false);
    setManageProdsClick(false);
  }

  const handleManageProdClick = () => {
    setManageProdsClick(true);
    setMyProfileClick(false);
    setMyOrdersClick(false);
    setUsersClick(false);
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row md:justify-between md:space-x-4'>
        <div className='flex flex-col w-80 h-50 ml-20 py-10 space-y-4'>
          <h1 className='flex justify-start text-4xl'>My Account</h1>
          <p className='pt-4'>Account Settings</p>
          <button
            className={`flex justify-start pl-4 text-sm ${isHoveredProfile ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHoveredProfile(true)}
            onMouseLeave={() => setIsHoveredProfile(false)}
            onClick={handleMyProfileClick}
          >
            My Profile
          </button>
          <button
            className={`flex justify-start pl-4 text-sm ${isHoveredOrders ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHoveredOrders(true)}
            onMouseLeave={() => setIsHoveredOrders(false)}
            onClick={handleOrdersClick}
          >
            {user.loggedIn && user.role === "Admin" ? 'All Orders' : 'My Orders'}
          </button>
          {user.loggedIn ? (
            <div>
              {user.role === 'Admin' ? (
                <div>
                    <button
                        className={`flex justify-start pl-4 text-sm ${isHoveredManageProds ? 'hovered' : ''}`}
                        onMouseEnter={() => setIsHoveredManageProds(true)}
                        onMouseLeave={() => setIsHoveredManageProds(false)}
                        onClick={handleManageProdClick}
                    >
                        Manage Products
                    </button>
                    {/* </Link> */}
                    <button
                        className={`flex justify-start pl-4 text-sm mt-3 ${isHoveredUsers ? 'hovered' : ''}`}
                        onMouseEnter={() => setIsHoveredUsers(true)}
                        onMouseLeave={() => setIsHoveredUsers(false)}
                        onClick={handleUsersClick}
                    >
                        Users
                    </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <Link to='/Register' className='no-underline text-black'>
                <button className='pl-5 text-sm hover:cursor-pointer'>Create Account</button>
              </Link>
            </div>
          )}
          <hr className='lg:w-80'></hr>
        </div>
        <div className='flex flex-col md:w-1/2 mx-auto mr-20 py-10'>
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl'>{greetingMsg} {currentUser.fName}!</h1>
          </div>
          <div className='py-10'>
            {myProfileClick && <ProfileInfo />}
            {myOrdersClick && <UserOrders />}
            {manageProdsClick && <ManageProducts />}
            {usersClick && <DisplayUsers />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInProfile;
