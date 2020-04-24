import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Colors, Button } from '@adamwebster/fused-components';
import { darken } from 'polished';
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
            background-color: ${Colors.mediumlight};
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
`;
const DoneMarker = styled.button`
    background-color: tomato;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    padding: 0;
    border: solid 2px ${darken(0.3, 'tomato')};
    margin-right: 10px;
    cursor: pointer;
`;

interface Props {
    onChange?: (todo: any) => void;
}

const ToDos = ({ onChange }: Props) => {
    const { globalState, dispatch } = useContext(ToDoContext);
    const loadToDoKeyPress = (
        e: React.KeyboardEvent<HTMLLIElement>,
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

    useEffect(() => {
        const localTodos = localStorage.getItem('calendarTodos');
        if (!localTodos) {
            localStorage.setItem('calendarTodos', JSON.stringify([]));
        }
        if (localTodos) {
            const stringToObject = JSON.parse(localTodos as string);
            console.log(stringToObject, globalState);
            const ToDosFiltered = stringToObject.filter(
                (item: any) =>
                    dayjs(item.dateDue).format('MM-D-YYYY') ===
                    dayjs(globalState.selectedDate).format('MM-D-YYYY')
            );
            console.log(ToDosFiltered);
            dispatch({
                type: 'SET_TODOS',
                payload: { calendarTodoList: ToDosFiltered },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.selectedDate]);

    const items = globalState.calendarTodoList.map(
        (item: { id: number; title: string; dateDue: string }) => {
            return (
                <ToDoItem
                    key={item.id}
                    onKeyPress={(e) => loadToDoKeyPress(e, item.id)}
                    tabIndex={0}
                    onClick={() => loadToDo(item.id)}
                >
                    <DoneMarker title="mark as done" />
                    <ToDoContent>
                        <ToDoTitle>{item.title}</ToDoTitle>
                        <ToDoMeta>
                            {dayjs(item.dateDue).format('MMMM Do, YYYY')}
                        </ToDoMeta>
                    </ToDoContent>
                </ToDoItem>
            );
        }
    );
    return (
        <ToDoList>
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
                    Create a new todo
                </Button>
            </p>
        </ToDoList>
    );
};

export default ToDos;
