import React, { useState } from 'react';
import './Volunteer_Form.css';

const Volunteer_Form = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');

  // Example (Auto-fill from DB)
  const volunteers = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
    { id: '3', name: 'C' },
  ];

  const events = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="text">Volunteer Matching Form</div>
        <div className="underline"></div>
      </div>
      <form className="inputs">
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
      </form>
      <div className="submit-container">
        <button className="submit" type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Volunteer_Form;