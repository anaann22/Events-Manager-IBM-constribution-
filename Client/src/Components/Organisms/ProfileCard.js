import '../../Style/Profile.css';
import userF from '../../Images/user-data.png';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const ProfileCard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Încarcă datele utilizatorului din local storage la montarea componentei
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Adaugă hook-ul useEffect

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Profile details</h2>
      </div>
      <div className="card-body">
        <img src={userF} alt="Profile Picture" className="profile-profile" />
        <div className="profile-detailsProfile">
          <p><strong>Full Name:  </strong>
          {user ? `${user.fullName}` : "No name"}
          </p>
          <p><strong>Email: </strong>
          {user ? `${user.email}` : "No name"}
          </p>
          <p><strong>Company address:  </strong> 123 Main St, Anytown USA</p>
          <p><strong>Company email:  </strong>YourCompany@cmp.ro </p>
          <p><strong>Time zone:  </strong>{moment().format('LT')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
