import React, { useContext } from 'react';
import styled from 'styled-components';
import { Colors, FCTheme } from '@adamwebster/fused-components';
import { ToDoContext } from '../State';

interface Props {
    currentPageTitle: string;
}

const BreadcrumbStyled = styled.ul`
    list-style: none;
    margin: 0;
    border-bottom: solid 1px
        ${({ theme }) =>
            theme === 'dark' ? Colors.darkModeMediumDark : Colors.border};
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: inherit;
        color: ${Colors.primary};
    }
    li {
        display: inline-block;
    }
`;
const Breadcrumb = ({ currentPageTitle }: Props) => {
    const { dispatch } = useContext(ToDoContext);
    const theme = useContext(FCTheme);
    const goToDashboard = () => {
        dispatch({ type: 'SHOW_NEW_TODO', payload: false });
    };
    return (
        <BreadcrumbStyled theme={theme?.theme}>
            <li>
                <button onClick={() => goToDashboard()}>Dashboard</button>
            </li>
            <li>
                {'>'} <strong>{currentPageTitle}</strong>{' '}
            </li>
        </BreadcrumbStyled>
    );
};

export default Breadcrumb;
