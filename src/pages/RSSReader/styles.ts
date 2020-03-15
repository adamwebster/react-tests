import styled, { css } from "styled-components";
import { Colors, Icon } from "@adamwebster/fused-components";
import { color } from "@adamwebster/fused-components/dist/types/styles/styles";

export const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: solid 1px ${Colors.mediumdark};
  margin: 20px auto;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  font-size: 15px;
`;
export const MobileMenuStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarkest : Colors.dark};
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
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
  color: ${props =>
    props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
  border-radius: 10px;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  box-shadow: 0 0 10px ${Colors.darkest};

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
  overflow: hidden;
  display: flex;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDark : Colors.darker};
  color: #fff;
  min-height: 88px;
  max-height: 88px;
  align-items: center;
  overflow:hidden;
`;

export const SiteTitle = styled.h1`
  display: inline-block;
  margin: 0 10px;
  box-sizing: border-box;
  font-weight: 100;
  font-size: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Posts = styled.section`
  overflow: auto;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
`;

export const SinglePostInner = styled.section`
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
  display:flex;
  cursor: pointer;
  align-items:center;
  &:hover{
      opacity: 0.5;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const Post = styled.div`
  border-bottom: solid 1px
    ${props => (props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border)};
  &:last-child {
    border-bottom: none;
  }
`;
export const PostTitle = styled.h2`
  margin-bottom: 0;
`;

export const PostDate = styled.div``;

export const PostContent = styled.p`
  & img {
    max-width: 100%;
  }
`;

export const PostMeta = styled.div``;

interface SP {
  postOpen: boolean;
}
export const SinglePost = styled.div<SP>`
  position: absolute;
  left: 110%;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
  display: flex;
  flex-flow: column;
  box-shadow: 0 0 10px ${Colors.darkest};

  ${props =>
    props.postOpen &&
    css`
      left: 0;
      /* transform: scale(0.9) translate(70%); */
    `}
    color: ${props =>
      props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
`;

export const MobileMenuIcon = styled.div`
  width: 24px;
  box-sizing: border-box;
  color: #fff;
  top: 5px;
  position: relative;
  cursor: pointer;
  svg {
    width: 24px;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const BackButton = styled.div`
  width: 24px;
  box-sizing: border-box;
  color: #fff;
  top: 5px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
export const BottomBar = styled.div`
  min-height: 32px;
  border-top: solid 1px
    ${props => (props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border)};  padding: 5px;
  display: flex;
  align-items: center;
`;
export const BarItem = styled.div`
  flex: 1 1;
  text-align: center;
`;

export const FeedImage = styled.img`
  border-radius: 50%;
  background-color: #fff;
  padding: 2px;
  width: 24px;
  margin-left: 15px;
`;

export const FavIcon = styled.img`
  border-radius: 50%;
  background-color: #fff;
  padding: 1px;
  width: 20px;
  box-sizing:border-box;
  margin-right: 10px;
`