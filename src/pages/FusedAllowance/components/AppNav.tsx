import React from 'react';
import styled from 'styled-components';

const AppNavStyled = styled.nav`
    width: 100%;
    height: 44px;
    background-color: tomato;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    button {
        color: #fff;
        text-align: center;
        flex: 1 1;
        background-color: transparent;
        border: none;
        height: 100%;
    }
`;

const AppNav = () => {
    return (
        <AppNavStyled>
            <button>Categories</button>
            <button>Add Purchase</button>
            <button>Settings</button>
        </AppNavStyled>
    );
};

export default AppNav;
