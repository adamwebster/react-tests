import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
    body{
        font-family: 'Roboto', sans-serif;
        font-style: 100%;
        padding: 0;
        margin: 0;
        background-color:${({ theme }: any) => theme.colors.backgroundColor}
    }
`



export const StyledGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding: 0 16px;
    grid-template-rows:  repeat(12, 1fr);
    
    gap: 16px;
    div:nth-child(2){
        grid-column: 1 / 3;
    }
    div{
        justify-content: center;
    align-items: center;
    display: flex;
    border: solid 1px red;
 
    }

`

export const StyledSiteHeader = styled.header`
    grid-column: 1 / 13;
    height: 50px;
`