import React, { useState, useContext } from 'react';
import Calendar from './Components/Calendar';
import ToDos from './Components/ToDos';

import dayjs from 'dayjs';
import styled from 'styled-components';
import {
    FCTheme,
    Colors,
    Heading,
    Card,
    Input,
    FormField,
    Button,
    Textarea,
} from '@adamwebster/fused-components';
import ToDoEmptyState from './Components/EmptyState';

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

const ToDoEditor = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
`;

const FormActions = styled.div`
    button {
        margin-right: 5px;
    }
`;

const StyledTextarea = styled(Textarea)`
    width: 100%;
    resize: none;
    height: 200px;
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

                    <ToDos onChange={(todoItem) => setToDoItem(todoItem)} />
                </ToDoWrapper>
            </Sidebar>
            <Content>
                {toDoItem ? (
                    <ToDoEditor>
                        <h2>Edit</h2>
                        <FormField htmlFor="title" label="Todo title">
                            <Input
                                id="title"
                                onChange={(e: any) =>
                                    setToDoItem({
                                        ...toDoItem,
                                        title: e.target.value,
                                    })
                                }
                                value={toDoItem.title}
                            />
                        </FormField>
                        <FormField htmlFor="duedate" label="Due date">
                            <Input id="duedate" value={toDoItem.dateDue} />
                        </FormField>
                        <FormField htmlFor="description" label="Description">
                            <StyledTextarea
                                id="descriptions"
                                onChange={(e: any) =>
                                    setToDoItem({
                                        ...toDoItem,
                                        description: e.target.value,
                                    })
                                }
                                value={toDoItem.description}
                            />
                        </FormField>
                        <FormActions>
                            <Button primary>Save</Button>
                            <Button>Reset</Button>
                        </FormActions>
                    </ToDoEditor>
                ) : (
                    <ToDoEmptyState />
                )}
            </Content>
        </Wrapper>
    );
};

export default CalendarDemo;
