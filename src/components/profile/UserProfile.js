import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import LoggedInProfile from './LoggedInProfile';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const UserProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

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

      axiosInstance
        .post('/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          loginUser(response.data.role, response.data.accessToken, response.data._id, response.data.fName, response.data.lName, response.data.email);
          setEmail('');
          setPassword('');
          navigate('/UserProfile');
        })
        .catch(function (error) {
          setErrorMessage('Failed to login user.');
          setTimeout(() => {
            setErrorMessage("");
            navigate("/UserProfile")
          }, 1500);
          console.error('Error:', error);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {errorMessage.length > 0 && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-80">
          <p className="text-white text-xl">{errorMessage}</p>
        </div>
      )}
      {!user.loggedIn ? (
      <div className='lg:grid lg:grid-cols-3 lg:gap-4 py-10 px-10 md:px-20 md:py-20'>
        <div className='flex flex-col w-80 h-50'>
          <h1 className='flex justify-start text-4xl'>My Account</h1>
          <p className='pt-4'>Account Settings</p>
          {user.loggedIn ? null : 
          <Link to='/Register' className='no-underline text-black'>
            <button className='pl-5 text-sm hover:cursor-pointer'>Create Account</button>
          </Link>}
          <hr className='lg:w-80'></hr>
        </div>
        <div className='flex flex-col justify-start bg-gray-100 p-4 mt-10 md:mt-0'>
          <h1 className='text-4xl font-medium'>Register</h1>
          <form className='pt-3' onSubmit={handleSubmit}>
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
              className='w-full px-2 py-2 mb-4 border-2 border-black'
            />
            <div className='relative'>
              <label className='text-lg md:text-xl font-medium pb-2'>
                Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"} 
                id='password'
                placeholder='Enter password'
                value={password}
                onChange={handleChange}
                name='password'
                className='w-full px-2 py-2 mb-4 border-2 border-black'
              />
              <span
                className="absolute right-3 top-12 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEye className='text-xl' /> : <AiOutlineEyeInvisible className='text-xl' />}
              </span>
            </div>
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
        <div className='flex flex-col border-2 mt-10 p-4 w-100 md:w-[250px] md:h-[200px] md:mt-10 lg:mt-0'>
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
