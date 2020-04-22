import React, { useContext, useState } from 'react';
import { ToDoContext } from '../State';
import {
    DatePicker,
    Input,
    FormField,
    Button,
    Textarea,
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
    const { globalState } = useContext(ToDoContext);
    const [datePickerDate, setDatePickerDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const { toDoItem } = globalState;
    const [title, setTitle] = useState(toDoItem.title);
    const [description, setDescription] = useState(toDoItem.description);

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
                        <Button primary>Save</Button>
                        <Button>Reset</Button>
                    </FormActions>
                </ToDoEditorStyled>
            )}
        </>
    );
};

export default ToDoEditor;
