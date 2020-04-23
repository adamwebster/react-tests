import React, { useContext, useState, useEffect } from 'react';
import { ToDoContext } from '../State';
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
    const [selectedDate, setSelectedDate] = useState('');
    const { toDoItem } = globalState;
    const [title, setTitle] = useState('');
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const toast = useToast();
    useEffect(() => {
        setTitle(toDoItem.title);
        setDescription(toDoItem.description);
        setId(toDoItem.id);
    }, [toDoItem]);

    const updateToDo = () => {
        const localTodo = localStorage.getItem('calendarTodos');
        const localTodoArray = JSON.parse(localTodo as string);
        const toDoToUpdate = localTodoArray.find((item: any) => item.id === id);
        toDoToUpdate.title = title;
        toDoToUpdate.dateDue = datePickerDate;
        toDoToUpdate.description = description;
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
        toast.addSuccess('To do has been updated');

        dispatch({
            type: 'SET_TODOS',
            payload: { calendarTodoList: localTodoArray },
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
        dispatch({
            type: 'SET_TODOS',
            payload: { calendarTodoList: localTodoArray },
        });
        dispatch({
            type: 'SHOW_EDIT_TODO',
            payload: false,
        });
    };

    return (
        <>
            {globalState.editToDoVisible && (
                <ToDoEditorStyled>
                    <h2>Edit</h2>
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
                        <Button>Reset</Button>
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
