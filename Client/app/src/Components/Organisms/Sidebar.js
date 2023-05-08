import React from 'react';
import '../../Style/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h2>Sidebar</h2>
      <p>Some content goes here...</p>
    </div>
  );
};

export default Sidebar;
