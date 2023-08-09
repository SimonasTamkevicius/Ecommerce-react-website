import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import axios from 'axios';
import LoggedInProfile from './LoggedInProfile';

const UserProfile = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loginUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      // Create URLSearchParams object
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      axios
        .post('/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          console.log(response.data.role, response.data.accessToken);
          loginUser(response.data.role, response.data.accessToken);
          setEmail('');
          setPassword('');
          navigate('/UserProfile');
        })
        .catch(function (error) {
          setMessage('Failed to register user');
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      {!user.loggedIn ? (
      <div className='lg:grid lg:grid-cols-3 lg:gap-4 py-10 px-10 md:px-20 md:py-20'>
        <div className='flex flex-col w-80 h-50'>
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
        <div className='flex flex-col justify-start bg-gray-100 p-4 mt-10 md:mt-0'>
          <h3>Login</h3>
          <form className='pt-10' onSubmit={handleSubmit}>
            <label className='text-lg md:text-xl font-medium pb-2'>
              Email
            </label>
            <input
              required
              type='email'
              id='email'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={handleChange}
              className='w-full px-4 py-2 mb-4 border-2 border-black'
            />
            <label className='text-lg md:text-xl font-medium pb-2'>
              Password
            </label>
            <input
              required
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={handleChange}
              name='password'
              className='w-full px-4 py-2 mb-4 border-2 border-black'
            />
            <div className='flex justify-end'>
              <button
                className='bg-black text-white text-lg px-8 py-2 hover:bg-gray-600'
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className='flex justify-end text-xs pt-2'>
            <button>Forgot password?</button>
          </div>
        </div>
        <div className='flex flex-col border-2 mt-10 md:mt-0 p-4 w-100 md:w-[250px] md:h-[200px]'>
          <h3>New Customers</h3>
          <p className='text-sm'>Create a free account to make checking out faster and easier!</p>
          <div className='flex justify-end my-2'>
            <Link to="/Register" >
              <button
                className='bg-black text-white px-6 py-2'
              >
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>) : 
        <LoggedInProfile />
      }
    </div>
  )
}

export default UserProfile
