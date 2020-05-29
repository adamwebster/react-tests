import React from 'react';
import styled from 'styled-components';
import { Colors } from '@adamwebster/fused-components';
import AppHeader from './components/AppHeader';
import AppNav from './components/AppNav';
import AppContent from './components/AppContent';

export const Wrapper = styled.div`
    width: 375px;
    height: 812px;
    border: solid 1px ${Colors.mediumdark};
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    font-size: 15px;
    display: flex;
    flex-flow: column;
`;

const FusedAllowance = () => {
    return (
        <Wrapper>
            <AppHeader />
            <AppContent />
            <AppNav />
        </Wrapper>
    );
};

export default FusedAllowance;
