// Home.jsx

import React, { useEffect, useState } from 'react';
import Logout from '../Authentication/Logout.jsx';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
 
    const fetchUsername = async () => {
      const token = sessionStorage.getItem('authToken');
     
      if (token) {
        try {
           
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const { userId } = decodedToken;
    
          // Fetch username based on userId
          const response = await axios.get(`http://localhost:3000/api//user/${userId}`);
        
          setUsername(response.data.username); 
        } catch (error) {
          console.error('Error fetching username:', error);
        }    
      }
    }

    fetchUsername();
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to the Homepage</h1>
        <Logout />
        {username && <p>Welcome back, {username}!</p>}
      </div>
    </>
  );
};

export default Home;
