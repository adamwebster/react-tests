import React from 'react';
import styled from 'styled-components';
import variables from '../styles/variables';
import { darken } from 'polished';

const LoginWrapper = styled.div`
  position: relative;
  width:320px;
  margin: 0 auto;
  border-radius: ${variables.borderRadius};
  background-color: ${props => props.theme.cardColor};
  border: solid 1px ${props => props.theme.borderColor};
  padding:10px;
  box-sizing:border-box;
  top: 50%;
  transform: translateY(-50%);
`

const Input = styled.input`
width: 100%;
height:34px;
margin-bottom: 15px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${props => props.theme.borderColor};
border-radius: ${props => variables.borderRadius};
`

const LoginButton = styled.button`
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
  &:hover{
    background-color: ${props => darken(0.1, props.theme.accentColor)}
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
  @keyframes spin { 
    100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
  }

`

const LoginPage = () => {
  const clickButton = (e) => {
    console.log('button clicked')
    e.target.classList.add('transforming');
    const ele = e.persist();
    setTimeout(() => AddClass(e), 100)
    e.target.innerText = "";
  }

  const AddClass = (e) => {
    e.target.classList.add('loading');
  }
  return (
    <LoginWrapper>
      <Input />
      <Input />
      <LoginButton onClick={(e) => clickButton(e)}>
        Button
        </LoginButton>
    </LoginWrapper>
  );
}

export default LoginPage;
