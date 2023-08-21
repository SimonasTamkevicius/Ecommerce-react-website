import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../utils/AuthContext';

const DisplayUsers = () => {

    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user.role === "Admin") {
            axiosInstance("/users", {
                params: {
                loggedIn: user.loggedIn,
                role: user.role
            }
            }
            )
            .then(function (response) {
                setUsers(response.data);
                setUsers(response.data.map(user => ({ ...user, viewDetails: false })));
            })
            .catch(function (err) {
              console.log(err);
            });
        }
    },[user.loggedIn, user.role])

    const toggleUserView = (userIdx) => {
        let updatedUsers = [...users];
        updatedUsers[userIdx].viewDetails = !updatedUsers[userIdx].viewDetails;
        setUsers(updatedUsers);
    }

  return (
    <div>
        {users.map((user, i) => {
            return (
                <div key={i} className='mb-10 shadow-md'>
                    <div className='flex flex-col items-center md:flex-row justify-between px-4 shadow-md rounded-md pt-3'>
                        <p>Name: <b>{user.fName} {user.lName}</b></p>
                        <p></p>
                        <p className='text-md md:text-sm hover:cursor-pointer border-2 border-gray-400 p-1 hover:bg-gray-400 hover:text-white rounded-sm transition-colors duration-150 ease-in-out' onClick={() => toggleUserView(i)}>
                            {!user.viewDetails ? "Show Details" : "Hide Details"}
                        </p>
                    </div>
                    {user.viewDetails &&
                        <div className='flex flex-col md:flex-row justify-between px-4 mt-3'>
                            <p>User ID: <b>{user._id}</b></p>
                            <p>Email: <b>{user.email}</b></p>
                            <p>Role: <b>{user.role}</b></p>
                        </div>
                    }
                </div>
            )
        })}
    </div>
  )
}

export default DisplayUsers