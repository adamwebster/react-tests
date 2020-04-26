import React, { useContext, useEffect, useState, Suspense } from 'react';
import { Card, Colors, Table, FCTheme } from '@adamwebster/fused-components';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { ToDoContext } from '../State';
import dayjs from 'dayjs';
import { CountWidgetLoading } from './CountWidget';

const CountWidget = React.lazy(() => import('./CountWidget'));

const WidgetWrapper = styled.section`
    display: flex;
    padding: 20px;
    border-bottom: solid 1px ${Colors.border};
    &:last-child {
        border-bottom: none;
    }
    @media (max-width: 768px) {
        flex-direction: column;
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
    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 10px;
    }
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
    const theme = useContext(FCTheme);
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
            if (itemsUpcoming) setUpcoming(sortedUpcoming.slice(0, 5));
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

    const TableWidgetColor =
        theme && theme.theme === 'dark' ? Colors.darkModeDarker : Colors.light;
    return (
        <>
            <WidgetWrapper>
                <Suspense fallback={<CountWidgetLoading />}>
                    <CountWidget
                        foregroundColor="#fff"
                        backgroundColor={Colors.green}
                    >
                        <h3>{completed}</h3>
                        <span>Completed</span>
                    </CountWidget>
                </Suspense>
                <Suspense fallback={<CountWidgetLoading />}>
                    <CountWidget
                        foregroundColor="#fff"
                        backgroundColor={Colors.red}
                    >
                        <h3>{overdue.length}</h3>
                        <span>Overdue</span>
                    </CountWidget>
                </Suspense>

                <Suspense fallback={<CountWidgetLoading />}>
                    <CountWidget
                        foregroundColor="#fff"
                        backgroundColor={Colors.yellow}
                    >
                        <h3>{dueToday.length}</h3>
                        <span>Due today</span>
                    </CountWidget>
                </Suspense>

                <Suspense fallback={<CountWidgetLoading />}>
                    <CountWidget
                        foregroundColor="#fff"
                        backgroundColor={Colors.blue}
                    >
                        <h3>{dueNextSevenDays}</h3>
                        <span>Due in the next week</span>
                    </CountWidget>
                </Suspense>
            </WidgetWrapper>
            <WidgetWrapper>
                <Widget backgroundColor={TableWidgetColor}>
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
                <Widget backgroundColor={TableWidgetColor}>
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
                <Widget backgroundColor={TableWidgetColor}>
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
