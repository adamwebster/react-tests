import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import variables from '../styles/variables';
import { darken } from 'polished';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import AnimatedButton from '../components/UI/AnimatedButton';
import TextButton from '../components/UI/TextButton';
import HelpText from '../components/UI/HelpText';
import Label from '../components/UI/Label';
import Alert from '../components/UI/Alert';
import Toggle from '../components/UI/Toggle';

const LoginWrapper = styled.div`
  position: relative;
  width:320px;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
`

const Header = styled.h3`
margin: 5px 0 15px 0;
text-align:center;
font-size: 18px;
img{
  width:50px;
}
`

const GitHubButton = styled.a`
  background-color: #fff;
  color: ${props => props.theme.foregroundColor};
  text-decoration:none;
  margin-top:10px;
  display:inline-block;
  width: 100%;
  padding: 10px;
  text-align:center;
  box-sizing:border-box;
  border: solid 1px ${props => props.theme.borderColor};
  border-radius: ${variables.borderRadius};
  box-shadow: 0 0 5px rgba(0,0,0,.25);
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover{
    background-color: ${darken(0.1, '#fff')};
    transform: scale(1.02);
  }
`

const ToggleWrapper = styled.div`
margin-bottom:15px;
`
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [inError, setInError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const enableButton = () => {
      if (password.length > 0 && username.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true)
        setShowError(false);
        setInError(false);
      }
    }
    enableButton();
  }, [password, username]);

  const clickButton = (e) => {
    e.target.classList.add('transforming');
    setLoading(true);
    const ele = e.persist();
    setTimeout(() => AddClass(e), 100);
    setTimeout(() => SetCompleted(e), 1000);
    setButtonDisabled(true);
  }

  const AddClass = (e) => {
    e.target.classList.add('loading');
  }

  const SetCompleted = (e) => {
    e.target.classList.remove('loading');
    e.target.classList.remove('transforming');
    // e.target.innerText = "Loaded";
    if (username === 'demo' && password === 'demo') {
      setLoaded(true);
      setShowError(false);
      e.target.classList.add('completed');

    } else {
      setShowError(true);
      setInError(true);
      setLoading(false);
      setLoaded(false)
    }
  }

  return (
    <LoginWrapper>
      <Card>
        {!loaded && <>
          <Header><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUzIDc0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMjM0NywtMjkxKSI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkNCIgdHJhbnNmb3JtPSJtYXRyaXgoMC42MTU3MiwwLDAsMSw5MDEuODc2LC0wLjM2NjgxNCkiPgogICAgICAgICAgICA8cmVjdCB4PSIyMzQ3LjA1IiB5PSIyOTEuMzY3IiB3aWR0aD0iODYuMDEiIGhlaWdodD0iNzMuOTg3IiBzdHlsZT0iZmlsbDpub25lOyIvPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM2Mzc4MywwLDAsMC4yMTI1MTMsMjE3Ny42NCwzLjk5MzI3KSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNTY3LjQ4OCwxNDM1LjMxQzU2Ny40ODgsMTQzNS4zMSA1NzAuMzM0LDE0MjUuMjIgNTgxLjk2OCwxNDI1LjIyQzU5Mi43MTgsMTQyNS4yMiA1OTYuNDQ4LDE0MzUuMzEgNTk2LjQ0OCwxNDM1LjMxTDY1Ni42MzIsMTYwOC4xM0M2NTYuNjMyLDE2MDguMTMgNjYyLjI4OCwxNjIwLjg5IDY0Ny4xNDcsMTYyNS41NkM2MzEuNTM0LDE2MzAuMzcgNjI4LjI4NSwxNjE4IDYyOC4yODUsMTYxOEw1ODEuOTY4LDE0ODVMNTU3Ljk5MiwxNTUzLjg1TDU3Ni41MDIsMTU1NC45MUM1ODMuODQ0LDE1NTUuNDMgNTg5LjY0NSwxNTYxLjQ4IDU4OS42NDUsMTU2OC44NUM1ODkuNjQ1LDE1NzYuMjIgNTgzLjg0NCwxNTgyLjI3IDU3Ni41MDIsMTU4Mi43OUw1NDcuNTM5LDE1ODMuODZMNTM1LjY1MSwxNjE4QzUzNS42NTEsMTYxOCA1MzIuMjgsMTYzMS44NCA1MTYuNjU1LDE2MjYuMDRDNTAyLjg3LDE2MjAuOTIgNTA3LjMwNSwxNjA4LjEzIDUwNy4zMDUsMTYwOC4xM0w1NjcuNDg4LDE0MzUuMzFaIiBzdHlsZT0iZmlsbDpyZ2IoNDEsMTYxLDE1Nik7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo" /></Header>
          {showError &&
            <Alert alertType="danger">
              Either you username or password is incorrect
      </Alert>
          }
        </>

        }
        <form>
          {!loaded && <>
            <Label htmlFor="username">Username</Label>
            <Input inError={inError} onChange={(e) => setUsername(e.target.value)} value={username} id="username" placeholder='Enter you user name' />
            <Label htmlFor="password">Password</Label>
            <Input inError={inError} onChange={(e) => setPassword(e.target.value)} password={password} type="password" id="password" />
           <Label onClick={() => setRememberMe(!rememberMe)}>Remember me</Label>
            <ToggleWrapper>
              <Toggle active={rememberMe} onSliderClick={() => setRememberMe(!rememberMe)} />
            </ToggleWrapper>
          </>
          }
          <AnimatedButton disabled={buttonDisabled} onClick={(e) => clickButton(e)}>
            {!loading && <span><FontAwesomeIcon className="button-icon" icon="key" /></span>}
            {(!loading && !loaded) && <> Login</>}

            {loaded ? <><FontAwesomeIcon className="button-icon" icon="check" /> Logged in</> : ''}
          </AnimatedButton>
        </form>
        {!loaded && <>
          <TextButton>Forgot password?</TextButton>

          <HelpText>
            Use the username demo and the password demo to login.  If you use the wrong username or password it will show an error.
      </HelpText>

        </>
        }
      </Card>
      <div>
        <GitHubButton href="https://github.com/adamwebster/react-tests/"><FontAwesomeIcon icon={['fab', 'github']} /> View the code on GitHub </GitHubButton>
      </div>
    </LoginWrapper>
  );
}

export default LoginPage;
