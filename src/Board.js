
import './styles.css'; // Import the CSS file
import React, { useState, useEffect } from 'react';
import TicketColumn from './TicketColumn';
import { fetchData } from './api'; 

const groupTickets = (tickets, groupingOption) => {
  if (!Array.isArray(tickets)) {
    console.error('Tickets is not an array:', tickets);
    return null;
  }

  if (groupingOption === 'status') {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
      groupedTickets[status].push(ticket);
    });

    return groupedTickets;
  } else if (groupingOption === 'user') {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const user = ticket.userId || 'Unassigned';
      if (!groupedTickets[user]) {
        groupedTickets[user] = [];
      }
      groupedTickets[user].push(ticket);
    });

    return groupedTickets;
  } else if (groupingOption === 'priority') {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }
      groupedTickets[priority].push(ticket);
    });

    return groupedTickets;
  }

  return null;
};

const sortTickets = (tickets, sortOption) => {
  if (!Array.isArray(tickets)) {
    console.error('Tickets is not an array:', tickets);
    return null;
  }

  if (sortOption === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sortOption === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'status') {
    return tickets.sort((a, b) => a.status.localeCompare(b.status));
  }

  return null;
};

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  useEffect(() => {
    // Fetch data from API when component mounts
    fetchData()
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleGroupingOptionChange = (option) => {
    setGroupingOption(option);

    // Fetch data with the updated grouping option
    fetchData()
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);

    // Fetch data with the updated sort option
    fetchData()
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const groupedTickets = groupTickets(tickets, groupingOption);
  const sortedTickets = sortTickets(tickets, sortOption);

  return (
    <div className="board">
      {/* Button group for grouping options */}
      <div>
        <button onClick={() => handleGroupingOptionChange('status')} className='button-group color-button'>Group by Status</button>
        <button onClick={() => handleGroupingOptionChange('user')} className='button-group color-button'>Group by User</button>
        <button onClick={() => handleGroupingOptionChange('priority')} className='button-group color-button'>Group by Priority</button>
      </div>

      {/* Button group for sorting options */}
      <div>
        
        <button onClick={() => handleSortOptionChange('priority')} className='button-group color-button'>Sort by Priority</button>
        <button onClick={() => handleSortOptionChange('title')} className='button-group color-button'>Sort by Title</button>
        <button onClick={() => handleSortOptionChange('status')} className='button-group color-button'>Sort by Status</button>
      </div>

      {/* Render columns based on grouped tickets */}
      {groupedTickets &&
        Object.entries(groupedTickets).map(([group, groupTickets]) => (
          <TicketColumn key={group} title={group} tickets={groupTickets} />
        ))}

      {/* Render a column based on sorted tickets */}
      {sortedTickets && (
        <TicketColumn key="sortedColumn" title={`Sorted by ${sortOption}`} tickets={sortedTickets} />
      )}
    </div>
  );
};

export default Board;


