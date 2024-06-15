import React from 'react';
import './Volunteer_History.css';

const Volunteer_History = ({ history }) => {
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <div className="volunteer-history">
      <h2>Volunteer History</h2>
      <table className="volunteer-history-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Required Skills</th>
            <th>Urgency</th>
            <th>Event Date</th>
            <th>Participation Status</th>
          </tr>
        </thead>
        <tbody>
          {safeHistory.length > 0 ? (
            safeHistory.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.requiredSkills.join(', ')}</td>
                <td>{event.urgency}</td>
                <td>{event.eventDate}</td>
                <td>{event.participationStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No volunteer history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Volunteer_History;