import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import About from './pages/About';

function App() {
  return (
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
  );
}

export default App;
