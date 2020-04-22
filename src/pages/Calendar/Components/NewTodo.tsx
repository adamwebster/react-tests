import React, { useState } from 'react';
import {
    DatePicker,
    Input,
    FormField,
    Button,
    Textarea,
} from '@adamwebster/fused-components';
import dayjs from 'dayjs';

import styled from 'styled-components';

const ToDoEditorStyled = styled.div`
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

const NewTodo = () => {
    const [datePickerDate, setDatePickerDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addToDo = () => {
        const localTodo = localStorage.getItem('calendarTodos');
        const localTodoArray = JSON.parse(localTodo as string);
        const toDoToSave = {
            id: localTodoArray.length + 1,
            title,
            dateDue: selectedDate,
            description,
        };
        localTodoArray.push(toDoToSave);
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
    };
    return (
        <>
            <ToDoEditorStyled>
                <h2>New</h2>
                <FormField htmlFor="title" label="Todo title">
                    <Input
                        id="title"
                        onChange={(e: any) => setTitle(e.target.value)}
                        value={title}
                    />
                </FormField>
                <FormField htmlFor="duedate" label="Due date">
                    <DatePicker
                        onChange={(date): void => {
                            setSelectedDate(date);
                            setDatePickerDate(
                                dayjs(date).format('MMMM Do, YYYY')
                            );
                        }}
                        value={datePickerDate}
                        selectedDate={selectedDate}
                    />
                </FormField>
                <FormField htmlFor="description" label="Description">
                    <StyledTextarea
                        id="descriptions"
                        onChange={(e: any) => setDescription(e.target.value)}
                        value={description}
                    />
                </FormField>
                <FormActions>
                    <Button onClick={() => addToDo()} primary>
                        Add the todo
                    </Button>
                    <Button>Reset</Button>
                </FormActions>
            </ToDoEditorStyled>
        </>
    );
};

export default NewTodo;
