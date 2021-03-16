import React, { useContext, useEffect } from 'react';

import styled from 'styled-components';
import { Colors, ToastProvider } from '@adamwebster/fused-components';
import { ToDoContextProvider } from './State';
import MainContent from './Components/MainContent';
import Sidebar from './Components/Sidebar';

import { AppContext } from '../../State';
import { ExampleFooter } from '../../components/UI/ExampleFooter';

const Wrapper = styled.section`
    display: flex;
    height: calc(100vh - 98px);
    overflow: auto;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
    border-bottom: solid 1px ${Colors.border};
`;

const Content = styled.div`
    flex: 1 1;
`;

const Container = styled.div`
    display: flex;
    flex-flow: column;
    height: calc(100vh - 42px);
`;

const CalendarDemo = () => {
    const { dispatchApp } = useContext(AppContext);

    useEffect(() => {
        dispatchApp({ type: 'SET_BACKGROUND_COLOR', payload: Colors.lightest });
        return () => {
            dispatchApp({
                type: 'SET_BACKGROUND_COLOR',
                payload: Colors.mediumlight,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ToDoContextProvider>
            <ToastProvider position="top">
                <Container>
                    <Wrapper>
                        <Sidebar />
                        <Content>
                            <MainContent />
                        </Content>
                    </Wrapper>
                    <ExampleFooter url="https://github.com/adamwebster/react-tests/tree/master/src/pages/Calendar" />
                </Container>
            </ToastProvider>
        </ToDoContextProvider>
    );
};

export default CalendarDemo;
