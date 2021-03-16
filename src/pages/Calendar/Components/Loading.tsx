import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CalendarLoading = () => {
    return <LoadingWrapper>Loading</LoadingWrapper>;
};

export default CalendarLoading;
