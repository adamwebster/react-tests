import { ReactNode, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { SiteContext } from "../../context/Site";
import { Header } from "../Header";

type GlobalStyleProps = {
  backgroundColor: string;
};
const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
    body{
        margin: 0;
        padding:0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 100%;
        line-height: 150%;
        background-color: ${({ backgroundColor }) => backgroundColor};
    }
`;

const LayoutWrapper = styled.div`
  height: 100vh; 
  display: flex;
  flex-flow: column;
`

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  const { siteState } = useContext(SiteContext);
  return (
    <LayoutWrapper>
      <Header />
      <GlobalStyles backgroundColor={siteState.backgroundColor} />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
