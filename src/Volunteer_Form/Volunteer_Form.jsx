import React, { useState, useEffect } from 'react';
import './Volunteer_Form.css';

const Volunteer_Form = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch volunteer name and matched event from the database
  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await fetch('http://localhost:3000/api/eventform'); // Adjust the URL based on your server setup
      const data = await response.json();
      setVolunteers(data);
    };

    const fetchEvents = async () => {
      const response = await fetch('http://localhost:3000/api/eventform'); // Adjust the URL based on your server setup
      const data = await response.json();
      setEvents(data);
    };

    fetchVolunteers();
    fetchEvents();
  }, []);

  const handleVolunteer = async (e) => {
    e.preventDefault();

    // Validate form
    if (!selectedVolunteer || !matchedEvent) {
      alert('Please select both a volunteer and an event.');
      return;
    }

    const url = 'http://localhost:3000/api/volunteerform'; // Adjust the URL based on your server setup
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        volunteer_id: selectedVolunteer,
        event_id: matchedEvent,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Match successful:', data);
      // Handle success case (e.g., show a success message, reset form, etc.)
      setSelectedVolunteer('');
      setMatchedEvent('');
    } else {
      console.error('Error matching volunteer:', response.statusText);
      // Handle error case (e.g., display error message)
    }
  };

  return (
    <div className="auth-background">
      <div className="container">
        <div className="header">
          <div className="text">Volunteer Matching Form</div>
          <div className="underline"></div>
        </div>
        <form className="inputs" onSubmit={handleVolunteer}>
          <div className="input">
            <label htmlFor="volunteerName">Volunteer Name</label>
            <select
              id="volunteerName"
              value={selectedVolunteer}
              onChange={(e) => setSelectedVolunteer(e.target.value)}
            >
              <option value="">Select a Volunteer</option>
              {volunteers.map(volunteer => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="matchedEvent">Matched Event</label>
            <select
              id="matchedEvent"
              value={matchedEvent}
              onChange={(e) => setMatchedEvent(e.target.value)}
            >
              <option value="">Select an Event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div className="submit-container">
            <button className="submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Volunteer_Form;