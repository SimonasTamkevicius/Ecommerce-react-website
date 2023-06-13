import React from 'react'

const UserProfile = () => {
  return (
    <div className='lg:grid lg:grid-cols-3 lg:gap-4 py-10 px-10 md:px-20 md:py-20'>
      <div className='flex flex-col w-80 h-50'>
        <h1 className='flex justify-start text-4xl'>My Account</h1>
        <p className='pt-4'>Account Settings</p>
        <p className='pl-5 text-sm hover:cursor-pointer'>Create Account</p>
        <hr className='lg:w-80'></hr>
      </div>
      <div className='flex flex-col justify-start bg-gray-100 p-4 mt-10 md:mt-0'>
        <h3>Login</h3>
        <form className='pt-10'>
          <label htmlFor='email' className='text-lg md:text-xl font-medium pb-2'>
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
          <label htmlFor='password' className='text-lg md:text-xl font-medium pb-2'>
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
        </form>
        <div className='flex justify-end'>
          <button
            className='bg-black text-white text-lg px-8 py-2 hover:bg-gray-600'
          >
            Login
          </button>
        </div>
        <div className='flex justify-end text-xs pt-2'>
          <button>Forgot password?</button>
        </div>
      </div>
      <div className='flex flex-col border-2 mt-10 md:mt-0 p-4 w-100 md:w-[250px] md:h-[200px]'>
        <h3>New Customers</h3>
        <p className='text-sm'>Create a free account to make checking out faster and easier!</p>
        <div className='flex justify-end my-2'>
          <button
            className='bg-black text-white px-6 py-2'
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
