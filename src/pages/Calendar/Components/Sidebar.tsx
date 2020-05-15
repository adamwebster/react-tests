import React, { useContext } from 'react';
import styled from 'styled-components';

import CalendarControl from './CalendarControl';
import CollapseButton from './CollapseButton';
import ToDos from './ToDos';
import { FCTheme, Colors } from '@adamwebster/fused-components';

interface SBProps {
    sidebarCollapsing?: boolean;
    sidebarCollapsed?: boolean;
}

const SidebarStyled = styled.div<SBProps>`
    width: ${({ sidebarCollapsed }) => (sidebarCollapsed ? '50px' : '300px')};
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
    }
    transition: all 0.5s ease-in-out;

    border-right: solid 1px
        ${({ theme }) =>
            theme === 'dark' ? Colors.darkModeMediumDark : Colors.border};
`;

const CalendarWrapper = styled.div`
    padding: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px ${Colors.border};
`;

const Sidebar = () => {
    const theme = useContext(FCTheme);
    return (
        <SidebarStyled theme={theme?.theme}>
            <div className="inner">
                <CalendarWrapper>
                    <CalendarControl />
                </CalendarWrapper>
                <ToDos />
            </div>
        </SidebarStyled>
    );
};

export default Sidebar;
