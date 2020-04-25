import React, { useContext } from 'react';
import ToDos from './Components/ToDos';

import styled from 'styled-components';
import { FCTheme, Colors, ToastProvider } from '@adamwebster/fused-components';
import { ToDoContextProvider } from './State';
import MainContent from './Components/MainContent';
import CalendarControl from './Components/CalendarControl';

const Wrapper = styled.section`
    display: flex;
    height: calc(100vh - 42px);
    background-color: #fff;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Sidebar = styled.div`
    width: 300px;
    @media (max-width: 768px) {
        width: 100%;
    }
    border-right: solid 1px ${Colors.border};
    background-color: #fff;
`;

const CalendarWrapper = styled.div`
    padding: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px ${Colors.border};
`;

const ToDoWrapper = styled.div`
    padding: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px ${Colors.border};
    h2 {
        font-weight: normal;
        margin: 0 0 10px 0;
    }
`;

const Content = styled.div`
    flex: 1 1;
    background-color: ${Colors.lightest};
`;

interface toDoProps {
    title: string;
    dateDue: string;
    description: string;
}
const CalendarDemo = () => {
    const theme = useContext(FCTheme);

    return (
        <ToDoContextProvider>
            <ToastProvider position="top">
                <Wrapper>
                    <Sidebar theme={theme?.theme}>
                        <CalendarWrapper>
                            <CalendarControl />
                        </CalendarWrapper>
                        <ToDoWrapper>
                            <h2>Todo items</h2>

                            <ToDos />
                        </ToDoWrapper>
                    </Sidebar>
                    <Content>
                        <MainContent />
                    </Content>
                </Wrapper>
            </ToastProvider>
        </ToDoContextProvider>
    );
};

export default CalendarDemo;
