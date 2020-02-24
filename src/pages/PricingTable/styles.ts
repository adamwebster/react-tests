import styled, { css } from 'styled-components'
import { Card, Button, Toggle, Textarea } from '@adamwebster/fused-components'

interface StyledCard {
    bgColor?: string;
    scale?: string;
}
export const StyledCard = styled(Card)<StyledCard>`
    width: 275px;
    padding: 30px;
    display: inline-block;
    ${props => props.bgColor && css`
    background-image: linear-gradient(136deg, hsl(212.24, 80.9%, 39.66%), hsl(200.73, 41.64%, 49.16%));
        color: #fff;
    `};

    @media (max-width: 825px) {
    margin-bottom: 20px;
    width: 100%;

  }
    text-align:center;
    h2{ 
        font-size: 16px;
        margin: 0;
        font-weight: 400;
    }
    &:first-child{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;

    }
    &:last-child{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
    }
`
export const StyledList = styled.ul`
    list-style:none;
    padding:0;
    margin: 20px 0;
    li{
        padding: 10px 0 ;
        border-bottom: solid 1px #dfdfdf;
       &:first-child{
        border-top: solid 1px #dfdfdf;
       }

    }
`
export const StyledButton = styled(Button)`
&&{
    width: 100%;
    background-image: linear-gradient(136deg, hsl(212.24, 80.9%, 39.66%), hsl(200.73, 41.64%, 49.16%));
    ${props => (props.primary && props.buttonColor === "#fff") && css`
        color:  hsl(212.24, 80.9%, 39.66%);
        background-image: none;
    `}
}
`

export const PricingWrapper = styled.div`
    width:825px;
    margin: 40px auto;
    ${StyledCard}{
        :nth-child(2){
            position:relative;
            padding: 55px 30px;
            top: 0px;
            @media (max-width: 825px) {
                padding: 30px;

            top: 0;
            }
            ul{
                li{
                    border-color: hsl(212.24, 80.9%, 76.72%);
                }
            }
        }
    }
    @media (max-width: 825px) {
    width: 100%;
    padding: 0 30px;
    box-sizing:border-box;
  }
`

export const PricingTableStyled = styled.div`

`

export const Header = styled.header`
    width: 100%;
    text-align: center;
    clear:both;
    position:relative;
    margin-bottom: 50px;

    h1{ 
        font-weight: 300;
    }
`

export const ToggleWrapper = styled.div`
    width: 100%;
`

export const StyledToggle = styled(Toggle)`
top: 10px;
margin: 0 10px;
 display: inline-block;
 background-image: linear-gradient(136deg, hsl(212.24, 80.9%, 39.66%), hsl(200.73, 41.64%, 49.16%));

`

export const Price = styled.h3`
font-size: 32px;
margin-top: 10px;
`
export const StyledTextarea = styled(Textarea)`
 width: 100%;
resize: none;
box-sizing:border-box;
margin-top: 10px;
height: 100px;
padding:10px;
`