import React, { useContext } from 'react';
import { ToDoContext } from '../State';
import NewTodo from './NewTodo';
import ToDoEditor from './ToDoEditor';
import ToDoWidgets from './ToDoWidgets';

const MainContent = () => {
    const { globalState } = useContext(ToDoContext);
    return (
        <>
            {!globalState.newToDoVisible && !globalState.editToDoVisible && (
                <ToDoWidgets />
            )}
            {globalState.newToDoVisible && !globalState.editToDoVisible && (
                <NewTodo />
            )}
            {globalState.editToDoVisible && <ToDoEditor />}
        </>
    );
};

export default MainContent;
