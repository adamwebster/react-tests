import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Colors, Button, Icon, FCTheme } from '@adamwebster/fused-components';
import { ToDoContext } from '../State';
import dayjs from 'dayjs';

const ToDoTitle = styled.span``;

const ToDoList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        padding: 10px;
        &:last-child {
            border-bottom: none;
        }
        &:focus,
        &:hover {
            background-color: ${({ theme }) =>
                theme === 'dark' ? Colors.darkModeDark : Colors.mediumlight};
        }
    }
`;

const ToDoMeta = styled.div`
    font-size: 0.8em;
`;

const ToDoItem = styled.li`
    display: flex;
    align-items: center;
`;

const ToDoContent = styled.div`
    display: flex;
    flex-flow: column;
    flex: 1 1;
`;

interface DMProps {
    completed: boolean;
}
const DoneMarker = styled.button<DMProps>`
    background-color: ${({ completed }: DMProps) =>
        completed ? 'turquoise' : 'transparent'};
    border-radius: 50%;
    width: 12px;
    height: 12px;
    border: solid 2px turquoise;
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
`;

const RemoveButton = styled.button`
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    color: ${Colors.mediumdark};
    cursor: pointer;
`;

interface Props {
    onChange?: (todo: any) => void;
}

const ToDos = ({ onChange }: Props) => {
    const { globalState, dispatch } = useContext(ToDoContext);
    const theme = useContext(FCTheme);
    const loadToDoKeyPress = (
        e: React.KeyboardEvent<HTMLDivElement>,
        id: number
    ) => {
        if (e.charCode === 13 || e.charCode === 32) {
            const toDo = globalState.calendarTodoList.find(
                (item: { id: number }) => item.id === id
            );
            dispatch({ type: 'SET_TODO_ITEM', payload: toDo });
            dispatch({ type: 'SHOW_EDIT_TODO', payload: true });
        }
    };

    const loadToDo = (id: number) => {
        const toDo = globalState.calendarTodoList.find(
            (item: { id: number }) => item.id === id
        );
        dispatch({ type: 'SET_TODO_ITEM', payload: toDo });
        dispatch({ type: 'SHOW_EDIT_TODO', payload: true });
    };

    const deleteTodo = (id: number) => {
        const localTodoArray = globalState.allToDos.slice();
        const toDoToDelete = localTodoArray.findIndex(
            (item: any) => item.id === id
        );
        localTodoArray.splice(toDoToDelete, 1);
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
    };
    const markCompleted = (id: number) => {
        const localTodoArray = globalState.allToDos;
        const toDoToCompleted: any = localTodoArray.find(
            (item: any) => item.id === id
        );
        if (toDoToCompleted) {
            toDoToCompleted.completed = !toDoToCompleted.completed;
        }
        const toDoArrayToString = JSON.stringify(localTodoArray);
        localStorage.setItem('calendarTodos', toDoArrayToString);
        const ToDosFiltered = localTodoArray.filter(
            (item: any) =>
                dayjs(item.dateDue).format('MM-D-YYYY') ===
                dayjs(globalState.selectedDate).format('MM-D-YYYY')
        );
        console.log(localTodoArray);
        dispatch({
            type: 'SET_TODOS',
            payload: {
                calendarTodoList: ToDosFiltered,
                allToDos: localTodoArray,
            },
        });
    };

    useEffect(() => {
        const localTodos = localStorage.getItem('calendarTodos');
        if (!localTodos) {
            localStorage.setItem('calendarTodos', JSON.stringify([]));
        }
        if (localTodos) {
            const stringToObject = JSON.parse(localTodos as string);
            const ToDosFiltered = stringToObject.filter(
                (item: any) =>
                    dayjs(item.dateDue).format('MM-D-YYYY') ===
                    dayjs(globalState.selectedDate).format('MM-D-YYYY')
            );
            stringToObject.map(
                (todo: any) => (todo.dateDue = new Date(todo.dateDue))
            );
            console.log(stringToObject);
            dispatch({
                type: 'SET_TODOS',
                payload: {
                    calendarTodoList: ToDosFiltered,
                    allToDos: stringToObject,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.selectedDate]);

    const items = globalState.calendarTodoList.map(
        (item: {
            id: number;
            title: string;
            dateDue: string;
            completed: boolean;
        }) => {
            return (
                <ToDoItem key={item.id}>
                    <DoneMarker
                        onClick={() => markCompleted(item.id)}
                        title="Mark as done"
                        completed={item.completed}
                    />
                    <ToDoContent
                        onKeyPress={(e) => loadToDoKeyPress(e, item.id)}
                        tabIndex={0}
                        onClick={() => loadToDo(item.id)}
                    >
                        <ToDoTitle>{item.title}</ToDoTitle>
                        <ToDoMeta>
                            {dayjs(item.dateDue).format('MMMM Do, YYYY')}
                        </ToDoMeta>
                    </ToDoContent>
                    <RemoveButton onClick={() => deleteTodo(item.id)}>
                        <Icon icon="times" />
                    </RemoveButton>
                </ToDoItem>
            );
        }
    );
    return (
        <ToDoList theme={theme?.theme}>
            {items.length > 0 ? items : <span>You have nothing todo.</span>}
            <p>
                <Button
                    primary
                    onClick={() =>
                        dispatch({
                            type: 'SHOW_NEW_TODO',
                            payload: true,
                        })
                    }
                >
                    Create a new to-do
                </Button>
            </p>
        </ToDoList>
    );
};

export default ToDos;
