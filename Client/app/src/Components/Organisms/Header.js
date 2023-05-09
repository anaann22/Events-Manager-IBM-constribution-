import React from 'react';
import '../../Style/Header.css';
import logo from '../../Images/logo2.png';
import User from './../Molecules/UserDropDown';

const Header = () => {
  return (
    <div className="container">
      <img
        className="logo"
        alt=""
        src={logo}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
      <h2 className="title">Company Social Events</h2>
      <User></User>
    </div>
  );
};

export default Header;
