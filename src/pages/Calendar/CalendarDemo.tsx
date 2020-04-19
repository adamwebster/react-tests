import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeDate from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import styled from 'styled-components';
import { Colors, Heading, Button } from '@adamwebster/fused-components';
import { darken } from 'polished';

const Table = styled.table`
    padding: 0;
    border-collapse: collapse;
`;
const Day = styled.td`
    text-align: center;
    padding: 5px;
    &.current-day {
        background-color: ${Colors.mediumdark};
        color: #fff;
    }
    &.selected-day {
        background-color: tomato;
        color: #fff;
    }
    &:hover:not(.selected-day):not(.other-month) {
        background-color: ${darken(0.1, Colors.medium)};
        cursor: pointer;
    }
    &.other-month {
        color: ${Colors.mediumdark};
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
    const [date, setDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [daysOfTheWeek] = useState(dayjs().localeData().weekdaysShort());
    const [currentDay, setCurrentDay] = useState([]);

    const [calendar, setCalendar] = useState([]);

    const dayNames = daysOfTheWeek.map((day: string) => {
        return <DayName key={day}>{day}</DayName>;
    });
    const getWeeks = () => {
        let blankDays = [];
        let daysInMonth = [];
        let blankDaysEnd = [];
        const startOfMonth = date.startOf('month');
        const daysInTheMonth = date.daysInMonth();
        const endOfMonth = date.endOf('month');

        for (let d = 0; d < startOfMonth.day(); d++) {
            blankDays.push({
                day: startOfMonth.subtract(d + 1, 'day').format('D'),
                otherMonth: true,
                date: null,
            });
        }

        for (let d = 1; d <= daysInTheMonth; d++) {
            daysInMonth.push({
                day: d,
                date: new Date(
                    `${date.get('year')}-${date.get('month') + 1}-${d}/`
                ),
            });
        }

        const daysBefore = daysInMonth.length + blankDays.length;
        const numberOfWeeks = dayjs.duration(daysBefore, 'days').asWeeks();
        const totalNumberOfDaysInCalendar = Math.ceil(numberOfWeeks) * 7;

        for (
            let d = totalNumberOfDaysInCalendar, i = 0;
            d > daysBefore;
            d--, i++
        ) {
            blankDaysEnd.push({
                day: endOfMonth.add(i + 1, 'day').format('D'),
                otherMonth: true,
                date: null,
            });
        }
        var totalSlots = [
            ...blankDays.reverse(),
            ...daysInMonth,
            ...blankDaysEnd,
        ];
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

        if (date.get('month') === dayjs().get('month')) {
            setCurrentDay(dayjs().format('D') as any);
        } else {
            setCurrentDay([]);
        }
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
                            }${item.otherMonth ? 'other-month' : ''}${
                                dayjs(item.date).format('MMMM/DD/YYYY') ===
                                selectedDate.format('MMMM/DD/YYYY')
                                    ? ' selected-day'
                                    : ''
                            }`}
                            key={
                                item.day
                                    ? `day-${item.day}`
                                    : `blank-day-${index}`
                            }
                            onClick={() => {
                                if (item.date)
                                    setSelectedDate(dayjs(item.date));
                            }}
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
    }, [date]);

    const nextMonth = () => {
        setDate(date.add(1, 'month'));
    };

    const previousMonth = () => {
        setDate(date.subtract(1, 'month'));
    };
    return (
        <div>
            <Button onClick={() => previousMonth()}>Previous Month</Button>
            <Button onClick={() => nextMonth()}>Next Month</Button>

            <Heading as="h2">{`${date.format('MMMM')} ${date.format(
                'YYYY'
            )}`}</Heading>
            <Table>
                <thead>
                    <tr>{dayNames}</tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </Table>
            {selectedDate.format('MMMM Do, YYYY')}
        </div>
    );
};

export default CalendarDemo;
