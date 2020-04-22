import React, { useState, useContext } from 'react';
import Calendar from './Components/Calendar';
import ToDos from './Components/ToDos';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { FCTheme, Colors } from '@adamwebster/fused-components';
import { ToDoContextProvider, ToDoContext } from './State';
import ToDoEditor from './Components/ToDoEditor';

const Wrapper = styled.section`
    display: flex;
    height: calc(100vh - 42px);
    background-color: #fff;
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

interface toDoProps {
    title: string;
    dateDue: string;
    description: string;
}
const CalendarDemo = () => {
    const [date, setDate] = useState(dayjs());
    const [toDoItem, setToDoItem] = useState<toDoProps | undefined>(undefined);

    const theme = useContext(FCTheme);
    const { globalState } = useContext(ToDoContext);

    return (
        <ToDoContextProvider>
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

                        <ToDos onChange={(todoItem) => setToDoItem(todoItem)} />
                    </ToDoWrapper>
                </Sidebar>
                <Content>
                    {console.log(globalState)}
                    <ToDoEditor
                        toDoItem={toDoItem}
                        setToDoItem={(value) => setToDoItem(value)}
                    />
                </Content>
            </Wrapper>
        </ToDoContextProvider>
    );
};

export default CalendarDemo;
