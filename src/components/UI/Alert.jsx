import React from 'react';
import styled, { css } from 'styled-components';

import variables from '../../styles/variables';


const AlertStyled = styled.div`
width: 100%;
border-radius: ${variables.borderRadius};
padding: 5px;
box-sizing: border-box;
margin-bottom: 10px;

${props => props.alertType === 'danger' && css`
background-color: ${props => props.theme.dangerBG};
color: ${props => props.theme.dangerText};
border: solid 1px ${props => props.theme.dangerBorder};
`}
`

const Alert = ({alertType, ...rest}) => {
    return(
        <AlertStyled alertType={alertType} {...rest} />
    )
}

export default Alert;