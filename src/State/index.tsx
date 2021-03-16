import React, { createContext, ReactElement } from 'react';
import { Colors } from '@adamwebster/fused-components';

const initialState = {
    backgroundColor: Colors.mediumlight,
};

export const AppContext = createContext({
    appState: initialState,
    dispatchApp: (value: any) => value,
});
export const AppContextConsumer = AppContext.Consumer;

const reducer = (state: any, action: { payload: any; type: any }) => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_BACKGROUND_COLOR':
            return {
                ...state,
                backgroundColor: payload,
            };
        default:
            return state;
    }
};

interface Props {
    children: ReactElement;
}
export const AppContextProvider = ({ children }: Props) => {
    const [appState, dispatchApp] = React.useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ appState, dispatchApp }}>
            {children}
        </AppContext.Provider>
    );
};
