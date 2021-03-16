import { createContext, ReactNode, useReducer } from "react";
import { reducer } from "./SiteReducer";

const initialState = {
  backgroundColor: "#efefef",
  fontColor: "#000",
};

interface dispatchValuesProps {
  type?: "SET_BACKGROUND_COLOR" | "SET_FONT_COLOR";
  payload?: any;
}

export const SiteContext = createContext({
  siteState: initialState,
  dispatchSite: (value: dispatchValuesProps | any) => value,
});

export const SiteContextConsumer = SiteContext.Consumer;

type Props = {
  children: ReactNode;
};

export const SiteContextProvider = ({ children }: Props) => {
  const [siteState, dispatchSite] = useReducer(reducer, initialState);
  return (
    <SiteContext.Provider value={{ siteState, dispatchSite }}>
      {children}
    </SiteContext.Provider>
  );
};
