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

#root{
  height: 100vh;
}

.App{
  height:calc(100vh - 50px);
  width: 100vw;
  float:left;
}

a{
  color: ${props => props.theme.accentColor}
}
 `

 const Navigation = styled.ul`
 background-color:#333;
 list-style:none;
 padding:0;
 margin:0;
 width:100%;
 display:block;
 float:left;
 height:50px;
 li{
   float:left;
   a{
     padding: 15px;
     display:block;
     border-right: solid 1px #545454;
     width: auto;
     text-decoration:none;

   }
 }
 `
function App() {
  const [theme, setTheme] = useState(themes.default);
  return (
    <ThemeProvider theme={theme}>
              <GlobalStyle />
   
    <Navigation>
    <li>
      <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/login">Login</Link>
      </li>
      </Navigation>
    <div className="App">
      <Switch>
        <Route exact path="/">
        Click on of the pages about to show examples
        </Route>
        <Route path="/login"><LoginPage /></Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
