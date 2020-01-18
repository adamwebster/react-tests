
import React from 'react';
import styled from 'styled-components';

const LabelStyled = styled.label`
display:block;
color: #6d6d6d;
margin-bottom:5px;
`

const Label = ({...rest}) => {
    return(
        <LabelStyled {...rest} />
    )
}

export default Label;