import React from 'react';
import styled from 'styled-components';
import { Colors, Card } from '@adamwebster/fused-components';
import dayjs from 'dayjs';
import { darken } from 'polished';

const toDoItems = [
    {
        id: 0,
        title: 'Test',
        dateDue: dayjs().format('MMMM Do, YYYY'),
    },
    {
        id: 1,
        title: 'Test 2',
        dateDue: dayjs().format('MMMM Do, YYYY'),
    },
    {
        id: 2,
        title: 'Test 3',
        dateDue: dayjs().format('MMMM Do, YYYY'),
    },
];

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
    onChange: (todo: any) => void;
}

const ToDos = ({ onChange }: Props) => {
    const loadToDoKeyPress = (
        e: React.KeyboardEvent<HTMLLIElement>,
        id: number
    ) => {
        if (e.charCode === 13 || e.charCode === 32) {
            const toDo = toDoItems.find((item) => item.id === id);
            onChange(toDo);
        }
    };

    const loadToDo = (id: number) => {
        const toDo = toDoItems.find((item) => item.id === id);
        onChange(toDo);
    };
    const items = toDoItems.map(
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

                        <ToDoMeta>{item.dateDue}</ToDoMeta>
                    </ToDoContent>
                </ToDoItem>
            );
        }
    );
    return <ToDoList>{items}</ToDoList>;
};

export default ToDos;
