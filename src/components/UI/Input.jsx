import React from 'react';
import styled, { css } from 'styled-components';

import variables from '../../styles/variables';

const StyledInput = styled.input`
width: 100%;
height:34px;
margin-bottom: 15px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${props => props.theme.borderColor};
border-radius: ${props => variables.borderRadius};
&::placeholder{
  font-style:italic; 
}
${props => props.inError && css`
  border:solid 1px #c34242;
`}
&::before{
  content:'test'
}
`

const Input = ({ ...rest }) => {
  return (
    <StyledInput {...rest} />
  );
}

export default Input;