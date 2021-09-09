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
import calendarImage from './static/calendar.jpg';

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
import { Dashboard } from './pages/Dashboard';
import { FusedAllowance } from './pages/FusedAllowance';
import { FramerMotion } from './pages/FramerMotion';
import { FramerMotionAppIcons } from './pages/FramerMotion/AppIcons';
import SpeciesGallery from './pages/FramerMotion/Gallery';
import PhoneLandingPage from './pages/PhoneLandingPage/PhoneLandingPage';
import { UseFormPage } from './pages/UseFormPage';

const Grid = styled.div`
    display: grid;
    grid-gap: 20px;
    width: 495px;
    margin: 0 auto;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;

    padding: 10px;
    justify-items: center;
    @media (max-width: 768px) {
        width: 330px;
        grid-template-columns: auto auto;
    }
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

const AppLayout = ({ children }) => {
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
                <div className="App">{children}</div>
            </AppContextProvider>
        </FCThemeProvider>
    );
};
function App() {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <AppLayout>
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
                                <StyledLink image={followImg} to="/follow" />
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
                            <GridItem>
                                <StyledLink
                                    image={calendarImage}
                                    to="/calendar"
                                />
                                <Link to="/calendar">
                                    <h3>To-do | Calendar</h3>
                                </Link>
                            </GridItem>
                        </Grid>
                    </AppLayout>
                </Route>
                <Route path="/login">
                    <AppLayout>
                        <LoginPage />
                    </AppLayout>
                </Route>
                <Route path="/about">
                    <AppLayout>
                        <About />
                    </AppLayout>
                </Route>
                <Route path="/follow">
                    <AppLayout>
                        <FollowPage />
                    </AppLayout>
                </Route>
                <Route path="/newsfeed">
                    <AppLayout>
                        <NewsFeed />
                    </AppLayout>
                </Route>
                <Route path="/pricingtable">
                    <AppLayout>
                        <PricingTable />
                    </AppLayout>
                </Route>
                <Route path="/spotifyplaylist">
                    <AppLayout>
                        <SpotifyPlaylist />
                    </AppLayout>
                </Route>
                <Route path="/rss">
                    <AppLayout>
                        <RSSReader />
                    </AppLayout>
                </Route>
                <Route path="/lazy">
                    <AppLayout>
                        <LazyComponent />
                    </AppLayout>
                </Route>
                <Route path="/calendar">
                    <AppLayout>
                        <CalendarDemo />
                    </AppLayout>
                </Route>
                <Route path="/dashboard">
                    <AppLayout>
                        <Dashboard />
                    </AppLayout>
                </Route>
                <Route path="/fusedallowance">
                    <AppLayout>
                        <FusedAllowance />
                    </AppLayout>
                </Route>
                <Route exact path="/framermotion">
                    <AppLayout>
                        <FramerMotion />
                    </AppLayout>
                </Route>
                <Route exact path="/framermotion/appicons">
                    <AppLayout>
                        <FramerMotionAppIcons />
                    </AppLayout>
                </Route>
                <Route exact path="/framermotion/gallery">
                    <AppLayout>
                        <SpeciesGallery />
                    </AppLayout>
                </Route>
                <Route exact path="/phonelandingpage">
                    <PhoneLandingPage />
                </Route>
                <Route exact path="/useformpage">
                    <AppLayout>
                        <UseFormPage />
                    </AppLayout>
                </Route>
            </Switch>
        </>
    );
}

export default App;
