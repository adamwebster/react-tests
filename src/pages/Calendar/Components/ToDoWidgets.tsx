import React, { useContext, useEffect, useState } from 'react';
import { Card, Colors, Table } from '@adamwebster/fused-components';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { ToDoContext } from '../State';
import dayjs from '@adamwebster/fused-components/node_modules/dayjs';

const WidgetWrapper = styled.section`
    display: flex;
    padding: 20px;
    border-bottom: solid 1px ${Colors.border};
    &:last-child {
        border-bottom: none;
    }
`;

interface WProps {
    backgroundColor?: string;
    foregroundColor?: string;
}
const Widget = styled(Card)<WProps>`
    flex: 1 1;
    margin-right: 10px;
    padding: 10px;
    h3 {
        margin: 0;
        font-size: 1.5em;
    }

    p {
        margin: 0;
    }
    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};

            border-color: ${darken(0.2, backgroundColor)};
        `}
    ${({ foregroundColor }) =>
        foregroundColor &&
        css`
            color: ${foregroundColor};
        `}
    &:last-child {
        margin-right: 0;
    }
`;

const ToDoWidgets = () => {
    const { globalState } = useContext(ToDoContext);
    const [completed, setCompleted] = useState(0);
    const [dueToday, setDueToday] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const [overdue, setOverdue] = useState([]);
    const [dueNextSevenDays, setDueNextSevenDays] = useState(0);

    useEffect(() => {
        if (globalState.allToDos) {
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

            const itemsUpcoming = globalState.allToDos.filter((todo: any) =>
                dayjs(todo.dateDue).isAfter(dayjs().startOf('day'))
            );

            const sortedUpcoming = itemsUpcoming
                .slice()
                .sort(function (a: any, b: any) {
                    return a.dateDue - b.dateDue;
                });
            console.log('here', sortedUpcoming);
            if (itemsDueToday) setDueToday(itemsDueToday);
            if (itemsOverdue) setOverdue(itemsOverdue);
            if (completedToDos) setCompleted(completedToDos.length);
            if (itemsDueNextSevenDays)
                setDueNextSevenDays(itemsDueNextSevenDays.length);
            if (itemsUpcoming) setUpcoming(sortedUpcoming);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.allToDos]);

    const TableRows = dueToday.map((todo: any) => {
        return (
            <Table.Row key={`${todo.title}-${todo.dateDue}`}>
                <Table.Cell>{todo.title}</Table.Cell>
                <Table.Cell>
                    {dayjs(todo.dateDue).format('MMMM Do, YYYY')}
                </Table.Cell>
            </Table.Row>
        );
    });

    const TableRowsOver = overdue.map((todo: any) => {
        return (
            <Table.Row key={`${todo.title}-${todo.dateDue}`}>
                <Table.Cell>{todo.title}</Table.Cell>
                <Table.Cell>
                    {dayjs(todo.dateDue).format('MMMM Do, YYYY')}
                </Table.Cell>
            </Table.Row>
        );
    });

    const UpcomingTableRows = upcoming.map((todo: any) => {
        return (
            <Table.Row key={`${todo.title}-${todo.dateDue}`}>
                <Table.Cell>{todo.title}</Table.Cell>
                <Table.Cell>
                    {dayjs(todo.dateDue).format('MMMM Do, YYYY')}
                </Table.Cell>
            </Table.Row>
        );
    });
    return (
        <>
            <WidgetWrapper>
                <Widget foregroundColor="#fff" backgroundColor={Colors.green}>
                    <h3>{completed}</h3>
                    <span>Completed</span>
                </Widget>
                <Widget foregroundColor="#fff" backgroundColor={Colors.red}>
                    <h3>{overdue.length}</h3>
                    <span>Overdue</span>
                </Widget>
                <Widget foregroundColor="#fff" backgroundColor={Colors.yellow}>
                    <h3>{dueToday.length}</h3>
                    <span>Due today</span>
                </Widget>
                <Widget foregroundColor="#fff" backgroundColor={Colors.blue}>
                    <h3>{dueNextSevenDays}</h3>
                    <span>Due in the next week</span>
                </Widget>
            </WidgetWrapper>
            <WidgetWrapper>
                <Widget backgroundColor={Colors.light}>
                    <h3>Due today</h3>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>To-Do name</Table.Cell>
                                <Table.Cell>Date due</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{TableRows}</Table.Body>
                    </Table>
                </Widget>
                <Widget backgroundColor={Colors.light}>
                    <h3>Overdue to-dos</h3>

                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>To-Do name</Table.Cell>
                                <Table.Cell>Date due</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{TableRowsOver}</Table.Body>
                    </Table>
                </Widget>
                <Widget backgroundColor={Colors.light}>
                    <h3>Upcoming to-dos</h3>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>To-Do name</Table.Cell>
                                <Table.Cell>Date due</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{UpcomingTableRows}</Table.Body>
                    </Table>
                </Widget>
            </WidgetWrapper>
        </>
    );
};

export default ToDoWidgets;
