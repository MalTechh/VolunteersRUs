import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Authentication/Logout.jsx";
import "./navbar.css";  // Import CSS for the navbar

function NavBar() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // Decode the JWT token
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      
      // Correctly access UserID and UserType
      const { UserType } = decodedToken;
      setUserType(UserType);
    }
  }, []); 

  const handleNavigateToHome = () => {
    navigate('/home');
  };

  return (
    <>
      <nav className="navbar">

        <div className="nav-container">
     
          
            <div className="nav-role">
              {userType && <span>{userType}</span>}
            </div>

           <div className="nav-title" onClick={handleNavigateToHome}>
              VolunteersRUs
            </div>

            {/* Add the Logout button in the navbar */}
            <div className="nav-logout">
              <Logout />
            </div>

         
        </div>
      </nav>
    </>
  );
}

export default NavBar;
