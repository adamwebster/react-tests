
import React from 'react';
import styled from 'styled-components';

const LabelStyled = styled.label`
display:block;
color: #6d6d6d;
`

const Label = ({...rest}) => {
    return(
        <LabelStyled {...rest} />
    )
}

export default Label;