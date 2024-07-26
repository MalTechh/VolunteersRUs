import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../componenets/navbar.jsx';
import axios from 'axios';
import { notify } from '../Notification.jsx';
import './Home.css';  // Import the CSS file for styling

const AnyComponent = () => {
  const handleClick = () => {
    notify('This is a notification message!');
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
    </div>
  );
};



const Home = () => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUsernameAndUserType = async () => {
      const token = sessionStorage.getItem('authToken');

      if (token) {
        try {
          // Decode the JWT token
          const decodedToken = JSON.parse(atob(token.split('.')[1]));

          // Correctly access UserID and UserType
          const { UserID, UserType } = decodedToken;

          setUserType(UserType);

          // Fetch username based on UserID
          if (UserID) {
            const response = await axios.get(`http://localhost:3000/api/user/${UserID}`);
            setUsername(response.data.username);
          } else {
            console.error('UserID not found in the token.');
          }
        } catch (error) {
          console.error('Error decoding token or fetching username:', error);
        }
      } else {
        console.warn('No auth token found in sessionStorage.');
      }
    };

    fetchUsernameAndUserType();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        {username && <p className="welcome-message">Welcome back, {username}!</p>}
      </div>

      <div className="home-cards">
        {/* Conditionally render Event Form and Volunteer Form based on userType */}
        {userType !== 'Volunteer' && (
          <>
            <Link to="/eventform" className="home-card">
              <h3>Event Form</h3>
            </Link>
            <Link to="/volunteerform" className="home-card">
              <h3>Volunteer Form</h3>
            </Link>
            <Link to="/eventmanagement" className="home-card">
              <h3>Manage Events</h3>
            </Link>
            <Link to="/editprofile" className="home-card">
              <h3>Edit User Profile</h3>
            </Link>
          </>
        )}
        {userType !== 'Administrator' && (
          <>
            <Link to="/volunteerhistory" className="home-card">
              <h3>Volunteer History</h3>
            </Link>
            <Link to="/editprofile" className="home-card">
              <h3>Edit User Profile</h3>
            </Link>
          </>
        )}
       
      </div>
      <AnyComponent />
    </>
  );
};

export default Home;
