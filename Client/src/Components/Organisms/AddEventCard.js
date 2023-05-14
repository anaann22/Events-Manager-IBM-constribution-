import '../../Style/Profile.css';
import calendar from '../../Images/calendar.png';
import React, { useState } from 'react';
import '../../Style/AddEventCard.css';

const ProfileCard = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventPerson, setEventPerson] = useState("");

  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log({
      eventName,
      eventDate,
      eventDetails,
      eventPerson,
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Event</h2>
      </div>
      <div className="card-body">
        <img src={calendar} alt="Profile Picture" className="profile-add" />
        <div className="profile-det">
          <form onSubmit={handleEventSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Name:</label>
              <input
                type="text"
                className="form-control input-field"
                id="eventName"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Date:</label>
              <input
                type="date"
                className="form-control input-field"
                id="eventDate"
                placeholder="Enter event date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDetails">Event Details:</label>
              <textarea
                className="form-control input-field"
                id="eventDetails"
                rows="3"
                placeholder="Enter event details"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventPerson">Persons:</label>
              <input
                type="text"
                className="form-control input-field"
                id="eventPerson"
                placeholder="Add persons to the event"
                value={eventPerson}
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
