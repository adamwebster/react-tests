import React from 'react'
import { StyledCard } from './styles'

interface Props {
    bgColor?: string;
    buttonColor?: string;
    primaryButton?: boolean;
    children?: any;
}
const PricingCard = ({bgColor,buttonColor, primaryButton, children}:Props) => {
    return (
        <StyledCard bgColor={bgColor} boxShadow>
            {children}
            </StyledCard>
    )
}

export default PricingCard;