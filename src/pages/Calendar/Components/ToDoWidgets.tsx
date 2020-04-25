import React, { useContext, useEffect, useState } from 'react';
import { Card, Colors } from '@adamwebster/fused-components';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import { ToDoContext } from '../State';
import dayjs from '@adamwebster/fused-components/node_modules/dayjs';

const WidgetWrapper = styled.section`
    display: flex;
    padding: 20px;
    border-bottom: solid 1px ${Colors.border};
`;

interface WProps {
    backgroundColor?: string;
}
const Widget = styled(Card)<WProps>`
    flex: 1 1;
    margin-right: 10px;
    padding: 10px;
    h3 {
        margin: 0;
        font-size: 1.3em;
    }

    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
            color: ${lighten(0.6, backgroundColor)};
            border-color: ${darken(0.2, backgroundColor)};
        `}
    &:last-child {
        margin-right: 0;
    }
`;

const ToDoWidgets = () => {
    const { globalState } = useContext(ToDoContext);
    const [completed, setCompleted] = useState(0);
    const [dueToday, setDueToday] = useState(0);
    const [overdue, setOverdue] = useState(0);
    const [dueNextSevenDays, setDueNextSevenDays] = useState(0);

    useEffect(() => {
        console.log(globalState);
        if (globalState.allToDos.length > 0) {
            const completedToDos = globalState.allToDos.filter(
                (todo: any) => todo.completed === true
            );
            const itemsDueToday = globalState.allToDos.filter(
                (todo: any) =>
                    dayjs(todo.dateDue).format('MMDDYYYY') ===
                        dayjs().format('MMDDYYYY') && todo.completed === false
            );
            const itemsOverdue = globalState.allToDos.filter(
                (todo: any) =>
                    dayjs(todo.dateDue)
                        .startOf('day')
                        .isBefore(dayjs().startOf('day')) &&
                    todo.completed === false
            );
            const itemsDueNextSevenDays = globalState.allToDos.filter(
                (todo: any) =>
                    dayjs(todo.dateDue).isAfter(dayjs().startOf('day')) &&
                    dayjs(todo.dateDue)
                        .startOf('day')
                        .isBefore(dayjs().add(7, 'day').endOf('day')) &&
                    todo.completed === false
            );

            console.log(itemsDueNextSevenDays);
            if (itemsDueToday) setDueToday(itemsDueToday.length);
            if (itemsOverdue) setOverdue(itemsOverdue.length);
            if (completedToDos) setCompleted(completedToDos.length);
            if (itemsDueNextSevenDays)
                setDueNextSevenDays(itemsDueNextSevenDays.length);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.allToDos]);
    return (
        <WidgetWrapper>
            <Widget backgroundColor={Colors.green}>
                <h3>{completed} completed</h3>
            </Widget>
            <Widget backgroundColor={Colors.red}>
                <h3>{overdue} overdue</h3>
            </Widget>
            <Widget backgroundColor={Colors.yellow}>
                <h3>{dueToday} due today</h3>
            </Widget>
            <Widget backgroundColor={Colors.blue}>
                <h3>{dueNextSevenDays} due in the next week</h3>
            </Widget>
        </WidgetWrapper>
    );
};

export default ToDoWidgets;
