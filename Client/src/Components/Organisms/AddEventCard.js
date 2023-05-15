import '../../Style/Profile.css';
import calendar from '../../Images/calendar.png';
import React, { useState , useEffect } from 'react';
import '../../Style/AddEventCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileCard = () => {
  const [title, setEventName] = useState("");
  const [date1, setEventDate1] = useState("");
  const [date2, setEventDate2] = useState("");
  const [details, setEventDetails] = useState("");
  const [person, setEventPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
        const response = await axios.post('http://localhost:4444/event/create', {
            title,
            date1,
            date2,
            details,
            person,
        });

        navigate('/calendar');
        console.log("ceva");
    } catch (error) {
        console.error(error);
        const backendErrorMessage = error.response?.data?.message;
        setErrorMessage(backendErrorMessage || 'Eroare nu e adaugat event');
    }
  };



  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Event</h2>
      </div>
      <div className="card-body">
        <img src={calendar} alt="Profile Picture" className="profile-add" />
        <div className="profile-det">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Name:</label>
              <input
                type="text"
                className="form-control input-field"
                id="titlu"
                placeholder="Enter event name"
                value={title}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Start date:</label>
              <input
                type="date"
                className="form-control input-field"
                id="date1"
                placeholder="Enter event date"
                value={date1}
                onChange={(e) => setEventDate1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">End date:</label>
              <input
                type="date"
                className="form-control input-field"
                id="date2"
                placeholder="Enter event date"
                value={date2}
                onChange={(e) => setEventDate2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDetails">Event Details:</label>
              <textarea
                className="form-control input-field"
                id="details"
                rows="3"
                placeholder="Enter event details"
                value={details}
                onChange={(e) => setEventDetails(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventPerson">Persons:</label>
              <input
                type="text"
                className="form-control input-field"
                id="person"
                placeholder="Add persons to the event"
                value={person}
                onChange={(e) => setEventPerson(e.target.value)}
              />
              </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
