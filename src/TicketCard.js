// TicketCard.js

import React from 'react';
import './styles.css'; // Import the CSS file

const TicketCard = ({ ticket }) => {
  // Extract relevant ticket information
  const { title, user, status, priority } = ticket;

  return (
    <div className="ticket-card">
      <h3>Title: {title}</h3>
      <p>User: {user || 'Unassigned'}</p>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      {}
    </div>
  );
};

export default TicketCard;
