import react from "react";


export const initialState = {
  loading: false
};

export const RSSContext = react.createContext({});

export const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    case "LOADED":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
