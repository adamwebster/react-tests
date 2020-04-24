import React, { useContext } from 'react';
import { ToDoContext } from '../State';
import ToDoEmptyState from './EmptyState';
import NewTodo from './NewTodo';
import ToDoEditor from './ToDoEditor';

const MainContent = () => {
    const { globalState } = useContext(ToDoContext);
    return (
        <>
            {globalState.newToDoVisible && !globalState.editToDoVisible && (
                <NewTodo />
            )}
            {globalState.editToDoVisible && <ToDoEditor />}
            {!globalState.newToDoVisible && !globalState.editToDoVisible && (
                <ToDoEmptyState />
            )}
        </>
    );
};

export default MainContent;
