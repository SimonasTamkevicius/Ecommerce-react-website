import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Register() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useAuth();

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fName && lName && email && password) {
      const formData = new URLSearchParams();
      formData.append('fName', fName);
      formData.append('lName', lName);
      formData.append('email', email);
      formData.append('password', password);

      axiosInstance
        .post('/register', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          console.log(response.data.role);
          loginUser(response.data.role, response.data.accessToken, response.data._id, response.data.fName, response.data.lName, response.data.email)
          navigate('/UserProfile');
        })
        .catch(function (error) {
          setMessage('Failed to register user');
          console.error('Error:', error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const inputStateMap = {
      fName: setFName,
      lName: setLName,
      email: setEmail,
      password: setPassword
    };

    const stateUpdater = inputStateMap[name];
    if (stateUpdater) {
        stateUpdater(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='lg:grid lg:grid-cols-3 lg:gap-4 py-10 px-10 md:px-20 md:py-20'>
      <div className='flex flex-col w-80 h-50'>
        <h1 className='flex justify-start text-4xl'>My Account</h1>
        <p className='pt-4'>Account Settings</p>
        {user.loggedIn ? null : 
        <Link to='/UserProfile' className='no-underline text-black'>
          <button className='pl-5 text-sm hover:cursor-pointer'>Login</button>
        </Link>}
        <hr className='lg:w-80'></hr>
      </div>
      <div className='flex flex-col p-4 md:mt-0 bg-gray-100'>
        <h1 className='text-4xl font-medium'>Register</h1>
        <form className='pt-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <div className='flex flex-col w-full'>
              <label className='text-lg md:text-xl font-medium pb-2'>
                First Name
              </label>
              <input
                required
                type='fName'
                id='fName'
                value={fName}
                onChange={handleChange}
                placeholder='Enter first name'
                name='fName'
                className='w-full px-2 py-2 mb-4 border-2 border-black'
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='text-lg md:text-xl font-medium pb-2'>
                Last Name
              </label>
              <input
                required
                type='lName'
                id='lName'
                value={lName}
                onChange={handleChange}
                placeholder='Enter last name'
                name='lName'
                className='w-full px-2 py-2 mb-4 border-2 border-black'
              />
            </div>
          </div>
          <label className='text-lg md:text-xl font-medium pb-2'>
            Email
          </label>
          <input
            required
            type='email'
            id='email'
            value={email}
            onChange={handleChange}
            placeholder='Enter email'
            name='email'
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
              value={password}
              onChange={handleChange}
              placeholder='Enter password'
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
              className='bg-black text-white text-lg px-6 py-2 hover:bg-gray-600'
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        {message && <div>{message}</div>}
      </div>
      <div className='flex flex-col border-2 mt-10 p-4 w-100 md:w-[250px] md:h-[200px] md:mt-10 lg:mt-0'>
          <h3>Already a Customer?</h3>
          <p className='text-sm'>Login to save you order history!</p>
          <div className='flex justify-end my-2'>
            <Link to="/UserProfile" >
              <button
                className='bg-black text-white px-6 py-2'
              >
                Login
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Register;
