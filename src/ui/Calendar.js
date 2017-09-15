import React from 'react';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export const Calendar = ({ events }) => (
    <BigCalendar
        events={events}
        defaultView='week'
        defaultDate={new Date(2018, 8, 2)}
        views={['week']}
        toolbar={false}
        formats={{dayFormat:'dddd'}}
        //min={new Date(2018,8,2,10,30,0,0)}
    />
)
