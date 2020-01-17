import React from 'react';
import styled from 'styled-components';
import variables from '../../styles/variables';

const StyledCard = styled.div`
border-radius: ${variables.borderRadius};
background-color: ${props => props.theme.cardColor};
border: solid 1px ${props => props.theme.borderColor};
padding:10px;
box-sizing:border-box;
box-shadow: 0 0 5px rgba(0,0,0,.25);
`

const Card = ({children}) => {
  return(
    <StyledCard>{children}</StyledCard>
  )
}
export default Card;