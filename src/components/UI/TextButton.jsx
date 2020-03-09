import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Colors } from '@adamwebster/fused-components';

const TextButtonStyled = styled.button`
  border:none;
  background-color:transparent;
  padding:0;
  color: ${Colors.primary};
  cursor:pointer;
  outline:none;
  text-decoration:underline;
  margin-top:15px;
  &:hover{
    color: ${props => darken(0.4, Colors.primary)}
  }
`

const TextButton = ({ ...rest }) => {
  return (
    <TextButtonStyled {...rest} />
  );
}

export default TextButton;