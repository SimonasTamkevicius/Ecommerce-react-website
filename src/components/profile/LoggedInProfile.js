import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { useAuth } from '../../utils/AuthContext'

const LoggedInProfile = () => {

    const { user } = useAuth();

  return (
    <div>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col w-80 h-50 ml-20 py-10'>
                <h1 className='flex justify-start text-4xl'>My Account</h1>
                <p className='pt-4'>Account Settings</p>
                {user.loggedIn ? null : 
                <Link to='/Register' className='no-underline text-black'>
                <button className='pl-5 text-sm hover:cursor-pointer'>Create Account</button>
                </Link>}
                {user.loggedIn && user.role === "Admin" ? (
                <Link to='/ManageProducts' className='no-underline text-black'>
                    <button className='pl-5 text-sm hover:cursor-pointer'>Manage Products</button>
                </Link>
                ) : null}
                <hr className='lg:w-80'></hr>
            </div>
        </div>
    </div>
  )
}

export default LoggedInProfile