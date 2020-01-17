import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const TextButtonStyled = styled.button`
  border:none;
  background-color:transparent;
  padding:0;
  color: ${props => props.theme.accentColor};
  cursor:pointer;
  outline:none;
  text-decoration:underline;
  margin-top:5px;
  &:hover{
    color: ${props => darken(0.4, props.theme.accentColor)}
  }
`

const TextButton = ({ ...rest }) => {
  return (
    <TextButtonStyled {...rest} />
  );
}

export default TextButton;