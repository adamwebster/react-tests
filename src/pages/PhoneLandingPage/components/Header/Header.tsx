import { useContext } from "react";
import styled from "styled-components";
import { SiteContext } from "../../context/Site";



const StyledHeader = styled.header`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

type StyledHeaderInnerProps = {
    fontColor: string,
}

const StyledHeaderInner = styled.div<StyledHeaderInnerProps>`
  margin: 0 auto;
  position: relative;
  max-width: 1200px;
  color: ${({fontColor}) => fontColor}; 
`;

const Header = () => {
    const { siteState } = useContext(SiteContext);
  return (
    <StyledHeader>
      <StyledHeaderInner fontColor={siteState.fontColor}>Logo</StyledHeaderInner>
    </StyledHeader>
  );
};

export default Header;
