import React from 'react';
import styled from 'styled-components';
import { Colors } from '@adamwebster/fused-components';
const EmptyStateWrapper = styled.div`
    display: flex;
    flex: 1 1;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 26px;
    justify-content: center;
    color: ${Colors.mediumdark};
`;
const ToDoEmptyState = () => {
    return <EmptyStateWrapper>Choose a todo item</EmptyStateWrapper>;
};

export default ToDoEmptyState;
