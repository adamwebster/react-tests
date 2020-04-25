import React, { useContext, useState, useEffect, useRef } from 'react';
import { ToDoContext } from '../State';
import {
    DatePicker,
    Input,
    FormField,
    Button,
    Textarea,
    useToast,
    Colors,
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

interface Props {
    setToDoItem?: (toDoItem: any) => void;
}
const ToDoEditor = ({ setToDoItem }: Props) => {
    const { dispatch, globalState } = useContext(ToDoContext);
    const [datePickerDate, setDatePickerDate] = useState('');
    const { toDoItem } = globalState;
    const [title, setTitle] = useState('');
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [dateErrorMessage, setDateErrorMessage] = useState('');
    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const toast = useToast();
    useEffect(() => {
        setTitle(toDoItem.title);
        setDescription(toDoItem.description);
        setId(toDoItem.id);
        setDatePickerDate(toDoItem.dateDue);
    }, [toDoItem]);

    const updateToDo = () => {
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

        const localTodo = localStorage.getItem('calendarTodos');
        const localTodoArray = JSON.parse(localTodo as string);
        const toDoToUpdate = localTodoArray.find((item: any) => item.id === id);
        toDoToUpdate.title = title;
        toDoToUpdate.dateDue = datePickerDate;
        toDoToUpdate.description = description;
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
        toast.addSuccess('To do has been updated');
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
    };

    const deleteTodo = () => {
        const localTodo = localStorage.getItem('calendarTodos');
        const localTodoArray = JSON.parse(localTodo as string);
        const toDoToDelete = localTodoArray.findIndex(
            (item: any) => item.id === id
        );
        localTodoArray.splice(toDoToDelete, 1);
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
        toast.addSuccess('To do has been deleted');
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
        dispatch({
            type: 'SHOW_EDIT_TODO',
            payload: false,
        });
    };

    const resetForm = () => {
        setTitle('');
        setDatePickerDate('');
        setTitleErrorMessage('');
        setDateErrorMessage('');
        setDescription('');
    };

    return (
        <>
            {globalState.editToDoVisible && (
                <ToDoEditorStyled>
                    <h2>Edit</h2>
                    <FormField
                        required
                        validationMessage={titleErrorMessage}
                        htmlFor="title"
                        label="Todo title"
                    >
                        <Input
                            id="title"
                            ref={titleRef}
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
                            }}
                            value={dayjs(datePickerDate).format(
                                'MMMM Do, YYYY'
                            )}
                            selectedDate={datePickerDate}
                        />
                    </FormField>
                    <FormField htmlFor="description" label="Description">
                        <StyledTextarea
                            id="descriptions"
                            onChange={(e: any) =>
                                setDescription(e.target.value)
                            }
                            value={description}
                        />
                    </FormField>
                    <FormActions>
                        <Button onClick={() => updateToDo()} primary>
                            Save
                        </Button>
                        <Button onClick={() => resetForm()}>Reset</Button>
                        <Button fcStyle="danger" onClick={() => deleteTodo()}>
                            Delete
                        </Button>
                    </FormActions>
                </ToDoEditorStyled>
            )}
        </>
    );
};

export default ToDoEditor;
