import styled, { css } from 'styled-components'
import { Card, Button, Toggle } from '@adamwebster/fused-components'


interface IStyledCard {
    bgColor?: string;
    scale?: string;
}
export const StyledCard = styled(Card)<IStyledCard>`
    width: 300px;
    padding: 30px;
    float:left;
    ${props => props.bgColor && css`
    background-image: linear-gradient(to right, hsl(21.31, 100%, 61.45%), hsl(6.05, 73.54%, 49.16%));
        color: #fff;
    `};
    @media (max-width: 768px) {
    margin-bottom: 20px;
    width: 100%;
    float: left;
  }
    text-align:center;
    h2{ 
        font-size: 16px;
        margin: 0;
        font-weight: 400;
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
    width: 100%;
    background-image: linear-gradient(to right, hsl(21.31, 100%, 61.45%), hsl(6.05, 73.54%, 49.16%));
    ${props => (props.primary && props.buttonColor === "#fff") && css`
        color:  hsl(6.05, 73.54%, 49.16%)!important;
        background-image: none;
    `}
`

export const PricingWrapper = styled.div`
    width:900px;
    margin: 40px auto;
    ${StyledCard}{
        :nth-child(2){
            position:relative;
            padding: 55px 30px;
            top: -25px;
            @media (max-width: 768px) {
                padding: 30px;

            top: 0;
            }
            ul{
                li{
                    border-color: hsl(35.7, 100%, 49.16%);
                }
            }
        }
    }
    @media (max-width: 768px) {
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
 background-image: linear-gradient(to right, hsl(21.31, 100%, 61.45%), hsl(6.05, 73.54%, 49.16%));

`

export const Price = styled.h3`
font-size: 32px;
margin-top: 10px;
`