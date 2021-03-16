import React from 'react'
import { StyledCard } from './styles'

interface Props {
    primary?: boolean;
    buttonColor?: string;
    primaryButton?: boolean;
    children?: any;
}
const PricingCard = ({primary,buttonColor, primaryButton, children}:Props) => {
    return (
        <StyledCard primary={primary} boxShadow>
            {children}
            </StyledCard>
    )
}

export default PricingCard;