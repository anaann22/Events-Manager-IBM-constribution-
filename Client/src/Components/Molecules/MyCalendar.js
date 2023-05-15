import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = props => (
  <div style={{ height: '84.5vh' }}>
    <Calendar
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
      onSelectEvent={event => alert(event.title)}
    />
  </div>
);

export default MyCalendar;
