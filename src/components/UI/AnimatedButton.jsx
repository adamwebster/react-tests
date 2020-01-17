import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import variables from '../../styles/variables';

const Button = styled.button`
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.theme.buttonTextColor};
  border:none;
  border-radius: ${variables.borderRadius};
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  cursor:pointer;
  display:block;
  transition: all 0.2s ease;
  outline: 0;
  position:relative;

  &[disabled]{
    background-color: #ccc;
    color: #a0a0a0;
  }
  &:hover:not([disabled]){
    background-color: ${props => darken(0.1, props.theme.accentColor)};
    transform: scale(1.02);
    box-shadow: 0 0 5px rgba(0,0,0,.5);
  }
  &.transforming{
    width:34px;
    margin: 0 auto;
    border-radius: 50%;
  }
  &.loading{
    content: "";
    background: conic-gradient(${props => props.theme.accentColor}, #fff);
    //border:solid 5px ${props => props.theme.accentColor}
    animation:spin 1s linear infinite;
    &:after{
      content:"";
      width: 28px;
      height: 28px;
      background-color: ${props => props.theme.cardColor};
      border-radius:50%;
      display:block;
      position: relative;
      left:-7px;
      top: -2px;
      
    }
  }
  &.completed{
    width: 100%;
    background-color: ${props => props.theme.green};
    color:#fff;
  }
  &[disabled]{
    cursor:default;
  }
  @keyframes spin { 
    100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
  }
.button-icon{
  background-color: rgba(0,0,0, 0.2);
  padding: 5px;
  border-radius:50%;
  position:absolute;
  left: 5px;
  top: 5px;
  color:#fff;
}
`

const AnimatedButton = ({ ...rest }) => {
  return (
    <>
    <Button {...rest} />
    </>
  );
}

export default AnimatedButton;