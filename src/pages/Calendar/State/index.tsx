import React, { createContext, ReactElement } from 'react';
import dayjs from 'dayjs';

const initialState = {
    calendarTodoList: [],
    newToDoVisible: false,
    editToDoVisible: false,
    selectedDate: new Date().toString(),
    toDoItem: {
        id: 0,
        title: 'Test',
        dateDue: dayjs().format('MMMM Do, YYYY'),
        description: 'Hey this is where a description would go.',
    },
};

export const ToDoContext = createContext({
    globalState: initialState,
    dispatch: (value: any) => value,
});
export const ToDoContextConsumer = ToDoContext.Consumer;

const reducer = (state: any, action: { payload: any; type: any }) => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_TODOS':
            return {
                ...state,
                calendarTodoList: payload.calendarTodoList,
            };
        case 'SHOW_NEW_TODO':
            return {
                ...state,
                editToDoVisible: false,
                newToDoVisible: payload,
            };
        case 'SHOW_EDIT_TODO':
            return {
                ...state,
                newToDoVisible: false,
                editToDoVisible: payload,
            };
        case 'SET_TODO_ITEM':
            return {
                ...state,
                toDoItem: payload,
            };
        case 'SET_SELECTED_DATE':
            return {
                ...state,
                selectedDate: payload,
            };
        default:
            return state;
    }
};

interface Props {
    children: ReactElement;
}
export const ToDoContextProvider = ({ children }: Props) => {
    const [globalState, dispatch] = React.useReducer(reducer, initialState);
    return (
        <ToDoContext.Provider value={{ globalState, dispatch }}>
            {children}
        </ToDoContext.Provider>
    );
};
