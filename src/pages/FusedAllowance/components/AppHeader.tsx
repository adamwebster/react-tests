import React from 'react';
import styled from 'styled-components';

const AppHeaderStyled = styled.header`
    width: 100%;
    height: 44px;
    background-color: tomato;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`;

const AppHeader = () => {
    return <AppHeaderStyled>Fused Allowance</AppHeaderStyled>;
};

export default AppHeader;
