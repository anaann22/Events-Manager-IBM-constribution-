import React, { useState, useEffect } from 'react'; // Adaugă importurile necesare
import '../../Style/Header.css';
import logo from '../../Images/logo2.png';
import User from './../Molecules/UserDropDown';

const Header = () => {
  const [user, setUser] = useState(null); // Adaugă starea pentru user

  useEffect(() => {
    // Încarcă datele utilizatorului din local storage la montarea componentei
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Adaugă hook-ul useEffect

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
      <h2 className="title">
        {user ? `Welcome, ${user.fullName}, to your company events!` : "Welcome to your company events!"}
      </h2>
      <User></User>
    </div>
  );
};

export default Header;
