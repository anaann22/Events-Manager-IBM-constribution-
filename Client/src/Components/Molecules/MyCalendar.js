import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import EventDet from '../Molecules/EventDet.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [personsDialogOpen, setPersonsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdminUser = localStorage.getItem("isAdmin") === 'true';
  const navigate = useNavigate();

  const handlePersonsDialogClose = () => {
    setPersonsDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const deleteEvent = async (id) => {
    if (!isAdminUser) {
      setSnackbarMessage('error: You are not an admin user.');
      setSnackbarOpen(true);
      return;
    } else {
      try {
        await axios.delete(`http://localhost:4444/event/${id}`);
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        setSelectedEvent(null); // set selected event to null after deletion
        setSnackbarMessage('Event deleted succesfully.');
        setSnackbarOpen(true);
      } catch (err) {
        console.error(err);
        setSnackbarMessage('An error has occurred at delete event.');
        setSnackbarOpen(true);
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4444/event/getEvents');
      console.log(response.data);
      if (Array.isArray(response.data)) {
        // Filtrare evenimente în funcție de invitați
        const userInvitedEvents = response.data.filter(event => event.person.includes(currentUser.email));
  
        const events = userInvitedEvents.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
  
        setEvents(events);
      } else {
        console.error('The answer is not an array.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);
  

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setPersonsDialogOpen(true);
  };

  return (
    <div style={{ height: '82.6vh', paddingRight: '10px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <EventDet
          event={selectedEvent}
          open={personsDialogOpen}
          handleClose={handlePersonsDialogClose}
          onDelete={deleteEvent}
        />
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarMessage.includes('error') ? 'error' : 'success'}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default MyCalendar;
