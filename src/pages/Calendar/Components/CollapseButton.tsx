import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Icon } from '@adamwebster/fused-components';
import { ToDoContext } from '../State';
const CollapseButtonStyled = styled(Button)`
    position: absolute;
    right: -20px;
    padding: 10px 12px;
    bottom: 10px;
    svg {
        left: 1px;
        position: relative;
    }
`;

const CollapseButton = () => {
    const collapseSidebar = () => {
        dispatch({
            type: 'SET_SIDEBAR_COLLAPSED',
            payload: !globalState.sidebarCollapsed,
        });
    };
    const { dispatch, globalState } = useContext(ToDoContext);

    return (
        <CollapseButtonStyled
            primary
            tabIndex={0}
            onClick={() => collapseSidebar()}
        >
            <Icon
                icon={
                    globalState.sidebarCollapsed
                        ? 'chevron-right'
                        : 'chevron-left'
                }
            />
        </CollapseButtonStyled>
    );
};

export default CollapseButton;
