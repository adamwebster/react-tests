import React, { useEffect, useState } from 'react';
import Calendar from './Components/Calendar';
import dayjs from 'dayjs';

const CalendarDemo = () => {
    const [date, setDate] = useState(dayjs());
    return (
        <>
            <h1>Calendar</h1>
            {date.format('MMMM Do YYYY')}
            <Calendar
                selectedDate={date}
                onChange={(date) => setDate(dayjs(date))}
            />
        </>
    );
};

export default CalendarDemo;
