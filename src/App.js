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
import CSSGrid from './pages/CSSGrid';
import { FollowPage } from './pages/FollowPage';
import followImg from './static/follow.png';
import loginImg from './static/login.png';
import { WeatherApp } from './pages/WeatherApp';
import NewsFeed from './pages/NewsFeed';
const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.foregroundColor};
    margin: 0;
    padding: 0;
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
   background-color: ${props => props.theme.backgroundColor};
   width:100%;
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

const Grid = styled.div`
  display:grid;
  grid-gap: 20px;
  width: 330px;
  margin: 0 auto;
  grid-template-columns: auto auto;
  grid-template-rows: 300px;

  padding:10px;
  justify-items: center;
`

const GridItem = styled.div`
  box-sizing:border-box;
  ${props => props.gridColumn && css`
    grid-column: ${props.gridColumn};
  `}

  ${props => props.gridRow && css`
    grid-row: ${props.gridRow};
  `}
  h3{
    width: 100%;
    text-align:center;
  }
`

const StyledLink = styled(Link)`
  background-image: url(${(props) => props.image});
  background-size: cover;
    background-position:top center;
    width: 150px;
    height: 150px;
    display: inline-block;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    transition: all 0.2s ease;
    &:hover{
      transform: scale(1.02);
    }
`

const WelcomeMessage = styled.div`
  width: 100%;
  text-align:center;
  margin: 50px auto;
`
function App() {
  const [theme, setTheme] = useState(themes.default);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <div className="App">
        <Switch>
          <Route exact path="/">
            <WelcomeMessage>
            Click on of the pages to show examples
            </WelcomeMessage>
            <Grid>
              <GridItem>
        <StyledLink image={loginImg} to="/login" />
        <Link to="/Login"><h3>Login Card</h3></Link>
        </GridItem>
        <GridItem>
            <StyledLink image={followImg} to="/follow" />
            <Link to="/follow"><h3>Social Profile Card</h3></Link>
            </GridItem>
            </Grid>
          </Route>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/grid">
            <CSSGrid />
          </Route>
          <Route path="/follow">
            <FollowPage />
          </Route>
          <Route path="/weather">
            <WeatherApp />
          </Route>
          <Route path="/newsfeed">
            <NewsFeed />  
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
