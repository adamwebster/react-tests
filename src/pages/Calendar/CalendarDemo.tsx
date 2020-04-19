import React, { useState, useContext } from 'react';
import Calendar from './Components/Calendar';
import ToDos from './Components/ToDos';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { FCTheme, Colors, Heading, Card } from '@adamwebster/fused-components';

const Wrapper = styled.section`
    display: flex;
    height: calc(100vh - 42px);
`;

const Sidebar = styled.div`
    width: 300px;
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
`;
const CalendarDemo = () => {
    const [date, setDate] = useState(dayjs());
    const theme = useContext(FCTheme);
    return (
        <Wrapper>
            <Sidebar theme={theme?.theme}>
                <CalendarWrapper>
                    <Calendar
                        size={280}
                        selectedDate={date}
                        onChange={(date) => setDate(dayjs(date))}
                    />
                </CalendarWrapper>
                <ToDoWrapper>
                    <h2>Todo items</h2>

                    <ToDos
                        onChange={(todoItem) => alert(JSON.stringify(todoItem))}
                    />
                </ToDoWrapper>
            </Sidebar>
            <Content>Content</Content>
        </Wrapper>
    );
};

export default CalendarDemo;
