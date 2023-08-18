import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'

function Register() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();

  const navigate = useNavigate(); // Initialize useNavigate

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

  return (
    <div className='flex flex-col justify-center items-center p-4 mt-10 md:mt-0'>
      <form className='p-10 bg-gray-100 ' onSubmit={handleSubmit}>
        <div className='flex flex-row space-x-2'>
          <div className='flex flex-col w-50'>
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
              className='w-full px-4 py-2 mb-4 border-2 border-black'
            />
          </div>
          <div className='flex flex-col w-50'>
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
              className='w-full px-4 py-2 mb-4 border-2 border-black'
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
          className='w-full px-4 py-2 mb-4 border-2 border-black'
        />
        <label className='text-lg md:text-xl font-medium pb-2'>
          Password
        </label>
        <input
          required
          type='password'
          id='password'
          value={password}
          onChange={handleChange}
          placeholder='Enter password'
          name='password'
          className='w-full px-4 py-2 mb-4 border-2 border-black'
        />
        <div className='flex justify-end'>
          <button
            className='bg-black text-white text-lg px-8 py-2 hover:bg-gray-600'
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default Register;
