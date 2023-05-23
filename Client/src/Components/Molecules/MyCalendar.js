import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import EventDet from '../Molecules/EventDet.js';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [personsDialogOpen, setPersonsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSnackbarClose = () => {
      setSnackbarOpen(false);
  };

  const handlePersonsDialogClose = () => {
    setPersonsDialogOpen(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4444/event/getEvents');
        // Verifică dacă răspunsul este un array
        if (Array.isArray(response.data)) {
          // Convertește datele 'start' și 'end' în obiecte Date
          const events = response.data.map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
          }));
  
          setEvents(events);
        } else {
          console.error('The answear is not an array.');
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



  return (
    <div style={{ height: '82.6vh', paddingRight: '10px' }}> 
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={event => alert(event.title, event.data)}
      />
      {selectedEvent && (
        <EventDet
          event={selectedEvent}
          open={personsDialogOpen}
          handleClose={handlePersonsDialogClose}
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
  

    </div>
);

};

export default MyCalendar;
