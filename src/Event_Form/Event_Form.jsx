import React, { useState } from 'react';
import './Event_Form.css';
import { useNavigate } from 'react-router-dom';

const Event_Form = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEvent = async () => {
    const newErrors = {};

    if (!eventName) newErrors.eventName = 'Event name is required';
    if (!eventDescription) newErrors.eventDescription = 'Event description is required';
    if (!location) newErrors.location = 'Location is required';
    if (requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required';
    if (!urgency) newErrors.urgency = 'Urgency level is required';
    if (!eventDate) newErrors.eventDate = 'Event date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = 'http://localhost:3000/api/eventform'; // Adjust the URL based on your server setup
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventName,
        event_description: eventDescription,
        location,
        required_skills: requiredSkills,
        urgency,
        event_date: eventDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Event created successfully:', data);

      // Reset form fields and errors after submission
      resetForm();
      navigate('/events');
    } else {
      console.error('Error creating event:', response.statusText);
    }
  };

  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setLocation('');
    setRequiredSkills([]);
    setUrgency('');
    setEventDate('');
    setErrors({});
  };

  const skillsOptions = [
    'Event Planning',
    'Public Speaking',
    'Customer Service',
    'Social Media Management',
    'First Aid/CPR',
    'Logistics'
  ];

  const urgencyOptions = [
    'Low',
    'Medium',
    'High',
  ];

  return (
    <div className="auth-background">
      <div className="container">
        <div className="header">
          <div className="text">Create Event</div>
          <div className="signup-underline"></div>
        </div>
        <div className="inputs">
          <div className={`input ${errors.eventName ? 'error-state' : ''}`}>
            <label htmlFor="eventName">Event Name</label>
            <input 
              type='text' 
              id='eventName'
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)} 
              placeholder='Event Name'
              required 
              maxLength={100}
              aria-required="true" 
            />
            {errors.eventName && <div className="error">{errors.eventName}</div>}
          </div>

          <div className={`input ${errors.eventDescription ? 'error-state' : ''}`}>
            <label htmlFor="eventDescription">Event Description</label>
            <textarea 
              id='eventDescription'
              value={eventDescription} 
              onChange={(e) => setEventDescription(e.target.value)} 
              placeholder='Event Description'
              required 
              aria-required="true"
            />
            {errors.eventDescription && <div className="error">{errors.eventDescription}</div>}
          </div>

          <div className={`input ${errors.location ? 'error-state' : ''}`}>
            <label htmlFor="location">Location</label>
            <textarea 
              id='location'
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder='Location'
              required 
              aria-required="true"
            />
            {errors.location && <div className="error">{errors.location}</div>}
          </div>

          <div className={`input ${errors.requiredSkills ? 'error-state' : ''}`}>
            <label htmlFor="requiredSkills">Required Skills</label>
            <div className="checkbox-group">
              {skillsOptions.map(skill => (
                <div key={skill}>
                  <input
                    type="checkbox"
                    id={skill}
                    value={skill}
                    checked={requiredSkills.includes(skill)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRequiredSkills(prevSkills => [...prevSkills, skill]);
                      } else {
                        setRequiredSkills(prevSkills => prevSkills.filter(item => item !== skill));
                      }
                    }}
                  />
                  <label htmlFor={skill}>{skill}</label>
                </div>
              ))}
            </div>
            {errors.requiredSkills && <div className="error">{errors.requiredSkills}</div>}
          </div>

          <div className={`input ${errors.urgency ? 'error-state' : ''}`}>
            <label htmlFor="urgency">Urgency</label>
            <select 
              id='urgency'
              value={urgency} 
              onChange={(e) => setUrgency(e.target.value)} 
              required
              aria-required="true"
            >
              {urgencyOptions.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.urgency && <div className="error">{errors.urgency}</div>}
          </div>

          <div className={`input ${errors.eventDate ? 'error-state' : ''}`}>
            <label htmlFor="eventDate">Event Date</label>
            <input 
              type='date' 
              id='eventDate'
              value={eventDate} 
              onChange={(e) => setEventDate(e.target.value)} 
              required
              aria-required="true" 
            />
            {errors.eventDate && <div className="error">{errors.eventDate}</div>}
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleEvent}>Create Event</button>
        </div>
      </div>
    </div>
  );
}

export default Event_Form;
