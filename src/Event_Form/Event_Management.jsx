import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componenets/navbar.jsx';
import './Event_Form.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };
  

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    console.log(eventId);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter(event => event.EventID !== eventId));
        setNotification('Event deleted successfully!');
      } else {
        setNotification('Error deleting event: ' + response.statusText);
      }
    } catch (error) {
      setNotification('Error deleting event: ' + error.message);
    }

    // Clear notification after a few seconds
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleEdit = (event) => {
    navigate(`/editevent/${event.EventID}`, { state: { event } });
  };

  return (
    <>
      <NavBar />
      <div className="auth-background">
        <div className="container">
          <div className="header">
            <div className="text">Manage Events</div>
            <div className="signup-underline"></div>
          </div>
          {notification && (
            <div className="notification">
              {notification}
            </div>
          )}
          <div className="event-list">
            {events.map(event => (
              <div key={event.EventID} className="event-item">
                <h3>{event.EventName}</h3>
                <p>{event.Description}</p>
                <p>Location: {event.Location}</p>
                <p>Required Skills: {event.RequiredSkills}</p>
                <p>Urgency: {event.Urgency}</p>
                <p>Event Date: {formatDate(event.EventDate)}</p>
                <button className='edit-button' onClick={() => handleEdit(event)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(event.EventID)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventManagement;