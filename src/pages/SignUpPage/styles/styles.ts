import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: tomato;
        font-size: 100%;
    }
`

export const StyledHeroText = styled(motion.h1)`
    font-weight: 700;
    font-size: 3rem;
`

export const StyledHeroContent = styled.div`
   flex: 1; 
display: flex;
    color: #fff;
    flex-flow: column;
    height: 100vh;
    justify-content: center;
    padding: 64px;
    box-sizing: border-box;

`

export const StyledLayoutGrid = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    box-sizing: border-box;
    justify-content: center;
`


export const StyledTextInput = styled.input`
    height: 44px;
    border-radius: 8px;
    border-top-right-radius:0;
    margin: 0;
    padding: 0 16px;
    border: none;
    border-bottom-right-radius:0;
`

export const StyledFormGroup = styled(motion.div)`
    display: flex;
    align-items: center;
`
export const StyledButton = styled(motion.button)`
   background-color: tomato;
    color: #fff;
    border-radius: 8px;
    border: none;
    font: 100 1.5rem "roboto";
    padding: 8px 16px;
    display: inline-block;
    text-transform: uppercase;
    -webkit-appearance: none;
    border-top-left-radius:0;
    border-bottom-left-radius:0;

    
`