import '../../Style/Profile.css';
import user from '../../Images/user.png';
import React, { useState, useEffect } from 'react';
import '../../Style/Profile.css';

const ProfileCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">John Doe</h2>
      </div>
      <div className="card-body">
        <img src={user} alt="Profile Picture" className="profile-picture" />
        <div className="profile-details">
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Main St, Anytown USA</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
