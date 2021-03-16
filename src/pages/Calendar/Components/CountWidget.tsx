import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Card } from '@adamwebster/fused-components';
import { darken } from 'polished';

interface WProps {
    backgroundColor?: string;
    foregroundColor?: string;
}

const Widget = styled(Card)<WProps>`
    flex: 1 1;
    margin-right: 10px;
    padding: 10px;
    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 10px;
    }
    h3 {
        margin: 0;
        font-size: 1.5em;
    }

    p {
        margin: 0;
    }
    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};

            border-color: ${darken(0.2, backgroundColor)};
        `}
    ${({ foregroundColor }) =>
        foregroundColor &&
        css`
            color: ${foregroundColor};
        `}
    &:last-child {
        margin-right: 0;
    }
`;

interface Props {
    backgroundColor: string;
    foregroundColor: string;
    children: ReactNode;
}
const CountWidget = ({ foregroundColor, backgroundColor, children }: Props) => {
    return (
        <Widget
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
        >
            {children}
        </Widget>
    );
};

export const CountWidgetLoading = () => {
    return <Widget>Loading...</Widget>;
};

export default CountWidget;
