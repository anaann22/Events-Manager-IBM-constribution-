import React, { useState, useEffect } from 'react';
import moment from 'moment';
import userF from '../../Images/user-data.png';
import '../../Style/Profile.css';

const EditProfileCard = () => {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Încarcă datele utilizatorului din local storage la montarea componentei
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Adaugă hook-ul useEffect

  const handleEditClick = () => {
    setEditMode(true);
    setFullName(user ? user.fullName : "");
    setEmail(user ? user.email : "");
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...user,
      fullName: fullName,
      email: email
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditMode(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Profile details</h2>
      </div>
      <div className="card-body">
        <img src={userF} alt="Profile Picture" className="profile-profile" />
        <div className="profile-detailsProfile">
          <p>
            <strong>Full Name: </strong>
            {editMode ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            ) : (
              (user && user.fullName) || "No name"
            )}
          </p>
          <p>
            <strong>Email: </strong>
            {editMode ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              (user && user.email) || "No email"
            )}
          </p>
          <p>
            <strong>Company address: </strong> 123 Main St, Anytown USA
          </p>
          <p>
            <strong>Company email: </strong>YourCompany@cmp.ro
          </p>
          <p>
            <strong>Time zone: </strong>
            {moment().format('LT')}
          </p>
          {editMode ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;