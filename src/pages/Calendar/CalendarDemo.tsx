import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeDate from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import styled from 'styled-components';
import { Colors, Heading } from '@adamwebster/fused-components';
import { darken, lighten } from 'polished';

const Table = styled.table`
    padding: 0;
    border-collapse: collapse;
`;
const Day = styled.td`
    text-align: center;
    padding: 5px;
    &.current-day {
        background-color: tomato;
        color: #fff;
    }
    &:hover:not(.current-day):not(.prev-month) {
        background-color: ${darken(0.1, Colors.medium)};
    }
    &.prev-month {
        color: ${Colors.mediumdarkWo};
    }
`;

const DayName = styled.th`
    text-align: center;
    padding: 5px;
`;

const Week = styled.tr`
    &:nth-child(odd) {
        background-color: ${Colors.medium};
    }
`;
dayjs.extend(localeDate);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

const CalendarDemo = () => {
    const [daysInTheMonth] = useState(dayjs().daysInMonth());
    const [daysOfTheWeek] = useState(dayjs().localeData().weekdaysShort());
    const [startOfMonth] = useState(dayjs().startOf('month'));
    const [currentDay] = useState(dayjs().format('D'));
    const [currentDate] = useState(dayjs().format('MMMM Do, YYYY'));
    const [currentMonth] = useState(dayjs().format('MMMM'));
    const [currentYear] = useState(dayjs().format('YYYY'));

    const [calendar, setCalendar] = useState([]);

    const dayNames = daysOfTheWeek.map((day: string) => {
        return <DayName key={day}>{day}</DayName>;
    });
    let i;
    const getWeeks = () => {
        let blankDays = [];
        let daysInMonth = [];

        for (i = 0; i < startOfMonth.day(); i++) {
            blankDays.push({
                day: startOfMonth.subtract(i + 1, 'day').format('D'),
                previousMonth: true,
            });
        }

        for (let d = 1; d <= daysInTheMonth; d++) {
            daysInMonth.push({ day: d });
        }

        var totalSlots = [...blankDays.reverse(), ...daysInMonth];
        let rows: ({ day: string } | { day: number })[][] = [];
        let cells: ({ day: string } | { day: number })[] = [];
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row); // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells); // when reach next week we contain all td in last week to rows
                cells = []; // empty container
                cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) {
                // when end loop we add remain date
                rows.push(cells);
            }
        });
        setCalendar(rows as any);
    };

    const calendarRows = calendar.map((row: any) => {
        return (
            <Week key={Math.random()}>
                {row.map((item: any, index: number) => {
                    return (
                        <Day
                            className={`${
                                item.day.toString() === currentDay
                                    ? `current-day`
                                    : ''
                            }${item.previousMonth ? 'prev-month' : ''}`}
                            key={
                                item.day
                                    ? `day-${item.day}`
                                    : `blank-day-${index}`
                            }
                            onClick={() => console.log(calendar)}
                        >
                            {item.day}
                        </Day>
                    );
                })}
            </Week>
        );
    });

    useEffect(() => {
        getWeeks();
    }, []);

    return (
        <div>
            <Heading as="h2">{`${currentMonth} ${currentYear}`}</Heading>
            <Table>
                <thead>
                    <tr>{dayNames}</tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </Table>
            {currentDate}
        </div>
    );
};

export default CalendarDemo;
