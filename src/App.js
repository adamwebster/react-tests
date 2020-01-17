import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle, css } from "styled-components";
import themes from './themes/'

import LoginPage from './pages/LoginPage';
import About from './pages/About';
import { device } from './styles/mediaqueries';

const GlobalStyle = createGlobalStyle`

  body {
    color: ${props => props.theme.foregroundColor};
    margin: 0;
    padding: 0;
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
   background-color: ${props => props.theme.backgroundColor};
   width:100%;
 
   @media ${device.mobileS} {
  
 }

#root,
.App{
  height: 100vh;
}
 `
function App() {
  const [theme, setTheme] = useState(themes.default);
  return (
    <ThemeProvider theme={theme}>
              <GlobalStyle />

    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
