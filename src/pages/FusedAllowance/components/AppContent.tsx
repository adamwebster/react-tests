import React, { ReactNode } from 'react';
import styled from 'styled-components';

const AppContentStyled = styled.div`
    width: 100%;
    display: flex;
    flex: 1 1;
    padding: 10px;
    box-sizing: border-box;
`;

interface Props {
    children?: ReactNode;
}
const AppContent = ({ children = 'Content' }: Props) => {
    return <AppContentStyled>{children}</AppContentStyled>;
};

export default AppContent;
