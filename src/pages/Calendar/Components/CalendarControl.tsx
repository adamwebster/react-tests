import React, { useState, useContext } from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';
import { ToDoContext } from '../State';

const CalendarControl = () => {
    const [date, setDate] = useState(dayjs());
    const { globalState, dispatch } = useContext(ToDoContext);
    return (
        <Calendar
            datesWithToDos={globalState.allToDos}
            size={280}
            selectedDate={date}
            onChange={(date) => {
                dispatch({ type: 'SET_SELECTED_DATE', payload: date });
                dispatch({ type: 'SHOW_EDIT_TODO', payload: false });
                setDate(dayjs(date));
            }}
        />
    );
};

export default CalendarControl;
