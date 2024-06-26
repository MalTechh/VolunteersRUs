import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
          const response = await axios.get(`http://localhost:3000/api/user/${userId}`);

          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to the Homepage</h1>
        <Logout />
        {username && <p>Welcome back, {username}!</p>}
      </div>

      <div className="home-cards">
        <Link to="/eventform" className="home-card">
          <h3>Event Form</h3>
          <p>Create a new event</p>
        </Link>
        <Link to="/userprofile" className="home-card">
          <h3>User Profile</h3>
          <p>View and edit your profile</p>
        </Link>
        <Link to="/volunteerhistory" className="home-card">
          <h3>Volunteer History</h3>
          <p>View your volunteer history</p>
        </Link>
        <Link to="/volunteerform" className="home-card">
          <h3>Volunteer Form</h3>
          <p>Sign up as a volunteer</p>
        </Link>
      </div>
    </>
  );
};

export default Home;
