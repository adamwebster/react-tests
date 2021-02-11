import { useContext } from 'react';
import styled from 'styled-components';
import { SiteContext } from '../../context/Site';
import { motion } from 'framer-motion';

const StyledHeader = styled.header`
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

const StyledHeaderInner = styled.div`
    margin: 0 auto;
    position: relative;
    max-width: 1200px;
`;

const StyledHeaderMotion = motion.custom(StyledHeader);

const Header = () => {
    const { siteState } = useContext(SiteContext);

    return (
        <StyledHeaderMotion
            initial={{
                backgroundColor: siteState.backgroundColor,
                color: siteState.fontColor,
            }}
            animate={{
                backgroundColor: siteState.backgroundColor,
                color: siteState.fontColor,
            }}
        >
            <StyledHeaderInner>Logo</StyledHeaderInner>
        </StyledHeaderMotion>
    );
};

export default Header;
