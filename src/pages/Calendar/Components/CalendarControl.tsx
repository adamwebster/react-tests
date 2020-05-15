import React, { useState, useContext } from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';
import { ToDoContext } from '../State';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
const CalendarControl = () => {
    const [date, setDate] = useState(dayjs());
    const { globalState, dispatch } = useContext(ToDoContext);
    const sidebarCollapsed = globalState.sidebarCollapsed;
    return (
        <>
            {!sidebarCollapsed ? (
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
            ) : (
                <>
                    <FontAwesomeIcon size="2x" icon={faCalendarAlt} />
                </>
            )}
        </>
    );
};

export default CalendarControl;
