// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import { fetchData } from './api';
import ReactDOM from 'react-dom';

import './styles.css'; 

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById('root')
);


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  useEffect(() => {
    fetchData().then((data) => setTickets(data));
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="app">

      <Board tickets={tickets} groupingOption={groupingOption} sortOption={sortOption} />
    </div>
  );
};

export default App;
