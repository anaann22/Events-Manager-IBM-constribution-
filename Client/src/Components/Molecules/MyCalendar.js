import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

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
    const eventId = event.id; // Asigură-te că event.id este ID-ul evenimentului
    navigate(`/event/${eventId}`);
  };
  

  return (
    <div style={{ height: '82.6vh', paddingRight: '10px' }}> 
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        // onSelectEvent={event => alert(event.title, event.data)}
        onSelectEvent={handleSelectEvent}
      />
    </div>
);

};

export default MyCalendar;
