import '../../Style/Profile.css';
import calendar from '../../Images/calendar.png';
import React, { useState, useEffect } from 'react';
import '../../Style/AddEventCard.css';
import axios from 'axios';

const EventDetailsCard = () => {
  const [event, setEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4444/event/getEventDetails');
        setEvent(response.data);
      } catch (error) {
        console.error(error);
        const backendErrorMessage = error.response?.data?.message;
        setErrorMessage(backendErrorMessage || 'Error: unable to fetch event details');
        setSnackbarOpen(true);
      }
    };

    fetchEventDetails();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Event Details</h2>
      </div>
      <div className="card-body">
        <img src={calendar} alt="Event Picture" className="profile-add" />
        {!event ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="profile-det">
              <h3>{event.title}</h3>
              <p>Start Date: {event.startdate}</p>
              <p>End Date: {event.enddate}</p>
              <p>Details: {event.details}</p>
              {/* Afișează alte detalii despre eveniment */}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default EventDetailsCard;
