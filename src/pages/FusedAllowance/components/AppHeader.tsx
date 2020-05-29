import React, { useContext } from 'react';
import styled from 'styled-components';
import { FusedAllowanceContext } from '../state';

const AppHeaderStyled = styled.header`
    width: 100%;
    height: 49px;
    background-color: tomato;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`;

const AppHeader = () => {
    const { globalState } = useContext(FusedAllowanceContext);
    return <AppHeaderStyled>{globalState.title}</AppHeaderStyled>;
};

export default AppHeader;
