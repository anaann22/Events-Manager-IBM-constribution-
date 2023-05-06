import React from 'react';
import '../../Style/Header.css';
import logo from '../../Images/logo.png';
import User from './../Molecules/UserDropDown';

const Header = () => {
  return (
    <div className= "container">
      <img alt="" src={logo} />
      <h2 className= "title">Company Social Events</h2>
      <User></User>
    </div>
  );
};

export default Header;
