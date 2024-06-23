import React, { useEffect, useState } from 'react';
import Volunteer_History from './Volunteer_History';
import './Volunteer_History.css';

const VolunteerHistoryContainer = ({ volunteerId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      const url = 'http://localhost:3000/api/volunteerhistory'; // Adjust the URL based on your server setup
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setHistory(data);
    };

    fetchVolunteerHistory();
  }, []);

  return (
    <div className="auth-background">
      <div className="container">
        <Volunteer_History history={history} />
      </div>
    </div>
  );
};

export default VolunteerHistoryContainer;
