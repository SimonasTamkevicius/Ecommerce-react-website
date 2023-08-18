import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import ProfileInfo from './ProfileInfo'

const LoggedInProfile = () => {

    const { user } = useAuth();
    const [myProfileClick, setMyProfileClick] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
      setCurrentUser(user);
    }, [user]);

    let greetingMsg;

    const date = new Date();
    const time = date.getHours();

    if (time < 12) {
        greetingMsg = "Good Morning";
    } else if (12 < time < 6) {
        greetingMsg = "Good Afternoon";
    } else {
        greetingMsg = "Good evening";
    }

    const handleMyProfileClick = () => {
        setMyProfileClick(true);
    }

  return (
    <div>
        <div className='flex flex-col md:flex-row md:justify-between md:space-x-4'>
            <div className='flex flex-col w-80 h-50 ml-20 py-10 space-y-4'>
                <h1 className='flex justify-start text-4xl'>My Account</h1>
                <p className='pt-4'>Account Settings</p>
                <button className='flex justify-start pl-5 text-sm hover:cursor-pointer' onClick={handleMyProfileClick}>My Profile</button>
                {user.loggedIn ? (
                    <div>
                    {user.loggedIn && user.role === "Admin" ? (
                    <Link to='/ManageProducts' className='no-underline text-black'>
                        <button className='pl-5 text-sm hover:cursor-pointer'>Manage Products</button>
                    </Link>
                    ) : null}
                    </div>
                ) :
                <div>
                <Link to='/Register' className='no-underline text-black'>
                    <button className='pl-5 text-sm hover:cursor-pointer'>Create Account</button>
                </Link>
                </div>
                }
                <hr className='lg:w-80'></hr>
            </div>
            <div className='flex flex-col md:w-1/2 mx-auto mr-20 py-10'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>{greetingMsg} {currentUser.fName}!</h1>
                </div>
                <div className='py-10'>
                    <ProfileInfo />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoggedInProfile