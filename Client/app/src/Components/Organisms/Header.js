import React from 'react';
import '../../Style/Header.css';
import logo from '../../Images/logo.png'
import UserButton from "../Atoms/UserButton"

const Header = () => {
  return (
    <div className= "container">
      <img src={logo} />
      <h2 className= "title">Company Social Events</h2>
      <div className='userButton'><UserButton/></div>
    </div>
  );
};

export default Header;
