import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';

import LoginPage from './pages/LoginPage';
import About from './pages/About';
import { FollowPage } from './pages/FollowPage';
import followImg from './static/follow.png';
import priceTableImg from './static/pricetable.jpg';
import playlistImg from './static/playlist.jpg';
import rssImage from './static/RSSReader.jpg';

import { FCThemeProvider, Colors } from '@adamwebster/fused-components';
import loginImg from './static/login.png';
import NewsFeed from './pages/NewsFeed';
import PricingTable from './pages/PricingTable/PricingTable';
import SpotifyPlaylist from './pages/SpotifyPlaylist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RSSReader from './pages/RSSReader/RSSReader';
import { LazyComponent } from './pages/LazyComponents';
import { CalendarDemo } from './pages/Calendar';
import { AppContextProvider } from './State';
import BodyStyles from './BodyStyles';

const Grid = styled.div`
    display: grid;
    grid-gap: 20px;
    width: 330px;
    margin: 0 auto;
    grid-template-columns: auto auto;
    grid-template-rows: auto;

    padding: 10px;
    justify-items: center;
`;

const GridItem = styled.div`
    box-sizing: border-box;
    ${(props) =>
        props.gridColumn &&
        css`
            grid-column: ${props.gridColumn};
        `}

    ${(props) =>
        props.gridRow &&
        css`
            grid-row: ${props.gridRow};
        `}
  h3 {
        width: 100%;
        text-align: center;
    }
`;

const StyledLink = styled(Link)`
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: top center;
    width: 150px;
    height: 150px;
    display: inline-block;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    transition: all 0.2s ease;
    &:hover {
        transform: scale(1.02);
    }
`;

const WelcomeMessage = styled.div`
    width: 100%;
    text-align: center;
    margin: 50px auto;
`;

const AppHeader = styled.div`
    width: 100%;
    padding: 10px;
    border-bottom: solid 1px
        ${(props) =>
            props.theme === 'dark' ? Colors.darkModeMediumDark : Colors.border};
    box-sizing: border-box;
    h1 {
        display: inline;
        font-size: 14px;
        a {
            text-decoration: none;
        }
    }
`;
const DarkModeToggle = styled.span`
    float: right;
`;
function App() {
    const [theme, setTheme] = useState('');
    const toggleDarkMode = () => {
        if (theme === 'dark') {
            setTheme('');
        } else {
            setTheme('dark');
        }
    };
    return (
        <FCThemeProvider value={{ theme }}>
            <AppContextProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>React Examples | Adam Webster</title>
                </Helmet>
                <BodyStyles theme={theme} />
                <AppHeader theme={theme}>
                    <h1>
                        <Link to="/">React Examples | Adam Webster</Link>
                    </h1>
                    <DarkModeToggle onClick={() => toggleDarkMode()}>
                        <FontAwesomeIcon
                            icon={theme === 'dark' ? 'sun' : 'moon'}
                        />
                    </DarkModeToggle>
                </AppHeader>
                <div className="App">
                    <Switch>
                        <Route exact path="/">
                            <WelcomeMessage>
                                Click on of the pages to show examples
                            </WelcomeMessage>
                            <Grid>
                                <GridItem>
                                    <StyledLink image={loginImg} to="/login" />
                                    <Link to="/Login">
                                        <h3>Login Card</h3>
                                    </Link>
                                </GridItem>
                                <GridItem>
                                    <StyledLink
                                        image={followImg}
                                        to="/follow"
                                    />
                                    <Link to="/follow">
                                        <h3>Social Profile Card</h3>
                                    </Link>
                                </GridItem>

                                <GridItem>
                                    <StyledLink
                                        image={priceTableImg}
                                        to="/pricingtable"
                                    />
                                    <Link to="/pricingtable">
                                        <h3>Pricing Table</h3>
                                    </Link>
                                </GridItem>
                                <GridItem>
                                    <StyledLink
                                        image={playlistImg}
                                        to="/spotifyplaylist"
                                    />
                                    <Link to="/pricingtable">
                                        <h3>Spotify Playlist Editor</h3>
                                    </Link>
                                </GridItem>
                                <GridItem>
                                    <StyledLink image={rssImage} to="/rss" />
                                    <Link to="/rss">
                                        <h3>RSS Reader</h3>
                                    </Link>
                                </GridItem>
                            </Grid>
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/follow">
                            <FollowPage />
                        </Route>
                        <Route path="/newsfeed">
                            <NewsFeed />
                        </Route>
                        <Route path="/pricingtable">
                            <PricingTable />
                        </Route>
                        <Route path="/spotifyplaylist">
                            <SpotifyPlaylist />
                        </Route>
                        <Route path="/rss">
                            <RSSReader />
                        </Route>
                        <Route path="/lazy">
                            <LazyComponent />
                        </Route>
                        <Route path="/calendar">
                            <CalendarDemo />
                        </Route>
                    </Switch>
                </div>
            </AppContextProvider>
        </FCThemeProvider>
    );
}

export default App;
