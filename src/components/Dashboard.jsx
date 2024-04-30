import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('http://localhost:3001/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='flex justify-center items-center'>
      <div className="py-8">
        {userData ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleLogout} className="px-3 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300 ease-in-out">Logout</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
