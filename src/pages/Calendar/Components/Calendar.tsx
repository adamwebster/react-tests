import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeDate from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import styled from 'styled-components';
import { Colors, Button, Icon } from '@adamwebster/fused-components';

interface CWProps {
    calendarWidth: any;
}
const CalendarWrapper = styled.div<CWProps>`
    width: ${(props: any) =>
        props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
    display: flex;
    height: ${(props: any) =>
        props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
    flex-flow: column;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const CalendarHeader = styled.div`
    display: flex;
    align-items: center;
`;

const Table = styled.table`
    padding: 0;
    border-collapse: collapse;
    width: 100%;
    height: calc(100% - 32px);
    border-spacing: 0;
`;

const CalendarTitle = styled.div`
    flex: 1 1;
    span {
        margin: 0;
        padding-left: 5px;
        margin-bottom: 10px;
        font-weight: normal;
        font-size: 1.5em;
        display: inline-block;
    }
`;

const CalendarControl = styled.div`
    margin-left: 10px;
    button:first-of-type {
        margin-right: 15px;
    }
`;

const SvgWrapper = styled.span`
    width: 16px;
    display: block;
`;
const Day = styled.td`
    text-align: center;
    box-sizing: border-box;
    position: relative;
    padding: 0;
    vertical-align: top;
    &.has-todos {
        /* &:after {
            content: '';
            width: 8px;
            height: 8px;
            background-color: turquoise;
            position: absolute;
            bottom: 5px;
            left: 16px;
            border-radius: 50%;
        } */
    }
    &.current-day {
        button {
            .day-number {
                border: solid 1px tomato;
            }
        }
    }
    &.selected-day {
        button {
            .day-number {
                background-color: tomato;
                color: #fff;
            }
        }
    }
    &:hover:not(.selected-day):not(.other-month) {
        button {
            .day-number {
                background-color: ${Colors.primary};
                color: #fff;
                cursor: pointer;
            }
        }
    }
    &.other-month {
        color: ${Colors.mediumdark};
    }
    button {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        background-color: transparent;
        border: none;
        color: inherit;
        .day-number {
            width: 25px;
            padding-top: 5px;
            height: 25px;
            border-radius: 5px;
            box-sizing: border-box;
        }
        &:hover:not(:disabled) {
            color: #fff !important;
        }
        &:focus {
            outline: none;
            .day-number {
                box-sizing: border-box;
                background-color: ${Colors.primary};
                color: #fff;
            }
        }
        &:disabled:hover {
            cursor: default;
        }
    }
`;

const DayName = styled.th`
    text-align: center;
    padding: 5px;
    width: 14%;
    border-bottom: solid 1px ${Colors.medium};
`;

const TodDoMarker = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    overflow: hidden;
    background-color: turquoise;
    display: inline-block;
    position: relative;
    top: 3px;
`;
const Week = styled.tr``;
dayjs.extend(localeDate);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

interface Props {
    onChange: (date: any) => void;
    selectedDate?: dayjs.Dayjs;
    size?: number;
    datesWithToDos?: Array<any>;
}
const Calendar = ({
    onChange,
    selectedDate = dayjs(),
    datesWithToDos,
    size,
}: Props) => {
    const [date, setDate] = useState(dayjs());
    const [daysOfTheWeek] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    const [currentDay, setCurrentDay] = useState([]);

    const [calendar, setCalendar] = useState([]);

    const dayNames = daysOfTheWeek.map((day: string, index) => {
        return <DayName key={`${day}-${index}`}>{day}</DayName>;
    });
    const getWeeks = () => {
        let blankDays = [];
        let daysInMonth = [];
        let blankDaysEnd = [];
        const startOfMonth = date.startOf('month');
        const daysInTheMonth = date.daysInMonth();
        //    const endOfMonth = date.endOf('month');

        for (let d = 0; d < startOfMonth.day(); d++) {
            blankDays.push({
                // day: startOfMonth.subtract(d + 1, 'day').format('D'),
                day: '',
                otherMonth: true,
                date: null,
            });
        }

        for (let d = 1; d <= daysInTheMonth; d++) {
            daysInMonth.push({
                day: d,
                date: date.format(`YYYY-${date.get('month') + 1}-${d}`),
                timeStamp: dayjs(
                    `${date.get('year')}-${date.get('month') + 1}-${d}`
                ).format(),
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
                // day: endOfMonth.add(i + 1, 'day').format('D'),
                day: '',
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
        if (row.length > 0)
            return (
                <Week key={Math.random()}>
                    {row.map((item: any, index: number) => {
                        const hasToDos = datesWithToDos?.filter(
                            (todo) =>
                                dayjs(todo.dateDue).format('MMMM/DD/YYYY') ===
                                dayjs(item.date).format('MMMM/DD/YYYY')
                        );
                        return (
                            <Day
                                className={`${
                                    hasToDos && hasToDos?.length > 0
                                        ? `has-todos`
                                        : ''
                                }${
                                    item.day.toString() === currentDay
                                        ? ` current-day`
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
                            >
                                <button
                                    disabled={item.otherMonth}
                                    onClick={() => onChange(item.timeStamp)}
                                >
                                    <span className="day-number">
                                        {item.day}
                                    </span>
                                    {hasToDos && hasToDos?.length > 0 && (
                                        <TodDoMarker />
                                    )}
                                </button>
                            </Day>
                        );
                    })}
                </Week>
            );
        return null;
    });

    useEffect(() => {
        getWeeks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const nextMonth = () => {
        setDate(date.add(1, 'month'));
    };

    const previousMonth = () => {
        setDate(date.subtract(1, 'month'));
    };
    return (
        <CalendarWrapper calendarWidth={size}>
            <CalendarHeader>
                <CalendarTitle>
                    <span>{`${date.format('MMMM')} ${date.format(
                        'YYYY'
                    )}`}</span>
                </CalendarTitle>
                <CalendarControl>
                    <Button as="a">
                        <SvgWrapper onClick={() => previousMonth()}>
                            <Icon icon="chevron-left" />
                        </SvgWrapper>
                    </Button>
                    <Button as="a" onClick={() => nextMonth()}>
                        <SvgWrapper>
                            <Icon icon="chevron-right" />
                        </SvgWrapper>
                    </Button>
                </CalendarControl>
            </CalendarHeader>
            <Table>
                <thead>
                    <tr>{dayNames}</tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </Table>
        </CalendarWrapper>
    );
};

export default Calendar;
