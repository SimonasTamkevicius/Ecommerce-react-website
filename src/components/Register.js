import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'

function Register() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loginUser } = useAuth();

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Only execute the form submission if email and password are not empty
    if (email && password) {
      // Create URLSearchParams object
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      axios
        .post('/register', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(function (response) {
          console.log(response.data.role);
          loginUser(response.data.role, response.data.accessToken)
          navigate('/UserProfile');
        })
        .catch(function (error) {
          setMessage('Failed to register user');
          console.error('Error:', error);
        });
    }
  }, [email, password, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail(event.target.email.value);
    setPassword(event.target.password.value);
  };

  return (
    <div className='flex flex-col justify-center items-center p-4 mt-10 md:mt-0'>
      <form className='p-10 bg-gray-100 ' onSubmit={handleSubmit}>
          <label className='text-lg md:text-xl font-medium pb-2'>
            Email
          </label>
          <input
            required
            type='email'
            id='email'
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
