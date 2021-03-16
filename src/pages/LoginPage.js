import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TextButton from '../components/UI/TextButton';
import HelpText from '../components/UI/HelpText';
import { Helmet } from 'react-helmet';
import {
    Card,
    Input,
    Button,
    Label,
    Alert,
    Toggle,
    Colors,
    FormField,
} from '@adamwebster/fused-components';
import { ExampleFooter } from '../components/UI/ExampleFooter';

const LoginWrapper = styled.div`
    position: relative;
    width: 320px;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
`;

const StyledCard = styled(Card)`
    padding: 10px;
`;
const Header = styled.h3`
    margin: 5px 0 15px 0;
    text-align: center;
    font-size: 18px;
    img {
        width: 50px;
    }
`;

const AlertStyled = styled(Alert)`
    margin-bottom: 10px;
`;

const BackToLoginBTN = styled(Button)`
    margin-left: 10px;
`;

const LoginButton = styled(Button)`
    width: 100%;
    .button-icon {
        position: absolute;
        left: 5px;
        top: 5px;
    }
`;

const TextButtonStyled = styled(TextButton)`
    color: #29a19c;
    &:hover {
        color: ${darken(0.2, '#29a19c')};
    }
`;

const ToggleWrapper = styled.div`
    margin-bottom: 15px;
`;
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [inError, setInError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [, setIcon] = useState('lock');
    const [buttonText, setButtonText] = useState('Login');
    useEffect(() => {
        const enableButton = () => {
            if (password.length > 0 && username.length > 0) {
            } else {
                setShowError(false);
                setInError(false);
            }
        };
        enableButton();
    }, [password, username]);

    const clickButton = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            completeLoading();
        }, 1000);
    };

    const completeLoading = (e) => {
        // e.target.innerText = "Loaded";
        if (username === 'demo' && password === 'demo') {
            setLoaded(true);
            setCompleted(true);
            setShowError(false);
            setIcon('check');
            setButtonText('Back to login');
        } else {
            setShowError(true);
            setInError(true);
            setLoading(false);
            setLoaded(false);
        }
    };

    return (
        <LoginWrapper>
            <Helmet>
                <title>Login Page | React Examples | Adam Webster</title>
            </Helmet>
            <StyledCard boxShadow>
                {!loaded && (
                    <>
                        <Header>
                            <img
                                alt="user avatar"
                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUzIDc0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMjM0NywtMjkxKSI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkNCIgdHJhbnNmb3JtPSJtYXRyaXgoMC42MTU3MiwwLDAsMSw5MDEuODc2LC0wLjM2NjgxNCkiPgogICAgICAgICAgICA8cmVjdCB4PSIyMzQ3LjA1IiB5PSIyOTEuMzY3IiB3aWR0aD0iODYuMDEiIGhlaWdodD0iNzMuOTg3IiBzdHlsZT0iZmlsbDpub25lOyIvPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjM2Mzc4MywwLDAsMC4yMTI1MTMsMjE3Ny42NCwzLjk5MzI3KSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNTY3LjQ4OCwxNDM1LjMxQzU2Ny40ODgsMTQzNS4zMSA1NzAuMzM0LDE0MjUuMjIgNTgxLjk2OCwxNDI1LjIyQzU5Mi43MTgsMTQyNS4yMiA1OTYuNDQ4LDE0MzUuMzEgNTk2LjQ0OCwxNDM1LjMxTDY1Ni42MzIsMTYwOC4xM0M2NTYuNjMyLDE2MDguMTMgNjYyLjI4OCwxNjIwLjg5IDY0Ny4xNDcsMTYyNS41NkM2MzEuNTM0LDE2MzAuMzcgNjI4LjI4NSwxNjE4IDYyOC4yODUsMTYxOEw1ODEuOTY4LDE0ODVMNTU3Ljk5MiwxNTUzLjg1TDU3Ni41MDIsMTU1NC45MUM1ODMuODQ0LDE1NTUuNDMgNTg5LjY0NSwxNTYxLjQ4IDU4OS42NDUsMTU2OC44NUM1ODkuNjQ1LDE1NzYuMjIgNTgzLjg0NCwxNTgyLjI3IDU3Ni41MDIsMTU4Mi43OUw1NDcuNTM5LDE1ODMuODZMNTM1LjY1MSwxNjE4QzUzNS42NTEsMTYxOCA1MzIuMjgsMTYzMS44NCA1MTYuNjU1LDE2MjYuMDRDNTAyLjg3LDE2MjAuOTIgNTA3LjMwNSwxNjA4LjEzIDUwNy4zMDUsMTYwOC4xM0w1NjcuNDg4LDE0MzUuMzFaIiBzdHlsZT0iZmlsbDpyZ2IoNDEsMTYxLDE1Nik7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo"
                            />
                        </Header>
                        {showError && !forgotPassword && (
                            <AlertStyled fcStyle="danger">
                                Either you username or password is incorrect
                            </AlertStyled>
                        )}
                    </>
                )}
                {!forgotPassword && (
                    <form>
                        {!loaded && (
                            <>
                                <FormField label="Username">
                                    <Input
                                        inError={inError}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        value={username}
                                        id="username"
                                        placeholder="Enter you user name"
                                    />
                                </FormField>

                                <FormField label="Password">
                                    <Input
                                        inError={inError}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        password={password}
                                        type="password"
                                        id="password"
                                    />
                                </FormField>

                                <Label
                                    onClick={() => setRememberMe(!rememberMe)}
                                >
                                    Remember me
                                </Label>
                                <ToggleWrapper>
                                    <Toggle
                                        active={rememberMe}
                                        onClick={() =>
                                            setRememberMe(!rememberMe)
                                        }
                                    />
                                </ToggleWrapper>
                            </>
                        )}
                        <LoginButton
                            loadingIcon={
                                <FontAwesomeIcon spin icon="circle-notch" />
                            }
                            icon={completed ? '' : 'lock-locked'}
                            buttonColor={completed ? Colors.green : '#29a19c'}
                            primary
                            isLoading={loading}
                            onClick={
                                completed
                                    ? () => {
                                          setLoaded(false);
                                          setForgotPassword(false);
                                      }
                                    : (e) => clickButton(e)
                            }
                        >
                            {buttonText}
                        </LoginButton>
                    </form>
                )}
                {forgotPassword && (
                    <>
                        <FormField>
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                            />
                        </FormField>
                        <Button buttonColor={'#29a19c'} primary>
                            Reset Password
                        </Button>
                        <BackToLoginBTN
                            buttonColor={'#29a19c'}
                            onClick={() => setForgotPassword(false)}
                        >
                            Back to Login
                        </BackToLoginBTN>
                    </>
                )}
                {!loaded && !forgotPassword && (
                    <>
                        <TextButtonStyled
                            onClick={() => setForgotPassword(true)}
                        >
                            Forgot password?
                        </TextButtonStyled>

                        <HelpText>
                            Use the username demo and the password demo to
                            login. If you use the wrong username or password it
                            will show an error.
                        </HelpText>
                    </>
                )}
            </StyledCard>
            <ExampleFooter
                linkColor="#29a19c"
                url="https://github.com/adamwebster/react-tests/blob/master/src/pages/LoginPage.js"
            />
        </LoginWrapper>
    );
};

export default LoginPage;
