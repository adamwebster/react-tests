import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    DatePicker,
    Input,
    FormField,
    Button,
    Textarea,
    useToast,
} from '@adamwebster/fused-components';
import dayjs from 'dayjs';

import styled from 'styled-components';
import { ToDoContext } from '../State';

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
    const [title, setTitle] = useState('');
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [dateErrorMessage, setDateErrorMessage] = useState('');

    const [description, setDescription] = useState('');
    const { globalState, dispatch } = useContext(ToDoContext);
    const toast = useToast();
    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const addToDo = () => {
        const dateInputValue = dateRef?.current?.value;
        const titleInputValue = titleRef?.current?.value;

        !titleInputValue
            ? setTitleErrorMessage('Title is required')
            : setTitleErrorMessage('');

        !dateInputValue
            ? setDateErrorMessage('Due date is required')
            : setDateErrorMessage('');

        if (!dateInputValue || !titleInputValue) {
            return false;
        }
        const localTodoArray: any = globalState.allToDos.slice();
        const toDoToSave = {
            id: localTodoArray.length + 1,
            title,
            dateDue: new Date(datePickerDate),
            description,
            completed: false,
        };
        localTodoArray.push(toDoToSave);
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
        const ToDosFiltered = localTodoArray.filter(
            (item: any) =>
                dayjs(item.dateDue).format('MM-D-YYYY') ===
                dayjs(globalState.selectedDate).format('MM-D-YYYY')
        );
        dispatch({
            type: 'SET_TODOS',
            payload: {
                calendarTodoList: ToDosFiltered,
                allToDos: localTodoArray,
            },
        });
        setTitle('');
        // setDatePickerDate('');
        setDescription('');
        toast.addSuccess('To do added');
    };

    const resetForm = () => {
        setTitle('');
        setDatePickerDate('');
        setTitleErrorMessage('');
        setDateErrorMessage('');
        setDescription('');
    };

    useEffect(() => {
        setDatePickerDate(globalState.selectedDate.toString());
    }, [globalState.selectedDate]);
    return (
        <>
            <ToDoEditorStyled>
                <h2>New</h2>
                <FormField
                    required
                    validationMessage={titleErrorMessage}
                    htmlFor="title"
                    label="To-Do title"
                >
                    <Input
                        ref={titleRef}
                        id="title"
                        onChange={(e: any) => setTitle(e.target.value)}
                        value={title}
                    />
                </FormField>
                <FormField
                    validationMessage={dateErrorMessage}
                    required
                    htmlFor="duedate"
                    label="Due date"
                >
                    <DatePicker
                        ref={dateRef}
                        onChange={(date): void => {
                            setDatePickerDate(date);
                            dispatch({
                                type: 'SET_SELECTED_DATE',
                                payload: date,
                            });
                        }}
                        value={
                            datePickerDate &&
                            dayjs(datePickerDate).format('MMMM Do, YYYY')
                        }
                        selectedDate={
                            (globalState.selectedDate as unknown) as string
                        }
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
                        Add the to-do
                    </Button>
                    <Button onClick={() => resetForm()}>Reset</Button>
                </FormActions>
            </ToDoEditorStyled>
        </>
    );
};

export default NewTodo;
