import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import EventDet from '../Molecules/EventDet.js';

import { Button } from '@mui/material';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [personsDialogOpen, setPersonsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handlePersonsDialogClose = () => {
    setPersonsDialogOpen(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4444/event/getEvents');
        if (Array.isArray(response.data)) {
          const events = response.data.map(event => ({
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

    fetchEvents();
  }, []);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setPersonsDialogOpen(true);
  };

  const EventPopup = ({ event }) => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Event details</DialogTitle>
      <DialogContent>
          <Typography variant="subtitle1">Name: {eventName}</Typography>
          <Typography variant="subtitle1">Date: {stratDate}</Typography>
          <Typography variant="subtitle1">Location: {endDate}</Typography>
          {/* Add more details as needed */}
      </DialogContent>


      <DialogActions>
          <Button onClick={handleClose} variant="outlined">
              Close
          </Button>
      </DialogActions>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
          {errorMessage !== '' ? (
              <Alert onClose={handleSnackbarClose} severity="error">
                  {errorMessage}
              </Alert>
          ) : (
              <Alert onClose={handleSnackbarClose} severity="success">
                  {successMessage}
              </Alert>
          )}
      </Snackbar>
  </Dialog>
  )};


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
      {selectedEvent && <EventPopup event={selectedEvent} />}   

    </div>
  );
  
    };

export default MyCalendar;
