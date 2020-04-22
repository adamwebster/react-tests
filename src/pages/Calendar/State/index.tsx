import React, { createContext, ReactElement } from 'react';

const initialState = {
    calendarTodoList: [],
    newToDoVisible: false,
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
                newToDoVisible: payload,
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
