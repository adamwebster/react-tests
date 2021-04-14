import { createContext } from 'react';

const initialState = {};
export const SiteContext = createContext(initialState);

export const SiteContextProvider = SiteContext.Provider;

export const SiteContextConsumer = SiteContext.Consumer;
