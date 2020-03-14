import styled, { css } from "styled-components";
import { Colors } from "@adamwebster/fused-components";

export const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: solid 1px ${Colors.border};
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;
export const MobileMenuStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${props => props.theme === 'dark' ? Colors.darkModeDark : Colors.dark};
  color: ${Colors.mediumlight};
`;

interface CI {
  menuOpen: boolean;
}

export const Container = styled.div<CI>`
  position: absolute;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${props => props.theme === 'dark' ? Colors.darkModeDarkest : Colors.medium};
  color: ${Colors.dark};
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow:hidden;

  ${props =>
    props.menuOpen &&
    css`
      transform: scale(0.9) translate(70%);
    `}
`;

export const Header = styled.header`
  border-bottom: solid 1px ${Colors.border};
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow:hidden;
  display:flex;
  background-color: ${props => props.theme === 'dark' ? Colors.darkModeDarker : Colors.darker};
  color: #fff;
`;

export const SiteTitle = styled.h1`
  display: inline-block;
  margin: 0 10px;
  box-sizing: border-box;
  font-weight: 100;
`;

export const Posts = styled.section`
  overflow: auto;
  padding: 10px 20px 0 20px;
`;
export const Menu = styled.ul`
  list-style: none;
  margin: 30px 0;
  padding: 0;
  width: 200px;
`;

export const MenuItem = styled.li`
  padding: 10px 0;
  border-bottom: solid 1px ${Colors.mediumdark};
  &:last-child {
    border-bottom: none;
  }
`;

export const Post = styled.div`
  border-bottom: solid 1px ${Colors.border};
  &:last-child {
    border-bottom: none;
  }
`;
export const PostTitle = styled.h2`
  margin-bottom: 0;
`;

export const PostDate = styled.div``;

export const PostContent = styled.p``;

export const PostMeta = styled.div``;
