import React, { createContext, ReactElement } from 'react';

const initialState = {
    title: 'Fused Allowance',
};

export const FusedAllowanceContext = createContext({
    globalState: initialState,
    dispatch: (value: any) => value,
});
export const FusedAllowanceConsumer = FusedAllowanceContext.Consumer;

const reducer = (state: any, action: { payload: any; type: any }) => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: payload,
            };
        default:
            return state;
    }
};

interface Props {
    children: ReactElement;
}

export const FusedAllowanceProvider = ({ children }: Props) => {
    const [globalState, dispatch] = React.useReducer(reducer, initialState);
    return (
        <FusedAllowanceContext.Provider value={{ globalState, dispatch }}>
            {children}
        </FusedAllowanceContext.Provider>
    );
};
