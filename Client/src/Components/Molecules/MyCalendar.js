import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

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
          console.error('Răspunsul nu este un array');
        }
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div style={{ height: '82.6vh', paddingRight: '10px' }}> 
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={event => alert(event.title)}
      />
    </div>
);

};

export default MyCalendar;
