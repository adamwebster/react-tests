import React from 'react';
import { ExampleFooterStyledFloating } from '../../styles/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import styled, { css } from 'styled-components';
interface Props {
    url?: string;
    linkColor?: string;
}

const StyledLink = styled.a<Props>`
    ${(props) =>
        props.linkColor &&
        css`
            color: ${props.linkColor};
        `};
`;

export const ExampleFooterFloating = ({
    linkColor,
    url = 'https://github.com/adamwebster/react-tests',
}: Props) => {
    return (
        <ExampleFooterStyledFloating>
            &copy; {moment().format('YYYY')}{' '}
            <StyledLink
                linkColor={linkColor}
                href="https://adamwebster.me"
                rel="noopener noreferrer"
                target="_blank"
            >
                Adam Webster
            </StyledLink>
            . View the code on{' '}
            <StyledLink
                linkColor={linkColor}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
            >
                <FontAwesomeIcon
                    style={{ marginRight: 2 + 'px' }}
                    icon={['fab', 'github']}
                />
                GitHub
            </StyledLink>
        </ExampleFooterStyledFloating>
    );
};
